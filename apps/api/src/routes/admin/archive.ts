import type { FastifyPluginAsync } from 'fastify'
import { prisma, Prisma, rawQuery } from '@shoetopia/db'

const archiveRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get<{
    Querystring: { visibility?: string; limit?: string; offset?: string }
  }>('/api/admin/archive', async (request, reply) => {
    try {
      const { visibility = 'archived', limit: limitStr = '50', offset: offsetStr = '0' } = request.query
      const limit = parseInt(limitStr)
      const offset = parseInt(offsetStr)

      const [products, count] = await Promise.all([
        prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT id, name, brand, category, image_url, visibility, created_at
          FROM variants
          WHERE visibility = ${visibility}
          ORDER BY updated_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `),
        prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT COUNT(*) as total FROM variants WHERE visibility = ${visibility}
        `),
      ])

      return reply.send({
        products,
        total: count[0]?.total || 0,
        limit,
        offset,
      })
    } catch (err: any) {
      fastify.log.error({ err }, '[admin] Archive GET error')
      return reply.code(500).send({ error: err.message })
    }
  })

  fastify.post<{ Body: { action?: string; productIds?: number[] } }>(
    '/api/admin/archive',
    async (request, reply) => {
      try {
        const { action, productIds } = request.body ?? {}

        if (!action || !['archive', 'restore', 'delete'].includes(action)) {
          return reply.code(400).send({ error: 'Invalid action' })
        }

        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
          return reply.code(400).send({ error: 'productIds required' })
        }

        let result: Record<string, any>[] = []

        if (action === 'archive') {
          result = await rawQuery(
            `UPDATE variants SET visibility = 'archived', updated_at = NOW() WHERE id = ANY($1::int[]) RETURNING id`,
            [productIds]
          )
        } else if (action === 'restore') {
          result = await rawQuery(
            `UPDATE variants SET visibility = 'live', updated_at = NOW() WHERE id = ANY($1::int[]) RETURNING id`,
            [productIds]
          )
        } else if (action === 'delete') {
          result = await rawQuery(
            `DELETE FROM variants WHERE id = ANY($1::int[]) RETURNING id`,
            [productIds]
          )
        }

        return reply.send({ success: true, action, count: result?.length || 0 })
      } catch (err: any) {
        fastify.log.error({ err }, '[admin] Archive error')
        return reply.code(500).send({ error: err.message })
      }
    }
  )
}

export default archiveRoute
