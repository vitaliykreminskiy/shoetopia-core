import type { FastifyPluginAsync } from 'fastify'
import { prisma, Prisma } from '@shoetopia/db'

const priceDiagRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/price-diag', async (_request, reply) => {
    const [summary, samples, topDiscount] = await Promise.all([
      prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT
          COUNT(*)                                                        AS total_variants,
          COUNT(CASE WHEN is_on_sale = true  THEN 1 END)                 AS is_on_sale_true,
          COUNT(CASE WHEN is_on_sale = false THEN 1 END)                 AS is_on_sale_false,
          COUNT(CASE WHEN price IS NULL      THEN 1 END)                 AS price_null,
          COUNT(CASE WHEN final_price IS NULL THEN 1 END)                AS final_price_null,
          COUNT(CASE WHEN price > 0 AND final_price > 0
                      AND final_price < price THEN 1 END)                AS price_gt_final,
          COUNT(CASE WHEN price > 0 AND final_price > 0
                      AND price = final_price THEN 1 END)                AS price_eq_final,
          COUNT(CASE WHEN discount_pct > 0   THEN 1 END)                 AS has_discount_pct,
          ROUND(AVG(NULLIF(discount_pct,0))::numeric, 1)                 AS avg_discount_pct
        FROM variants
      `),
      prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT
          id, name, price, final_price, discount_pct, is_on_sale
        FROM variants
        WHERE visibility IN ('live','pending')
        ORDER BY RANDOM()
        LIMIT 10
      `),
      prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT
          id, name, price, final_price, discount_pct, is_on_sale
        FROM variants
        WHERE discount_pct > 0
        ORDER BY discount_pct DESC
        LIMIT 10
      `),
    ])

    return reply.send({ summary: summary[0], samples, topDiscount })
  })
}

export default priceDiagRoute
