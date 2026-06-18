/* snake_case matches raw SQL column names — consumed directly in page templates */
export interface Category {
  slug: string;
  name: string;
  parent_slug: string | null;
  display_order: number | null;
  /* Stored count column on the categories row (denormalized, may be stale). */
  product_count: number;
  /* Live count derived by joining the products table on category_slug at query time. */
  computed_product_count: number;
}

export interface CategoryListParams {
  parentSlug?: string | 'root'; // 'root' = top-level only, string = children of that slug, omit = all
  includeEmpty?: boolean;
}

export interface NavCategoryCount {
  gender: string;
  category: string;
  count: number;
}

export interface CategoriesDAL {
  /* Single category by slug, with live computed_product_count; null if not found. */
  findBySlug(slug: string): Promise<Category | null>;
  /* List categories (see CategoryListParams for parentSlug/includeEmpty semantics). */
  list(params?: CategoryListParams): Promise<Category[]>;
  /* Children of a parent with product_count >= minProductCount (default 1), busiest first. */
  listChildren(parentSlug: string, minProductCount?: number): Promise<Category[]>;
  /* Live in-stock product counts grouped by gender+category for a country (navigation). */
  getNavCounts(country: string): Promise<NavCategoryCount[]>;
}
