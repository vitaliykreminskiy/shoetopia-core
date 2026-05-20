import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'

const jobsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/jobs', { preHandler: requireApiSecret }, async (_request, reply) => {
    // Will be wired to BullMQ queues in Task 8
    return reply.send({ feedImport: { active: [], waiting: 0, completed: [], failed: [] } })
  })

  fastify.post<{ Body: { jobId: string; queue: string } }>(
    '/api/admin/jobs/retry',
    { preHandler: requireApiSecret },
    async (_request, reply) => {
      return reply.send({ ok: true })
    }
  )
}

export default jobsRoute
