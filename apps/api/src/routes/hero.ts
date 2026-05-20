import type { FastifyPluginAsync } from 'fastify'
import { cached, CACHE_TTL } from '../lib/cache.js'
import { DEFAULT_COUNTRY, isValidCountry } from '../lib/countries.js'
import { getDataProvider } from '../dal/index.js'

const heroRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/hero-products — featured hero products for homepage
  fastify.get('/api/hero-products', async (request, reply) => {
    const dayKey = new Date().toISOString().split('T')[0]
    const cacheKey = `hero:products:${dayKey}`

    try {
      const dal = getDataProvider()
      const products = await cached(cacheKey, () => dal.products.getHeroProducts('US'), CACHE_TTL.VERY_LONG)
      return reply
        .header('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
        .send({ products })
    } catch {
      return reply.send({ products: [] })
    }
  })

  // GET /api/masonry-products — infinite scroll products for homepage masonry grid
  fastify.get<{
    Querystring: { country?: string; gender?: string; filter?: string; cursor?: string }
  }>('/api/masonry-products', async (request, reply) => {
    const countryParam = request.query.country?.toUpperCase()
    const country = isValidCountry(countryParam) ? countryParam! : DEFAULT_COUNTRY
    const cursor = parseInt(request.query.cursor ?? '0', 10)
    const gender = request.query.gender ?? undefined
    const rawFilter = request.query.filter ?? undefined
    const filter = (rawFilter === 'sale' || rawFilter === 'under50' || rawFilter === 'new') ? rawFilter : undefined

    try {
      const dal = getDataProvider()
      const { products, nextCursor } = await dal.products.getMasonryProducts({
        country, gender, filter, cursor, pageSize: 80,
      })
      return reply
        .header('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
        .send({ products, nextCursor })
    } catch {
      return reply.code(500).send({ products: [], nextCursor: null })
    }
  })
}

export default heroRoute
