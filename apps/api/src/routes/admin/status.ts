import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { prisma, Prisma } from '@shoetopia/db'
import { FEEDS } from '../../lib/feeds.js'

const statusRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/status', { preHandler: requireApiSecret }, async (_request, reply) => {
    try {
      const [stats, categoryBreakdown, productCounts] = await Promise.all([
        prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT
            COUNT(*) as total,
            COUNT(CASE WHEN visibility = 'live' THEN 1 END) as live,
            COUNT(CASE WHEN visibility = 'archived' THEN 1 END) as archived,
            COUNT(CASE WHEN visibility = 'pending_review' THEN 1 END) as pending_review,
            COUNT(DISTINCT category) as categories,
            COUNT(DISTINCT gender) as genders,
            COUNT(CASE WHEN in_stock = true THEN 1 END) as in_stock_count,
            COUNT(CASE WHEN in_stock = false THEN 1 END) as out_of_stock_count
          FROM products
          WHERE visibility = 'live'
        `),
        prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT
            category,
            gender,
            COUNT(*) as count,
            COUNT(CASE WHEN visibility = 'live' THEN 1 END) as live_count
          FROM products
          GROUP BY category, gender
          ORDER BY count DESC
        `),
        prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT
            program_id,
            COUNT(*) as product_count,
            COUNT(CASE WHEN visibility = 'live' THEN 1 END) as live_count,
            COUNT(CASE WHEN in_stock = true THEN 1 END) as in_stock_count,
            MAX(created_at) as last_imported
          FROM variants
          GROUP BY program_id
        `),
      ])

      const feedStats = FEEDS.map((feed) => {
        const counts = productCounts.find((c: any) => c.program_id === feed.id)
        return {
          program_id: feed.id,
          name: feed.name,
          country: feed.country,
          product_count: counts?.product_count || 0,
          live_count: counts?.live_count || 0,
          in_stock_count: counts?.in_stock_count || 0,
          last_imported: counts?.last_imported || null,
        }
      })

      return reply.send({
        stats: stats[0] || {},
        categoryBreakdown,
        feedStats,
      })
    } catch (err: any) {
      fastify.log.error({ err }, '[admin] Status error')
      return reply.code(500).send({ error: err.message })
    }
  })
}

export default statusRoute
