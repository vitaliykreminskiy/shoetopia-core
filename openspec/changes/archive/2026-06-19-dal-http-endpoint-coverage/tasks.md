## 1. Shared helpers

- [x] 1.1 Add a small param helper (e.g. `lib/params.ts`) with `toInt(value, { required })` and `toBool(value)` returning parsed value or a validation error, used by all new handlers.
- [x] 1.2 Add a `parseGender` guard that accepts only `"womens" | "mens"` for DAL methods requiring it.

## 2. Product endpoints (in `routes/products.ts`)

- [x] 2.1 `GET /api/products/trending?limit=` → `getTrending` (cached).
- [x] 2.2 `GET /api/products/by-brand?brand=&gender=&limit=` → `getByBrand` (validate brand, gender).
- [x] 2.3 `GET /api/products/by-category?category=&gender=&limit=` → `getByCategory`.
- [x] 2.4 `GET /api/products/by-category-brand?brand=&category=&gender=&limit=` → `getByCategoryAndBrand`.
- [x] 2.5 `GET /api/products/related?category=&gender=&country=&excludeId=&limit=` → `getRelated` (validate country, excludeId).
- [x] 2.6 `GET /api/products/daily-finds?limit=&offset=` → `getDailyFinds`.
- [x] 2.7 `GET /api/products/count?country=&gender=&onSale=` → `count`, return `{ count }`.
- [x] 2.8 `GET /api/products/sitemap?page=` → `getSitemapProducts` (cached).
- [x] 2.9 `GET /api/products/brand-info?brand=&country=` → `getBrandInfo`, `404` on null (cached).
- [x] 2.10 `GET /api/products/:id/sizes` → `getSizes` (numeric id, else `400`).
- [x] 2.11 `GET /api/products/:id/price-range` → `getPriceRange`.
- [x] 2.12 `GET /api/products/:id/color-variants` → `getColorVariants`.
- [x] 2.13 Confirm static sub-paths (`trending`, `sitemap`, etc.) do not collide with the existing `/api/products/:slug` route.

## 3. Category endpoints (in `routes/categories.ts`)

- [x] 3.1 `GET /api/categories/by-slug/:slug` → `findBySlug`, `404` on null.
- [x] 3.2 `GET /api/categories/children?parentSlug=&minProductCount=` → `listChildren`.

## 4. Brand endpoints (in `routes/brands.ts`)

- [x] 4.1 `GET /api/brands/sitemap?minCount=` → `getTopForSitemap` (cached).

## 5. Coupon endpoints (in `routes/coupons.ts`)

- [x] 5.1 `GET /api/coupons/stores/related?excludeId=` → `getRelatedStores` (register before `:slug`).
- [x] 5.2 `GET /api/coupons/stores/:advertiserId/products` → `getStoreProducts` (numeric id).
- [x] 5.3 `GET /api/coupons/stores/:advertiserId/keywords` → `getStoreKeywords` (numeric id).
- [x] 5.4 `GET /api/coupons/stores/:slug` → `findStoreBySlug`, `404` on null.
- [x] 5.5 `GET /api/coupons/by-advertiser/:advertiserId` → `listByAdvertiser` (numeric id).

## 6. Tests & verification

- [x] 6.1 Add route tests under `routes/__tests__/` mocking `getDataProvider()`, asserting `200` + correct DAL call args for representative endpoints in each group.
- [x] 6.2 Add validation tests: missing required param → `400`; non-numeric id → `400`; null lookup → `404`.
- [x] 6.3 Add collision tests: static path (`/api/products/trending`, `/api/coupons/stores/related`) resolves to its handler, not the `:slug`/`:id` route.
- [x] 6.4 Confirm endpoints sit behind the global Bearer hook (not allowlisted); a request with `Authorization: Bearer <API_SECRET>` is accepted.
- [x] 6.5 Run `npx vitest run` and `npx tsc --noEmit`; confirm green.
