# dal-http-coverage Specification

## Purpose

Ensure the public `/api` surface exposes every DAL read method that the storefront's HTTP data provider (`shoetopia/dal/providers/http`) requests, using the exact paths, argument parsing, validation, error semantics, and authentication the provider expects.

## Requirements

### Requirement: Product DAL endpoints

The public API SHALL expose every `ProductsDAL` read method that currently lacks a route, using the exact paths the storefront's HTTP data provider (`shoetopia/dal/providers/http`) requests, relative to the `/api` base. Arguments are parsed from query or path parameters; the method result is returned as JSON.

#### Scenario: Trending products

- **WHEN** a client sends `GET /api/products/trending?limit=10`
- **THEN** the API responds `200` with a JSON array from `products.getTrending(10)`

#### Scenario: Products by brand

- **WHEN** a client sends `GET /api/products/by-brand?brand=Nike&gender=mens&limit=12`
- **THEN** the API responds `200` with results from `products.getByBrand("Nike", "mens", 12)`

#### Scenario: Products by category

- **WHEN** a client sends `GET /api/products/by-category?category=running&gender=womens&limit=12`
- **THEN** the API responds `200` with results from `products.getByCategory("running", "womens", 12)`

#### Scenario: Products by category and brand

- **WHEN** a client sends `GET /api/products/by-category-brand?brand=Nike&category=running&gender=mens&limit=12`
- **THEN** the API responds `200` with results from `products.getByCategoryAndBrand(...)`

#### Scenario: Related products

- **WHEN** a client sends `GET /api/products/related?category=running&gender=mens&country=US&excludeId=99&limit=8`
- **THEN** the API responds `200` with results from `products.getRelated({ category, gender, country, excludeId, limit })`

#### Scenario: Daily finds

- **WHEN** a client sends `GET /api/products/daily-finds?limit=20&offset=0`
- **THEN** the API responds `200` with results from `products.getDailyFinds(20, 0)`

#### Scenario: Product count

- **WHEN** a client sends `GET /api/products/count?country=US&gender=mens&onSale=true`
- **THEN** the API responds `200` with `{ "count": <number> }` from `products.count(filters)`

#### Scenario: Product sizes

- **WHEN** a client sends `GET /api/products/:id/sizes` with a numeric id
- **THEN** the API responds `200` with a string array from `products.getSizes(id)`

#### Scenario: Product price range

- **WHEN** a client sends `GET /api/products/:id/price-range` with a numeric id
- **THEN** the API responds `200` with the price range from `products.getPriceRange(id)`

#### Scenario: Product color variants

- **WHEN** a client sends `GET /api/products/:id/color-variants` with a numeric id
- **THEN** the API responds `200` with the variants from `products.getColorVariants(id)`

#### Scenario: Sitemap products

- **WHEN** a client sends `GET /api/products/sitemap?page=1`
- **THEN** the API responds `200` with results from `products.getSitemapProducts(1)`

#### Scenario: Brand info

- **WHEN** a client sends `GET /api/products/brand-info?brand=Nike&country=US`
- **THEN** the API responds `200` with the brand info from `products.getBrandInfo("Nike", "US")`

#### Scenario: Brand info not found

- **WHEN** a client requests brand info for a brand that returns null
- **THEN** the API responds `404`

### Requirement: Category DAL endpoints

The public API SHALL expose the uncovered `CategoriesDAL` read methods at the paths the storefront HTTP provider requests.

#### Scenario: Category by slug

- **WHEN** a client sends `GET /api/categories/by-slug/:slug` for an existing category
- **THEN** the API responds `200` with the category from `categories.findBySlug(slug)`

#### Scenario: Category by slug not found

- **WHEN** a client sends `GET /api/categories/by-slug/:slug` for a slug that returns null
- **THEN** the API responds `404`

#### Scenario: Child categories

- **WHEN** a client sends `GET /api/categories/children?parentSlug=mens&minProductCount=5`
- **THEN** the API responds `200` with results from `categories.listChildren("mens", 5)`

### Requirement: Brand DAL endpoints

The public API SHALL expose the uncovered `BrandsDAL` read method at the path the storefront HTTP provider requests.

#### Scenario: Brands for sitemap

- **WHEN** a client sends `GET /api/brands/sitemap?minCount=10`
- **THEN** the API responds `200` with results from `brands.getTopForSitemap(10)`

### Requirement: Coupon DAL endpoints

The public API SHALL expose the uncovered `CouponsDAL` read methods under the `/api/coupons` namespace, matching the storefront HTTP provider paths.

#### Scenario: Store by slug

- **WHEN** a client sends `GET /api/coupons/stores/:slug` for an existing store
- **THEN** the API responds `200` with the store from `coupons.findStoreBySlug(slug)`

#### Scenario: Store by slug not found

- **WHEN** a client sends `GET /api/coupons/stores/:slug` for a slug that returns null
- **THEN** the API responds `404`

#### Scenario: Promotions by advertiser

- **WHEN** a client sends `GET /api/coupons/by-advertiser/:advertiserId` with a numeric id
- **THEN** the API responds `200` with results from `coupons.listByAdvertiser(advertiserId)`

#### Scenario: Store products

- **WHEN** a client sends `GET /api/coupons/stores/:advertiserId/products` with a numeric id
- **THEN** the API responds `200` with results from `coupons.getStoreProducts(advertiserId)`

#### Scenario: Store keywords

- **WHEN** a client sends `GET /api/coupons/stores/:advertiserId/keywords` with a numeric id
- **THEN** the API responds `200` with results from `coupons.getStoreKeywords(advertiserId)`

#### Scenario: Related stores

- **WHEN** a client sends `GET /api/coupons/stores/related?excludeId=42`
- **THEN** the API responds `200` with results from `coupons.getRelatedStores(42)`

### Requirement: Input validation and error semantics

Every added endpoint SHALL validate its required parameters and respond with consistent error codes rather than passing invalid input to the DAL.

#### Scenario: Missing required parameter

- **WHEN** a client calls an endpoint without a required parameter (e.g. `/api/products/by-brand` with no `brand`)
- **THEN** the API responds `400` with a JSON `error` message and does not call the DAL

#### Scenario: Non-numeric id

- **WHEN** a client calls an id-based endpoint (e.g. `/api/products/abc/sizes`) with a non-numeric id
- **THEN** the API responds `400` with a JSON `error` message

### Requirement: Authentication consistent with the storefront client

Every added endpoint SHALL sit on the authenticated `/api` surface. The storefront HTTP provider sends `Authorization: Bearer <CORE_API_KEY>` on every request, where `CORE_API_KEY` equals the API's `API_SECRET`. New endpoints MUST NOT be added to the public allowlist.

#### Scenario: Request with valid Bearer token

- **WHEN** a client sends any added endpoint request with `Authorization: Bearer <API_SECRET>`
- **THEN** the API processes the request normally (the global auth hook permits it)

#### Scenario: Request without a token in production

- **WHEN** a client calls an added endpoint with no `Authorization` header and `API_SECRET` is configured
- **THEN** the API responds `401`
