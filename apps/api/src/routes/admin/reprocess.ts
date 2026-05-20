import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'

const reprocessRoute: FastifyPluginAsync = async (fastify) => {
  // POST /api/admin/reprocess-all — stub (reprocess-all workflow)
  // In shoetopia this used a workflow SDK. Will be wired to BullMQ in Task 8/9.
  fastify.post('/api/admin/reprocess-all', { preHandler: requireApiSecret }, async (_request, reply) => {
    fastify.log.info('[reprocess-all] Triggered (stub — will be wired to BullMQ queue in Task 9)')
    return reply.send({ started: true, runId: null, note: 'Not yet wired to queue' })
  })
}

export default reprocessRoute
