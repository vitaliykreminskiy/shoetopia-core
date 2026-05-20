
import { prisma, Prisma } from '@shoetopia/db'
import type {
  CouponsDAL, CouponStore, CouponStoreDetail, Promotion,
  CouponProduct, CouponKeywordData, RelatedStore, ListCouponsParams,
} from '../../coupon.js'

// Slug expression used consistently across all store queries
const SLUG_EXPR = `LOWER(REPLACE(REPLACE(REPLACE(a.name, ' ', '-'), '.', ''), '&', 'and'))`

function mapPromotion(r: any): Promotion {
  return {
    id: r.id ?? 0,
    promo_id: r.promo_id ?? r.promoId ?? '',
    advertiser_id: r.advertiser_id ?? r.advertiserId ?? 0,
    title: r.title ?? '',
    description: r.description ?? null,
    coupon_code: r.coupon_code ?? r.couponCode ?? null,
    promo_type: r.promo_type ?? r.promoType ?? null,
    discount_amount: r.discount_amount ?? r.discountAmount ?? null,
    discount_percent: r.discount_percent ?? r.discountPercent ?? null,
    start_date: r.start_date ?? r.startDate ?? null,
    end_date: r.end_date ?? r.endDate ?? null,
    link_url: r.link_url ?? r.linkUrl ?? null,
    is_active: r.is_active ?? r.isActive ?? true,
  }
}

export const prismaCouponsDal: CouponsDAL = {
  async listStores() {
    try {
      return prisma.$queryRaw<CouponStore[]>(Prisma.sql`
        SELECT
          a.advertiser_id,
          a.name,
          a.logo_url,
          a.url,
          a.description,
          COUNT(p.id)::int AS coupon_count,
          MAX(p.discount_percent) AS best_percent,
          MAX(p.discount_amount)  AS best_amount,
          COUNT(CASE WHEN p.coupon_code IS NOT NULL AND p.coupon_code != '' THEN 1 END)::int AS code_count,
          ${Prisma.raw(SLUG_EXPR)} AS slug
        FROM advertisers a
        JOIN promotions p ON p.advertiser_id = a.advertiser_id
        WHERE a.is_active = true
          AND p.is_active = true
          AND (p.end_date IS NULL OR p.end_date > NOW())
        GROUP BY a.advertiser_id, a.name, a.logo_url, a.url, a.description
        HAVING COUNT(p.id) > 0
        ORDER BY COUNT(p.id) DESC, a.name ASC
        LIMIT 200
      `)
    } catch {
      return []
    }
  },

  async findStoreBySlug(slug) {
    try {
      const rows = await prisma.$queryRaw<CouponStoreDetail[]>(Prisma.sql`
        SELECT
          a.advertiser_id, a.name, a.logo_url, a.url, a.description,
          ${Prisma.raw(SLUG_EXPR)} AS slug
        FROM advertisers a
        WHERE ${Prisma.raw(SLUG_EXPR)} = ${slug}
          AND a.is_active = true
        LIMIT 1
      `)
      return rows[0] ?? null
    } catch {
      return null
    }
  },

  async list({ advertiserIds, store, limit = 50 }: ListCouponsParams) {
    const cap = Math.min(limit, 100)
    try {
      if (advertiserIds?.length) {
        const rows = await prisma.promotion.findMany({
          where: {
            advertiserId: { in: advertiserIds },
            isActive: true,
            OR: [{ endDate: null }, { endDate: { gt: new Date() } }],
          },
          orderBy: [{ discountPercent: 'desc' }, { discountAmount: 'desc' }],
          take: cap,
        })
        const sorted = [...rows.filter(r => r.couponCode), ...rows.filter(r => !r.couponCode)].slice(0, cap)
        return sorted.map(mapPromotion)
      }

      if (store) {
        const rows = await prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT p.* FROM promotions p
          JOIN advertisers a ON a.advertiser_id = p.advertiser_id
          WHERE LOWER(REPLACE(a.name, ' ', '-')) LIKE ${'%' + store + '%'}
            AND p.is_active = true
            AND (p.end_date IS NULL OR p.end_date > NOW())
          ORDER BY
            CASE WHEN p.coupon_code IS NOT NULL AND p.coupon_code != '' THEN 0 ELSE 1 END,
            p.discount_percent DESC NULLS LAST,
            p.discount_amount   DESC NULLS LAST
          LIMIT ${cap}
        `)
        return rows.map(mapPromotion)
      }

      const rows = await prisma.promotion.findMany({
        where: { isActive: true, OR: [{ endDate: null }, { endDate: { gt: new Date() } }] },
        orderBy: [{ discountPercent: 'desc' }, { discountAmount: 'desc' }],
        take: cap,
      })
      const sorted = [...rows.filter(r => r.couponCode), ...rows.filter(r => !r.couponCode)].slice(0, cap)
      return sorted.map(mapPromotion)
    } catch {
      return []
    }
  },

  async listByAdvertiser(advertiserId) {
    try {
      const rows = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT * FROM promotions
        WHERE advertiser_id = ${advertiserId}
          AND is_active = true
          AND (end_date IS NULL OR end_date > NOW())
        ORDER BY
          CASE WHEN coupon_code IS NOT NULL AND coupon_code != '' THEN 0 ELSE 1 END,
          discount_percent DESC NULLS LAST,
          discount_amount  DESC NULLS LAST
        LIMIT 100
      `)
      return rows.map(mapPromotion)
    } catch {
      return []
    }
  },

  async getStoreProducts(advertiserId) {
    try {
      return prisma.$queryRaw<CouponProduct[]>(Prisma.sql`
        SELECT id, name, brand, slug, image_url, final_price, price, is_on_sale,
               discount_percent, category, color
        FROM products
        WHERE advertiser_id = ${advertiserId}
          AND in_stock = true
          AND visibility = 'live'
          AND show_in_listings = true
          AND image_url IS NOT NULL
          AND image_url NOT LIKE '%placeholder%'
          AND country = 'US'
        ORDER BY
          CASE WHEN is_on_sale THEN 0 ELSE 1 END,
          discount_percent DESC NULLS LAST,
          final_price DESC
        LIMIT 24
      `)
    } catch {
      return []
    }
  },

  async getStoreKeywords(advertiserId) {
    try {
      return prisma.$queryRaw<CouponKeywordData[]>(Prisma.sql`
        SELECT DISTINCT category, sub_category, color, gender, material, keywords
        FROM products
        WHERE advertiser_id = ${advertiserId}
          AND in_stock = true
          AND visibility = 'live'
          AND country = 'US'
        LIMIT 200
      `)
    } catch {
      return []
    }
  },

  async getRelatedStores(excludeId) {
    try {
      return prisma.$queryRaw<RelatedStore[]>(Prisma.sql`
        SELECT
          a.advertiser_id,
          a.name,
          a.logo_url,
          ${Prisma.raw(SLUG_EXPR)} AS slug,
          COUNT(p.id)::int AS coupon_count,
          MAX(p.discount_percent) AS best_percent
        FROM advertisers a
        JOIN promotions p ON p.advertiser_id = a.advertiser_id
        WHERE a.is_active = true
          AND a.advertiser_id != ${excludeId}
          AND p.is_active = true
          AND (p.end_date IS NULL OR p.end_date > NOW())
        GROUP BY a.advertiser_id, a.name, a.logo_url
        HAVING COUNT(p.id) > 0
        ORDER BY RANDOM()
        LIMIT 6
      `)
    } catch {
      return []
    }
  },
}
