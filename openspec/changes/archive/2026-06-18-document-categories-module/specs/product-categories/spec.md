## ADDED Requirements

### Requirement: Categories listing API

The system SHALL expose `GET /api/categories` returning categories with product counts. It SHALL accept an optional `parent_slug` query param to scope results and an optional `include_empty` query param (string `"true"`) to include categories with zero products. On any error it SHALL respond `200` with `{ categories: [], total: 0 }` and log the error.

#### Scenario: List all non-empty categories

- **WHEN** `GET /api/categories` is called with no query params
- **THEN** the system returns `{ categories, total }` where `categories` contains every category with at least one product, ordered by `parent_slug` (NULLs first), then `display_order`, then `name`

#### Scenario: Scope to a parent slug

- **WHEN** `GET /api/categories?parent_slug=womens` is called
- **THEN** only categories whose `parent_slug` equals `womens` are returned, ordered by `display_order` then `name`

#### Scenario: Include empty categories

- **WHEN** `GET /api/categories?include_empty=true` is called
- **THEN** categories with zero products are also included in the response

#### Scenario: Error fallback

- **WHEN** the data provider throws while listing
- **THEN** the system logs the error and returns `200` with `{ categories: [], total: 0 }`

### Requirement: Navigation category counts API

The system SHALL expose `GET /api/nav-categories` returning live in-stock product counts keyed by `gender/category` for navigation. It SHALL accept an optional `country` query param, defaulting to `DEFAULT_COUNTRY` when missing or invalid. Results SHALL be cached per country for `CACHE_TTL.LONG`. On error it SHALL respond `200` with `{ counts: {} }`.

#### Scenario: Counts for default country

- **WHEN** `GET /api/nav-categories` is called without a `country` param
- **THEN** counts are computed for `DEFAULT_COUNTRY` and returned as `{ counts: { "<gender>/<category>": <number> } }` with keys lowercased and spaces in category replaced by underscores

#### Scenario: Invalid country falls back to default

- **WHEN** `GET /api/nav-categories?country=ZZ` is called and `ZZ` is not a valid country
- **THEN** the system uses `DEFAULT_COUNTRY` instead

#### Scenario: Cached response

- **WHEN** the same country is requested twice within the cache TTL
- **THEN** the second request returns the cached counts without re-querying the database

#### Scenario: Malformed or error result

- **WHEN** the underlying query throws or returns a non-array
- **THEN** the system returns `200` with `{ counts: {} }`

### Requirement: Categories data-access contract

The system SHALL define a `CategoriesDAL` interface providing `findBySlug`, `list`, `listChildren`, and `getNavCounts`. The `Category` type SHALL use snake_case fields (consumed directly in page templates) and SHALL expose both `product_count` (stored column value) and `computed_product_count` (live count derived from the `products` table).

#### Scenario: Two count fields are distinct

- **WHEN** a `Category` is returned
- **THEN** `product_count` reflects the stored column and `computed_product_count` reflects the live count from joining the `products` table on `category_slug`

#### Scenario: Find by slug

- **WHEN** `findBySlug(slug)` is called for a slug that does not exist
- **THEN** the method returns `null`

### Requirement: Prisma provider list semantics

The Prisma `CategoriesDAL` implementation SHALL interpret `parentSlug === "root"` as top-level categories only (`parent_slug IS NULL`), a non-empty `parentSlug` as that parent's children, and an omitted `parentSlug` as all categories. When `includeEmpty` is false it SHALL filter out categories where both `product_count` and `computed_product_count` are zero. On query failure each method SHALL return an empty array (or `null` for `findBySlug`).

#### Scenario: Root listing

- **WHEN** `list({ parentSlug: "root" })` is called
- **THEN** only categories with `parent_slug IS NULL` are returned

#### Scenario: Empty filtering by default

- **WHEN** `list()` is called without `includeEmpty`
- **THEN** categories with zero `product_count` and zero `computed_product_count` are excluded

#### Scenario: Query failure is swallowed

- **WHEN** a raw query throws
- **THEN** `list`, `listChildren`, and `getNavCounts` return `[]` and `findBySlug` returns `null`

### Requirement: Import-time product categorization

The system SHALL categorize imported products into gender, category, and sub_category using deterministic keyword rules. Gender detection SHALL check kids before women before men (because `men` is a substring of `women`). Categorization SHALL check accessories first, then clothing, then footwear, and within footwear SHALL match the most specific sub-category first. A `flexoffers-categories` map SHALL translate FlexOffers `CategoryId` values to the site's category/sub_category/gender.

#### Scenario: Women detected before men

- **WHEN** `detectGender` runs on text containing `"women's"`
- **THEN** it returns `womens` and not `mens`

#### Scenario: Accessories take priority over footwear

- **WHEN** `categorizeProduct` runs on a product whose name matches both an accessory keyword and a footwear keyword
- **THEN** it returns `category: "Accessories"`

#### Scenario: Most-specific footwear wins

- **WHEN** `categorizeProduct` runs on a name matching both `wedge` and `sandal`
- **THEN** it returns sub_category `Wedges` (checked before Sandals)

#### Scenario: FlexOffers id mapping

- **WHEN** a feed row has FlexOffers `CategoryId` `5`
- **THEN** it maps to `{ category: "footwear", sub_category: "heels", gender: "women" }`
