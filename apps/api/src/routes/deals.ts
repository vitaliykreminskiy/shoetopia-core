import type { FastifyPluginAsync } from 'fastify'
import { DEFAULT_COUNTRY, isValidCountry } from '../lib/countries.js'
import { getDataProvider } from '../dal/index.js'
import type { DealMode } from '../dal/product.js'
import type { DealHealthVoteType } from '../dal/deal.js'

const BRAND_SCORES: Record<string, number> = {
  'gucci': 120, 'prada': 120, 'louis vuitton': 120, 'chanel': 120, 'dior': 120,
  'balenciaga': 112, 'bottega veneta': 112, 'saint laurent': 112, 'valentino': 112,
  'jimmy choo': 100, 'manolo blahnik': 100, 'christian louboutin': 100,
  'stuart weitzman': 92, 'tory burch': 88, 'coach': 80, 'michael kors': 80,
  'cole haan': 76, 'sam edelman': 72, 'steve madden': 68, 'vince camuto': 68,
  'nike': 72, 'adidas': 72, 'new balance': 68, 'asics': 64, 'puma': 60,
  'ugg': 76, 'birkenstock': 72, 'dr. martens': 72, 'clarks': 64,
}

function brandScore(brand: string | null): number {
  if (!brand) return 40
  const b = brand.toLowerCase()
  for (const [key, score] of Object.entries(BRAND_SCORES)) {
    if (b.includes(key)) return score
  }
  return 40
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const dealsRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/deals — sale products with brand scoring
  fastify.get<{
    Querystring: { gender?: string; limit?: string }
  }>('/api/deals', async (request, reply) => {
    const gender = request.query.gender
    const limit = Math.min(parseInt(request.query.limit || '8'), 20)

    const hourSlot = Math.floor(Date.now() / (1000 * 60 * 60))
    const genderKey = (gender ?? 'all').charCodeAt(0)
    const seed = (hourSlot * 2654435761 + genderKey) >>> 0

    try {
      const genderMap: Record<string, string> = { 'Women': 'womens', 'Men': 'mens', 'Kids': 'kids' }
      const dbGender = genderMap[gender as string] || gender || 'womens'

      const dal = getDataProvider()
      const rows = await dal.products.getSaleProducts({ gender: dbGender })

      if (!rows || rows.length === 0) {
        return reply.send({ products: [], generated_at: new Date().toISOString() })
      }

      const rand = mulberry32(seed)
      const scored = rows.map(p => ({
        ...p,
        display_name: p.normalized_name?.trim() || p.name,
        name: p.normalized_name?.trim() || p.name,
        _score: brandScore(p.brand) + (p.discount_pct ?? 0) * 0.5 + rand() * 20,
      }))

      scored.sort((a, b) => b._score - a._score)

      const products = scored.slice(0, Math.min(limit, 8)).map(({ _score, ...p }) => p)

      return reply
        .header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600')
        .send({ products, generated_at: new Date().toISOString() })
    } catch (error) {
      fastify.log.error({ error }, 'Deals API error')
      return reply.code(500).send({ error: 'Failed to fetch deals', details: String(error) })
    }
  })

  // GET /api/featured-deals — curated deals by mode
  fastify.get<{
    Querystring: { gender?: string; mode?: string; country?: string }
  }>('/api/featured-deals', async (request, reply) => {
    const gender = request.query.gender || 'womens'
    const rawMode = request.query.mode || 'best-discount'
    const mode = (rawMode === 'new-arrivals' || rawMode === 'under-50' || rawMode === 'best-discount')
      ? rawMode as DealMode
      : 'best-discount' as DealMode
    const countryParam = request.query.country?.toUpperCase()
    const country = isValidCountry(countryParam) ? countryParam! : DEFAULT_COUNTRY

    try {
      const dal = getDataProvider()
      const products = await dal.products.getFeaturedDeals({ gender, mode, country, limit: 12 })
      return reply
        .header('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=600')
        .send({ products })
    } catch (error) {
      fastify.log.error({ error }, '[featured-deals] error')
      return reply.code(500).send({ products: [] })
    }
  })

  // GET /api/deal-health — get health stats for a product
  fastify.get<{
    Querystring: { slug?: string }
  }>('/api/deal-health', async (request, reply) => {
    const slug = request.query.slug
    if (!slug) return reply.code(400).send({ error: 'Missing slug' })

    try {
      const dal = getDataProvider()
      const health = await dal.deals.getHealth(slug)
      return reply.send(health)
    } catch (error) {
      fastify.log.error({ error }, '[DealHealth] GET error')
      return reply.send({ working: 0, issues: 0, unavailable: 0, total: 0, healthScore: 100 })
    }
  })

  // POST /api/deal-health — submit a health vote
  fastify.post<{
    Body: { slug?: string; vote?: string }
  }>('/api/deal-health', async (request, reply) => {
    try {
      const { slug, vote } = request.body ?? {}
      if (!slug || !vote) return reply.code(400).send({ error: 'Missing slug or vote' })
      if (!['working', 'issue', 'unavailable'].includes(vote)) {
        return reply.code(400).send({ error: 'Invalid vote type' })
      }

      const ip = (request.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown'
      const userAgent = (request.headers['user-agent'] as string) || 'unknown'
      const fingerprint = `${ip}-${userAgent.slice(0, 50)}`

      const dal = getDataProvider()
      const { alreadyVoted } = await dal.deals.recordHealthVote(slug, vote as DealHealthVoteType, fingerprint)

      if (alreadyVoted) {
        return reply.code(429).send({ error: 'You have already voted on this product today', alreadyVoted: true })
      }

      return reply.send({ success: true })
    } catch (error) {
      fastify.log.error({ error }, '[DealHealth] POST error')
      return reply.code(500).send({ error: 'Failed to submit vote' })
    }
  })
}

export default dealsRoute
