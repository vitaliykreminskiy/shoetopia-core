# Feeds Page Fix — Design Spec

**Date:** 2026-05-22  
**Status:** Approved

## Problem

`feeds/page.tsx` silently swallows fetch errors (`catch (e) { console.error(e) }`). When `API_URL` is not configured (local dev without Docker), all fetches to `/api/admin/import-feeds` fail and the page renders empty with no explanation. Feeds exist in the DB but appear missing.

Secondary issue: the file is 554 lines — a monolith that mixes data fetching, CSV upload, stats display, table management, and import cards.

## Solution

**Approach B** — fix error handling + decompose into focused components.

## File Structure

```
apps/admin/app/admin/feeds/
  page.tsx              ← data fetching, state, error/loading, passes props down (~80 lines)
  feed-stats-bar.tsx    ← 5 stat tiles (total, processed, pending, available, imported)
  feed-table.tsx        ← sort/filter controls, CSV upload, feeds table
  feed-import-grid.tsx  ← 3-column card grid, batch controls, individual import buttons
```

## Data Flow

`page.tsx` owns all state and async logic. Components are stateless and receive data + callbacks via props.

```
page.tsx
  ├── feedsData, loading, error  (state)
  ├── selectedFeedIds, importing, batchProgress  (state)
  ├── loadFeeds(), importOne(), importSelected(), uploadCSV()  (handlers)
  │
  ├── <FeedStatsBar stats={feedsData.stats} />
  ├── <FeedImportGrid feeds={sortedFilteredFeeds} selectedIds=... onImportOne=... />
  └── <FeedTable feeds={sortedFilteredFeeds} onUploadCSV=... sortBy=... />
```

## Error Handling

`loadFeeds` gains an explicit `error` state:

```ts
const [error, setError] = useState<string | null>(null);

const loadFeeds = async () => {
  setFeedsLoading(true);
  setError(null);
  try {
    const res = await fetch("/api/admin/import-feeds");
    if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
    const data = await res.json();
    setFeedsData(data);
  } catch (e: any) {
    setError(e.message);
  }
  setFeedsLoading(false);
};
```

If `error` is set, a red banner is shown at the top of the page with the error message. This immediately surfaces whether the issue is `API_URL` misconfiguration, auth (401), or something else.

## Component Interfaces

### FeedStatsBar

```ts
interface FeedStatsBarProps {
  stats: FeedStats;
}
```

Renders the 5 stat tiles. No actions.

### FeedTable

```ts
interface FeedTableProps {
  feeds: FeedRow[];
  loading: boolean;
  sortBy: SortBy;
  filterCountry: string;
  onSortChange: (v: SortBy) => void;
  onFilterChange: (v: string) => void;
  onRefresh: () => void;
  onUploadCSV: (text: string) => Promise<void>;
}
```

Contains: sort/filter dropdowns, Refresh button, CSV upload widget, feeds table rows. Does not sort or filter itself — receives already-sorted data.

### FeedImportGrid

```ts
interface FeedImportGridProps {
  feeds: FeedRow[];
  selectedIds: Set<number>;
  importing: boolean;
  importingFeedId: number | null;
  batchImporting: boolean;
  batchProgress: { current: number; total: number; currentFeed: string };
  onToggleSelect: (id: number) => void;
  onClearSelection: () => void;
  onImportOne: (id: number) => Promise<void>;
  onImportSelected: () => Promise<void>;
}
```

Renders batch controls bar + 3-column card grid. Cards are selectable (checkbox + click). Each card has an individual Import button. Does not own any async state.

## Page Layout Order

1. Error banner (if error)
2. Message banner (success/info)
3. **FeedImportGrid** — primary action, shown first
4. FeedStatsBar — summary numbers
5. FeedTable — management, CSV upload, full list

Import grid comes before the table because importing is the primary action on this page.

## Out of Scope

- Changing the API auth mechanism
- Adding server-side rendering / Next.js API route proxy
- Any changes to the Fastify backend
