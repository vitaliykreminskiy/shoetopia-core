/**
 * Deterministic pseudo-random product ratings.
 * Same product id always produces the same rating — no flicker, no re-renders.
 * Ratings skew realistically based on price tier and brand prestige.
 */

// Mulberry32 — fast seedable PRNG
function mulberry32(seed: number) {
  let s = seed >>> 0
  return () => {
    s += 0x6d2b79f5
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Premium brands that realistically earn more reviews
const HIGH_REVIEW_BRANDS = [
  'nike', 'adidas', 'ugg', 'steve madden', 'sam edelman', 'clarks', 'vans',
  'converse', 'new balance', 'reebok', 'skechers', 'coach', 'michael kors',
  'kate spade', 'tory burch', 'lucky brand', 'naturalizer', 'vionic',
]

// Brands that score slightly higher (quality perception)
const PREMIUM_BRANDS = [
  'ugg', 'tory burch', 'coach', 'kate spade', 'michael kors', 'sam edelman',
  'naturalizer', 'vionic', 'clarks', 'ecco', 'donald pliner', 'born',
]

export interface ProductRating {
  rating: number      // e.g. 4.3
  reviewCount: number // e.g. 847
  stars: number[]     // array of 5 values 0–1 (for partial star rendering)
}

export function getProductRating(
  id: number,
  price?: number | null,
  brand?: string | null
): ProductRating {
  const rand = mulberry32(id * 2654435761)

  const brandLower = (brand || '').toLowerCase()
  const isPremium = PREMIUM_BRANDS.some(b => brandLower.includes(b))
  const isHighReview = HIGH_REVIEW_BRANDS.some(b => brandLower.includes(b))

  // Base rating range: 3.8 – 5.0, skewed by price + brand
  const priceTier = price && price > 150 ? 0.15 : price && price > 80 ? 0.08 : 0
  const brandBonus = isPremium ? 0.12 : 0
  const baseMin = 3.8 + priceTier + brandBonus
  const baseMax = Math.min(5.0, 4.85 + priceTier + brandBonus)

  const rawRating = baseMin + rand() * (baseMax - baseMin)
  // Round to nearest 0.1
  const rating = Math.round(rawRating * 10) / 10

  // Review count: realistic spread
  const reviewBase = isHighReview ? 400 : 40
  const reviewSpread = isHighReview ? 2000 : 600
  const reviewCount = Math.floor(reviewBase + rand() * reviewSpread)

  // Build 5 star fill values (0 = empty, 1 = full, 0.x = partial)
  const stars = Array.from({ length: 5 }, (_, i) => {
    const val = rating - i
    if (val >= 1) return 1
    if (val <= 0) return 0
    return Math.round(val * 10) / 10
  })

  return { rating, reviewCount, stars }
}

export function formatReviewCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
