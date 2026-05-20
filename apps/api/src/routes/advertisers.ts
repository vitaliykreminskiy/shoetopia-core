import type { FastifyPluginAsync } from 'fastify'
import { getDataProvider } from '../dal/index.js'

const advertisersRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/advertisers — list all advertisers
  fastify.get('/api/advertisers', async (request, reply) => {
    try {
      const dal = getDataProvider()
      const rows = await dal.advertisers.list()
      return reply.send(rows)
    } catch (e: any) {
      return reply.code(500).send({ error: e.message })
    }
  })

  // GET /api/advertiser-rating — get rating for an advertiser
  fastify.get<{
    Querystring: { name?: string; fp?: string }
  }>('/api/advertiser-rating', async (request, reply) => {
    const advertiserName = request.query.name
    const fingerprint = request.query.fp ?? undefined

    if (!advertiserName) {
      return reply.code(400).send({ error: 'Advertiser name required' })
    }

    try {
      const dal = getDataProvider()
      const rating = await dal.advertisers.getRating(advertiserName, fingerprint)
      return reply.send(rating)
    } catch (error) {
      fastify.log.error({ error }, '[advertiser-rating] GET error')
      return reply.send({ healthScore: 50, upvotes: 0, downvotes: 0, totalVotes: 0, userVote: null })
    }
  })

  // POST /api/advertiser-rating — submit a vote
  fastify.post<{
    Body: { advertiserName?: string; vote?: string; fingerprint?: string }
  }>('/api/advertiser-rating', async (request, reply) => {
    try {
      const { advertiserName, vote, fingerprint } = request.body ?? {}

      if (!advertiserName || !vote || !fingerprint) {
        return reply.code(400).send({ error: 'Missing required fields' })
      }
      if (vote !== 'up' && vote !== 'down') {
        return reply.code(400).send({ error: 'Vote must be up or down' })
      }

      const dal = getDataProvider()
      await dal.advertisers.vote(advertiserName, fingerprint, vote)
      return reply.send({ success: true })
    } catch (error) {
      fastify.log.error({ error }, '[advertiser-rating] POST error')
      return reply.code(500).send({ error: 'Failed to submit vote' })
    }
  })
}

export default advertisersRoute
