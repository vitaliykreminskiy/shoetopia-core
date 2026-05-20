import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { prisma, Prisma } from '@shoetopia/db'
import { normalizeProductName, generateParentSlug } from '../../lib/normalize.js'
import { upsertGroups, wireGroupIds, regroupStep, hideProducts } from '../../lib/shared-steps.js'
import { FEEDS } from '../../lib/feeds.js'

const BATCH_SIZE = 500

const renormalizeRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/renormalize', { preHandler: requireApiSecret }, async (_request, reply) => {
    return reply.send({
      usage: 'POST /api/admin/renormalize',
      body: {
        programId: 'optional — scope phases 1 and 1b to one feed',
        preview: 'optional bool — dry run: shows before/after sample without any writes',
        phase: 'optional "1" | "1b" | "2" — run a single phase only (default: run all)',
      },
      feeds: FEEDS.map(f => ({ id: f.id, name: f.name, country: f.country })),
    })
  })

  fastify.post<{
    Body: { programId?: number; preview?: boolean; phase?: '1' | '1b' | '2' }
  }>('/api/admin/renormalize', { preHandler: requireApiSecret }, async (request, reply) => {
    const started = Date.now()
    const { programId, preview = false, phase } = request.body ?? {}
    const feed = programId != null ? FEEDS.find(f => f.id === programId) ?? null : null

    try {
      // PREVIEW MODE
      if (preview) {
        const sampleRows = await prisma.$queryRaw<{ id: number; name: string; parent_slug: string }[]>(
          programId != null
            ? Prisma.sql`SELECT id, name, parent_slug FROM variants WHERE program_id = ${programId} ORDER BY id LIMIT 2000`
            : Prisma.sql`SELECT id, name, parent_slug FROM variants ORDER BY id LIMIT 2000`
        )

        const computed = sampleRows.map(r => {
          const newSlug = generateParentSlug(r.name)
          const newName = normalizeProductName(r.name)
          return {
            name: r.name,
            normalizedName: newName,
            currentSlug: r.parent_slug ?? '',
            newSlug,
            wouldChange: (r.parent_slug ?? '') !== newSlug,
          }
        })

        const totalCount = await prisma.$queryRaw<{ count: bigint }[]>(
          programId != null
            ? Prisma.sql`SELECT COUNT(*) AS count FROM variants WHERE program_id = ${programId}`
            : Prisma.sql`SELECT COUNT(*) AS count FROM variants`
        )

        const currentGroups = new Set(sampleRows.map(r => r.parent_slug ?? '')).size
        const newGroups = new Set(computed.map(r => r.newSlug)).size
        const wouldChange = computed.filter(r => r.wouldChange)

        return reply.send({
          preview: true,
          feed: feed ? { id: feed.id, name: feed.name } : 'all feeds',
          totalVariants: Number(totalCount[0]?.count ?? 0),
          sampledVariants: sampleRows.length,
          wouldUpdate: wouldChange.length,
          currentGroupsInSample: currentGroups,
          newGroupsInSample: newGroups,
          groupReduction: currentGroups - newGroups,
          sample: wouldChange.slice(0, 25).map(r => ({
            original: r.name,
            cleanTitle: r.normalizedName,
            oldSlug: r.currentSlug,
            newSlug: r.newSlug,
          })),
        })
      }

      // PHASE 1: Re-normalize variant names
      let phase1 = null
      if (!phase || phase === '1') {
        let offset = 0
        let totalVariants = 0
        let totalUpdated = 0

        while (true) {
          const rows = await prisma.$queryRaw<{ id: number; name: string }[]>(
            programId != null
              ? Prisma.sql`SELECT id, name FROM variants WHERE program_id = ${programId} ORDER BY id LIMIT ${BATCH_SIZE} OFFSET ${offset}`
              : Prisma.sql`SELECT id, name FROM variants ORDER BY id LIMIT ${BATCH_SIZE} OFFSET ${offset}`
          )

          if (rows.length === 0) break

          const updates = rows.map(r => ({
            id: r.id,
            normalized_name: normalizeProductName(r.name),
            parent_slug: generateParentSlug(r.name),
          }))

          const valuesSql = Prisma.join(
            updates.map(u => Prisma.sql`(${u.id}, ${u.normalized_name}, ${u.parent_slug})`)
          )

          const updated = await prisma.$executeRaw(Prisma.sql`
            UPDATE variants
            SET normalized_name = v.nn,
                parent_slug     = v.ps,
                updated_at      = NOW()
            FROM (VALUES ${valuesSql}) AS v(id, nn, ps)
            WHERE variants.id = v.id::int
              AND (
                variants.normalized_name IS DISTINCT FROM v.nn
                OR variants.parent_slug   IS DISTINCT FROM v.ps
              )
          `)

          totalVariants += rows.length
          totalUpdated += updated
          if (rows.length < BATCH_SIZE) break
          offset += BATCH_SIZE
        }

        phase1 = { totalVariants, totalUpdated }
        fastify.log.info(`[renormalize] Phase 1 done (${feed?.name ?? 'all'}): ${totalVariants} scanned, ${totalUpdated} updated`)
      }

      // PHASE 1b: Recalculate is_on_sale + discount_pct
      let phase1b = null
      if (!phase || phase === '1b') {
        const saleFixed = programId != null
          ? await prisma.$executeRaw(Prisma.sql`
              UPDATE variants
              SET
                is_on_sale   = (price IS NOT NULL AND price > 0 AND final_price IS NOT NULL AND final_price > 0 AND final_price < price),
                discount_pct = CASE WHEN price > 0 AND final_price > 0 AND final_price < price
                                 THEN ROUND(((price - final_price) / price) * 100)::int ELSE 0 END,
                updated_at   = NOW()
              WHERE program_id = ${programId}
            `)
          : await prisma.$executeRaw(Prisma.sql`
              UPDATE variants
              SET
                is_on_sale   = (price IS NOT NULL AND price > 0 AND final_price IS NOT NULL AND final_price > 0 AND final_price < price),
                discount_pct = CASE WHEN price > 0 AND final_price > 0 AND final_price < price
                                 THEN ROUND(((price - final_price) / price) * 100)::int ELSE 0 END,
                updated_at   = NOW()
            `)

        phase1b = { saleFixed }
        fastify.log.info(`[renormalize] Phase 1b done (${feed?.name ?? 'all'}): ${saleFixed} rows recalculated`)
      }

      // PHASE 2: Rebuild product groups
      let phase2 = null
      if (!phase || phase === '2') {
        const since = (programId != null && phase !== '2')
          ? new Date(started).toISOString()
          : undefined
        const groupsUpserted = await upsertGroups(since)
        const wired = await wireGroupIds(since)
        const regrouped = await regroupStep(since)
        const hidden = await hideProducts()
        phase2 = { groupsUpserted, wired, regrouped, hidden, scoped: since != null }
        fastify.log.info(`[renormalize] Phase 2 done (${since ? 'scoped since ' + since : 'global'}): ${groupsUpserted} groups, ${hidden} hidden`)
      }

      return reply.send({
        success: true,
        feed: feed ? { id: feed.id, name: feed.name } : 'all',
        durationMs: Date.now() - started,
        ...(phase1 && { phase1 }),
        ...(phase1b && { phase1b }),
        ...(phase2 && { phase2 }),
      })
    } catch (err: any) {
      fastify.log.error({ err }, '[renormalize] Error')
      return reply.code(500).send({ success: false, error: err.message })
    }
  })
}

export default renormalizeRoute
