import { prisma, Prisma } from '@shoetopia/db'

/**
 * Shared step functions used by pipeline workflows.
 * Plain async functions — no workflow SDK references.
 */

export type WorkflowLog = {
  ts: number
  level: 'info' | 'warn' | 'error'
  step: string
  store?: string
  msg: string
  meta?: Record<string, unknown>
}

/** No-op outside workflow context. */
export async function writeStepLog(_entry: WorkflowLog): Promise<void> {
  // no-op in plain API context
}

export async function normalizeProductIds(programId?: number): Promise<number> {
  const tag = programId ? `program ${programId}` : 'all'
  console.log(`[step] normalizeProductIds: start (${tag})`)
  const count = await prisma.$executeRaw(
    programId != null
      ? Prisma.sql`
          UPDATE variants p
          SET product_id = REPLACE(p.product_id, ' ', ''), updated_at = NOW()
          WHERE p.product_id LIKE '% %'
            AND p.program_id = ${programId}
            AND NOT EXISTS (
              SELECT 1 FROM variants other
              WHERE other.program_id = p.program_id
                AND other.product_id = REPLACE(p.product_id, ' ', '')
                AND other.id != p.id
            )`
      : Prisma.sql`
          UPDATE variants p
          SET product_id = REPLACE(p.product_id, ' ', ''), updated_at = NOW()
          WHERE p.product_id LIKE '% %'
            AND NOT EXISTS (
              SELECT 1 FROM variants other
              WHERE other.program_id = p.program_id
                AND other.product_id = REPLACE(p.product_id, ' ', '')
                AND other.id != p.id
            )`
  )
  console.log(`[step] normalizeProductIds: done (${tag}), ${count} rows updated`)
  return count
}

export async function fixGenderNewProducts(runStartedAt: string, programId?: number): Promise<number> {
  const tag = programId ? `program ${programId}` : 'all'
  console.log(`[step] fixGenderNewProducts: start (${tag})`)

  if (programId != null) {
    await prisma.$executeRaw(Prisma.sql`UPDATE variants SET gender = 'womens', updated_at = NOW() WHERE gender = 'women'  AND created_at >= ${runStartedAt} AND program_id = ${programId}`)
    await prisma.$executeRaw(Prisma.sql`UPDATE variants SET gender = 'mens',   updated_at = NOW() WHERE gender = 'men'    AND created_at >= ${runStartedAt} AND program_id = ${programId}`)
    await prisma.$executeRaw(Prisma.sql`UPDATE variants SET gender = 'kids',   updated_at = NOW() WHERE gender = 'infant' AND created_at >= ${runStartedAt} AND program_id = ${programId}`)
  } else {
    await prisma.$executeRaw(Prisma.sql`UPDATE variants SET gender = 'womens', updated_at = NOW() WHERE gender = 'women'  AND created_at >= ${runStartedAt}`)
    await prisma.$executeRaw(Prisma.sql`UPDATE variants SET gender = 'mens',   updated_at = NOW() WHERE gender = 'men'    AND created_at >= ${runStartedAt}`)
    await prisma.$executeRaw(Prisma.sql`UPDATE variants SET gender = 'kids',   updated_at = NOW() WHERE gender = 'infant' AND created_at >= ${runStartedAt}`)
  }

  const scopeFilter = programId != null
    ? Prisma.sql`AND program_id = ${programId}`
    : Prisma.sql``

  const kids = await prisma.$queryRaw<{ id: number }[]>(Prisma.sql`
    UPDATE variants SET gender = 'kids', updated_at = NOW()
    WHERE created_at >= ${runStartedAt} AND gender != 'kids'
      ${scopeFilter}
      AND (
        name ILIKE '%kids%' OR name ILIKE '%kid''s%' OR name ILIKE '%boys%' OR name ILIKE '%boy''s%'
        OR name ILIKE '%girls%' OR name ILIKE '%girl''s%' OR name ILIKE '%infant%'
        OR name ILIKE '%toddler%' OR name ILIKE '%youth%' OR name ILIKE '%junior%'
      )
    RETURNING id
  `)

  const womens = await prisma.$queryRaw<{ id: number }[]>(Prisma.sql`
    UPDATE variants SET gender = 'womens', updated_at = NOW()
    WHERE created_at >= ${runStartedAt} AND gender = 'mens'
      ${scopeFilter}
      AND (name ~* '\ywomen''?s\y' OR name ~* '\ywomens\y' OR name ILIKE '%ladies%')
      AND NOT (name ILIKE '%kids%' OR name ILIKE '%boys%' OR name ILIKE '%girls%')
    RETURNING id
  `)

  const mens = await prisma.$queryRaw<{ id: number }[]>(Prisma.sql`
    UPDATE variants SET gender = 'mens', updated_at = NOW()
    WHERE created_at >= ${runStartedAt} AND gender = 'womens'
      ${scopeFilter}
      AND (name ~* '\yman''?s\y' OR name ~* '\ymens\y')
      AND NOT (name ~* '\ywomen''?s\y' OR name ~* '\ywomens\y' OR name ILIKE '%ladies%')
      AND NOT (name ILIKE '%kids%' OR name ILIKE '%boys%' OR name ILIKE '%girls%')
    RETURNING id
  `)

  const total = kids.length + womens.length + mens.length
  console.log(`[step] fixGenderNewProducts: done (${tag}), ${total} fixed`)
  return total
}

export async function promoteProducts(programId?: number): Promise<number> {
  const tag = programId ? `program ${programId}` : 'all'
  console.log(`[step] promoteProducts: start (${tag})`)
  const promoted = await prisma.$executeRaw(
    programId != null
      ? Prisma.sql`
          UPDATE variants SET visibility = 'live', updated_at = NOW()
          WHERE visibility = 'pending'
            AND program_id = ${programId}
            AND in_stock = true
            AND image_url IS NOT NULL AND image_url LIKE 'http%'
            AND final_price > 0
            AND url IS NOT NULL AND url != ''`
      : Prisma.sql`
          UPDATE variants SET visibility = 'live', updated_at = NOW()
          WHERE visibility = 'pending'
            AND in_stock = true
            AND image_url IS NOT NULL AND image_url LIKE 'http%'
            AND final_price > 0
            AND url IS NOT NULL AND url != ''`
  )
  console.log(`[step] promoteProducts: done (${tag}), ${promoted} promoted`)
  return promoted
}

export async function upsertGroups(since?: string): Promise<number> {
  const tag = since ? `scoped since ${since}` : 'full'
  console.log(`[step] upsertGroups: start (${tag})`)
  const result = await prisma.$executeRaw(
    since
      ? Prisma.sql`
          INSERT INTO products (slug, name, normalized_name, brand, gender, category, sub_category, country, region, visibility, created_at)
          SELECT DISTINCT ON (parent_slug)
            parent_slug AS slug,
            name, normalized_name, brand,
            gender, category, sub_category, country, region,
            CASE WHEN visibility = 'live' THEN 'live' ELSE 'pending' END,
            MIN(created_at) OVER (PARTITION BY parent_slug)
          FROM variants
          WHERE parent_slug IS NOT NULL AND parent_slug != ''
            AND updated_at >= ${since}
          ORDER BY parent_slug,
            (CASE WHEN in_stock THEN 0 ELSE 1 END),
            (CASE WHEN image_url IS NOT NULL AND image_url LIKE 'http%' THEN 0 ELSE 1 END),
            COALESCE(discount_pct, 0) DESC,
            created_at DESC NULLS LAST
          ON CONFLICT (slug) DO UPDATE SET
            name            = EXCLUDED.name,
            normalized_name = EXCLUDED.normalized_name,
            brand           = EXCLUDED.brand,
            gender          = EXCLUDED.gender,
            category        = EXCLUDED.category,
            sub_category    = EXCLUDED.sub_category,
            country         = EXCLUDED.country,
            region          = EXCLUDED.region,
            updated_at      = NOW()`
      : Prisma.sql`
          INSERT INTO products (slug, name, normalized_name, brand, gender, category, sub_category, country, region, visibility, created_at)
          SELECT DISTINCT ON (parent_slug)
            parent_slug AS slug,
            name, normalized_name, brand,
            gender, category, sub_category, country, region,
            CASE WHEN visibility = 'live' THEN 'live' ELSE 'pending' END,
            MIN(created_at) OVER (PARTITION BY parent_slug)
          FROM variants
          WHERE parent_slug IS NOT NULL AND parent_slug != ''
          ORDER BY parent_slug,
            (CASE WHEN in_stock THEN 0 ELSE 1 END),
            (CASE WHEN image_url IS NOT NULL AND image_url LIKE 'http%' THEN 0 ELSE 1 END),
            COALESCE(discount_pct, 0) DESC,
            created_at DESC NULLS LAST
          ON CONFLICT (slug) DO UPDATE SET
            name            = EXCLUDED.name,
            normalized_name = EXCLUDED.normalized_name,
            brand           = EXCLUDED.brand,
            gender          = EXCLUDED.gender,
            category        = EXCLUDED.category,
            sub_category    = EXCLUDED.sub_category,
            updated_at      = NOW()`
  )
  console.log(`[step] upsertGroups: done (${tag}), ${result} groups upserted`)
  return result
}

export async function wireGroupIds(since?: string): Promise<number> {
  const tag = since ? `scoped since ${since}` : 'full'
  console.log(`[step] wireGroupIds: start (${tag})`)

  const scopeFilter = since
    ? Prisma.sql`AND variants.updated_at >= ${since}`
    : Prisma.sql``

  const grouped = await prisma.$executeRaw(Prisma.sql`
    UPDATE variants SET group_id = p.id, updated_at = NOW()
    FROM products p
    WHERE variants.group_id IS NULL
      AND variants.parent_slug IS NOT NULL AND variants.parent_slug != ''
      AND variants.parent_slug = p.slug
      ${scopeFilter}
  `)

  const standalone = await prisma.$executeRaw(Prisma.sql`
    UPDATE variants SET group_id = p.id, updated_at = NOW()
    FROM products p
    WHERE variants.group_id IS NULL
      AND (variants.parent_slug IS NULL OR variants.parent_slug = '')
      AND p.slug = COALESCE(NULLIF(variants.variant_slug, ''), variants.program_id::text || '-' || variants.product_id)
      ${scopeFilter}
  `)

  const total = grouped + standalone
  console.log(`[step] wireGroupIds: done (${tag}), ${total} wired (${grouped} grouped, ${standalone} standalone)`)
  return total
}

export async function regroupStep(since?: string): Promise<number> {
  const tag = since ? `scoped since ${since}` : 'full'
  console.log(`[step] regroupStep: start (${tag})`)
  const updated = await prisma.$executeRaw(
    since
      ? Prisma.sql`
          UPDATE products g
          SET best_variant_id = best.id,
              best_price      = best.final_price,
              image_url       = best.image_url,
              url             = best.url,
              in_stock        = COALESCE(best.in_stock, false),
              is_on_sale      = COALESCE(best.is_on_sale, false),
              discount_pct    = COALESCE(best.discount_pct, 0),
              updated_at      = NOW()
          FROM (
            SELECT DISTINCT ON (group_id)
              id, group_id, final_price, image_url, url,
              in_stock, is_on_sale, discount_pct
            FROM variants
            WHERE visibility IN ('pending', 'live') AND group_id IS NOT NULL
            ORDER BY group_id,
              (CASE WHEN in_stock THEN 0 ELSE 1 END),
              (CASE WHEN image_url IS NOT NULL AND image_url LIKE 'http%' THEN 0 ELSE 1 END),
              COALESCE(discount_pct, 0) DESC,
              created_at DESC NULLS LAST
          ) best
          WHERE g.id = best.group_id
            AND g.updated_at >= ${since}`
      : Prisma.sql`
          UPDATE products g
          SET best_variant_id = best.id,
              best_price      = best.final_price,
              image_url       = best.image_url,
              url             = best.url,
              in_stock        = COALESCE(best.in_stock, false),
              is_on_sale      = COALESCE(best.is_on_sale, false),
              discount_pct    = COALESCE(best.discount_pct, 0),
              updated_at      = NOW()
          FROM (
            SELECT DISTINCT ON (group_id)
              id, group_id, final_price, image_url, url,
              in_stock, is_on_sale, discount_pct
            FROM variants
            WHERE visibility IN ('pending', 'live') AND group_id IS NOT NULL
            ORDER BY group_id,
              (CASE WHEN in_stock THEN 0 ELSE 1 END),
              (CASE WHEN image_url IS NOT NULL AND image_url LIKE 'http%' THEN 0 ELSE 1 END),
              COALESCE(discount_pct, 0) DESC,
              created_at DESC NULLS LAST
          ) best
          WHERE g.id = best.group_id`
  )
  console.log(`[step] regroupStep: done (${tag}), ${updated} groups updated`)
  return updated
}

export async function hideProducts(): Promise<number> {
  console.log('[step] hideProducts: start')
  let batch = 0
  let hidden = 0
  do {
    batch = await prisma.$executeRaw(Prisma.sql`
      WITH to_hide AS (
        SELECT id FROM products
        WHERE visibility IN ('pending', 'live')
          AND (
            in_stock = false
            OR image_url IS NULL OR NOT image_url LIKE 'http%'
            OR best_price IS NULL OR best_price <= 0
            OR url IS NULL OR url = ''
          )
        ORDER BY id
        LIMIT 5000
      )
      UPDATE products SET visibility = 'hidden', updated_at = NOW()
      FROM to_hide WHERE products.id = to_hide.id
    `)
    hidden += batch
  } while (batch > 0)
  console.log(`[step] hideProducts: done, ${hidden} hidden`)
  return hidden
}

export async function hideStaleProducts(syncedProgramIds: number[]): Promise<number> {
  console.log('[step] hideStaleProducts: start')
  if (syncedProgramIds.length === 0) return 0
  const result = await prisma.$queryRaw<{ id: number }[]>(Prisma.sql`
    UPDATE variants
    SET visibility = 'hidden', updated_at = NOW()
    WHERE program_id = ANY(${syncedProgramIds})
      AND updated_at < NOW() - INTERVAL '36 hours'
      AND visibility = 'live'
    RETURNING id
  `)
  console.log(`[step] hideStaleProducts: done, ${result.length} hidden`)
  return result.length
}

export async function writeSyncLog(data: {
  runId: string
  runStartedAt: string
  syncedCount: number
  importedCount: number
  staleHidden: number
  errors: string[]
}): Promise<void> {
  const durationMs = Date.now() - new Date(data.runStartedAt).getTime()
  const completedAt = new Date()
  const errorsJson = JSON.stringify(data.errors)
  const resultsJson = JSON.stringify({})
  await prisma.$executeRaw(Prisma.sql`
    INSERT INTO sync_log (
      run_id, started_at, completed_at, duration_ms,
      feeds_synced, total_imported, stale_hidden, errors, results
    ) VALUES (
      ${data.runId},
      ${data.runStartedAt},
      ${completedAt},
      ${durationMs},
      ${data.syncedCount},
      ${data.importedCount},
      ${data.staleHidden},
      ${errorsJson}::jsonb,
      ${resultsJson}::jsonb
    )
  `)
  console.log(`[step] writeSyncLog: done, run ${data.runId} recorded`)
}
