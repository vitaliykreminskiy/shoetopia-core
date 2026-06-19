import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import productsRoute from '../products.js'
import productSlugRoute from '../product-slug.js'
import categoriesRoute from '../categories.js'
import brandsRoute from '../brands.js'
import couponsRoute from '../coupons.js'

const dal = {
  products: {
    getTrending: vi.fn().mockResolvedValue([{ id: 1 }]),
    getByBrand: vi.fn().mockResolvedValue([{ id: 2 }]),
    getByCategory: vi.fn().mockResolvedValue([{ id: 3 }]),
    getByCategoryAndBrand: vi.fn().mockResolvedValue([{ id: 4 }]),
    getRelated: vi.fn().mockResolvedValue([{ id: 5 }]),
    getDailyFinds: vi.fn().mockResolvedValue([{ id: 6 }]),
    count: vi.fn().mockResolvedValue(42),
    getSitemapProducts: vi.fn().mockResolvedValue([{ id: 7 }]),
    getBrandInfo: vi.fn().mockResolvedValue({ name: 'Nike' }),
    getSizes: vi.fn().mockResolvedValue(['8', '9']),
    getPriceRange: vi.fn().mockResolvedValue({ min: 10, max: 99 }),
    getColorVariants: vi.fn().mockResolvedValue([{ color: 'red' }]),
    findBySlug: vi.fn().mockResolvedValue(null),
    findByPid: vi.fn().mockResolvedValue(null),
  },
  categories: {
    listChildren: vi.fn().mockResolvedValue([{ slug: 'kids' }]),
    findBySlug: vi.fn().mockResolvedValue({ slug: 'mens' }),
  },
  brands: {
    getTopForSitemap: vi.fn().mockResolvedValue([{ name: 'Nike' }]),
  },
  coupons: {
    getRelatedStores: vi.fn().mockResolvedValue([{ id: 1 }]),
    getStoreProducts: vi.fn().mockResolvedValue([{ id: 2 }]),
    getStoreKeywords: vi.fn().mockResolvedValue([{ kw: 'sale' }]),
    findStoreBySlug: vi.fn().mockResolvedValue({ slug: 'nike' }),
    listByAdvertiser: vi.fn().mockResolvedValue([{ id: 3 }]),
  },
}

vi.mock('../../dal/index.js', () => ({ getDataProvider: () => dal }))
vi.mock('../../lib/flexoffers.js', () => ({
  getCoupons: vi.fn().mockResolvedValue([]),
  getPromotions: vi.fn().mockResolvedValue([]),
  getProductById: vi.fn().mockResolvedValue(null),
}))

let app: ReturnType<typeof Fastify>

beforeAll(async () => {
  app = Fastify()
  await app.register(productsRoute)
  await app.register(productSlugRoute)
  await app.register(categoriesRoute)
  await app.register(brandsRoute)
  await app.register(couponsRoute)
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

const get = (url: string) => app.inject({ method: 'GET', url })

describe('product endpoints', () => {
  it('trending', async () => {
    const res = await get('/api/products/trending?limit=10')
    expect(res.statusCode).toBe(200)
    expect(dal.products.getTrending).toHaveBeenCalledWith(10)
  })

  it('by-brand', async () => {
    const res = await get('/api/products/by-brand?brand=Nike&gender=mens&limit=12')
    expect(res.statusCode).toBe(200)
    expect(dal.products.getByBrand).toHaveBeenCalledWith('Nike', 'mens', 12)
  })

  it('by-category-brand', async () => {
    const res = await get('/api/products/by-category-brand?brand=Nike&category=running&gender=womens&limit=5')
    expect(res.statusCode).toBe(200)
    expect(dal.products.getByCategoryAndBrand).toHaveBeenCalledWith('Nike', 'running', 'womens', 5)
  })

  it('related', async () => {
    const res = await get('/api/products/related?category=running&gender=mens&country=US&excludeId=99&limit=8')
    expect(res.statusCode).toBe(200)
    expect(dal.products.getRelated).toHaveBeenCalledWith({ category: 'running', gender: 'mens', country: 'US', excludeId: 99, limit: 8 })
  })

  it('count returns { count }', async () => {
    const res = await get('/api/products/count?country=US&gender=mens&onSale=true')
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual({ count: 42 })
    expect(dal.products.count).toHaveBeenCalledWith({ country: 'US', gender: 'mens', onSale: true })
  })

  it('sizes by numeric id', async () => {
    const res = await get('/api/products/123/sizes')
    expect(res.statusCode).toBe(200)
    expect(dal.products.getSizes).toHaveBeenCalledWith(123)
  })

  it('brand-info 404 when null', async () => {
    dal.products.getBrandInfo.mockResolvedValueOnce(null)
    const res = await get('/api/products/brand-info?brand=Ghost')
    expect(res.statusCode).toBe(404)
  })
})

describe('category endpoints', () => {
  it('children', async () => {
    const res = await get('/api/categories/children?parentSlug=mens&minProductCount=5')
    expect(res.statusCode).toBe(200)
    expect(dal.categories.listChildren).toHaveBeenCalledWith('mens', 5)
  })

  it('by-slug', async () => {
    const res = await get('/api/categories/by-slug/mens')
    expect(res.statusCode).toBe(200)
    expect(dal.categories.findBySlug).toHaveBeenCalledWith('mens')
  })

  it('by-slug 404', async () => {
    dal.categories.findBySlug.mockResolvedValueOnce(null)
    const res = await get('/api/categories/by-slug/nope')
    expect(res.statusCode).toBe(404)
  })
})

describe('brand endpoints', () => {
  it('sitemap', async () => {
    const res = await get('/api/brands/sitemap?minCount=10')
    expect(res.statusCode).toBe(200)
    expect(dal.brands.getTopForSitemap).toHaveBeenCalledWith(10)
  })
})

describe('coupon endpoints', () => {
  it('by-advertiser', async () => {
    const res = await get('/api/coupons/by-advertiser/42')
    expect(res.statusCode).toBe(200)
    expect(dal.coupons.listByAdvertiser).toHaveBeenCalledWith(42)
  })

  it('store products', async () => {
    const res = await get('/api/coupons/stores/42/products')
    expect(res.statusCode).toBe(200)
    expect(dal.coupons.getStoreProducts).toHaveBeenCalledWith(42)
  })

  it('store by slug', async () => {
    const res = await get('/api/coupons/stores/nike')
    expect(res.statusCode).toBe(200)
    expect(dal.coupons.findStoreBySlug).toHaveBeenCalledWith('nike')
  })
})

describe('validation', () => {
  it('missing required param → 400', async () => {
    const res = await get('/api/products/by-brand?gender=mens')
    expect(res.statusCode).toBe(400)
  })

  it('invalid gender → 400', async () => {
    const res = await get('/api/products/by-brand?brand=Nike&gender=unisex')
    expect(res.statusCode).toBe(400)
  })

  it('non-numeric id → 400', async () => {
    const res = await get('/api/products/abc/sizes')
    expect(res.statusCode).toBe(400)
  })

  it('missing required numeric → 400', async () => {
    const res = await get('/api/coupons/stores/related')
    expect(res.statusCode).toBe(400)
  })
})

describe('route collisions (static beats param)', () => {
  it('/api/products/trending hits trending, not :slug', async () => {
    await get('/api/products/trending?limit=3')
    expect(dal.products.getTrending).toHaveBeenCalled()
    expect(dal.products.findBySlug).not.toHaveBeenCalledWith('trending')
  })

  it('/api/coupons/stores/related hits related, not findStoreBySlug', async () => {
    await get('/api/coupons/stores/related?excludeId=1')
    expect(dal.coupons.getRelatedStores).toHaveBeenCalled()
    expect(dal.coupons.findStoreBySlug).not.toHaveBeenCalledWith('related')
  })
})
