import { Redis } from 'ioredis'

export const connection = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
})

connection.on('error', (err) => console.error('[bullmq] Redis connection error:', err))
