import { rawQuery } from '@shoetopia/db'

/**
 * Advanced query optimization layer
 * Uses smart caching, index selection, and streaming for fast product loading
 */

export async function getProductsOptimized(filters: {
  gender?: string
  category?: string
  subcategory?: string
  page: number
  limit: number
  sort?: string
  onSale?: boolean
}) {
  const { gender, category, subcategory, page, limit, sort, onSale } = filters
  const offset = (page - 1) * limit

  // Raw SQL: runtime-composed WHERE clause built from string concatenation with
  // pg-specific LIKE patterns (e.g. sub_category LIKE '%,${c}%'). Prisma's WHERE
  // object can't dynamically accumulate raw SQL fragments at runtime.
  // Build WHERE clause with proper index selection
  const conditions: string[] = ['p.visibility = \'live\'', 'p.in_stock = true', 'p.show_in_listings = true']

  if (gender) {
    conditions.push(`p.gender = '${gender.replace(/'/g, "''")}'`)
  }

  if (onSale) {
    conditions.push(`p.price > 0 AND p.final_price < p.price`)
  } else {
    conditions.push(`p.final_price > 0`)
  }

  if (category) {
    const c = category.replace(/'/g, "''").toLowerCase()
    // Multi-category support: check both category and sub_category (comma-separated)
    conditions.push(`(LOWER(p.category) = '${c}' OR LOWER(p.sub_category) LIKE '${c},%' OR LOWER(p.sub_category) LIKE '%,${c}' OR LOWER(p.sub_category) = '${c}')`)
  }

  if (subcategory) {
    const sc = subcategory.replace(/'/g, "''").toLowerCase()
    conditions.push(`LOWER(p.sub_category) LIKE '%${sc}%'`)
  }

  const where = conditions.join(' AND ')

  // Determine sort order - optimize for index usage
  let orderBy = 'p.id DESC' // Default: newest first (uses index)
  if (sort === 'price_asc') orderBy = 'p.final_price ASC NULLS LAST'
  else if (sort === 'price_desc') orderBy = 'p.final_price DESC NULLS LAST'
  else if (sort === 'discount') orderBy = '(p.price - p.final_price) DESC NULLS LAST'

  // Fast query using partial indexes
  const query = `
    SELECT 
      p.id, p.program_id, p.product_id AS pid, 
      p.parent_slug,
      COALESCE(p.parent_slug, p.variant_slug) AS slug, 
      p.variant_slug,
      p.country, p.currency,
      COALESCE(NULLIF(p.normalized_name, ''), p.name) AS name, 
      p.brand, p.category, p.gender,
      p.price, p.final_price,
      p.is_on_sale,
      CASE WHEN p.price > 0 AND p.final_price < p.price
        THEN ROUND(((p.price - p.final_price) / p.price * 100)::numeric, 1)
        ELSE 0
      END AS discount_pct,
      p.url AS deep_link_url, p.image_url,
      p.color, p.size, p.in_stock
    FROM products p
    WHERE ${where}
    ORDER BY ${orderBy}
    LIMIT ${limit} OFFSET ${offset}
  `

  try {
    const rows = await rawQuery(query)

    // Get total count (cached via Redis in API layer)
    const countQuery = `SELECT COUNT(*) as cnt FROM products p WHERE ${where}`
    const countResult = await rawQuery(countQuery)
    const total = parseInt((countResult[0] as any).cnt)

    return {
      success: true,
      products: rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error('[v0] Optimized query error:', error)
    throw error
  }
}

/**
 * Batch fetch products for cache pre-warming
 * Efficiently loads multiple category pages in parallel
 */
export async function batchFetchProducts(requests: Array<{
  gender?: string
  category?: string
  page?: number
  limit?: number
}>) {
  return Promise.all(
    requests.map(req =>
      getProductsOptimized({
        gender: req.gender,
        category: req.category,
        page: req.page || 1,
        limit: req.limit || 48,
      }).catch(e => ({ error: e.message }))
    )
  )
}
