import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { randomUUID } from 'crypto'

const dailySyncRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/cron/daily-sync', { preHandler: requireApiSecret }, async (_request, reply) => {
    // Will enqueue BullMQ sync job in Task 9 — stub for now
    const runId = randomUUID()
    const runStartedAt = new Date().toISOString()
    fastify.log.info(`[cron] daily-sync triggered: runId=${runId}`)
    return reply.send({ ok: true, runId, runStartedAt })
  })
}

export default dailySyncRoute
