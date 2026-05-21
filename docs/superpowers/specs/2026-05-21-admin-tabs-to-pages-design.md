# Admin Panel: Tabs → URL-based Pages

**Date:** 2026-05-21
**Status:** Approved

## Problem

`apps/admin/app/admin/page.tsx` is 2645 lines — a single monolithic file with 8 tabs, all state, and all logic. There are no URLs per tab, no lazy loading, and the file is hard to maintain.

## Goal

Split each tab into its own Next.js page under `/admin/<tab>`, linked to a URL. Navigation stays at the top (horizontal tab bar). Dead code is removed in the process.

## Approach

Each tab becomes a standalone `"use client"` page with its own local state and data fetching. No shared context or server components. Simple, independent pages.

## File Structure

```
apps/admin/app/admin/
├── layout.tsx          ← updated: adds TabNav below the existing nav-strip
├── page.tsx            ← replaced: redirect("/admin/status")
├── status/page.tsx     ← Daily Sync control, sync log, stats, feed status table
├── feeds/page.tsx      ← Upload advertisers CSV, feeds table with sort/filter
├── import/page.tsx     ← Import by feed card, batch import
├── products/page.tsx   ← Grouping, Categorization, Fix Categories (dead tools removed)
├── archive/page.tsx    ← Archived products list, restore
├── performance/page.tsx ← DB stats, indexes table
├── grouping/page.tsx   ← Renormalize: Preview / Apply to Feed / Fix Sale Flags / Rebuild Groups
├── jobs/page.tsx       ← JobsTab component (already exists)
└── login/page.tsx      ← unchanged
```

Deleted:
- `apps/admin/app/admin/pipeline/page.tsx` — orphaned page, broken API calls, not linked from nav

## Navigation

`layout.tsx` gains a `TabNav` client component (needs `usePathname()`). The rest of layout stays a server component.

```ts
const TABS = [
  { label: "Status",      href: "/admin/status" },
  { label: "Feeds",       href: "/admin/feeds" },
  { label: "Import",      href: "/admin/import" },
  { label: "Products",    href: "/admin/products" },
  { label: "Archive",     href: "/admin/archive" },
  { label: "Performance", href: "/admin/performance" },
  { label: "Grouping",    href: "/admin/grouping" },
  { label: "Jobs",        href: "/admin/jobs" },
]
```

Active tab detected via `pathname.startsWith(tab.href)`.

## State

Each page manages its own local state. No state is shared between pages. Navigating between tabs resets state (same as current behavior on reload). Each page fetches its own data on mount.

## Dead Code Removed During Migration

These UI sections call API routes that do not exist — they are removed, not migrated:

| UI Section | Broken call | Action |
|---|---|---|
| Upload Custom CSV Feed | `POST /api/admin/import-csv` | Remove |
| Smart Categorization (3 buttons) | `POST /api/admin/housekeeping/categorize` | Remove |
| Fix Parent Slugs | `POST /api/admin/fix-parent-slugs` | Remove |
| Normalize Product IDs | `POST /api/admin/normalize-product-ids` | Remove |
| Run Smart Categorization | `POST /api/admin/smart-categorize` | Remove |
| Normalization Tester | `GET /api/admin/normalize-demo` | Remove |
| `selectedFeedId` + `importFeed()` | never called from UI | Remove |

## What Is Not Changed

- `JobsTab.tsx` — already a separate component, imported into `jobs/page.tsx`
- `login/page.tsx` — untouched
- `lib/feeds.ts`, `lib/shared/` — shared utilities, stay as-is
- Auth middleware in `layout.tsx` — untouched
