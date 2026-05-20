import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { feedImportQueue, housekeepingQueue } from '../../queues/index.js'

const jobsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/jobs', { preHandler: requireApiSecret }, async (_request, reply) => {
    const [active, waiting, completed, failed] = await Promise.all([
      feedImportQueue.getActive(),
      feedImportQueue.getWaiting(),
      feedImportQueue.getCompleted(0, 20),
      feedImportQueue.getFailed(0, 20),
    ])

    return reply.send({
      feedImport: {
        active: active.map(j => ({ id: j.id, name: j.name, data: j.data, progress: j.progress })),
        waiting: waiting.length,
        completed: completed.map(j => ({ id: j.id, name: j.name, finishedOn: j.finishedOn })),
        failed: failed.map(j => ({ id: j.id, name: j.name, failedReason: j.failedReason, attemptsMade: j.attemptsMade })),
      },
    })
  })

  fastify.post<{ Body: { jobId: string; queue: string } }>(
    '/api/admin/jobs/retry',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      const { jobId, queue } = request.body
      const q = queue === 'feed-import' ? feedImportQueue : housekeepingQueue
      const job = await q.getJob(jobId)
      if (!job) return reply.code(404).send({ error: 'Job not found' })
      await job.retry()
      return reply.send({ ok: true })
    }
  )
}

export default jobsRoute
