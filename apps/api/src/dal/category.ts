// snake_case matches raw SQL column names — consumed directly in page templates
export interface Category {
  slug: string;
  name: string;
  parent_slug: string | null;
  display_order: number | null;
  product_count: number;
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
  findBySlug(slug: string): Promise<Category | null>;
  list(params?: CategoryListParams): Promise<Category[]>;
  listChildren(parentSlug: string, minProductCount?: number): Promise<Category[]>;
  getNavCounts(country: string): Promise<NavCategoryCount[]>;
}
