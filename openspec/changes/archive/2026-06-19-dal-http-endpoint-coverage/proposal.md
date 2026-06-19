## Why

The DAL (`DataAccessLayer`) exposes ~40 read methods across products, categories, brands, coupons, advertisers, and deals, but only a subset are reachable over HTTP. Roughly 21 DAL methods (e.g. `products.getTrending`, `categories.findBySlug`, `coupons.getStoreProducts`) have no route, so consumers cannot use capabilities the data layer already supports. We want a complete, predictable HTTP surface: every public DAL method reachable through a REST endpoint.

## What Changes

- Add HTTP GET routes for every DAL read method that currently lacks one, using the **exact paths the storefront's HTTP data provider (`shoetopia/dal/providers/http`) already requests** (e.g. `products.getTrending(limit)` → `GET /api/products/trending?limit=`), so wiring `CORE_API_URL`/`CORE_API_KEY` lets the storefront work with no client changes.
- Cover the gaps:
  - **products**: `count`, `getByBrand`, `getByCategory`, `getTrending`, `getSizes`, `getPriceRange`, `getSitemapProducts`, `getColorVariants`, `getRelated`, `getDailyFinds`, `getBrandInfo`, `getByCategoryAndBrand`
  - **categories**: `findBySlug`, `listChildren`
  - **brands**: `getTopForSitemap`
  - **coupons**: `findStoreBySlug`, `listByAdvertiser`, `getStoreProducts`, `getStoreKeywords`, `getRelatedStores`
  - **top-level**: `getHealth` (route exists but probes Prisma directly; out of scope — already covered by `health-check`)
- Validate required query/path params and return `400` on missing/invalid input; `404` where a lookup returns null.
- Endpoints inherit the existing global Bearer auth (the storefront calls api-core server-side with `Authorization: Bearer <CORE_API_KEY>`, where `CORE_API_KEY` equals `API_SECRET`); not added to the public allowlist.

## Capabilities

### New Capabilities
- `dal-http-coverage`: A complete, conventional HTTP mapping so every public DAL read method is reachable via a documented `/api/...` endpoint with validated inputs and consistent error semantics.

### Modified Capabilities
<!-- None: existing routes keep current behavior; this only adds endpoints. -->

## Impact

- New/expanded route modules under `apps/api/src/routes/` (products, categories, brands, coupons), registered in `routes/index.ts`.
- No DAL changes — routes are thin wrappers over existing methods.
- No new dependencies. Caching via existing `lib/cache.ts` where read-heavy.
- `advertisers` and `deals` already fully covered — untouched.
- `getHealth` excluded (handled by the `health-check` capability).
- **Out of scope, flagged for follow-up:** several already-covered routes use paths that diverge from the storefront provider (`/api/products/:slug` vs `/products/by-slug/:slug`, `/api/hero-products` vs `/products/hero`, `/api/coupon-stores` vs `/coupons/stores`, etc.); and the storefront provider has methods with no api-core DAL counterpart (`getSitemapEntries`, `getAffiliateTarget`, `getSoldOut`, `categories.listForSitemap`). Both need a separate reconciliation change.
