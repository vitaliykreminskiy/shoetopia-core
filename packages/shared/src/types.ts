export type Gender = 'women' | 'men' | 'kids' | 'unisex'
export type Visibility = 'pending' | 'live' | 'archived' | 'hidden'
export type ProductSort = 'relevance' | 'price_asc' | 'price_desc' | 'newest'

export interface ProductRow {
  id: number
  slug: string
  brand: string
  name: string
  gender: Gender | null
  category: string | null
  subCategory: string | null
  imageUrl: string | null
  minPrice: number | null
  maxPrice: number | null
  salePrice: number | null
  onSale: boolean
  variantCount: number
  affiliateUrl: string | null
  country: string
}

export interface ProductsResult {
  products: ProductRow[]
  total: number
  page: number
  limit: number
  totalPages: number
  nextCursor: number | null
}

export interface SearchResult {
  products: ProductRow[]
  brandSuggestions: string[]
  categorySuggestions: string[]
  total: number
}

export interface FeedRow {
  id: number
  programId: number
  programName: string
  country: string
  status: string
  totalProducts: number
  productsImported: number
  lastImportedAt: Date | null
}

export interface SyncLogRow {
  id: number
  runId: string
  startedAt: Date
  completedAt: Date | null
  durationMs: number | null
  feedsSynced: number
  totalImported: number
  staleHidden: number
  errors: string[]
}

export interface JobStatus {
  id: string
  name: string
  queue: string
  state: 'active' | 'waiting' | 'completed' | 'failed' | 'delayed'
  progress: number
  data: Record<string, unknown>
  failedReason?: string
  timestamp: number
  processedOn?: number
  finishedOn?: number
  attemptsMade: number
}
