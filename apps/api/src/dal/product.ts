export interface ProductListItem {
  id: number;
  slug: string;
  country: string;
  currency: string;
  name: string;
  brand: string | null;
  category: string | null;
  gender: string | null;
  subCategory: string | null;
  price: number | null;
  finalPrice: number | null;
  isOnSale: boolean;
  discountPct: number;
  deepLinkUrl: string | null;
  imageUrl: string | null;
  pid: string | null;
  advertiserName: string | null;
  color: string | null;
  size: string | null;
  inStock: boolean;
}

export interface ProductDetail extends ProductListItem {
  normalizedName: string | null;
  description: string | null;
  sku: string | null;
  variantPrice: number | null;
  variantFinalPrice: number | null;
  bestVariantId: number | null;
  visibility: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColorVariant {
  pid: string;
  color: string;
  imageUrl: string | null;
  deepLinkUrl: string | null;
  size: string | null;
}

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
  offerCount: number;
}

export interface SitemapProduct {
  parentSlug: string;
  updatedAt: Date;
}

export interface BrandInfo {
  brand: string;
  productCount: number;
  minPrice: number | null;
  maxPrice: number | null;
  categories: string | null; // comma-separated sub-categories
}

// --- Search ---

export interface BrandSuggestion {
  brand: string;
  count: number;
}

export interface CategorySuggestion {
  category: string;
}

export interface AutocompleteResults {
  products: ProductListItem[];
  brands: BrandSuggestion[];
  categories: CategorySuggestion[];
}

export interface SearchResultsPage {
  products: ProductListItem[];
  hasMore: boolean;
  facets?: {
    brands: Array<{ brand: string; count: number }>;
    categories: Array<{ category: string; count: number }>;
    genders: Array<{ gender: string; count: number }>;
  };
}

// --- Param types ---

export type ProductSort =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "discount"
  | "newest";

export type DealMode = "new-arrivals" | "under-50" | "best-discount";

export interface ProductListParams {
  country?: string;
  gender?: string;
  genderFilter?: string;
  category?: string;
  subCategory?: string;
  brand?: string;
  advertiser?: string;
  size?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  q?: string;
  sort?: ProductSort;
  page?: number;
  limit?: number;
  cursor?: number;
}

export interface ProductListResult {
  products: ProductListItem[];
  total: number;
  nextCursor?: number | null;
}

export interface RelatedProductsParams {
  category: string | null;
  gender: string | null;
  country: string;
  excludeId: number;
  limit?: number;
}

export interface AutocompleteParams {
  q: string;
  country?: string;
}

export interface FullSearchParams {
  q: string;
  country?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

export interface FeaturedDealsParams {
  gender?: string;
  country?: string;
  mode?: DealMode;
  limit?: number;
}

export interface BrandProductsParams {
  brand: string;
  gender?: string;
  country?: string;
  limit?: number;
}

export interface EditorialProductsParams {
  country?: string;
  gender?: string;
  category?: string;
  brand?: string;
  q?: string; // comma-separated keyword terms matched against name, brand, or category
  onSale?: boolean;
  sort?: ProductSort;
  limit?: number;
}

export interface MasonryProductsParams {
  country?: string;
  gender?: string;
  filter?: "sale" | "under50" | "new";
  cursor?: number;
  pageSize?: number;
}

export interface MasonryProductsResult {
  products: ProductListItem[];
  nextCursor: number | null;
}

export interface SaleProduct {
  id: number;
  name: string;
  normalized_name: string | null;
  brand: string | null;
  price: number;
  final_price: number;
  image_url: string | null;
  gender: string | null;
  category: string | null;
  parent_slug: string;
  discount_pct: number;
}

export interface FavoriteProduct {
  pid: string;
  slug: string | null;
  name: string;
  normalized_name: string | null;
  brand: string | null;
  advertiser_name: string | null;
  price: number | null;
  final_price: number | null;
  discount_pct: number | null;
  is_on_sale: boolean;
  deep_link_url: string | null;
  image_url: string | null;
  color: string | null;
  gender: string | null;
  is_in_stock: boolean;
  country: string | null;
}

export interface OccasionProduct {
  parent_slug: string;
  name: string;
  brand: string | null;
  image_url: string | null;
  final_price: number;
  price: number;
  discount_pct: number | null;
  category: string | null;
}

export interface ShoeFinderParams {
  gender: string;
  occasion: string;
  minPrice: number;
  maxPrice: number;
}

export interface ProductStats {
  totalProducts: number;
  totalBrands: number;
  avgDiscount: number;
}

export interface ProductsDAL {
  getSaleProducts(params: {
    gender: string;
    limit?: number;
  }): Promise<SaleProduct[]>;
  getEditorialProducts(
    params: EditorialProductsParams,
  ): Promise<ProductListItem[]>;
  getMasonryProducts(
    params: MasonryProductsParams,
  ): Promise<MasonryProductsResult>;
  count(
    filters?: Pick<ProductListParams, "country" | "gender" | "onSale">,
  ): Promise<number>;
  getByBrand(
    brandName: string,
    gender: "womens" | "mens",
    limit: number,
  ): Promise<ProductListItem[]>;
  getByCategory(
    categoryName: string,
    gender: "womens" | "mens",
    limit: number,
  ): Promise<ProductListItem[]>;
  getTrending(limit: number): Promise<ProductListItem[]>;
  getSizes(productId: number): Promise<string[]>;
  findByPid(pid: string): Promise<ProductDetail | null>;
  getPriceRange(productId: number): Promise<PriceRange>;
  findBySlug(slug: string): Promise<ProductDetail | null>;
  getSitemapProducts(page: number): Promise<SitemapProduct[]>;
  getHeroProducts(country: string): Promise<ProductListItem[]>;
  getColorVariants(productId: number): Promise<ColorVariant[]>;
  findMany(params: ProductListParams): Promise<ProductListResult>;
  searchFull(params: FullSearchParams): Promise<SearchResultsPage>;
  getRelated(params: RelatedProductsParams): Promise<ProductListItem[]>;
  getDailyFinds(limit: number, offset: number): Promise<ProductListItem[]>;
  autocomplete(params: AutocompleteParams): Promise<AutocompleteResults>;
  getFeaturedDeals(params: FeaturedDealsParams): Promise<ProductListItem[]>;
  getBrandInfo(brand: string, country?: string): Promise<BrandInfo | null>;
  getBrandProducts(params: BrandProductsParams): Promise<ProductListItem[]>;
  findByPids(pids: string[]): Promise<FavoriteProduct[]>;
  findByOccasion(params: ShoeFinderParams): Promise<OccasionProduct[]>;
  getByCategoryAndBrand(
    brand: string,
    categoryName: string,
    gender: "womens" | "mens",
    limit: number,
  ): Promise<ProductListItem[]>;
  getStats(): Promise<ProductStats>;
}
