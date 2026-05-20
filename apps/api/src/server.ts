import Fastify from 'fastify'
import cors from '@fastify/cors'
import redisPlugin from './plugins/redis.js'
import { registerRoutes } from './routes/index.js'

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
    transport:
      process.env.NODE_ENV === 'development'
        ? { target: 'pino-pretty' }
        : undefined,
  },
})

await server.register(cors, { origin: true })
await server.register(redisPlugin)

server.get('/healthz', async () => ({ ok: true }))

await registerRoutes(server)

const port = Number(process.env.PORT ?? 3001)
await server.listen({ port, host: '0.0.0.0' })
server.log.info(`API listening on port ${port}`)
