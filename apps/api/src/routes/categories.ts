import type { FastifyPluginAsync } from 'fastify'
import { cached, CACHE_TTL } from '../lib/cache.js'
import { DEFAULT_COUNTRY, isValidCountry } from '../lib/countries.js'
import { getDataProvider } from '../dal/index.js'

const categoriesRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/categories — all categories with product counts
  fastify.get<{
    Querystring: { parent_slug?: string; include_empty?: string }
  }>('/api/categories', async (request, reply) => {
    try {
      const parentSlug = request.query.parent_slug ?? undefined
      const includeEmpty = request.query.include_empty === 'true'

      const dal = getDataProvider()
      const categories = await dal.categories.list({ parentSlug, includeEmpty })

      return reply.send({ categories, total: categories.length })
    } catch (error: any) {
      fastify.log.error({ error }, '[categories] error')
      return reply.code(500).send({ categories: [], total: 0 })
    }
  })

  // GET /api/nav-categories — category counts for navigation
  fastify.get<{
    Querystring: { country?: string }
  }>('/api/nav-categories', async (request, reply) => {
    const countryParam = request.query.country?.toUpperCase()
    const country = isValidCountry(countryParam) ? countryParam! : DEFAULT_COUNTRY

    try {
      const dal = getDataProvider()
      const cacheKey = `nav:categories:counts:${country}`
      const rows = await cached(cacheKey, () => dal.categories.getNavCounts(country), CACHE_TTL.LONG)

      if (!rows || !Array.isArray(rows)) {
        return reply.send({ counts: {} })
      }

      const counts: Record<string, number> = {}
      for (const row of rows) {
        if (!row.gender || !row.category) continue
        const key = `${row.gender.toLowerCase()}/${row.category.toLowerCase().replace(/\s+/g, '_')}`
        counts[key] = row.count
      }

      return reply.send({ counts })
    } catch (error) {
      fastify.log.error({ error }, '[nav-categories] error')
      return reply.send({ counts: {} })
    }
  })
}

export default categoriesRoute
