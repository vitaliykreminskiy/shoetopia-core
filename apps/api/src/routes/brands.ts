import type { FastifyPluginAsync } from 'fastify'
import { cached, CACHE_TTL } from '../lib/cache.js'
import { DEFAULT_COUNTRY, isValidCountry } from '../lib/countries.js'
import { getDataProvider } from '../dal/index.js'
import { ParamError, toInt } from '../lib/params.js'

const DESIGNER_BRANDS = [
  { name: 'Christian Louboutin', tier: 'luxury' },
  { name: 'Givenchy', tier: 'luxury' },
  { name: 'Ferragamo', tier: 'luxury' },
  { name: 'Stuart Weitzman', tier: 'luxury' },
  { name: 'Jimmy Choo', tier: 'luxury' },
  { name: 'Prada', tier: 'luxury' },
  { name: 'Gucci', tier: 'luxury' },
  { name: 'Valentino', tier: 'luxury' },
  { name: 'MARC JACOBS', tier: 'designer' },
  { name: 'Vince Camuto', tier: 'designer' },
  { name: 'Tory Burch', tier: 'designer' },
  { name: 'Sam Edelman', tier: 'designer' },
  { name: 'Calvin Klein', tier: 'designer' },
  { name: 'Tommy Hilfiger', tier: 'designer' },
  { name: 'Lacoste', tier: 'designer' },
  { name: 'Nine West', tier: 'designer' },
  { name: 'Jessica Simpson', tier: 'designer' },
  { name: 'Polo Ralph Lauren', tier: 'designer' },
  { name: 'Anne Klein', tier: 'designer' },
  { name: 'GUESS', tier: 'designer' },
  { name: 'Tahari', tier: 'designer' },
  { name: 'Donald J Pliner', tier: 'designer' },
  { name: 'Cole Haan', tier: 'designer' },
  { name: 'Clarks', tier: 'designer' },
  { name: 'Geox', tier: 'designer' },
  { name: 'Dolce Vita', tier: 'designer' },
  { name: 'Aldo', tier: 'designer' },
  { name: 'Franco Sarto', tier: 'designer' },
  { name: 'Steve Madden', tier: 'designer' },
  { name: 'ALDO', tier: 'designer' },
]

const brandsRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/brands — top brands list
  fastify.get('/api/brands', async (request, reply) => {
    try {
      const dal = getDataProvider()
      const brands = await cached('homepage:brands', () => dal.brands.listTop(24), CACHE_TTL.VERY_LONG)

      return reply
        .header('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
        .send({ brands })
    } catch (e) {
      fastify.log.error({ e }, '[brands] error')
      return reply.send({ brands: [] })
    }
  })

  // GET /api/designer-brands — designer/luxury brands with top products
  fastify.get<{
    Querystring: { country?: string }
  }>('/api/designer-brands', async (request, reply) => {
    const countryParam = request.query.country?.toUpperCase()
    // country param accepted for future use
    void (isValidCountry(countryParam) ? countryParam : DEFAULT_COUNTRY)

    try {
      const dal = getDataProvider()

      const results = await Promise.allSettled(
        DESIGNER_BRANDS.map(async (b) => {
          const product = await dal.brands.getTopProduct({ brandName: b.name })
          if (!product) return null
          return { ...b, product }
        })
      )

      const brands = results
        .map(r => r.status === 'fulfilled' ? r.value : null)
        .filter(Boolean)

      return reply
        .header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600')
        .send({ brands })
    } catch (error) {
      fastify.log.error({ error }, '[designer-brands] error')
      return reply.code(500).send({ brands: [] })
    }
  })

  // GET /api/brands/sitemap?minCount= — brands for sitemap generation
  fastify.get<{ Querystring: { minCount?: string } }>('/api/brands/sitemap', async (request, reply) => {
    try {
      const minCount = toInt(request.query.minCount, { default: 10 })!
      const dal = getDataProvider()
      const rows = await cached(`brands:sitemap:${minCount}`, () => dal.brands.getTopForSitemap(minCount), CACHE_TTL.LONG)
      return reply.send(rows)
    } catch (err) {
      if (err instanceof ParamError) return reply.code(400).send({ error: err.message })
      fastify.log.error({ err }, '[brands/sitemap] error')
      return reply.code(500).send({ error: 'Failed' })
    }
  })
}

export default brandsRoute
