import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { feedImportQueue, housekeepingQueue, syncQueue } from '@shoetopia/jobs'

const jobsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/jobs', { preHandler: requireApiSecret }, async (_request, reply) => {
    const queues = [
      { name: 'feed-import', q: feedImportQueue },
      { name: 'housekeeping', q: housekeepingQueue },
      { name: 'sync', q: syncQueue },
    ]

    const results = await Promise.all(
      queues.map(async ({ name, q }) => {
        const [active, waiting, completed, failed] = await Promise.all([
          q.getActive(),
          q.getWaiting(),
          q.getCompleted(0, 19),
          q.getFailed(0, 19),
        ])
        return {
          name,
          active: active.map(j => ({
            id: String(j.id),
            name: j.name,
            queue: name,
            data: j.data,
            progress: typeof j.progress === 'number' ? j.progress : 0,
            processedOn: j.processedOn ?? null,
          })),
          waitingCount: waiting.length,
          waiting: waiting.slice(0, 20).map(j => ({
            id: String(j.id),
            name: j.name,
            data: j.data,
          })),
          completed: completed.map(j => ({
            id: String(j.id),
            name: j.name,
            queue: name,
            data: j.data,
            finishedOn: j.finishedOn ?? null,
            returnvalue: j.returnvalue,
          })),
          failed: failed.map(j => ({
            id: String(j.id),
            name: j.name,
            queue: name,
            data: j.data,
            failedReason: j.failedReason,
            attemptsMade: j.attemptsMade,
          })),
        }
      })
    )

    return reply.send({ queues: results })
  })

  fastify.get<{ Params: { queue: string; jobId: string } }>(
    '/api/admin/jobs/:queue/:jobId/logs',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      const { queue, jobId } = request.params
      if (!['feed-import', 'housekeeping', 'sync'].includes(queue)) {
        return reply.code(400).send({ error: `Unknown queue: ${queue}` })
      }
      const q = queue === 'feed-import' ? feedImportQueue
               : queue === 'housekeeping' ? housekeepingQueue
               : syncQueue
      const job = await q.getJob(jobId)
      if (!job) return reply.code(404).send({ error: 'Job not found' })
      const { logs } = await q.getJobLogs(jobId, 0, 200)
      return reply.send({ logs })
    }
  )

  fastify.post<{ Body: { jobId: string; queue: string } }>(
    '/api/admin/jobs/retry',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      const { jobId, queue } = request.body
      const q = queue === 'feed-import' ? feedImportQueue
               : queue === 'housekeeping' ? housekeepingQueue
               : syncQueue
      const job = await q.getJob(jobId)
      if (!job) return reply.code(404).send({ error: 'Job not found' })
      await job.retry()
      return reply.send({ ok: true })
    }
  )

  fastify.post<{ Body: { jobId: string; queue: string } }>(
    '/api/admin/jobs/pause',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      const { queue } = request.body
      if (!['feed-import', 'housekeeping', 'sync'].includes(queue)) {
        return reply.code(400).send({ error: `Unknown queue: ${queue}` })
      }
      const q = queue === 'feed-import' ? feedImportQueue
               : queue === 'housekeeping' ? housekeepingQueue
               : syncQueue
      await q.pause()
      return reply.send({ ok: true })
    }
  )

  fastify.post<{ Body: { queue: string } }>(
    '/api/admin/jobs/resume',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      const { queue } = request.body
      if (!['feed-import', 'housekeeping', 'sync'].includes(queue)) {
        return reply.code(400).send({ error: `Unknown queue: ${queue}` })
      }
      const q = queue === 'feed-import' ? feedImportQueue
               : queue === 'housekeeping' ? housekeepingQueue
               : syncQueue
      await q.resume()
      return reply.send({ ok: true })
    }
  )

  fastify.post<{ Body: { jobId: string; queue: string } }>(
    '/api/admin/jobs/remove',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      const { jobId, queue } = request.body
      if (!['feed-import', 'housekeeping', 'sync'].includes(queue)) {
        return reply.code(400).send({ error: `Unknown queue: ${queue}` })
      }
      const q = queue === 'feed-import' ? feedImportQueue
               : queue === 'housekeeping' ? housekeepingQueue
               : syncQueue
      const job = await q.getJob(jobId)
      if (!job) return reply.code(404).send({ error: 'Job not found' })
      await job.remove()
      return reply.send({ ok: true })
    }
  )
}

export default jobsRoute
