import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { prisma, Prisma } from '@shoetopia/db'
import { upsertGroups, regroupStep } from '@shoetopia/jobs'

const housekeepingRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/admin/housekeeping/group-products — status
  fastify.get('/api/admin/housekeeping/group-products', { preHandler: requireApiSecret }, async (_request, reply) => {
    try {
      const count = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT COUNT(*)::int AS cnt FROM products WHERE visibility = 'live'
      `)
      return reply.send({
        success: true,
        liveGroups: count[0]?.cnt ?? 0,
      })
    } catch (error: any) {
      fastify.log.error({ error }, '[grouping] Status error')
      return reply.code(500).send({ success: false, error: error.message })
    }
  })

  // POST /api/admin/housekeeping/group-products — run grouping
  fastify.post('/api/admin/housekeeping/group-products', { preHandler: requireApiSecret }, async (_request, reply) => {
    try {
      fastify.log.info('[grouping] Starting upsertGroups + regroupStep')
      const startTime = Date.now()

      await upsertGroups()
      const updated = await regroupStep()

      const duration = ((Date.now() - startTime) / 1000).toFixed(2)
      fastify.log.info(`[grouping] Complete in ${duration}s`)

      return reply.send({ ok: true, updated })
    } catch (error: any) {
      fastify.log.error({ error }, '[grouping] Error')
      return reply.code(500).send({ success: false, error: error.message })
    }
  })

  // POST /api/admin/housekeeping/regroup — stub (regroup workflow)
  fastify.post('/api/admin/housekeeping/regroup', { preHandler: requireApiSecret }, async (_request, reply) => {
    try {
      // Regroup workflow — in shoetopia this used a workflow SDK.
      // For now run the regroup step directly.
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const updated = await regroupStep(since)
      return reply.send({ started: true, since, updated })
    } catch (err: any) {
      fastify.log.error({ err }, '[regroup] Failed')
      return reply.code(500).send({ error: err.message || 'Failed to start regroup' })
    }
  })
}

export default housekeepingRoute
