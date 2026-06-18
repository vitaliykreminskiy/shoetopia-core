## Why

The categories module is spread across four files (API routes, DAL interface, Prisma provider, import-time categorizers) with non-obvious behavior — raw SQL, snake_case contracts, ordering of gender/footwear keyword checks, and two distinct "product count" fields. New contributors have no single reference, so changes risk breaking the page templates and import pipeline that depend on it. This change captures that behavior as documentation.

## What Changes

- Document the public **categories API**: `GET /api/categories` and `GET /api/nav-categories`, their query params, response shapes, caching, and error fallbacks.
- Document the **categories DAL contract** (`CategoriesDAL`) and the `Category` / `CategoryListParams` / `NavCategoryCount` types, including the snake_case convention and the `product_count` vs `computed_product_count` distinction.
- Document the **Prisma provider** behavior: the `WITH_COUNT` join, `parentSlug` `"root"` semantics, `includeEmpty` filtering, and silent empty-array error handling.
- Document the **import-time categorization** helpers (`smart-categorizer`, `flexoffers-categories`) and the ordering rules that make them correct (kids→women→men, accessories→clothing→footwear, most-specific footwear first).
- No runtime behavior changes — documentation only.

## Capabilities

### New Capabilities
- `product-categories`: Catalog category browsing API, the DAL contract behind it, and the import-time product categorization rules.

### Modified Capabilities
<!-- None — no existing specs; no requirement behavior changes. -->

## Impact

- Adds spec/doc artifacts under `openspec/` for the categories module.
- Touches code: `apps/api/src/routes/categories.ts`, `apps/api/src/dal/category.ts`, `apps/api/src/dal/providers/prisma/categories.ts`, `apps/api/src/routes/admin/fix-categories.ts`, `packages/jobs/src/lib/smart-categorizer.ts`, `packages/jobs/src/lib/flexoffers-categories.ts` (doc comments only, no logic).
- No API, schema, or dependency changes.
