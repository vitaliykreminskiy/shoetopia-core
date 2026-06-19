import type { FastifyPluginAsync, FastifyBaseLogger } from 'fastify'
import { prisma } from '@shoetopia/db'

const PROBE_TIMEOUT_MS = 1000

type CheckStatus = 'up' | 'down' | 'disabled'

// Race a dependency probe against a fixed timeout so a hung socket never hangs
// the health endpoint. Errors and timeouts are logged server-side and surface
// only as a coarse "down" to the client (no stack traces / connection details).
const probe = async (
  name: string,
  log: FastifyBaseLogger,
  fn: () => Promise<void>,
): Promise<CheckStatus> => {
  try {
    await Promise.race([
      fn(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('probe timeout')), PROBE_TIMEOUT_MS),
      ),
    ])
    return 'up'
  } catch (err) {
    log.error({ err, check: name }, `[health] ${name} probe failed`)
    return 'down'
  }
}

const healthRoute: FastifyPluginAsync = async (fastify) => {
  // Liveness: process is up. No dependency probes — cheap, for high-frequency polling.
  fastify.get('/api/health/live', async () => ({ status: 'ok' }))

  // Readiness: probe the public API's runtime dependencies (DB + Redis).
  fastify.get('/api/health', async (_request, reply) => {
    const databaseProbe = probe('database', fastify.log, async () => {
      await prisma.$queryRaw`SELECT 1`
    })

    // Redis is optional — when unconfigured the decorator is null and caching is
    // disabled by design, which must not fail readiness.
    const redisProbe: Promise<CheckStatus> = fastify.redis
      ? probe('redis', fastify.log, async () => {
          await fastify.redis!.ping()
        })
      : Promise.resolve('disabled')

    const [database, redis] = await Promise.all([databaseProbe, redisProbe])

    const checks = { database, redis }
    const healthy = database !== 'down' && redis !== 'down'

    return reply
      .code(healthy ? 200 : 503)
      .send({ status: healthy ? 'ok' : 'error', checks })
  })
}

export default healthRoute
