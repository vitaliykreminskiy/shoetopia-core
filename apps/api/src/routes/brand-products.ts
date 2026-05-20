import type { FastifyPluginAsync } from 'fastify'
import { redis } from '../lib/cache.js'
import { DEFAULT_COUNTRY, isValidCountry } from '../lib/countries.js'
import { getDataProvider } from '../dal/index.js'

const BRANDS = ['Sam Edelman', 'Steve Madden', 'Nike', 'Puma', 'Adidas']
const GENDERS = ['womens', 'mens'] as const
const CACHE_TTL_SECONDS = 86_400

const brandProductsRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/brand-products — products for a specific brand
  fastify.get<{
    Querystring: { brand?: string; gender?: string; country?: string }
  }>('/api/brand-products', async (request, reply) => {
    const brand = request.query.brand || ''
    const gender = request.query.gender || 'womens'
    const countryParam = request.query.country?.toUpperCase()
    const country = isValidCountry(countryParam) ? countryParam! : DEFAULT_COUNTRY

    if (!brand) return reply.send({ products: [] })

    try {
      const dal = getDataProvider()
      const products = await dal.products.getBrandProducts({ brand, gender, country, limit: 6 })
      return reply
        .header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=1800')
        .send({ products })
    } catch (error) {
      fastify.log.error({ error }, '[brand-products] error')
      return reply.code(500).send({ products: [] })
    }
  })

  // GET /api/brand-products-all — products for all featured brands
  fastify.get<{
    Querystring: { country?: string }
  }>('/api/brand-products-all', async (request, reply) => {
    const countryParam = request.query.country?.toUpperCase()
    const country: string = isValidCountry(countryParam) ? countryParam! : DEFAULT_COUNTRY

    const cacheKey = `homepage:brands:${country}`

    if (redis) {
      try {
        const hit = await redis.get(cacheKey)
        if (hit) {
          return reply
            .header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200')
            .header('X-Cache', 'HIT')
            .send(JSON.parse(hit))
        }
      } catch { /* Redis unavailable — fall through to DB */ }
    }

    try {
      const dal = getDataProvider()

      const queries = BRANDS.flatMap(brand =>
        GENDERS.map(gender =>
          dal.brands.getFeaturedProducts({ brand, gender, country }).then(rows => ({ brand, gender, rows }))
        )
      )
      const results = await Promise.all(queries)

      const brands: Record<string, Record<string, typeof results[0]['rows']>> = {}
      for (const { brand, gender, rows } of results) {
        if (!brands[brand]) brands[brand] = {}
        brands[brand][gender] = rows
      }

      const payload = { brands }

      if (redis) {
        try { await redis.setex(cacheKey, CACHE_TTL_SECONDS, JSON.stringify(payload)) } catch { /* ignore */ }
      }

      return reply
        .header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200')
        .header('X-Cache', 'MISS')
        .send(payload)
    } catch (error) {
      fastify.log.error({ error }, '[brand-products-all] error')
      return reply.code(500).send({ brands: {} })
    }
  })

  // POST /api/brand-products-all — bust cache
  fastify.post<{
    Querystring: { country?: string }
  }>('/api/brand-products-all', async (request, reply) => {
    const countryParam = request.query.country?.toUpperCase()

    const keysToDelete = countryParam
      ? [`homepage:brands:${countryParam}`]
      : ['US', 'GB', 'AU', 'CA', 'AE'].map(c => `homepage:brands:${c}`)

    if (redis) {
      try {
        for (const key of keysToDelete) await redis.del(key)
      } catch { /* ignore */ }
    }

    return reply.send({ ok: true, busted: keysToDelete })
  })
}

export default brandProductsRoute
