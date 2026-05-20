export interface CouponStore {
  advertiser_id: number;
  name: string;
  logo_url: string | null;
  url: string | null;
  description: string | null;
  coupon_count: number;
  best_percent: number | null;
  best_amount: number | null;
  code_count: number;
  slug: string;
}

export interface CouponStoreDetail {
  advertiser_id: number;
  name: string;
  logo_url: string | null;
  url: string | null;
  description: string | null;
  slug: string;
}

export interface Promotion {
  id: number;
  promo_id: string;
  advertiser_id: number;
  title: string;
  description: string | null;
  coupon_code: string | null;
  promo_type: string | null;
  discount_amount: number | null;
  discount_percent: number | null;
  start_date: string | null;
  end_date: string | null;
  link_url: string | null;
  is_active: boolean;
}

export interface CouponProduct {
  id: number;
  name: string;
  brand: string;
  slug: string;
  image_url: string;
  final_price: number;
  price: number;
  is_on_sale: boolean;
  discount_percent: number | null;
  category: string | null;
  color: string | null;
}

export interface CouponKeywordData {
  category: string | null;
  sub_category: string | null;
  color: string | null;
  gender: string | null;
  material: string | null;
  keywords: string[] | null;
}

export interface RelatedStore {
  advertiser_id: number;
  name: string;
  logo_url: string | null;
  slug: string;
  coupon_count: number;
  best_percent: number | null;
}

export interface ListCouponsParams {
  advertiserIds?: number[];
  store?: string;
  limit?: number;
}

export interface CouponsDAL {
  listStores(): Promise<CouponStore[]>;
  findStoreBySlug(slug: string): Promise<CouponStoreDetail | null>;
  list(params: ListCouponsParams): Promise<Promotion[]>;
  listByAdvertiser(advertiserId: number): Promise<Promotion[]>;
  getStoreProducts(advertiserId: number): Promise<CouponProduct[]>;
  getStoreKeywords(advertiserId: number): Promise<CouponKeywordData[]>;
  getRelatedStores(excludeId: number): Promise<RelatedStore[]>;
}
