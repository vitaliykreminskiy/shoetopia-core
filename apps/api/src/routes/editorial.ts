import type { FastifyPluginAsync } from 'fastify'
import { getDataProvider } from '../dal/index.js'
import type { ProductSort } from '../dal/product.js'

const editorialRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/editorial-products — editorially curated products
  fastify.get<{
    Querystring: { gender?: string; q?: string; onSale?: string; sort?: string; limit?: string }
  }>('/api/editorial-products', async (request, reply) => {
    const gender = request.query.gender || undefined
    const q      = request.query.q      || undefined
    const onSale = request.query.onSale === 'true' || undefined
    const sort   = (request.query.sort || 'relevance') as ProductSort
    const limit  = Math.min(Number(request.query.limit || '8'), 24)

    try {
      const dal = getDataProvider()
      const products = await dal.products.getEditorialProducts({ gender, q, onSale, sort, limit })
      return reply
        .header('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
        .send({ products })
    } catch (err: any) {
      fastify.log.error({ err }, '[editorial-products] error')
      return reply.code(500).send({ products: [] })
    }
  })
}

export default editorialRoute
