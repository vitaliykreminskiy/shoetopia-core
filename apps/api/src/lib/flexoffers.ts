/**
 * FlexOffers API v3 Client
 *
 * Auth:    apiKey header (per Swagger securityDefinitions)
 * Base:    https://api.flexoffers.com/v3
 *
 * All param names match the Swagger spec exactly (case-sensitive).
 * Required params per endpoint:
 *   /products/full    → page (int), pageSize (enum: 10|50|100)
 *   /promotions       → page (int), pageSize (enum: 10|50|100)
 *   /coupons          → page (int), pageSize (enum: 10|50|100)
 *   /advertisers      → ProgramStatus, ApplicationStatus, Page, pageSize
 */

const BASE_URL = 'https://api.flexoffers.com/v3'

// pageSize must be one of [10, 50, 100] for most endpoints
function clampPageSize(n: number): 10 | 50 | 100 {
  if (n <= 10) return 10
  if (n <= 50) return 50
  return 100
}

function getApiKey(): string {
  const key = process.env.FLEXOFFERS_API_KEY
  if (!key) throw new Error('FLEXOFFERS_API_KEY is not set')
  return key
}

async function foFetch<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined | null>,
  attempt = 0
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, String(v))
      }
    }
  }

  // 45s timeout per request — gives more headroom for paginated syncs
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 45000)

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
        apiKey: getApiKey(),
      },
      signal: controller.signal,
      // cache: 'no-store' is a Next.js extension; not needed in Node.js fetch
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(
        `FlexOffers ${res.status} ${res.statusText} — ${path} — ${body.slice(0, 200)}`
      )
    }

    return res.json() as Promise<T>
  } catch (e: any) {
    clearTimeout(timeoutId)

    if (e.name === 'AbortError') {
      throw new Error(`FlexOffers timeout after 45s — ${path}`)
    }

    // Retry up to 3 times on network errors ("fetch failed", ECONNRESET, etc.)
    // with exponential backoff: 1s, 2s, 4s
    const isNetworkError = e.cause?.code === 'ECONNRESET' ||
      e.cause?.code === 'ENOTFOUND' ||
      e.message === 'fetch failed' ||
      e.message?.includes('network') ||
      e.message?.includes('connect')

    if (isNetworkError && attempt < 3) {
      const delay = Math.pow(2, attempt) * 1000
      await new Promise(r => setTimeout(r, delay))
      return foFetch<T>(path, params, attempt + 1)
    }

    throw e
  }
}

// ─── Products ──────────────────────────────────────────────────────────────
// Swagger: /products/full
// Required: page, pageSize (enum 10|50|100)
// Filters (exact Swagger param names, PascalCase where specified):
//   name, manufacturer, Gender, Size, Color, min_price, max_price, isOnSale,
//   cid (catalog id), catId, sortColumn (Price|SalePrice|Discount), sortOrder

export async function searchProducts(params: {
  name?: string        // free-text search
  manufacturer?: string // brand / manufacturer filter
  Gender?: string      // exact match: Women, Men, Kids, Unisex
  Size?: string        // exact match
  Color?: string       // exact match
  min_price?: number
  max_price?: number
  isOnSale?: boolean
  cid?: string         // catalog ID (narrows to one advertiser's feed)
  catId?: number       // category ID
  sortColumn?: 'Price' | 'SalePrice' | 'Discount'
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}) {
  return foFetch('/products/full', {
    name: params.name,
    manufacturer: params.manufacturer,
    Gender: params.Gender,
    Size: params.Size,
    Color: params.Color,
    min_price: params.min_price,
    max_price: params.max_price,
    isOnSale: params.isOnSale,
    cid: params.cid,
    catId: params.catId,
    sortColumn: params.sortColumn,
    sortOrder: params.sortOrder,
    page: params.page ?? 1,
    pageSize: clampPageSize(params.pageSize ?? 50),
  })
}

// Swagger: /products/product  — single product by pid (no page/pageSize required)
export async function getProductById(pid: string) {
  return foFetch('/products/product', { pid })
}

// Swagger: /products/pricecomparison — requires Url, page, pageSize
export async function getPriceComparison(productUrl: string) {
  return foFetch('/products/pricecomparison', {
    Url: productUrl,
    page: 1,
    pageSize: 10,
  })
}

// ─── Product Feeds ──────────────────────────────────────────────────────────
// Swagger: /products/productfeeds — requires filetype
export async function getProductFeeds(params?: { programId?: string; feedId?: string; filetype?: string }) {
  return foFetch('/products/productfeeds', {
    filetype: params?.filetype ?? 'CSV',
    programId: params?.programId,
    feedId: params?.feedId,
  })
}

// ─── Catalogs ──────────────────────────────────────────────────────────────
// Swagger: /products/catalogs — list available product catalogs
// Each catalog belongs to an advertiser and has a cid that can be used to filter products
export async function getCatalogs(params?: { page?: number; pageSize?: number }) {
  return foFetch('/products/catalogs', {
    page: params?.page ?? 1,
    pageSize: clampPageSize(params?.pageSize ?? 100),
  })
}

// Get all products from a specific advertiser
// Note: /products/full requires one of: name, manufacturer, cid, url, UPCorEANs
// We use the advertiser name or cid (catalog ID) to filter
export async function getProductsByAdvertiser(params: {
  aid?: number | string      // Advertiser ID (for reference, not used in API call)
  name?: string              // Advertiser name - used for search
  cid?: string | number      // Catalog ID - most precise filter
  page?: number
  pageSize?: number
  Gender?: string
  min_price?: number
  max_price?: number
}) {
  // If we have a catalog ID, use that (most precise)
  // Otherwise fall back to name search
  return foFetch('/products/full', {
    cid: params.cid ? String(params.cid) : undefined,
    name: params.cid ? undefined : params.name, // Only use name if no cid
    page: params.page ?? 1,
    pageSize: clampPageSize(params.pageSize ?? 50),
    Gender: params.Gender,
    min_price: params.min_price,
    max_price: params.max_price,
  })
}

// ─── Advertisers ────────────────────────────────────────────────────────────
// Swagger: /products/advertisers — requires page, pageSize
export async function getProductAdvertisers(params?: { name?: string; page?: number; pageSize?: number }) {
  return foFetch('/products/advertisers', {
    name: params?.name,
    page: params?.page ?? 1,
    pageSize: clampPageSize(params?.pageSize ?? 100),
  })
}

// Swagger: /advertisers — requires ProgramStatus, ApplicationStatus, Page, pageSize
export async function getApprovedAdvertisers(params?: { page?: number; pageSize?: number }) {
  return foFetch('/advertisers', {
    ProgramStatus: 'Approved',
    ApplicationStatus: 'Approved',
    Page: params?.page ?? 1,
    pageSize: clampPageSize(params?.pageSize ?? 100),
  })
}

// ─── Promotions & Coupons ────────────────────────────────────────────────────
// Swagger: /promotions — requires page, pageSize (enum 10|50|100)
// Optional: advertiserIds, promotionalTypeIds, startDate, endDate, couponsOnly,
//           linkType (All|TextLinks|Banners), minPercentageOff, minDollarOff

export async function getPromotions(params?: {
  advertiserIds?: string
  minPercentageOff?: number
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
}) {
  // Keep params minimal — extra params like linkType/couponsOnly cause 400 on some accounts
  return foFetch('/promotions', {
    advertiserIds: params?.advertiserIds,
    minPercentageOff: params?.minPercentageOff,
    startDate: params?.startDate,
    endDate: params?.endDate,
    page: params?.page ?? 1,
    pageSize: clampPageSize(params?.pageSize ?? 50),
  })
}

// Swagger: /coupons — requires page, pageSize (enum 10|50|100)
export async function getCoupons(params?: {
  advertiserIds?: string
  page?: number
  pageSize?: number
}) {
  return foFetch('/coupons', {
    advertiserIds: params?.advertiserIds,
    page: params?.page ?? 1,
    pageSize: clampPageSize(params?.pageSize ?? 50),
  })
}

// ─── Deep Links ─────────────────────────────────────────────────────────────
// Swagger: /deeplink/apideeplink — requires AdvertiserId (PascalCase), URL
export async function createDeepLink(productUrl: string, advertiserId: number) {
  return foFetch('/deeplink/apideeplink', {
    AdvertiserId: advertiserId,
    URL: productUrl,
  })
}
