import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { prisma, Prisma } from '@shoetopia/db'

const fixCategoriesRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/admin/fix-categories', { preHandler: requireApiSecret }, async (_request, reply) => {
    const logs: string[] = []

    try {
      await prisma.$executeRaw(Prisma.sql`UPDATE variants SET sub_category = LOWER(sub_category) WHERE sub_category IS NOT NULL AND sub_category != LOWER(sub_category)`)
      logs.push('Lowercased sub_category')

      await prisma.$executeRaw(Prisma.sql`
        UPDATE variants SET category = 'wedges', sub_category = 'wedges,sandals'
        WHERE (name ILIKE '%wedge sandal%' OR name ILIKE '%sandal wedge%')
          AND in_stock = true
      `)
      logs.push('Wedge sandals: done')

      await prisma.$executeRaw(Prisma.sql`
        UPDATE variants SET category = 'wedges', sub_category = 'wedges'
        WHERE name ILIKE '%wedge%'
          AND name NOT ILIKE '%sandal%'
          AND category != 'wedges'
          AND in_stock = true
      `)
      logs.push('Pure wedges: done')

      await prisma.$executeRaw(Prisma.sql`
        UPDATE variants SET category = 'sandals', sub_category = 'sandals'
        WHERE (name ILIKE '%sandal%' OR name ILIKE '%flip%' OR name ILIKE '%slide%')
          AND name NOT ILIKE '%wedge%'
          AND category != 'sandals'
          AND in_stock = true
      `)
      logs.push('Sandals: done')

      await prisma.$executeRaw(Prisma.sql`
        UPDATE variants SET category = 'heels', sub_category = 'heels'
        WHERE (name ILIKE '%heel%' OR name ILIKE '%stiletto%')
          AND name NOT ILIKE '%wedge%'
          AND category != 'heels'
          AND in_stock = true
      `)
      logs.push('Heels: done')

      await prisma.$executeRaw(Prisma.sql`
        UPDATE variants SET category = 'boots', sub_category = 'boots'
        WHERE name ILIKE '%boot%'
          AND category != 'boots'
          AND in_stock = true
      `)
      logs.push('Boots: done')

      await prisma.$executeRaw(Prisma.sql`
        UPDATE variants SET category = 'sneakers', sub_category = 'sneakers'
        WHERE (name ILIKE '%sneaker%' OR name ILIKE '%trainer%')
          AND category != 'sneakers'
          AND in_stock = true
      `)
      logs.push('Sneakers: done')

      const stats = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT gender, sub_category, COUNT(*)::int as cnt
        FROM variants
        WHERE in_stock = true AND visibility = 'live' AND gender IN ('womens', 'mens')
        GROUP BY gender, sub_category
        ORDER BY gender, cnt DESC
        LIMIT 30
      `)

      return reply.send({ success: true, logs, stats })
    } catch (error: any) {
      return reply.code(500).send({ success: false, logs, error: error.message })
    }
  })
}

export default fixCategoriesRoute
