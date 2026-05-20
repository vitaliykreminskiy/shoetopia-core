import { prisma } from '@shoetopia/db'
import type { DealsDAL } from '../../deal.js'

export const prismaDealsDal: DealsDAL = {
  async getHealth(productSlug) {
    const [working, issues, unavailable, total] = await Promise.all([
      prisma.dealHealthVote.count({ where: { productSlug, vote: 'working' } }),
      prisma.dealHealthVote.count({ where: { productSlug, vote: 'issue' } }),
      prisma.dealHealthVote.count({ where: { productSlug, vote: 'unavailable' } }),
      prisma.dealHealthVote.count({ where: { productSlug } }),
    ])

    const healthScore = total > 0
      ? Math.round(((working * 1) + (issues * 0.5)) / total * 100)
      : 100

    return { working, issues, unavailable, total, healthScore }
  },

  async recordHealthVote(productSlug, vote, fingerprint) {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recentVote = await prisma.dealHealthVote.findFirst({
      where: { productSlug, fingerprint, createdAt: { gt: cutoff } },
      select: { id: true },
    })

    if (recentVote) return { alreadyVoted: true }

    await prisma.dealHealthVote.create({ data: { productSlug, vote, fingerprint } })
    return { alreadyVoted: false }
  },
}
