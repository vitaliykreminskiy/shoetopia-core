# Feeds + Import Merge Design

**Date:** 2026-05-21  
**Status:** Approved

## Summary

Merge the Import tab into the Feeds tab. Feeds are stored exclusively in the DB (`feeds` table). Hardcoded `FEEDS` array is replaced by DB records seeded from the current constant. CSV upload remains as the mechanism for adding/updating feeds from FlexOffers exports.

## Database

### Migration
Add `region VARCHAR(10)` column to `feeds` table (currently missing, present in `FEEDS` constant).

### Seed
Create `packages/db/prisma/seed.ts` that upserts all current `FEEDS` entries into the `feeds` table:
- `program_id` ← `Feed.id`
- `program_name` ← `Feed.name`
- `https_link` ← generated URL via `feedLinkFactory`
- `total_products` ← `Feed.sourceCount`
- `country`, `region`, `status = 'ready'`, `is_active = true`

CSV upload upserts by `program_id` — no conflict with seeded data.

## Backend

### `apps/api/src/lib/import-feed.ts`
Replace `FEEDS.find(f => f.id === feedId)` with:
```ts
const feed = await prisma.feed.findUnique({ where: { programId: feedId } })
```
URL comes from `feed.httpsLink` instead of `feed.url`.

### `apps/api/src/routes/admin/import.ts`
Replace all `FEEDS` references:
- Single feed lookup: `prisma.feed.findUnique({ where: { programId: feedId } })`
- Import-all: `prisma.feed.findMany({ where: { isActive: true } })`

### `apps/api/src/lib/feeds.ts`
Remove `FEEDS` array and `Feed` interface. Keep: `REGIONS`, `CURRENCY`, `getRegionFromCountry`, `getFeedsByRegion`.

## Frontend

### `apps/admin/app/admin/feeds/page.tsx`
Extended with a second section below the existing table:
- Section header: "Import Products"
- Batch controls bar (N feeds selected, Clear, Import Selected button)
- Feed cards grid (same cards as current Import page)
- Cards data sourced from the existing `/api/admin/import-feeds` GET response (extended if needed with `live_count`, `in_stock_count`, `last_auto_import`)

### `apps/admin/app/admin/import/page.tsx`
Deleted.

### `apps/admin/app/admin/layout.tsx`
Remove Import link from navigation.

### `apps/admin/lib/feeds.ts`
Remove `FEEDS` array and `Feed` interface (only used by Import page).

## Data Flow

```
User opens Feeds page
  → GET /api/admin/import-feeds (loads feeds table)
  → Renders table (top) + import cards (bottom)

User clicks Import on a card
  → POST /api/admin/import { feedId }
  → importFeedById reads URL from prisma.feed
  → Fetches CSV from FlexOffers, imports products
  → Updates feeds.last_imported_at, feeds.products_imported

User uploads FlexOffers CSV
  → POST /api/admin/import-feeds (multipart)
  → Upserts feeds by program_id
  → Reloads page data
```

## Out of Scope
- `advertisers` table — unchanged, used for promotions/coupon pages
- `sourceCount` staleness — `total_products` updated on CSV upload, not on every import
