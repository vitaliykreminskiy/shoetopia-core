import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { Redis } from 'ioredis'

let redis: Redis | null = null
if (process.env.REDIS_URL) {
  try {
    redis = new Redis(process.env.REDIS_URL)
  } catch {
    // Redis optional
  }
}

async function clearCache(): Promise<{ success: boolean; cleared: number; error?: string; message?: string }> {
  if (!redis) {
    return { success: false, cleared: 0, error: 'Redis not configured' }
  }

  const patterns = ['products:*', 'category:*', 'brand:*', 'home:*', 'homepage:*', 'hero:*']
  let cleared = 0

  for (const pattern of patterns) {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
      cleared += keys.length
    }
  }

  return { success: true, cleared, message: `Cleared ${cleared} cache keys` }
}

const clearCacheRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/admin/clear-cache', { preHandler: requireApiSecret }, async (_request, reply) => {
    try {
      const result = await clearCache()
      return reply.code(result.success ? 200 : 500).send(result)
    } catch (error: any) {
      fastify.log.error({ error }, '[cache] Clear error')
      return reply.code(500).send({ success: false, error: error.message })
    }
  })

  fastify.get('/api/admin/clear-cache', { preHandler: requireApiSecret }, async (_request, reply) => {
    try {
      const result = await clearCache()
      return reply.send(result)
    } catch (error: any) {
      fastify.log.error({ error }, '[cache] Clear error')
      return reply.code(500).send({ success: false, error: error.message })
    }
  })
}

export default clearCacheRoute
