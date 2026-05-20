import type { FastifyPluginAsync } from 'fastify'
import { cached, CACHE_TTL } from '../lib/cache.js'
import { DEFAULT_COUNTRY, isValidCountry } from '../lib/countries.js'
import { getDataProvider } from '../dal/index.js'
import type { ProductSort } from '../dal/product.js'

const productsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get<{
    Querystring: {
      q?: string; country?: string; gender?: string; genderFilter?: string
      category?: string; subCategory?: string; brand?: string; advertiser?: string
      size?: string; color?: string; minPrice?: string; maxPrice?: string
      onSale?: string; sort?: string; page?: string; limit?: string; cursor?: string
    }
  }>('/api/products', async (request, reply) => {
    const q = request.query as Record<string, string | undefined>

    const country = isValidCountry(q.country?.toUpperCase()) ? q.country!.toUpperCase() : DEFAULT_COUNTRY
    const page    = Math.max(1, Number(q.page ?? 1))
    const limit   = Math.min(Number(q.limit ?? 48), 96)

    const cacheKey = `products:list:${q.q ?? 'all'}:${country}:${q.gender ?? 'all'}:${q.category ?? 'all'}:${q.subCategory ?? ''}:${q.brand ?? ''}:${q.color ?? ''}:${q.size ?? ''}:${q.minPrice ?? ''}:${q.maxPrice ?? ''}:${q.onSale}:${q.sort ?? 'relevance'}:${page}:${limit}`

    try {
      const dal = getDataProvider()
      const result = await cached(cacheKey, () => dal.products.findMany({
        q: q.q?.toLowerCase(),
        country,
        gender: q.gender,
        genderFilter: q.genderFilter,
        category: q.category,
        subCategory: q.subCategory,
        brand: q.brand,
        advertiser: q.advertiser,
        size: q.size,
        color: q.color,
        minPrice: q.minPrice ? Number(q.minPrice) : undefined,
        maxPrice: q.maxPrice ? Number(q.maxPrice) : undefined,
        onSale: q.onSale === 'true',
        sort: (q.sort ?? 'relevance') as ProductSort,
        page,
        limit,
        cursor: q.cursor ? Number(q.cursor) : undefined,
      }), CACHE_TTL.SHORT)

      const { products, total, nextCursor } = result ?? { products: [], total: 0, nextCursor: null }

      return reply
        .header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
        .send({ products, total, page, limit, totalPages: Math.ceil(total / limit), nextCursor })
    } catch (err: any) {
      fastify.log.error({ err }, '[products] error')
      return reply.code(500).send({ products: [], total: 0, page, limit, totalPages: 0, error: err.message })
    }
  })
}

export default productsRoute
