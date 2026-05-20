import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/dist/queueAdapters/bullMQ.js'
import { FastifyAdapter } from '@bull-board/fastify'
import { feedImportQueue, housekeepingQueue, syncQueue } from '../queues/index.js'
import { requireApiSecret } from './auth.js'

export default fp(async (fastify: FastifyInstance) => {
  const serverAdapter = new FastifyAdapter()

  createBullBoard({
    queues: [
      new BullMQAdapter(feedImportQueue),
      new BullMQAdapter(housekeepingQueue),
      new BullMQAdapter(syncQueue),
    ],
    serverAdapter,
  })

  serverAdapter.setBasePath('/bull')

  // Protect with API secret
  fastify.addHook('onRequest', async (request, reply) => {
    if (request.url.startsWith('/bull')) {
      await requireApiSecret(request, reply)
    }
  })

  await fastify.register(serverAdapter.registerPlugin(), { prefix: '/bull' })
  fastify.log.info('[bull-board] UI available at /bull')
})
