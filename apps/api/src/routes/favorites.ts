import type { FastifyPluginAsync } from 'fastify'
import { getDataProvider } from '../dal/index.js'

const favoritesRoute: FastifyPluginAsync = async (fastify) => {
  // POST /api/favorites — get product details for a list of pids
  fastify.post<{
    Body: { pids?: string[] }
  }>('/api/favorites', async (request, reply) => {
    const pids: string[] = Array.isArray(request.body?.pids) ? request.body.pids.slice(0, 200) : []
    if (pids.length === 0) return reply.send({ products: [] })

    try {
      const dal = getDataProvider()
      const products = await dal.products.findByPids(pids)
      return reply.send({ products })
    } catch (error) {
      fastify.log.error({ error }, '[/api/favorites] error')
      return reply.code(500).send({ error: 'Failed to fetch favorites' })
    }
  })
}

export default favoritesRoute
