import { prisma } from '@shoetopia/db'
import type { AdvertisersDAL } from '../../advertiser.js'

export const prismaAdvertisersDal: AdvertisersDAL = {
  async list() {
    try {
      const rows = await prisma.variant.groupBy({
        by: ['advertiserName'],
        where: { advertiserName: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      })
      return rows.map(r => ({ advertiser_name: r.advertiserName!, product_count: r._count.id }))
    } catch {
      return []
    }
  },

  async getRating(advertiserName, fingerprint) {
    const [upvotes, downvotes, total] = await Promise.all([
      prisma.advertiserVote.count({ where: { advertiserName, vote: 'up' } }),
      prisma.advertiserVote.count({ where: { advertiserName, vote: 'down' } }),
      prisma.advertiserVote.count({ where: { advertiserName } }),
    ])

    const healthScore = total > 0 ? Math.round((upvotes / total) * 100) : 50

    let userVote: string | null = null
    if (fingerprint) {
      const existing = await prisma.advertiserVote.findFirst({
        where: { advertiserName, fingerprint },
        select: { vote: true },
      })
      userVote = existing?.vote ?? null
    }

    return { healthScore, upvotes, downvotes, totalVotes: total, userVote }
  },

  async vote(advertiserName, fingerprint, vote) {
    await prisma.advertiserVote.upsert({
      where: { advertiserName_fingerprint: { advertiserName, fingerprint } },
      update: { vote, createdAt: new Date() },
      create: { advertiserName, fingerprint, vote },
    })
  },
}
