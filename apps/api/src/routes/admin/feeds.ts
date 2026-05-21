import type { FastifyPluginAsync } from 'fastify'
import { requireApiSecret } from '../../plugins/auth.js'
import { prisma, Prisma } from '@shoetopia/db'

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

const feedsAdminRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/admin/import-feeds', { preHandler: requireApiSecret }, async (_request, reply) => {
    try {
      const [feeds, stats] = await Promise.all([
        prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT
            f.*,
            COALESCE(v.product_count, 0)::int    AS product_count,
            COALESCE(v.live_count, 0)::int        AS live_count,
            COALESCE(v.in_stock_count, 0)::int    AS in_stock_count
          FROM feeds f
          LEFT JOIN (
            SELECT
              program_id,
              COUNT(*)::int                                              AS product_count,
              COUNT(CASE WHEN visibility = 'live' THEN 1 END)::int      AS live_count,
              COUNT(CASE WHEN in_stock = true THEN 1 END)::int          AS in_stock_count
            FROM variants
            GROUP BY program_id
          ) v ON v.program_id = f.program_id
          WHERE f.is_active = true
          ORDER BY f.last_imported_at ASC NULLS FIRST, f.total_products DESC
        `),
        prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT
            COUNT(*) as total_feeds,
            COUNT(*) FILTER (WHERE last_imported_at IS NOT NULL) as processed_feeds,
            COUNT(*) FILTER (WHERE last_imported_at IS NULL) as pending_feeds,
            COUNT(*) FILTER (WHERE status = 'ready') as ready_feeds,
            COUNT(*) FILTER (WHERE country = 'US') as us_feeds,
            SUM(total_products)::bigint as total_available_products,
            SUM(products_imported)::bigint as total_imported_products
          FROM feeds
          WHERE is_active = true
        `),
      ])

      return reply.send({ feeds, stats: stats[0] })
    } catch (error: any) {
      fastify.log.error({ error }, '[GetFeeds] Error')
      return reply.code(500).send({ error: error instanceof Error ? error.message : 'Failed to get feeds' })
    }
  })

  fastify.post<{ Body: unknown }>(
    '/api/admin/import-feeds',
    { preHandler: requireApiSecret },
    async (request, reply) => {
      try {
        // Multipart form data handling — body is raw text from CSV upload
        // For now, expect JSON body with csvText field as a simple approach
        const body = request.body as any
        const text: string = body?.csvText ?? ''

        if (!text) {
          return reply.code(400).send({ error: 'No CSV text provided (send { csvText: "..." })' })
        }

        const lines = text.split('\n').filter((line: string) => line.trim())

        if (lines.length < 2) {
          return reply.code(400).send({ error: 'CSV file is empty or invalid' })
        }

        const header = lines[0].split(',').map((h: string) => h.trim().replace(/"/g, ''))

        const colIndex = {
          programId: header.findIndex((h: string) => h === 'Id' || h === 'ProgramId' || h === 'program_id'),
          programName: header.findIndex((h: string) => h === 'ProgramName' || h === 'Advertiser' || h === 'program_name'),
          catalogId: header.findIndex((h: string) => h === 'CatalogID' || h === 'catalog_id'),
          catalogName: header.findIndex((h: string) => h === 'CatalogName' || h === 'catalog_name'),
          httpsLink: header.findIndex((h: string) => h === 'HTTPSLink' || h === 'https_link' || h === 'HttpsLink'),
          country: header.findIndex((h: string) => h === 'Country' || h === 'country'),
          totalProducts: header.findIndex((h: string) => h === 'TotalProducts' || h === 'total_products' || h === 'Count'),
          status: header.findIndex((h: string) => h === 'Status' || h === 'status'),
          updated: header.findIndex((h: string) => h === 'Updated' || h === 'updated' || h === 'LastUpdated'),
        }

        if (colIndex.programId === -1 || colIndex.programName === -1) {
          return reply.code(400).send({
            error: 'CSV must have Id/ProgramId and ProgramName/Advertiser columns',
            foundColumns: header,
          })
        }

        let imported = 0
        let updated = 0
        const errors: string[] = []

        for (let i = 1; i < lines.length; i++) {
          try {
            const row = parseCSVLine(lines[i])
            if (row.length < 2) continue

            const programId = parseInt(row[colIndex.programId] || '0')
            if (!programId) continue

            const programName = row[colIndex.programName]?.replace(/"/g, '').trim() || ''
            const catalogId = colIndex.catalogId >= 0 ? row[colIndex.catalogId]?.replace(/"/g, '').trim() || null : null
            const catalogName = colIndex.catalogName >= 0 ? row[colIndex.catalogName]?.replace(/"/g, '').trim() || null : null
            const httpsLink = colIndex.httpsLink >= 0 ? row[colIndex.httpsLink]?.replace(/"/g, '').trim() || null : null
            const country = colIndex.country >= 0 ? row[colIndex.country]?.replace(/"/g, '').trim() || 'US' : 'US'
            const totalProducts = colIndex.totalProducts >= 0 ? parseInt(row[colIndex.totalProducts] || '0') : 0
            const status = colIndex.status >= 0 ? row[colIndex.status]?.replace(/"/g, '').trim().toLowerCase() : 'pending'
            const sourceUpdated = colIndex.updated >= 0 ? row[colIndex.updated]?.replace(/"/g, '').trim() : null

            let sourceUpdatedAt: Date | null = null
            if (sourceUpdated) {
              try {
                const d = new Date(sourceUpdated)
                if (!isNaN(d.getTime())) sourceUpdatedAt = d
              } catch {
                /* ignore */
              }
            }

            const dbStatus = status === 'approved' ? 'ready' : 'pending'

            const result = await prisma.$queryRaw<{ is_insert: boolean }[]>(Prisma.sql`
              INSERT INTO feeds (
                program_id, program_name, catalog_id, catalog_name,
                https_link, country, total_products, status, source_updated_at
              ) VALUES (
                ${programId}, ${programName}, ${catalogId}, ${catalogName},
                ${httpsLink}, ${country}, ${totalProducts}, ${dbStatus}, ${sourceUpdatedAt}
              )
              ON CONFLICT (program_id) DO UPDATE SET
                program_name = EXCLUDED.program_name,
                catalog_id = EXCLUDED.catalog_id,
                catalog_name = EXCLUDED.catalog_name,
                https_link = EXCLUDED.https_link,
                country = EXCLUDED.country,
                total_products = EXCLUDED.total_products,
                status = CASE
                  WHEN feeds.last_imported_at IS NOT NULL THEN feeds.status
                  ELSE EXCLUDED.status
                END,
                source_updated_at = EXCLUDED.source_updated_at,
                updated_at = NOW()
              RETURNING (xmax = 0) AS is_insert
            `)

            if (result[0]?.is_insert) {
              imported++
            } else {
              updated++
            }
          } catch (err) {
            errors.push(`Row ${i + 1}: ${err instanceof Error ? err.message : 'Unknown error'}`)
          }
        }

        const stats = await prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT
            COUNT(*) as total_feeds,
            COUNT(*) FILTER (WHERE last_imported_at IS NOT NULL) as processed_feeds,
            COUNT(*) FILTER (WHERE last_imported_at IS NULL) as pending_feeds,
            SUM(total_products) as total_available_products,
            SUM(products_imported) as total_imported_products
          FROM feeds
          WHERE is_active = true
        `)

        return reply.send({
          success: true,
          imported,
          updated,
          errors: errors.slice(0, 10),
          stats: stats[0],
        })
      } catch (error: any) {
        fastify.log.error({ error }, '[ImportFeeds] Error')
        return reply.code(500).send({ error: error instanceof Error ? error.message : 'Failed to import feeds' })
      }
    }
  )
}

export default feedsAdminRoute
