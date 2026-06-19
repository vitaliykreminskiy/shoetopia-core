import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Fastify from 'fastify'
import type { Redis } from 'ioredis'
import healthRoute from '../health.js'

const queryRaw = vi.fn()

vi.mock('@shoetopia/db', () => ({
  prisma: {
    $queryRaw: (...args: unknown[]) => queryRaw(...args),
  },
}))

const buildApp = async (redis: Pick<Redis, 'ping'> | null) => {
  const app = Fastify()
  app.decorate('redis', redis as Redis | null)
  await app.register(healthRoute)
  await app.ready()
  return app
}

describe('health endpoints', () => {
  beforeEach(() => {
    queryRaw.mockReset()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('GET /health/live returns 200 ok with no auth', async () => {
    const app = await buildApp(null)
    const res = await app.inject({ method: 'GET', url: '/api/health/live' })
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual({ status: 'ok' })
    await app.close()
  })

  it('GET /health returns 200 with all checks up', async () => {
    queryRaw.mockResolvedValue([{ '?column?': 1 }])
    const redis = { ping: vi.fn().mockResolvedValue('PONG') }
    const app = await buildApp(redis)

    const res = await app.inject({ method: 'GET', url: '/api/health' })
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual({
      status: 'ok',
      checks: { database: 'up', redis: 'up' },
    })
    await app.close()
  })

  it('GET /health returns 503 when the database is down', async () => {
    queryRaw.mockRejectedValue(new Error('connection refused'))
    const redis = { ping: vi.fn().mockResolvedValue('PONG') }
    const app = await buildApp(redis)

    const res = await app.inject({ method: 'GET', url: '/api/health' })
    expect(res.statusCode).toBe(503)
    const body = JSON.parse(res.body)
    expect(body.status).toBe('error')
    expect(body.checks.database).toBe('down')
    await app.close()
  })

  it('GET /health returns 200 with redis disabled when unconfigured', async () => {
    queryRaw.mockResolvedValue([{ '?column?': 1 }])
    const app = await buildApp(null)

    const res = await app.inject({ method: 'GET', url: '/api/health' })
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual({
      status: 'ok',
      checks: { database: 'up', redis: 'disabled' },
    })
    await app.close()
  })

  it('does not require Authorization and leaks no sensitive fields', async () => {
    queryRaw.mockRejectedValue(new Error('secret connection string leaked'))
    const app = await buildApp(null)

    const res = await app.inject({ method: 'GET', url: '/api/health' })
    expect(res.statusCode).not.toBe(401)
    const raw = res.body
    expect(raw).not.toContain('secret connection string')
    expect(raw).not.toContain('stack')
    const body = JSON.parse(raw)
    expect(Object.keys(body)).toEqual(['status', 'checks'])
    await app.close()
  })
})
