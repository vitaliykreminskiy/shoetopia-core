import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import productsRoute from '../products.js'

vi.mock('../../dal/index.js', () => ({
  getDataProvider: () => ({
    products: {
      findMany: vi.fn().mockResolvedValue({ products: [], total: 0, nextCursor: null }),
    },
  }),
}))

vi.mock('../../lib/cache.js', () => ({
  cached: vi.fn((_key: string, fn: () => any) => fn()),
  CACHE_TTL: { SHORT: 300, MEDIUM: 900, LONG: 7200 },
}))

vi.mock('../../lib/countries.js', () => ({
  DEFAULT_COUNTRY: 'US',
  isValidCountry: (_c: string) => false,
}))

describe('GET /api/products', () => {
  let app: ReturnType<typeof Fastify>

  beforeAll(async () => {
    app = Fastify()
    await app.register(productsRoute)
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('returns 200 with products shape', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/products' })
    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body)
    expect(body).toMatchObject({ products: [], total: 0 })
  })

  it('accepts query params without erroring', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/products?brand=Nike&page=2&limit=24' })
    expect(res.statusCode).toBe(200)
  })
})
