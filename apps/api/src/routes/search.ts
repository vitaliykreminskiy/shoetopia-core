import type { FastifyPluginAsync } from 'fastify'
import { cached, CACHE_TTL } from '../lib/cache.js'
import { DEFAULT_COUNTRY, isValidCountry } from '../lib/countries.js'
import { getDataProvider } from '../dal/index.js'
import type { ProductSort } from '../dal/product.js'

const searchRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/search — instant autocomplete
  fastify.get<{
    Querystring: { q?: string; country?: string }
  }>('/api/search', async (request, reply) => {
    const q = request.query.q?.trim().toLowerCase()
    const countryParam = request.query.country?.toUpperCase()
    const country = isValidCountry(countryParam) ? countryParam! : DEFAULT_COUNTRY

    if (!q || q.length < 2) {
      return reply.send({ results: [], brands: [], categories: [] })
    }

    const cacheKey = `search:v5:${country}:${q}`

    try {
      const dal = getDataProvider()

      const data = await cached(cacheKey, async () => {
        const { products, brands, categories } = await dal.products.autocomplete({ q, country })
        return {
          results: products,
          brands: brands.map(b => b.brand),
          categories: categories.map(c => c.category),
        }
      }, CACHE_TTL.MEDIUM)

      return reply
        .header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
        .send(data)
    } catch (error) {
      fastify.log.error({ error }, '[search] error')
      return reply.code(500).send({ results: [], brands: [], categories: [] })
    }
  })

  // GET /api/search/results — full paginated search
  fastify.get<{
    Querystring: {
      q?: string; gender?: string; min_price?: string; max_price?: string
      sale?: string; sort?: string; page?: string
    }
  }>('/api/search/results', async (request, reply) => {
    const q = request.query.q?.trim().toLowerCase() || ''
    const rawGender = request.query.gender?.toLowerCase() || ''
    const gender =
      rawGender === 'women'
        ? 'womens'
        : rawGender === 'men'
          ? 'mens'
          : rawGender || undefined
    const minPrice = parseFloat(request.query.min_price || '0') || undefined
    const maxPrice = parseFloat(request.query.max_price || '0') || undefined
    const onSale = request.query.sale === 'true' || undefined
    const sort = (request.query.sort || 'relevance') as ProductSort
    const page = Math.max(1, parseInt(request.query.page || '1'))
    const limit = 48

    const emptyResult = {
      products: [],
      total: 0,
      page,
      totalPages: 0,
      facets: { brands: [], categories: [], genders: [], sizes: [], colors: [] },
    }

    if (!q || q.length < 2) {
      return reply.send(emptyResult)
    }

    const cacheKey = `search-results:v9:${q}:${gender ?? ''}:${minPrice ?? ''}:${maxPrice ?? ''}:${onSale ?? ''}:${sort}:${page}`

    try {
      const dal = getDataProvider()

      const data = await cached(
        cacheKey,
        async () => {
          const { products, hasMore, facets } = await dal.products.searchFull({
            q, gender, minPrice, maxPrice, onSale, sort, page, limit,
          })

          const estimatedTotal =
            page === 1 && hasMore
              ? 500
              : hasMore
                ? (page - 1) * limit + limit + 100
                : (page - 1) * limit + products.length

          return {
            products,
            total: estimatedTotal,
            page,
            totalPages: Math.ceil(estimatedTotal / limit),
            facets: facets
              ? {
                  brands: facets.brands.map(b => ({ name: b.brand, count: b.count })),
                  categories: facets.categories.map(c => ({ name: c.category, count: c.count })),
                  genders: facets.genders.map(g => ({ name: g.gender, count: g.count })),
                  sizes: [],
                  colors: [],
                }
              : { brands: [], categories: [], genders: [], sizes: [], colors: [] },
          }
        },
        CACHE_TTL.SHORT,
      )

      return reply.send(data)
    } catch (error) {
      fastify.log.error({ error }, '[search/results] error')
      return reply.code(500).send(emptyResult)
    }
  })
}

export default searchRoute
