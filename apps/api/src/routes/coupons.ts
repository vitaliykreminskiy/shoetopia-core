import type { FastifyPluginAsync } from 'fastify'
import { getCoupons, getPromotions } from '../lib/flexoffers.js'
import { getDataProvider } from '../dal/index.js'
import { ParamError, toInt, requireStr } from '../lib/params.js'

const couponsRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/coupons — list coupons/promotions
  fastify.get<{
    Querystring: { advertiserIds?: string; store?: string; limit?: string }
  }>('/api/coupons', async (request, reply) => {
    const advertiserIds = request.query.advertiserIds
    const store = request.query.store ?? undefined
    const limit = Math.min(Number(request.query.limit ?? 50), 100)

    try {
      const dal = getDataProvider()
      const parsedIds = advertiserIds ? advertiserIds.split(',').map(Number).filter(Boolean) : undefined

      const dbRows = await dal.coupons.list({ advertiserIds: parsedIds, store, limit })

      if (dbRows.length > 0) {
        return reply
          .header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
          .send(dbRows)
      }

      // FlexOffers fallback when DB has no results
      const [couponsData, promosData] = await Promise.allSettled([
        getCoupons({ advertiserIds: advertiserIds ?? undefined, pageSize: 100 }),
        getPromotions({ advertiserIds: advertiserIds ?? undefined, pageSize: 100 }),
      ])
      const extract = (v: any) => Array.isArray(v) ? v : (v?.results ?? v?.coupons ?? v?.promotions ?? v?.data ?? [])
      const coupons = couponsData.status === 'fulfilled' ? extract(couponsData.value) : []
      const promos  = promosData.status  === 'fulfilled' ? extract(promosData.value)  : []
      const seen = new Set<string>()
      const merged = [...coupons, ...promos]
        .filter(p => { const k = String(p.promotionId ?? p.id ?? Math.random()); if (seen.has(k)) return false; seen.add(k); return true })
        .map((p: any) => ({
          id: 0, advertiser_id: p.advertiserId ?? 0,
          title: p.promotionTitle ?? p.title ?? '',
          description: p.promotionDescription ?? p.description ?? '',
          coupon_code: p.couponCode ?? null,
          discount_amount: p.discountAmount ?? null, discount_percent: p.discountPercent ?? null,
          start_date: p.startDate ?? null, end_date: p.endDate ?? null, is_active: true,
        }))
        .slice(0, limit)

      return reply
        .header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
        .send(merged)
    } catch (e) {
      fastify.log.error({ e }, '[coupons API]')
      return reply.send([])
    }
  })

  // GET /api/coupon-stores — list coupon stores
  fastify.get('/api/coupon-stores', async (request, reply) => {
    try {
      const dal = getDataProvider()
      const rows = await dal.coupons.listStores()

      return reply
        .header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
        .send(rows)
    } catch (e) {
      fastify.log.error({ e }, '[coupon-stores]')
      return reply.send([])
    }
  })

  const fail = (reply: any, err: unknown, scope: string) => {
    if (err instanceof ParamError) return reply.code(400).send({ error: err.message })
    fastify.log.error({ err }, `[${scope}] error`)
    return reply.code(500).send({ error: 'Failed' })
  }

  // GET /api/coupons/stores/related?excludeId= — static, before /stores/:slug
  fastify.get<{ Querystring: { excludeId?: string } }>('/api/coupons/stores/related', async (request, reply) => {
    try {
      const excludeId = toInt(request.query.excludeId, { required: true })!
      const dal = getDataProvider()
      return reply.send(await dal.coupons.getRelatedStores(excludeId))
    } catch (err) {
      return fail(reply, err, 'coupons/stores/related')
    }
  })

  // GET /api/coupons/stores/:store/products — :store is a numeric advertiser id.
  // The param is named :store consistently across all /stores/:store* routes
  // because find-my-way forbids differing param names at the same position.
  fastify.get<{ Params: { store: string } }>('/api/coupons/stores/:store/products', async (request, reply) => {
    try {
      const advertiserId = toInt(request.params.store, { required: true })!
      const dal = getDataProvider()
      return reply.send(await dal.coupons.getStoreProducts(advertiserId))
    } catch (err) {
      return fail(reply, err, 'coupons/stores/products')
    }
  })

  // GET /api/coupons/stores/:store/keywords — :store is a numeric advertiser id
  fastify.get<{ Params: { store: string } }>('/api/coupons/stores/:store/keywords', async (request, reply) => {
    try {
      const advertiserId = toInt(request.params.store, { required: true })!
      const dal = getDataProvider()
      return reply.send(await dal.coupons.getStoreKeywords(advertiserId))
    } catch (err) {
      return fail(reply, err, 'coupons/stores/keywords')
    }
  })

  // GET /api/coupons/stores/:store — :store is a slug here. 404 when not found.
  fastify.get<{ Params: { store: string } }>('/api/coupons/stores/:store', async (request, reply) => {
    try {
      const slug = requireStr(request.params.store, 'slug')
      const dal = getDataProvider()
      const store = await dal.coupons.findStoreBySlug(slug)
      if (!store) return reply.code(404).send({ error: 'Store not found' })
      return reply.send(store)
    } catch (err) {
      return fail(reply, err, 'coupons/stores/:store')
    }
  })

  // GET /api/coupons/by-advertiser/:advertiserId
  fastify.get<{ Params: { advertiserId: string } }>('/api/coupons/by-advertiser/:advertiserId', async (request, reply) => {
    try {
      const advertiserId = toInt(request.params.advertiserId, { required: true })!
      const dal = getDataProvider()
      return reply.send(await dal.coupons.listByAdvertiser(advertiserId))
    } catch (err) {
      return fail(reply, err, 'coupons/by-advertiser')
    }
  })
}

export default couponsRoute
