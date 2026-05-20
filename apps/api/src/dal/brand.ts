export interface BrandSummary {
  name: string;
  slug: string;
  count: number;
}

export interface BrandFeaturedProduct {
  id: number;
  name: string;
  brand: string;
  final_price: number;
  original_price: number | null;
  is_on_sale: boolean;
  discount_pct: number | null;
  image_url: string;
  parent_slug: string | null;
  sub_category: string;
  gender: string;
}

export interface BrandTopProduct {
  name: string;
  brand: string;
  final_price: number;
  price: number;
  image_url: string;
  parent_slug: string;
  discount_pct: number | null;
}

export interface BrandSitemapEntry {
  name: string;
  slug: string;
  updatedAt: Date | null;
}

export interface BrandsDAL {
  listTop(limit?: number): Promise<BrandSummary[]>;
  getFeaturedProducts(params: { brand: string; gender: string; country: string; limit?: number }): Promise<BrandFeaturedProduct[]>;
  getTopProduct(params: { brandName: string }): Promise<BrandTopProduct | null>;
  getTopForSitemap(minCount?: number): Promise<BrandSitemapEntry[]>;
}
