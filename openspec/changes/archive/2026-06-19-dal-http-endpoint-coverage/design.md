## Context

The DAL (`apps/api/src/dal/`) is the single source of read access to storefront data. Routes are thin Fastify wrappers that parse params, call a DAL method, and serialize the result — see [hero.ts](../../../apps/api/src/routes/hero.ts) for the established pattern.

The consuming storefront (`shoetopia`, sibling repo) has an HTTP data provider at `shoetopia/dal/providers/http/` that mirrors the same DAL interface and calls this core API. **That provider is the source of truth for the URL of each endpoint.** Its client (`client.ts`) builds requests against `CORE_API_URL` (which includes the `/api` base) and sends `Authorization: Bearer <CORE_API_KEY>` on every request. So each provider path like `/products/trending` corresponds to a core route `/api/products/trending`, reached with a Bearer token equal to `API_SECRET`.

An audit of `routes/*` vs the DAL interfaces found ~21 read methods with no route. This change adds them using the exact paths the storefront provider already expects, so wiring `CORE_API_URL`/`CORE_API_KEY` makes the storefront work with no client changes.

## Goals / Non-Goals

**Goals:**
- One endpoint per uncovered public DAL read method, at the path the storefront HTTP provider requests.
- Consistent param validation (`400` on missing/invalid), `404` on null lookups.
- Match the existing route style (typed querystring, `getDataProvider()`, caching where read-heavy).
- Endpoints inherit the global Bearer auth like the rest of `/api` (not added to the public allowlist).

**Non-Goals:**
- Mutations/write endpoints (DAL read methods only).
- Changing DAL signatures or behavior.
- Re-aligning the **pre-existing** routes whose current paths already diverge from the storefront provider (see Risks) — tracked separately.
- Storefront-provider methods with no api-core DAL counterpart: `products.getSitemapEntries`, `getAffiliateTarget`, `getSoldOut`, `categories.listForSitemap`. These are reverse gaps (provider has them, core DAL does not) and are out of scope here.
- `getHealth` (owned by `health-check`).

## Decisions

**1. Endpoint paths taken verbatim from the storefront HTTP provider** (relative to the `/api` base):

| DAL method | Endpoint | Provider source |
|---|---|---|
| `products.getTrending(limit)` | `GET /api/products/trending?limit=` | products.ts |
| `products.getByBrand(brand,gender,limit)` | `GET /api/products/by-brand?brand=&gender=&limit=` | products.ts |
| `products.getByCategory(category,gender,limit)` | `GET /api/products/by-category?category=&gender=&limit=` | products.ts |
| `products.getByCategoryAndBrand(brand,category,gender,limit)` | `GET /api/products/by-category-brand?brand=&category=&gender=&limit=` | products.ts |
| `products.getRelated(params)` | `GET /api/products/related?category=&gender=&country=&excludeId=&limit=` | products.ts |
| `products.getDailyFinds(limit,offset)` | `GET /api/products/daily-finds?limit=&offset=` | products.ts |
| `products.count(filters)` | `GET /api/products/count?country=&gender=&onSale=` → `{ count }` | products.ts |
| `products.getSizes(id)` | `GET /api/products/:id/sizes` | products.ts |
| `products.getPriceRange(id)` | `GET /api/products/:id/price-range` | products.ts |
| `products.getColorVariants(id)` | `GET /api/products/:id/color-variants` | products.ts |
| `products.getSitemapProducts(page)` | `GET /api/products/sitemap?page=` | products.ts |
| `products.getBrandInfo(brand,country?)` | `GET /api/products/brand-info?brand=&country=` | products.ts |
| `categories.findBySlug(slug)` | `GET /api/categories/by-slug/:slug` | categories.ts |
| `categories.listChildren(parentSlug,minProductCount?)` | `GET /api/categories/children?parentSlug=&minProductCount=` | categories.ts |
| `brands.getTopForSitemap(minCount?)` | `GET /api/brands/sitemap?minCount=` | brands.ts |
| `coupons.findStoreBySlug(slug)` | `GET /api/coupons/stores/:slug` | coupons.ts |
| `coupons.listByAdvertiser(advertiserId)` | `GET /api/coupons/by-advertiser/:advertiserId` | coupons.ts |
| `coupons.getStoreProducts(advertiserId)` | `GET /api/coupons/stores/:advertiserId/products` | coupons.ts |
| `coupons.getStoreKeywords(advertiserId)` | `GET /api/coupons/stores/:advertiserId/keywords` | coupons.ts |
| `coupons.getRelatedStores(excludeId)` | `GET /api/coupons/stores/related?excludeId=` | coupons.ts |

Note the coupon namespace is `/api/coupons/stores/...`, not the existing `/api/coupon-stores`.

**2. Authentication: inherit the global Bearer hook; do NOT allowlist.**
The storefront client always sends `Bearer CORE_API_KEY`. `registerAuth` already protects every `/api` route except the health probes, so new routes are authenticated by default. Deployment requires `CORE_API_KEY === API_SECRET`. No `PUBLIC_PATHS` changes.

**3. Static segments before param segments to avoid route collisions.**
- `/api/products/trending|sitemap|count|...` (static) must not be captured by the existing `/api/products/:slug`.
- `/api/coupons/stores/related` (static) vs `/api/coupons/stores/:slug` (param) — register static first.
- `/api/coupons/stores/:id/products` and `/.../keywords` are deeper, no collision with `/api/coupons/stores/:slug`.
Fastify's radix router prioritizes static over param; collisions are covered by tests.

**4. Param parsing & validation helper.**
Numeric params (`limit`, `offset`, `id`, `advertiserId`, `page`, `excludeId`, `minCount`, `minProductCount`) parsed via a small `toInt`/`toBool` helper: required-but-missing → `400`; present-but-NaN → `400`; optional omitted → DAL default. `gender` constrained to `"womens" | "mens"` where required.

**5. Result envelopes.** Endpoints return the DAL value directly, except `count` → `{ count }` (the provider does `.then(r => r.count)`). Null single-lookups (`getBrandInfo`, `categories.findBySlug`, `coupons.findStoreBySlug`) → `404`.

**6. Caching** for read-heavy/slow endpoints (`trending`, `sitemap`, `brand-info`, `brands/sitemap`) via existing `cached()` + `Cache-Control`; id-scoped lookups uncached.

**7. Placement.** Extend existing modules (`products.ts`, `categories.ts`, `brands.ts`, `coupons.ts`); already wired in `routes/index.ts`.

## Risks / Trade-offs

- **Pre-existing path divergence**: several already-covered methods are served at different paths than the storefront provider expects — e.g. `findBySlug` core `/api/products/:slug` vs provider `/api/products/by-slug/:slug`; `getHeroProducts` `/api/hero-products` vs `/products/hero`; `getStats` `/api/stats` vs `/products/stats`; `listStores` `/api/coupon-stores` vs `/coupons/stores`. The storefront will not fully function on the HTTP provider until these are reconciled. **Out of scope** for this change (modifies existing behavior); flag for a follow-up alignment change.
- **Route collision static vs param** → Mitigation: static-first semantics + explicit collision tests.
- **`getRelated` multi-field param object** → Mitigation: map each querystring field; validate required `country`/`excludeId`, allow nullable `category`/`gender`.
- **Auth coupling**: endpoints require `API_SECRET`; if unset in production the global hook fails closed (`401`) — correct, but means the storefront must have `CORE_API_KEY` configured.
