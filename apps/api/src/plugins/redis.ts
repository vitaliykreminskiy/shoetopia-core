import fp from 'fastify-plugin'
import { Redis } from 'ioredis'
import type { FastifyInstance } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis | null
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const redis: Redis | null = process.env.REDIS_URL
    ? new Redis(process.env.REDIS_URL)
    : null

  if (redis) {
    redis.on('error', (err: Error) => fastify.log.error({ err }, '[redis] connection error'))
    fastify.log.info('[redis] connected')
  } else {
    fastify.log.warn('[redis] REDIS_URL not set — caching disabled')
  }

  fastify.decorate('redis', redis)

  fastify.addHook('onClose', async () => {
    if (redis) await redis.quit()
  })
})
