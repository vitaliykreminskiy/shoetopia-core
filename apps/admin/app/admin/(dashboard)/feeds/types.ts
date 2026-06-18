export type SortBy = "pending" | "products" | "name" | "imported";

export interface FeedRow {
  id: number;
  program_id: number;
  program_name: string;
  catalog_name: string | null;
  https_link: string | null;
  country: string;
  region: string;
  total_products: number;
  status: string;
  last_imported_at: string | null;
  products_imported: number;
  product_count: number;
  live_count: number;
  in_stock_count: number;
}

export interface FeedStats {
  total_feeds: number;
  processed_feeds: number;
  pending_feeds: number;
  total_available_products: number;
  total_imported_products: number;
}
