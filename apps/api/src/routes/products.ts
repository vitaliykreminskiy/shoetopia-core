import type { FastifyPluginAsync } from 'fastify'
import { cached, CACHE_TTL } from '../lib/cache.js'
import { DEFAULT_COUNTRY, isValidCountry } from '../lib/countries.js'
import { getDataProvider } from '../dal/index.js'
import type { ProductSort } from '../dal/product.js'
import { ParamError, toInt, toBool, parseGender, requireStr } from '../lib/params.js'

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

  // Maps a thrown error to 400 (bad param) or 500 (everything else).
  const fail = (reply: any, err: unknown, scope: string) => {
    if (err instanceof ParamError) return reply.code(400).send({ error: err.message })
    fastify.log.error({ err }, `[${scope}] error`)
    return reply.code(500).send({ error: 'Failed' })
  }

  // GET /api/products/trending?limit= — trending products
  fastify.get<{ Querystring: { limit?: string } }>('/api/products/trending', async (request, reply) => {
    try {
      const limit = toInt(request.query.limit, { default: 20 })!
      const dal = getDataProvider()
      const rows = await cached(`products:trending:${limit}`, () => dal.products.getTrending(limit), CACHE_TTL.MEDIUM)
      return reply.header('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600').send(rows)
    } catch (err) {
      return fail(reply, err, 'products/trending')
    }
  })

  // GET /api/products/by-brand?brand=&gender=&limit=
  fastify.get<{ Querystring: { brand?: string; gender?: string; limit?: string } }>('/api/products/by-brand', async (request, reply) => {
    try {
      const brand = requireStr(request.query.brand, 'brand')
      const gender = parseGender(request.query.gender)
      const limit = toInt(request.query.limit, { default: 12 })!
      const dal = getDataProvider()
      return reply.send(await dal.products.getByBrand(brand, gender, limit))
    } catch (err) {
      return fail(reply, err, 'products/by-brand')
    }
  })

  // GET /api/products/by-category?category=&gender=&limit=
  fastify.get<{ Querystring: { category?: string; gender?: string; limit?: string } }>('/api/products/by-category', async (request, reply) => {
    try {
      const category = requireStr(request.query.category, 'category')
      const gender = parseGender(request.query.gender)
      const limit = toInt(request.query.limit, { default: 12 })!
      const dal = getDataProvider()
      return reply.send(await dal.products.getByCategory(category, gender, limit))
    } catch (err) {
      return fail(reply, err, 'products/by-category')
    }
  })

  // GET /api/products/by-category-brand?brand=&category=&gender=&limit=
  fastify.get<{ Querystring: { brand?: string; category?: string; gender?: string; limit?: string } }>('/api/products/by-category-brand', async (request, reply) => {
    try {
      const brand = requireStr(request.query.brand, 'brand')
      const category = requireStr(request.query.category, 'category')
      const gender = parseGender(request.query.gender)
      const limit = toInt(request.query.limit, { default: 12 })!
      const dal = getDataProvider()
      return reply.send(await dal.products.getByCategoryAndBrand(brand, category, gender, limit))
    } catch (err) {
      return fail(reply, err, 'products/by-category-brand')
    }
  })

  // GET /api/products/related?category=&gender=&country=&excludeId=&limit=
  fastify.get<{ Querystring: { category?: string; gender?: string; country?: string; excludeId?: string; limit?: string } }>('/api/products/related', async (request, reply) => {
    try {
      const country = requireStr(request.query.country, 'country')
      const excludeId = toInt(request.query.excludeId, { required: true })!
      const limit = toInt(request.query.limit)
      const dal = getDataProvider()
      return reply.send(await dal.products.getRelated({
        category: request.query.category ?? null,
        gender: request.query.gender ?? null,
        country,
        excludeId,
        limit,
      }))
    } catch (err) {
      return fail(reply, err, 'products/related')
    }
  })

  // GET /api/products/daily-finds?limit=&offset=
  fastify.get<{ Querystring: { limit?: string; offset?: string } }>('/api/products/daily-finds', async (request, reply) => {
    try {
      const limit = toInt(request.query.limit, { default: 20 })!
      const offset = toInt(request.query.offset, { default: 0 })!
      const dal = getDataProvider()
      return reply.send(await dal.products.getDailyFinds(limit, offset))
    } catch (err) {
      return fail(reply, err, 'products/daily-finds')
    }
  })

  // GET /api/products/count?country=&gender=&onSale= — returns { count }
  fastify.get<{ Querystring: { country?: string; gender?: string; onSale?: string } }>('/api/products/count', async (request, reply) => {
    try {
      const dal = getDataProvider()
      const count = await dal.products.count({
        country: request.query.country,
        gender: request.query.gender,
        onSale: toBool(request.query.onSale),
      })
      return reply.send({ count })
    } catch (err) {
      return fail(reply, err, 'products/count')
    }
  })

  // GET /api/products/sitemap?page=
  fastify.get<{ Querystring: { page?: string } }>('/api/products/sitemap', async (request, reply) => {
    try {
      const page = toInt(request.query.page, { default: 1 })!
      const dal = getDataProvider()
      const rows = await cached(`products:sitemap:${page}`, () => dal.products.getSitemapProducts(page), CACHE_TTL.LONG)
      return reply.send(rows)
    } catch (err) {
      return fail(reply, err, 'products/sitemap')
    }
  })

  // GET /api/products/brand-info?brand=&country= — 404 when not found
  fastify.get<{ Querystring: { brand?: string; country?: string } }>('/api/products/brand-info', async (request, reply) => {
    try {
      const brand = requireStr(request.query.brand, 'brand')
      const country = request.query.country
      const dal = getDataProvider()
      const info = await cached(`products:brand-info:${brand}:${country ?? ''}`, () => dal.products.getBrandInfo(brand, country), CACHE_TTL.LONG)
      if (!info) return reply.code(404).send({ error: 'Brand not found' })
      return reply.send(info)
    } catch (err) {
      return fail(reply, err, 'products/brand-info')
    }
  })

  // GET /api/products/:id/sizes
  fastify.get<{ Params: { id: string } }>('/api/products/:id/sizes', async (request, reply) => {
    try {
      const id = toInt(request.params.id, { required: true })!
      const dal = getDataProvider()
      return reply.send(await dal.products.getSizes(id))
    } catch (err) {
      return fail(reply, err, 'products/:id/sizes')
    }
  })

  // GET /api/products/:id/price-range
  fastify.get<{ Params: { id: string } }>('/api/products/:id/price-range', async (request, reply) => {
    try {
      const id = toInt(request.params.id, { required: true })!
      const dal = getDataProvider()
      return reply.send(await dal.products.getPriceRange(id))
    } catch (err) {
      return fail(reply, err, 'products/:id/price-range')
    }
  })

  // GET /api/products/:id/color-variants
  fastify.get<{ Params: { id: string } }>('/api/products/:id/color-variants', async (request, reply) => {
    try {
      const id = toInt(request.params.id, { required: true })!
      const dal = getDataProvider()
      return reply.send(await dal.products.getColorVariants(id))
    } catch (err) {
      return fail(reply, err, 'products/:id/color-variants')
    }
  })
}

export default productsRoute
