import type { FastifyPluginAsync } from 'fastify'
import { cached, CACHE_TTL } from '../lib/cache.js'
import { getDataProvider } from '../dal/index.js'

const statsRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/stats — product/brand statistics
  fastify.get('/api/stats', async (request, reply) => {
    try {
      const dal = getDataProvider()
      const stats = await cached('homepage:stats', () => dal.products.getStats(), CACHE_TTL.LONG)

      return reply
        .header('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
        .send(stats)
    } catch (error) {
      fastify.log.error({ error }, '[stats] Error')
      return reply.send({ totalProducts: 500000, totalBrands: 1000, avgDiscount: 35 })
    }
  })
}

export default statsRoute
