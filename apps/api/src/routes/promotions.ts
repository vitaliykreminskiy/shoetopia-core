import type { FastifyPluginAsync } from 'fastify'
import { getPromotions } from '../lib/flexoffers.js'
import { getDataProvider } from '../dal/index.js'

const promotionsRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/promotions — list active promotions
  fastify.get<{
    Querystring: { limit?: string }
  }>('/api/promotions', async (request, reply) => {
    const limit = Number(request.query.limit ?? 12)

    try {
      const dal = getDataProvider()
      const dbPromos = await dal.coupons.list({ limit })

      if (dbPromos.length > 0) {
        return reply.send(dbPromos)
      }

      // Fallback to live FlexOffers
      const apiPageSize: 10 | 50 | 100 = limit <= 10 ? 10 : limit <= 50 ? 50 : 100
      const data: any = await getPromotions({ page: 1, pageSize: apiPageSize })
      const promotions = Array.isArray(data) ? data : (data?.promotions ?? data?.result ?? [])

      return reply.send(
        promotions.slice(0, limit).map((p: any) => ({
          id: 0,
          advertiser_id: p.advertiserId,
          title: p.promotionTitle ?? p.title,
          description: p.promotionDescription ?? p.description,
          coupon_code: p.couponCode,
          discount_amount: p.discountAmount,
          discount_percent: p.discountPercent,
          start_date: p.startDate,
          end_date: p.endDate,
          is_active: true,
        }))
      )
    } catch (e) {
      fastify.log.error({ e }, '[promotions] error')
      return reply.send([])
    }
  })
}

export default promotionsRoute
