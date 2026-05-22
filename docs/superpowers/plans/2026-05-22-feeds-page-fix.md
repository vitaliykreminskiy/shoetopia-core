# Feeds Page Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the Feeds admin page so it shows feeds from the DB by adding explicit error handling, then decompose the 554-line monolith into four focused components.

**Architecture:** All state and async logic stays in `page.tsx` (orchestrator). Three stateless components receive data and callbacks via props: `FeedImportGrid` (card grid), `FeedStatsBar` (stat tiles), `FeedTable` (management table + CSV upload). A shared `types.ts` defines `FeedRow`, `FeedStats`, and `SortBy`. Import grid appears before the table — it's the primary action.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Create shared types

**Files:**
- Create: `apps/admin/app/admin/feeds/types.ts`

- [ ] **Step 1: Create `types.ts`**

```ts
export type SortBy = "pending" | "products" | "name" | "imported";

export interface FeedRow {
  id: number;
  program_id: number;
  program_name: string;
  catalog_name: string | null;
  https_link: string | null;
  country: string;
  region: string;
  total_products: number;
  status: string;
  last_imported_at: string | null;
  products_imported: number;
  product_count: number;
  live_count: number;
  in_stock_count: number;
}

export interface FeedStats {
  total_feeds: number;
  processed_feeds: number;
  pending_feeds: number;
  total_available_products: number;
  total_imported_products: number;
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd apps/admin && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/admin/feeds/types.ts
git commit -m "feat(admin/feeds): add shared types file"
```

---

### Task 2: Create FeedStatsBar component

**Files:**
- Create: `apps/admin/app/admin/feeds/feed-stats-bar.tsx`

- [ ] **Step 1: Create `feed-stats-bar.tsx`**

```tsx
"use client";

import type { FeedStats } from "./types";

interface FeedStatsBarProps {
  stats: FeedStats;
}

export const FeedStatsBar = ({ stats }: FeedStatsBarProps) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Total Advertisers</div>
      <div className="text-3xl font-bold">{stats.total_feeds || 0}</div>
    </div>
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Processed</div>
      <div className="text-3xl font-bold text-green-400">
        {stats.processed_feeds || 0}
      </div>
    </div>
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Pending</div>
      <div className="text-3xl font-bold text-orange-400">
        {stats.pending_feeds || 0}
      </div>
    </div>
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Available Products</div>
      <div className="text-2xl font-bold text-blue-400">
        {Number(stats.total_available_products || 0).toLocaleString()}
      </div>
    </div>
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Imported Products</div>
      <div className="text-2xl font-bold text-purple-400">
        {Number(stats.total_imported_products || 0).toLocaleString()}
      </div>
    </div>
  </div>
);
```

- [ ] **Step 2: TypeScript check**

```bash
cd apps/admin && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/admin/feeds/feed-stats-bar.tsx
git commit -m "feat(admin/feeds): add FeedStatsBar component"
```

---

### Task 3: Create FeedImportGrid component

**Files:**
- Create: `apps/admin/app/admin/feeds/feed-import-grid.tsx`

- [ ] **Step 1: Create `feed-import-grid.tsx`**

```tsx
"use client";

import type { FeedRow } from "./types";

interface BatchProgress {
  current: number;
  total: number;
  currentFeed: string;
}

interface FeedImportGridProps {
  feeds: FeedRow[];
  selectedIds: Set<number>;
  importing: boolean;
  importingFeedId: number | null;
  batchImporting: boolean;
  batchProgress: BatchProgress;
  onToggleSelect: (id: number) => void;
  onClearSelection: () => void;
  onImportOne: (id: number) => Promise<void>;
  onImportSelected: () => Promise<void>;
}

export const FeedImportGrid = ({
  feeds,
  selectedIds,
  importing,
  importingFeedId,
  batchImporting,
  batchProgress,
  onToggleSelect,
  onClearSelection,
  onImportOne,
  onImportSelected,
}: FeedImportGridProps) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Import Products</h2>

    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-4">
        <span className="text-neutral-400 text-sm">
          {selectedIds.size} feed{selectedIds.size !== 1 ? "s" : ""} selected
        </span>
        {selectedIds.size > 0 && (
          <button
            onClick={onClearSelection}
            className="text-sm text-neutral-500 hover:text-white"
          >
            Clear selection
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        {batchImporting && (
          <span className="text-sm text-blue-400">
            Importing {batchProgress.current}/{batchProgress.total}:{" "}
            {batchProgress.currentFeed}...
          </span>
        )}
        <button
          onClick={onImportSelected}
          disabled={selectedIds.size === 0 || batchImporting}
          className={`px-6 py-2 rounded font-medium transition-colors ${
            selectedIds.size === 0 || batchImporting
              ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 text-white"
          }`}
        >
          {batchImporting
            ? "Importing..."
            : `Import Selected (${selectedIds.size})`}
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...feeds]
        .sort((a, b) => a.product_count - b.product_count)
        .map((feed) => {
          const isImporting = importing && importingFeedId === feed.program_id;
          const isSelected = selectedIds.has(feed.program_id);

          return (
            <div
              key={feed.program_id}
              className={`bg-neutral-900 border rounded-lg p-5 flex flex-col cursor-pointer transition-colors ${
                isSelected
                  ? "border-green-500 bg-green-900/10"
                  : "border-neutral-800 hover:border-neutral-700"
              }`}
              onClick={() => onToggleSelect(feed.program_id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(feed.program_id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-green-500 focus:ring-green-500 focus:ring-offset-0"
                  />
                  <div>
                    <h3 className="font-semibold text-white">
                      {feed.program_name}
                    </h3>
                    <span className="text-xs text-neutral-500 uppercase">
                      {feed.country}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xl font-bold ${feed.product_count === 0 ? "text-orange-400" : "text-white"}`}
                  >
                    {feed.product_count}
                  </div>
                  <div className="text-xs text-neutral-500">in database</div>
                </div>
              </div>

              <div className="bg-neutral-800/50 rounded p-2 mb-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">In feed source:</span>
                  <span className="font-bold text-purple-400">
                    {feed.total_products.toLocaleString()}
                  </span>
                </div>
                {feed.product_count < feed.total_products && (
                  <div className="text-xs text-yellow-400 mt-1">
                    +{(feed.total_products - feed.product_count).toLocaleString()}{" "}
                    new products available
                  </div>
                )}
              </div>

              <div className="flex gap-4 text-sm mb-4">
                <div>
                  <span className="text-green-400 font-medium">
                    {feed.live_count}
                  </span>
                  <span className="text-neutral-500 ml-1">live</span>
                </div>
                <div>
                  <span className="text-blue-400 font-medium">
                    {feed.in_stock_count}
                  </span>
                  <span className="text-neutral-500 ml-1">in stock</span>
                </div>
              </div>

              <div className="text-xs text-neutral-500 mb-4">
                <div className="flex justify-between">
                  <span>Last imported:</span>
                  <span>
                    {feed.last_imported_at
                      ? new Date(feed.last_imported_at).toLocaleString()
                      : "Never"}
                  </span>
                </div>
              </div>

              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  await onImportOne(feed.program_id);
                }}
                disabled={isImporting || batchImporting}
                className={`mt-auto w-full py-2.5 rounded font-medium transition-colors ${
                  isImporting || batchImporting
                    ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                {isImporting ? "Importing..." : "Import"}
              </button>
            </div>
          );
        })}
    </div>
  </div>
);
```

- [ ] **Step 2: TypeScript check**

```bash
cd apps/admin && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/admin/feeds/feed-import-grid.tsx
git commit -m "feat(admin/feeds): add FeedImportGrid component"
```

---

### Task 4: Create FeedTable component

**Files:**
- Create: `apps/admin/app/admin/feeds/feed-table.tsx`

- [ ] **Step 1: Create `feed-table.tsx`**

```tsx
"use client";

import { useState } from "react";
import type { FeedRow, SortBy } from "./types";

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

export const FeedTable = ({
  feeds,
  loading,
  sortBy,
  filterCountry,
  onSortChange,
  onFilterChange,
  onRefresh,
  onUploadCSV,
}: FeedTableProps) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const file = (
      document.getElementById("feeds-csv-upload") as HTMLInputElement
    )?.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const text = await file.text();
      await onUploadCSV(text);
      (
        document.getElementById("feeds-csv-upload") as HTMLInputElement
      ).value = "";
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Upload Advertiser Feeds CSV</h3>
        <p className="text-sm text-neutral-400 mb-4">
          Upload your FlexOffers export CSV with columns: Id, ProgramName,
          HTTPSLink, TotalProducts, Status, etc.
        </p>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <input
              type="file"
              accept=".csv"
              id="feeds-csv-upload"
              className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading || loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 rounded font-medium"
          >
            {uploading ? "Uploading..." : "Upload Feeds"}
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div>
          <label className="text-sm text-neutral-400 mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded text-white"
          >
            <option value="pending">Pending First</option>
            <option value="products">Most Products</option>
            <option value="name">Name A-Z</option>
            <option value="imported">Recently Imported</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-neutral-400 mr-2">Country:</label>
          <select
            value={filterCountry}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded text-white"
          >
            <option value="all">All</option>
            <option value="US">US Only</option>
            <option value="CA">Canada</option>
            <option value="GB">UK</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-sm"
        >
          Refresh
        </button>
      </div>

      {loading && feeds.length === 0 ? (
        <div className="text-center py-12 text-neutral-400">
          Loading feeds...
        </div>
      ) : (
        <div className="bg-neutral-900 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-800">
              <tr>
                <th className="px-4 py-3 text-left">Advertiser</th>
                <th className="px-4 py-3 text-left">Country</th>
                <th className="px-4 py-3 text-right">Available</th>
                <th className="px-4 py-3 text-right">Imported</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Last Imported</th>
                <th className="px-4 py-3 text-left">HTTPS Link</th>
              </tr>
            </thead>
            <tbody>
              {feeds.map((feed) => (
                <tr
                  key={feed.program_id}
                  className={`border-t border-neutral-800 ${!feed.last_imported_at ? "bg-orange-900/10" : ""}`}
                >
                  <td className="px-4 py-3 font-medium">
                    {feed.program_name}
                    {feed.catalog_name &&
                      feed.catalog_name !== feed.program_name && (
                        <span className="text-neutral-500 text-xs block">
                          {feed.catalog_name}
                        </span>
                      )}
                  </td>
                  <td className="px-4 py-3">{feed.country}</td>
                  <td className="px-4 py-3 text-right">
                    {(feed.total_products || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-green-400">
                    {(feed.products_imported || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        feed.last_imported_at
                          ? "bg-green-900/50 text-green-300"
                          : feed.status === "ready"
                            ? "bg-blue-900/50 text-blue-300"
                            : "bg-orange-900/50 text-orange-300"
                      }`}
                    >
                      {feed.last_imported_at
                        ? "Processed"
                        : feed.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {feed.last_imported_at
                      ? new Date(feed.last_imported_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {feed.https_link ? (
                      <a
                        href={feed.https_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs truncate block max-w-50"
                        title={feed.https_link}
                      >
                        Download Feed
                      </a>
                    ) : (
                      <span className="text-neutral-500 text-xs">No link</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: TypeScript check**

```bash
cd apps/admin && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/admin/feeds/feed-table.tsx
git commit -m "feat(admin/feeds): add FeedTable component"
```

---

### Task 5: Refactor page.tsx into orchestrator

**Files:**
- Modify: `apps/admin/app/admin/feeds/page.tsx` (full replacement)

- [ ] **Step 1: Replace `feeds/page.tsx` with the orchestrator**

Replace the entire file contents with:

```tsx
"use client";

import { useState, useEffect } from "react";
import type { FeedRow, FeedStats, SortBy } from "./types";
import { FeedStatsBar } from "./feed-stats-bar";
import { FeedTable } from "./feed-table";
import { FeedImportGrid } from "./feed-import-grid";

export default function FeedsPage() {
  const [feedsData, setFeedsData] = useState<{
    feeds: FeedRow[];
    stats: FeedStats;
  } | null>(null);
  const [feedsLoading, setFeedsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedsSortBy, setFeedsSortBy] = useState<SortBy>("pending");
  const [feedsFilterCountry, setFeedsFilterCountry] = useState<string>("all");
  const [message, setMessage] = useState("");

  const [importing, setImporting] = useState(false);
  const [importingFeedId, setImportingFeedId] = useState<number | null>(null);
  const [batchImporting, setBatchImporting] = useState(false);
  const [batchProgress, setBatchProgress] = useState({
    current: 0,
    total: 0,
    currentFeed: "",
  });
  const [selectedFeedIds, setSelectedFeedIds] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    setFeedsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/import-feeds");
      if (!res.ok)
        throw new Error(`API error ${res.status}: ${await res.text()}`);
      const data = await res.json();
      setFeedsData(data);
    } catch (e: any) {
      setError(e.message);
    }
    setFeedsLoading(false);
  };

  const toggleFeedSelection = (programId: number) => {
    setSelectedFeedIds((prev) => {
      const next = new Set(prev);
      if (next.has(programId)) next.delete(programId);
      else next.add(programId);
      return next;
    });
  };

  const importOne = async (feedId: number) => {
    const feed = feedsData?.feeds?.find((f) => f.program_id === feedId);
    setImportingFeedId(feedId);
    setImporting(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedId }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(
          `Imported ${data.imported} products from ${feed?.program_name}`,
        );
        await loadFeeds();
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setMessage(`Error: ${e.message}`);
    }
    setImporting(false);
    setImportingFeedId(null);
  };

  const importSelected = async () => {
    if (selectedFeedIds.size === 0) {
      setMessage("Select at least one feed");
      return;
    }
    setBatchImporting(true);
    setMessage("");
    const feedIds = Array.from(selectedFeedIds);
    let totalImported = 0;
    let totalSkipped = 0;

    for (let i = 0; i < feedIds.length; i++) {
      const feedId = feedIds[i];
      const feed = feedsData?.feeds?.find((f) => f.program_id === feedId);
      setBatchProgress({
        current: i + 1,
        total: feedIds.length,
        currentFeed: feed?.program_name || "",
      });
      try {
        const res = await fetch("/api/admin/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedId }),
        });
        const data = await res.json();
        if (data.success) {
          totalImported += data.imported || 0;
          totalSkipped += data.skipped || 0;
        }
      } catch (e) {
        console.error(`Error importing feed ${feedId}:`, e);
      }
    }

    await loadFeeds();
    setMessage(
      `Batch import complete: ${totalImported} imported, ${totalSkipped} skipped across ${feedIds.length} feeds`,
    );
    setSelectedFeedIds(new Set());
    setBatchImporting(false);
    setBatchProgress({ current: 0, total: 0, currentFeed: "" });
  };

  const uploadCSV = async (text: string) => {
    setFeedsLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/import-feeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvText: text }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(
          `Imported ${data.imported} new feeds, updated ${data.updated} existing`,
        );
        await loadFeeds();
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setMessage(`Error: ${e.message}`);
    }
    setFeedsLoading(false);
  };

  const sortedFilteredFeeds =
    feedsData?.feeds
      ?.filter(
        (f) => feedsFilterCountry === "all" || f.country === feedsFilterCountry,
      )
      .sort((a, b) => {
        if (feedsSortBy === "pending") {
          if (!a.last_imported_at && b.last_imported_at) return -1;
          if (a.last_imported_at && !b.last_imported_at) return 1;
          return b.total_products - a.total_products;
        }
        if (feedsSortBy === "products")
          return b.total_products - a.total_products;
        if (feedsSortBy === "name")
          return a.program_name.localeCompare(b.program_name);
        if (feedsSortBy === "imported") {
          if (!a.last_imported_at) return 1;
          if (!b.last_imported_at) return -1;
          return (
            new Date(b.last_imported_at).getTime() -
            new Date(a.last_imported_at).getTime()
          );
        }
        return 0;
      }) ?? [];

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 rounded bg-red-900/30 text-red-300">
          Failed to load feeds: {error}
        </div>
      )}
      {message && (
        <div
          className={`p-4 rounded ${message.includes("Error") ? "bg-red-900/30 text-red-300" : "bg-green-900/30 text-green-300"}`}
        >
          {message}
        </div>
      )}

      {feedsData?.stats && <FeedStatsBar stats={feedsData.stats} />}

      <FeedImportGrid
        feeds={sortedFilteredFeeds}
        selectedIds={selectedFeedIds}
        importing={importing}
        importingFeedId={importingFeedId}
        batchImporting={batchImporting}
        batchProgress={batchProgress}
        onToggleSelect={toggleFeedSelection}
        onClearSelection={() => setSelectedFeedIds(new Set())}
        onImportOne={importOne}
        onImportSelected={importSelected}
      />

      <FeedTable
        feeds={sortedFilteredFeeds}
        loading={feedsLoading}
        sortBy={feedsSortBy}
        filterCountry={feedsFilterCountry}
        onSortChange={setFeedsSortBy}
        onFilterChange={setFeedsFilterCountry}
        onRefresh={loadFeeds}
        onUploadCSV={uploadCSV}
      />
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd apps/admin && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/admin/feeds/page.tsx
git commit -m "refactor(admin/feeds): decompose monolith into focused components, fix error handling"
```

---

### Task 6: Verify build

- [ ] **Step 1: Run Next.js build**

```bash
cd apps/admin && npm run build
```

Expected: Build completes with no TypeScript or compilation errors. You will see output like:
```
✓ Compiled successfully
Route (app) ...
```

If there are errors, fix them before proceeding.

- [ ] **Step 2: Manual smoke test**

Start the admin dev server:

```bash
cd apps/admin && npm run dev
```

Open `http://localhost:3002/admin/feeds`. Verify:
- If the API is reachable: feeds cards and table appear
- If the API is **not** reachable (no Docker): a red error banner appears at the top reading `"Failed to load feeds: API error 502: ..."` or similar — this is the fix working correctly
- The Import Products card grid appears **above** the table
- Selecting cards and clicking "Import Selected" works

- [ ] **Step 3: Commit if any build fixes were needed**

```bash
git add -p
git commit -m "fix(admin/feeds): address build errors"
```
