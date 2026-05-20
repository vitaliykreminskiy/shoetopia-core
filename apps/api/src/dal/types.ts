import type { ProductsDAL } from "./product.js";
import type { CategoriesDAL } from "./category.js";
import type { BrandsDAL } from "./brand.js";
import type { CouponsDAL } from "./coupon.js";
import type { AdvertisersDAL } from "./advertiser.js";
import type { DealsDAL } from "./deal.js";

export interface DataAccessLayer {
  products: ProductsDAL;
  categories: CategoriesDAL;
  brands: BrandsDAL;
  coupons: CouponsDAL;
  advertisers: AdvertisersDAL;
  deals: DealsDAL;

  getHealth: () => Promise<boolean>;
}
