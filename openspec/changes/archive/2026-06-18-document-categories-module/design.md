## Context

The categories module spans three layers in `apps/api` plus two import-time helpers in `packages/jobs`:

- **HTTP**: `apps/api/src/routes/categories.ts` (`/api/categories`, `/api/nav-categories`) and the admin maintenance route `apps/api/src/routes/admin/fix-categories.ts`.
- **Contract**: `apps/api/src/dal/category.ts` — the `CategoriesDAL` interface and `Category` / `CategoryListParams` / `NavCategoryCount` types.
- **Provider**: `apps/api/src/dal/providers/prisma/categories.ts` — raw `$queryRaw` SQL with a shared `WITH_COUNT` join.
- **Import**: `packages/jobs/src/lib/smart-categorizer.ts` (keyword classifier) and `packages/jobs/src/lib/flexoffers-categories.ts` (feed id → site mapping).

Several behaviors are non-obvious and unwritten: snake_case field naming exists so rows feed page templates directly; `product_count` (stored) and `computed_product_count` (live join) coexist; error paths silently return empties; and keyword check order is load-bearing. This change records that knowledge without altering runtime behavior.

## Goals / Non-Goals

**Goals:**
- Produce a single authoritative reference (the `product-categories` spec) describing the module's observable behavior.
- Add targeted doc comments at the non-obvious points in the source so future edits preserve invariants.
- Keep the documentation testable — each spec scenario maps to existing behavior.

**Non-Goals:**
- No logic, signature, SQL, API, or schema changes.
- No new tests, dependencies, or refactors (e.g. not "fixing" the swallowed errors or the `any`-typed rows).
- Not documenting unrelated DAL modules (products, variants) beyond what categories touches.

## Decisions

- **Treat documentation as a spec capability, not just prose.** The OpenSpec `product-categories` spec is the source of truth; doc comments in code reference/echo it. Rationale: a spec is verifiable and survives refactors; scattered comments alone drift. Alternative considered: a standalone `README.md` in the module — rejected because it isn't wired into the spec workflow and duplicates the contract already encoded in types.
- **Document behavior as-is, including quirks.** Record the silent empty-array error handling and the `product_count` vs `computed_product_count` split as intended contract rather than flagging them as bugs. Rationale: page templates and callers already depend on these; changing them is a separate proposal.
- **Keep code comments minimal and placed at decision points.** Comment the keyword-order invariants, the `"root"` sentinel, the `WITH_COUNT` join intent, and the two count fields — not every line. Rationale: matches existing comment density in the files.

## Risks / Trade-offs

- **Docs drift from code over time** → Encode the contract in the spec (checked into `openspec/`) and add only invariant-level code comments, which are cheaper to keep accurate than line-by-line prose.
- **Readers mistake documented quirks for endorsed design** → Design doc explicitly labels the swallowed errors and dual count fields as current contract, with changes deferred to a follow-up proposal.
- **Comment churn in shared files** → Limit edits to comment-only additions at a few hotspots to minimize diff noise and merge conflicts.
