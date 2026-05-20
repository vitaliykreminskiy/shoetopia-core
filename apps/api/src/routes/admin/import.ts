import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { importFeedById } from '../../lib/import-feed.js'
import { FEEDS } from '../../lib/feeds.js'

const importRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/run-pipeline', { preHandler: requireApiSecret }, async (_request, reply) => {
    return reply.send({
      usage: 'POST /api/admin/run-pipeline',
      actions: [
        { action: 'import', feedId: 123, description: 'Import single feed by ID' },
        { action: 'import-all', description: 'Import all feeds' },
        { action: 'full', description: 'Import all feeds (quality runs as part of daily sync)' },
      ],
      feeds: FEEDS.map(f => ({ id: f.id, name: f.name })),
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
          const feed = FEEDS.find(f => f.id === feedId)
          if (!feed) {
            return reply.code(404).send({ error: `Feed ${feedId} not found` })
          }

          fastify.log.info(`[run-pipeline] Importing feed: ${feed.name}`)
          const importData = await importFeedById(feedId)
          results.steps.push({ step: 'import', feedName: feed.name, ...importData })
        }

        // ACTION: Import all feeds
        if (action === 'import-all' || action === 'full') {
          fastify.log.info(`[run-pipeline] Importing all ${FEEDS.length} feeds...`)

          for (const feed of FEEDS) {
            try {
              fastify.log.info(`[run-pipeline] Importing: ${feed.name}`)
              const importData = await importFeedById(feed.id)
              results.steps.push({
                step: 'import',
                feedName: feed.name,
                feedId: feed.id,
                imported: importData.imported,
                stats: importData.stats,
              })
            } catch (err: any) {
              results.steps.push({
                step: 'import',
                feed: feed.name,
                feedId: feed.id,
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

  // Direct import endpoint
  fastify.post<{ Body: { feedId?: number } }>(
    '/api/admin/import',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      try {
        const { feedId } = request.body ?? {}
        if (!feedId) return reply.code(400).send({ error: 'feedId required' })
        const result = await importFeedById(feedId)
        return reply.send({ ...result, success: result.errors.length === 0, firstError: result.errors[0] ?? '' })
      } catch (err: any) {
        fastify.log.error({ err }, '[import] Error')
        return reply.code(500).send({ error: err.message || 'Import failed' })
      }
    }
  )
}

export default importRoute
