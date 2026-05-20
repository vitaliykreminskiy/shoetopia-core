import type { FastifyPluginAsync } from 'fastify'
import { getDataProvider } from '../dal/index.js'

const shoeFinderRoute: FastifyPluginAsync = async (fastify) => {
  // POST /api/shoe-finder — find shoes by occasion and preferences
  fastify.post<{
    Body: { gender?: string; occasion?: string; priceRange?: string }
  }>('/api/shoe-finder', async (request, reply) => {
    try {
      const { gender, occasion, priceRange } = request.body ?? {}

      const genderMap: Record<string, string> = { women: 'womens', men: 'mens', 'non-binary': 'unisex' }
      const dbGender = genderMap[gender ?? ''] || 'womens'
      const priceRanges: Record<string, [number, number]> = {
        budget: [0, 50], moderate: [50, 100], quality: [100, 200], luxury: [200, 10000],
      }
      const [minPrice, maxPrice] = priceRanges[priceRange ?? ''] || [0, 10000]

      const dal = getDataProvider()
      const rows = await dal.products.findByOccasion({ gender: dbGender, occasion: occasion ?? '', minPrice, maxPrice })

      const sorted = [...rows].sort((a, b) => (Number(b.discount_pct) || 0) - (Number(a.discount_pct) || 0))
      const seen = new Set<string>()
      const unique = sorted.filter(r => {
        if (seen.has(r.parent_slug)) return false
        seen.add(r.parent_slug)
        return true
      })

      return reply.send({
        perfectMatch: unique[0] || null,
        recommendations: unique.slice(0, 8),
        total: unique.length,
      })
    } catch (error) {
      fastify.log.error({ error }, '[shoe-finder] Error')
      return reply.code(500).send({ error: 'Failed to find shoes' })
    }
  })
}

export default shoeFinderRoute
