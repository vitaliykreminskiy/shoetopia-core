import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { prisma, Prisma } from '@shoetopia/db'

const syncLogRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/sync-log', { preHandler: requireApiSecret }, async (_request, reply) => {
    try {
      const rows = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT
          run_id, started_at, completed_at, duration_ms,
          feeds_synced, total_imported, stale_hidden,
          jsonb_array_length(errors) as error_count
        FROM sync_log
        ORDER BY started_at DESC
        LIMIT 10
      `)
      return reply.send({ success: true, logs: rows })
    } catch (err: any) {
      return reply.send({ success: false, error: err.message, logs: [] })
    }
  })
}

export default syncLogRoute
