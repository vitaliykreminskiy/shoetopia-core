## 1. HTTP API doc comments

- [x] 1.1 Add a route-header comment block to `apps/api/src/routes/categories.ts` documenting both endpoints, their query params (`parent_slug`, `include_empty`, `country`), response shapes, and the error fallbacks
- [x] 1.2 Comment the `nav-categories` key-building logic (lowercasing + spaces→underscores) and the `CACHE_TTL.LONG` caching in `categories.ts`
- [x] 1.3 Add a header comment to `apps/api/src/routes/admin/fix-categories.ts` stating it is an admin-secret maintenance job that rewrites `variants.category`/`sub_category` and is non-idempotent ordering-sensitive

## 2. Contract & provider doc comments

- [x] 2.1 Expand the comment in `apps/api/src/dal/category.ts` to explain each `CategoriesDAL` method and the `product_count` vs `computed_product_count` distinction
- [x] 2.2 Comment the `WITH_COUNT` join intent and the `parentSlug === "root"` sentinel + `includeEmpty` filtering in `apps/api/src/dal/providers/prisma/categories.ts`
- [x] 2.3 Note the swallowed-error contract (empty array / `null` on failure) at each method in the Prisma provider

## 3. Import-time categorizer doc comments

- [x] 3.1 Verify/strengthen the ordering-invariant comments in `packages/jobs/src/lib/smart-categorizer.ts` (kids→women→men, accessories→clothing→footwear, most-specific footwear first)
- [x] 3.2 Add a header comment to `packages/jobs/src/lib/flexoffers-categories.ts` describing the FlexOffers `CategoryId` → site `{category, sub_category, gender}` mapping and where it is consumed

## 4. Verification

- [x] 4.1 Confirm comments-only diff — run the API typecheck/build and ensure no logic or signatures changed
- [x] 4.2 Cross-check each `product-categories` spec scenario against the current code behavior and correct any mismatch in the spec
