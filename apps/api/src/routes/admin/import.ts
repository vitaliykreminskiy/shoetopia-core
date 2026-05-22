import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { importFeedById, feedImportQueue, feedImportQueueEvents } from '@shoetopia/jobs'
import { prisma } from '@shoetopia/db'

const importRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/run-pipeline', { preHandler: requireApiSecret }, async (_request, reply) => {
    const feeds = await prisma.feed.findMany({
      where: { isActive: true },
      select: { programId: true, programName: true },
      orderBy: { programName: 'asc' },
    })
    return reply.send({
      usage: 'POST /api/admin/run-pipeline',
      actions: [
        { action: 'import', feedId: 123, description: 'Import single feed by ID' },
        { action: 'import-all', description: 'Import all feeds' },
        { action: 'full', description: 'Import all feeds (quality runs as part of daily sync)' },
      ],
      feeds: feeds.map(f => ({ id: f.programId, name: f.programName })),
    })
  })

  fastify.post<{ Body: { action?: string; feedId?: number } }>(
    '/api/admin/run-pipeline',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      try {
        const { action, feedId } = request.body ?? {}

        const results: any = {
          action,
          started: new Date().toISOString(),
          steps: [],
        }

        // ACTION: Import single feed
        if (action === 'import' && feedId) {
          const feed = await prisma.feed.findUnique({ where: { programId: feedId }, select: { programName: true } })
          if (!feed) {
            return reply.code(404).send({ error: `Feed ${feedId} not found` })
          }
          fastify.log.info(`[run-pipeline] Importing feed: ${feed.programName}`)
          const importData = await importFeedById(feedId)
          results.steps.push({ step: 'import', feedName: feed.programName, ...importData })
        }

        // ACTION: Import all feeds
        if (action === 'import-all' || action === 'full') {
          const allFeeds = await prisma.feed.findMany({
            where: { isActive: true },
            select: { programId: true, programName: true },
            orderBy: { programName: 'asc' },
          })
          fastify.log.info(`[run-pipeline] Importing all ${allFeeds.length} feeds...`)

          for (const feed of allFeeds) {
            try {
              fastify.log.info(`[run-pipeline] Importing: ${feed.programName}`)
              const importData = await importFeedById(feed.programId)
              results.steps.push({
                step: 'import',
                feedName: feed.programName,
                feedId: feed.programId,
                imported: importData.imported,
                stats: importData.stats,
              })
            } catch (err: any) {
              results.steps.push({
                step: 'import',
                feed: feed.programName,
                feedId: feed.programId,
                success: false,
                error: err.message,
              })
            }
          }
        }

        results.completed = new Date().toISOString()
        results.success = results.steps.every((s: any) => s.success !== false)

        fastify.log.info(`[run-pipeline] Complete: ${results.success ? 'SUCCESS' : 'PARTIAL FAILURE'}`)

        return reply.send(results)
      } catch (err: any) {
        fastify.log.error({ err }, '[run-pipeline] Error')
        return reply.code(500).send({ error: err.message })
      }
    }
  )

  // Direct import endpoint — enqueues a BullMQ job and waits for completion
  fastify.post<{ Body: { feedId?: number } }>(
    '/api/admin/import',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      try {
        const { feedId } = request.body ?? {}
        if (!feedId) return reply.code(400).send({ error: 'feedId required' })

        const feed = await prisma.feed.findUnique({
          where: { programId: feedId },
          select: { programName: true },
        })
        if (!feed) return reply.code(404).send({ error: `Feed ${feedId} not found` })

        const runStartedAt = new Date().toISOString()
        const job = await feedImportQueue.add('manual-import', {
          feedId,
          feedName: feed.programName,
          runStartedAt,
        })

        const result = await job.waitUntilFinished(feedImportQueueEvents)
        return reply.send({ ...result, success: true, firstError: result.errors[0] ?? '' })
      } catch (err: any) {
        fastify.log.error({ err }, '[import] Error')
        return reply.code(500).send({ error: err.message || 'Import failed' })
      }
    }
  )
}

export default importRoute
