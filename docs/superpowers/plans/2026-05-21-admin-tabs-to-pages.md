# Admin Tabs → URL Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the 2645-line monolithic `apps/admin/app/admin/page.tsx` into 8 independent Next.js pages under `/admin/<tab>`, each with its own URL, local state, and data fetching.

**Architecture:** Each tab becomes a standalone `"use client"` page. Navigation (horizontal tab bar) lives in `layout.tsx` via a `TabNav` client component. `page.tsx` becomes a redirect to `/admin/status`. Dead UI sections that call non-existent API routes are removed during migration.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, Tailwind CSS, `next/navigation` (`usePathname`, `redirect`, `Link`)

---

## File Map

| File | Action | Notes |
|---|---|---|
| `apps/admin/app/admin/layout.tsx` | Modify | Add `TabNav` component + tab strip |
| `apps/admin/app/admin/page.tsx` | Replace | `redirect("/admin/status")` only |
| `apps/admin/app/admin/status/page.tsx` | Create | Daily Sync, sync log, stats, feed status table |
| `apps/admin/app/admin/feeds/page.tsx` | Create | Upload advertisers CSV, feeds table |
| `apps/admin/app/admin/import/page.tsx` | Create | Feed cards, batch import (no CSV upload) |
| `apps/admin/app/admin/products/page.tsx` | Create | Grouping, Categorization, Fix Categories only |
| `apps/admin/app/admin/archive/page.tsx` | Create | Archived products, restore |
| `apps/admin/app/admin/performance/page.tsx` | Create | DB stats, indexes |
| `apps/admin/app/admin/grouping/page.tsx` | Create | Renormalize flow |
| `apps/admin/app/admin/jobs/page.tsx` | Create | Wraps existing `JobsTab` |
| `apps/admin/app/admin/pipeline/page.tsx` | Delete | Orphaned, broken, not linked |

---

### Task 1: Update layout.tsx — add TabNav

**Files:**
- Modify: `apps/admin/app/admin/layout.tsx`

- [ ] **Step 1: Replace layout.tsx with version that includes TabNav**

```tsx
// apps/admin/app/admin/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Database, ArrowLeft } from "lucide-react";
import { TabNav } from "./TabNav";

export const metadata: Metadata = {
  title: "Admin — Shoetopia",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav strip */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Database size={16} className="text-[var(--brand-rose)]" />
            <span className="text-sm font-semibold text-foreground">
              Shoetopia Admin
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> Back to site
          </Link>
        </div>
      </div>

      {/* Tab navigation */}
      <TabNav />

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create TabNav client component**

Create `apps/admin/app/admin/TabNav.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Status", href: "/admin/status" },
  { label: "Feeds", href: "/admin/feeds" },
  { label: "Import", href: "/admin/import" },
  { label: "Products", href: "/admin/products" },
  { label: "Archive", href: "/admin/archive" },
  { label: "Performance", href: "/admin/performance" },
  { label: "Grouping", href: "/admin/grouping" },
  { label: "Jobs", href: "/admin/jobs" },
];

export function TabNav() {
  const pathname = usePathname();
  return (
    <div className="border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1">
        {TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-5 py-3 text-sm font-medium capitalize transition-colors ${
              pathname.startsWith(tab.href)
                ? "border-b-2 border-blue-500 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/admin/layout.tsx apps/admin/app/admin/TabNav.tsx
git commit -m "feat(admin): add TabNav to layout, tab strip with URL-based active state"
```

---

### Task 2: Replace page.tsx with redirect

**Files:**
- Modify: `apps/admin/app/admin/page.tsx`

- [ ] **Step 1: Replace entire file content**

```tsx
// apps/admin/app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/status");
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/page.tsx
git commit -m "feat(admin): redirect /admin → /admin/status"
```

---

### Task 3: Create status/page.tsx

Source lines in original `page.tsx`: 300–613 (Status Tab block).

**Files:**
- Create: `apps/admin/app/admin/status/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
// apps/admin/app/admin/status/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function StatusPage() {
  const [status, setStatus] = useState<any>(null);
  const [syncLog, setSyncLog] = useState<any[]>([]);
  const [syncLogLoading, setSyncLogLoading] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [reprocessing, setReprocessing] = useState(false);
  const [reprocessRunId, setReprocessRunId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    refreshStatus();
  }, []);

  async function refreshStatus() {
    try {
      const res = await fetch("/api/admin/status");
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadSyncLog() {
    setSyncLogLoading(true);
    try {
      const res = await fetch("/api/admin/sync-log");
      const data = await res.json();
      if (data.success) setSyncLog(data.logs);
    } catch (e) {
      console.error(e);
    }
    setSyncLogLoading(false);
  }

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded ${message.includes("Error") || message.includes("Failed") ? "bg-red-900/30 text-red-300" : "bg-green-900/30 text-green-300"}`}
        >
          {message}
        </div>
      )}

      {/* Daily Sync Control */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Daily Sync</h3>
            <p className="text-sm text-neutral-400">
              Runs automatically every day at{" "}
              <span className="text-white font-medium">10:30 PM PST</span>{" "}
              (6:30 AM UTC). Imports all feeds, hides stale products, fixes
              gender/grouping, and promotes to live.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={loadSyncLog}
              disabled={syncLogLoading}
              className="px-3 py-2 rounded text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              {syncLogLoading ? "Loading..." : "Refresh Log"}
            </button>
            <button
              onClick={async () => {
                if (
                  !confirm(
                    "Trigger a full sync now? This runs in the background — check the sync log for progress.",
                  )
                )
                  return;
                setTriggering(true);
                try {
                  const res = await fetch("/api/cron/daily-sync", {
                    method: "POST",
                  });
                  const data = await res.json();
                  setMessage(
                    data.started
                      ? `Sync started in background. Run ID: ${data.runId ?? "—"}. Refresh the sync log in a few minutes.`
                      : `Failed to start sync: ${data.error}`,
                  );
                } catch (e: any) {
                  setMessage(`Error: ${e.message}`);
                }
                setTriggering(false);
              }}
              disabled={triggering}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                triggering
                  ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {triggering ? "Syncing..." : "Run Now"}
            </button>
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs text-center mb-4">
          {[
            "1. Fetch Feeds",
            "2. Upsert Products",
            "3. Hide Stale",
            "4. Fix Gender/Groups",
            "5. Promote to Live",
          ].map((step, i) => (
            <div
              key={i}
              className="bg-neutral-800 rounded px-2 py-2 text-neutral-300"
            >
              {step}
            </div>
          ))}
        </div>

        {/* Sync log */}
        {syncLog.length === 0 && !syncLogLoading ? (
          <p className="text-sm text-neutral-500 text-center py-4">
            No sync history yet.{" "}
            <button
              onClick={loadSyncLog}
              className="text-blue-400 hover:underline"
            >
              Load history
            </button>
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-neutral-800 text-neutral-400">
                <tr>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-right">Feeds</th>
                  <th className="px-3 py-2 text-right">Imported</th>
                  <th className="px-3 py-2 text-right">Stale Hidden</th>
                  <th className="px-3 py-2 text-right">Duration</th>
                  <th className="px-3 py-2 text-right">Errors</th>
                </tr>
              </thead>
              <tbody>
                {syncLog.map((row: any) => (
                  <tr key={row.run_id} className="border-t border-neutral-800">
                    <td className="px-3 py-2 text-neutral-300">
                      {new Date(row.started_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-2 text-right">{row.feeds_synced}</td>
                    <td className="px-3 py-2 text-right text-green-400">
                      {Number(row.total_imported).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right text-orange-400">
                      {row.stale_hidden}
                    </td>
                    <td className="px-3 py-2 text-right text-neutral-400">
                      {(row.duration_ms / 1000).toFixed(0)}s
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span
                        className={
                          row.error_count > 0
                            ? "text-red-400"
                            : "text-neutral-500"
                        }
                      >
                        {row.error_count}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reprocess All Products */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Reprocess All Products</h3>
            <p className="text-sm text-neutral-400">
              Runs gender correction, grouping, and promote/hide logic across
              all{" "}
              <span className="text-white font-medium">existing products</span>.
              Use after changing categorization logic or to fix historical
              misclassifications. Runs as a background workflow — no timeout
              risk.
            </p>
            {reprocessRunId && (
              <p className="text-xs text-green-400 mt-2">
                Workflow started. Run ID:{" "}
                <code className="font-mono">{reprocessRunId}</code>
              </p>
            )}
          </div>
          <button
            onClick={async () => {
              if (
                !confirm(
                  "This will reprocess gender, grouping, and visibility for ALL products. It runs in the background — are you sure?",
                )
              )
                return;
              setReprocessing(true);
              setReprocessRunId(null);
              try {
                const res = await fetch("/api/admin/reprocess-all", {
                  method: "POST",
                });
                const data = await res.json();
                if (data.started) {
                  setReprocessRunId(data.runId);
                  setMessage(
                    `Reprocess started in background. Run ID: ${data.runId}`,
                  );
                } else {
                  setMessage(`Failed to start reprocess: ${data.error}`);
                }
              } catch (e: any) {
                setMessage(`Error: ${e.message}`);
              }
              setReprocessing(false);
            }}
            disabled={reprocessing}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors shrink-0 ${
              reprocessing
                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-500 text-white"
            }`}
          >
            {reprocessing ? "Starting..." : "Reprocess All"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 p-4 rounded">
          <div className="text-neutral-400 text-sm">Total Products</div>
          <div className="text-3xl font-bold">{status?.stats?.total || 0}</div>
        </div>
        <div className="bg-neutral-900 p-4 rounded">
          <div className="text-neutral-400 text-sm">Live</div>
          <div className="text-3xl font-bold text-green-400">
            {status?.stats?.live || 0}
          </div>
        </div>
        <div className="bg-neutral-900 p-4 rounded">
          <div className="text-neutral-400 text-sm">Archived</div>
          <div className="text-3xl font-bold text-orange-400">
            {status?.stats?.archived || 0}
          </div>
        </div>
        <div className="bg-neutral-900 p-4 rounded">
          <div className="text-neutral-400 text-sm">In Stock</div>
          <div className="text-3xl font-bold text-blue-400">
            {status?.stats?.in_stock_count || 0}
          </div>
        </div>
      </div>

      {/* By Category & Gender */}
      <div>
        <h3 className="text-xl font-bold mb-4">By Category & Gender</h3>
        <div className="bg-neutral-900 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-800">
              <tr>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-right">Total</th>
                <th className="px-4 py-2 text-right">Live</th>
              </tr>
            </thead>
            <tbody>
              {status?.categoryBreakdown?.map((row: any) => (
                <tr
                  key={`${row.category}-${row.gender}`}
                  className="border-t border-neutral-800"
                >
                  <td className="px-4 py-2">{row.category}</td>
                  <td className="px-4 py-2">{row.gender || "N/A"}</td>
                  <td className="px-4 py-2 text-right">{row.count}</td>
                  <td className="px-4 py-2 text-right text-green-400">
                    {row.live_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feed Status */}
      <div>
        <h3 className="text-xl font-bold mb-4">Feed Status</h3>
        <div className="bg-neutral-900 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-800">
              <tr>
                <th className="px-4 py-2 text-left">Feed</th>
                <th className="px-4 py-2 text-right">Products</th>
                <th className="px-4 py-2 text-right">Live</th>
                <th className="px-4 py-2 text-right">In Stock</th>
                <th className="px-4 py-2 text-left">Last Imported</th>
              </tr>
            </thead>
            <tbody>
              {status?.feedStats?.map((feed: any) => (
                <tr
                  key={feed.program_id}
                  className="border-t border-neutral-800"
                >
                  <td className="px-4 py-2">{feed.name}</td>
                  <td className="px-4 py-2 text-right">{feed.product_count}</td>
                  <td className="px-4 py-2 text-right text-green-400">
                    {feed.live_count}
                  </td>
                  <td className="px-4 py-2 text-right">{feed.in_stock_count}</td>
                  <td className="px-4 py-2 text-sm text-neutral-400">
                    {feed.last_imported
                      ? new Date(feed.last_imported).toLocaleDateString()
                      : "Never"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/status/page.tsx
git commit -m "feat(admin): status page — daily sync, stats, feed status table"
```

---

### Task 4: Create feeds/page.tsx

Source lines in original `page.tsx`: 615–895 (Feeds Tab block).

**Files:**
- Create: `apps/admin/app/admin/feeds/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
// apps/admin/app/admin/feeds/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function FeedsPage() {
  const [feedsData, setFeedsData] = useState<{ feeds: any[]; stats: any } | null>(null);
  const [feedsLoading, setFeedsLoading] = useState(false);
  const [feedsSortBy, setFeedsSortBy] = useState<"pending" | "products" | "name" | "imported">("pending");
  const [feedsFilterCountry, setFeedsFilterCountry] = useState<string>("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadFeeds();
  }, []);

  async function loadFeeds() {
    setFeedsLoading(true);
    try {
      const res = await fetch("/api/admin/import-feeds");
      const data = await res.json();
      setFeedsData(data);
    } catch (e) {
      console.error(e);
    }
    setFeedsLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Upload Feeds CSV */}
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
            onClick={async () => {
              const file = (
                document.getElementById("feeds-csv-upload") as HTMLInputElement
              )?.files?.[0];
              if (!file) {
                setMessage("Please select a CSV file");
                return;
              }
              setFeedsLoading(true);
              setMessage("");
              try {
                const formData = new FormData();
                formData.append("file", file);
                const res = await fetch("/api/admin/import-feeds", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                if (data.success) {
                  setMessage(
                    `Imported ${data.imported} new feeds, updated ${data.updated} existing`,
                  );
                  await loadFeeds();
                  (
                    document.getElementById(
                      "feeds-csv-upload",
                    ) as HTMLInputElement
                  ).value = "";
                } else {
                  setMessage(`Error: ${data.error}`);
                }
              } catch (e: any) {
                setMessage(`Error: ${e.message}`);
              }
              setFeedsLoading(false);
            }}
            disabled={feedsLoading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 rounded font-medium"
          >
            {feedsLoading ? "Uploading..." : "Upload Feeds"}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded ${message.includes("Error") ? "bg-red-900/30 text-red-300" : "bg-green-900/30 text-green-300"}`}
        >
          {message}
        </div>
      )}

      {/* Stats */}
      {feedsData?.stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Total Advertisers</div>
            <div className="text-3xl font-bold">
              {feedsData.stats.total_feeds || 0}
            </div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Processed</div>
            <div className="text-3xl font-bold text-green-400">
              {feedsData.stats.processed_feeds || 0}
            </div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Pending</div>
            <div className="text-3xl font-bold text-orange-400">
              {feedsData.stats.pending_feeds || 0}
            </div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Available Products</div>
            <div className="text-2xl font-bold text-blue-400">
              {Number(feedsData.stats.total_available_products || 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Imported Products</div>
            <div className="text-2xl font-bold text-purple-400">
              {Number(feedsData.stats.total_imported_products || 0).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Filters & Sort */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="text-sm text-neutral-400 mr-2">Sort by:</label>
          <select
            value={feedsSortBy}
            onChange={(e) => setFeedsSortBy(e.target.value as any)}
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
            value={feedsFilterCountry}
            onChange={(e) => setFeedsFilterCountry(e.target.value)}
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
          onClick={loadFeeds}
          disabled={feedsLoading}
          className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-sm"
        >
          Refresh
        </button>
      </div>

      {/* Feeds Table */}
      {feedsLoading && !feedsData ? (
        <div className="text-center py-12 text-neutral-400">Loading feeds...</div>
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
              {feedsData?.feeds
                ?.filter(
                  (f: any) =>
                    feedsFilterCountry === "all" ||
                    f.country === feedsFilterCountry,
                )
                ?.sort((a: any, b: any) => {
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
                })
                ?.map((feed: any) => (
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
                          className="text-blue-400 hover:text-blue-300 text-xs truncate block max-w-[200px]"
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
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/feeds/page.tsx
git commit -m "feat(admin): feeds page — advertisers table, CSV upload, sort/filter"
```

---

### Task 5: Create import/page.tsx

Source lines in original `page.tsx`: 897–1287 (Import Tab block).
Dead code removed: "Upload Custom CSV Feed" section (calls `/api/admin/import-csv`) and `selectedFeedId`/`importFeed()`.

**Files:**
- Create: `apps/admin/app/admin/import/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
// apps/admin/app/admin/import/page.tsx
"use client";

import { useState, useEffect } from "react";
import { FEEDS } from "@/lib/feeds";

export default function ImportPage() {
  const [status, setStatus] = useState<any>(null);
  const [importing, setImporting] = useState(false);
  const [importingFeedId, setImportingFeedId] = useState<number | null>(null);
  const [importResult, setImportResult] = useState<any>(null);
  const [batchImporting, setBatchImporting] = useState(false);
  const [batchProgress, setBatchProgress] = useState({
    current: 0,
    total: 0,
    currentFeed: "",
  });
  const [selectedFeedIds, setSelectedFeedIds] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState("");

  useEffect(() => {
    refreshStatus();
  }, []);

  async function refreshStatus() {
    try {
      const res = await fetch("/api/admin/status");
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      console.error(e);
    }
  }

  function toggleFeedSelection(feedId: number) {
    setSelectedFeedIds((prev) => {
      const next = new Set(prev);
      if (next.has(feedId)) next.delete(feedId);
      else next.add(feedId);
      return next;
    });
  }

  async function importSelectedFeeds() {
    if (selectedFeedIds.size === 0) {
      setMessage("Select at least one feed");
      return;
    }
    setBatchImporting(true);
    setMessage("");
    setImportResult(null);
    const feedIds = Array.from(selectedFeedIds);
    let totalImported = 0;
    let totalSkipped = 0;
    for (let i = 0; i < feedIds.length; i++) {
      const feedId = feedIds[i];
      const feed = FEEDS.find((f) => f.id === feedId);
      setBatchProgress({
        current: i + 1,
        total: feedIds.length,
        currentFeed: feed?.name || "",
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
    await refreshStatus();
    setMessage(
      `Batch import complete: ${totalImported} products imported, ${totalSkipped} skipped across ${feedIds.length} feeds`,
    );
    setSelectedFeedIds(new Set());
    setBatchImporting(false);
    setBatchProgress({ current: 0, total: 0, currentFeed: "" });
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded ${
            message.startsWith("✓") || message.startsWith("Imported") || message.startsWith("Batch")
              ? "bg-green-900/30 text-green-300"
              : "bg-red-900/30 text-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {importResult && (
        <div className="bg-neutral-900 p-6 rounded">
          <h3 className="text-lg font-bold mb-4">
            {importResult.feed} Import Results
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-neutral-400 text-sm">Imported</div>
              <div className="text-2xl font-bold text-green-400">
                {importResult.imported}
              </div>
            </div>
            <div>
              <div className="text-neutral-400 text-sm">Skipped</div>
              <div className="text-2xl font-bold text-orange-400">
                {importResult.skipped}
              </div>
            </div>
            {importResult.skipReasons && (
              <>
                <div>
                  <div className="text-neutral-400 text-sm">No Stock</div>
                  <div className="text-lg text-neutral-500">
                    {importResult.skipReasons.no_stock}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-400 text-sm">No Price/URL/Image</div>
                  <div className="text-lg text-neutral-500">
                    {importResult.skipReasons.no_price +
                      importResult.skipReasons.no_url +
                      importResult.skipReasons.no_image}
                  </div>
                </div>
                {importResult.skipReasons.insert_error > 0 && (
                  <div className="col-span-2 md:col-span-4 p-3 bg-red-900/30 border border-red-700 rounded">
                    <div className="text-red-300 text-sm font-mono">
                      <strong>
                        Insert Errors: {importResult.skipReasons.insert_error}
                      </strong>
                      {importResult.firstError && (
                        <>
                          <br />
                          First error: {importResult.firstError}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {importResult.columns && (
            <details className="mt-4 text-sm">
              <summary className="cursor-pointer text-neutral-400 hover:text-white">
                Debug: CSV Columns ({importResult.columns.length})
              </summary>
              <div className="mt-2 p-3 bg-neutral-800 rounded overflow-x-auto">
                <div className="text-xs text-neutral-300 font-mono whitespace-pre-wrap">
                  {importResult.columns.join(", ")}
                </div>
                {importResult.sampleRow && (
                  <div className="mt-3 pt-3 border-t border-neutral-700">
                    <div className="text-xs text-neutral-400 mb-1">Sample Row:</div>
                    <pre className="text-xs text-neutral-300 font-mono whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(importResult.sampleRow, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      )}

      {/* Batch Import Controls */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-neutral-400 text-sm">
            {selectedFeedIds.size} feed{selectedFeedIds.size !== 1 ? "s" : ""} selected
          </span>
          {selectedFeedIds.size > 0 && (
            <button
              onClick={() => setSelectedFeedIds(new Set())}
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
            onClick={importSelectedFeeds}
            disabled={selectedFeedIds.size === 0 || batchImporting}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              selectedFeedIds.size === 0 || batchImporting
                ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500 text-white"
            }`}
          >
            {batchImporting
              ? "Importing..."
              : `Import Selected (${selectedFeedIds.size})`}
          </button>
        </div>
      </div>

      {/* Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...FEEDS]
          .map((feed) => ({
            ...feed,
            productCount:
              status?.feedStats?.find(
                (f: any) => f.program_id === feed.id,
              )?.product_count || 0,
          }))
          .sort((a, b) => a.productCount - b.productCount)
          .map((feed) => {
            const feedStatus = status?.feedStats?.find(
              (f: any) => f.program_id === feed.id,
            );
            const isImporting = importing && importingFeedId === feed.id;
            const isSelected = selectedFeedIds.has(feed.id);

            return (
              <div
                key={feed.id}
                className={`bg-neutral-900 border rounded-lg p-5 flex flex-col cursor-pointer transition-colors ${
                  isSelected
                    ? "border-green-500 bg-green-900/10"
                    : "border-neutral-800 hover:border-neutral-700"
                }`}
                onClick={() => toggleFeedSelection(feed.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFeedSelection(feed.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-green-500 focus:ring-green-500 focus:ring-offset-0"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{feed.name}</h3>
                      <span className="text-xs text-neutral-500 uppercase">
                        {feed.country}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xl font-bold ${feed.productCount === 0 ? "text-orange-400" : "text-white"}`}
                    >
                      {feed.productCount}
                    </div>
                    <div className="text-xs text-neutral-500">in database</div>
                  </div>
                </div>

                <div className="bg-neutral-800/50 rounded p-2 mb-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">In feed source:</span>
                    <span className="font-bold text-purple-400">
                      {feed.sourceCount.toLocaleString()}
                    </span>
                  </div>
                  {feed.productCount < feed.sourceCount && (
                    <div className="text-xs text-yellow-400 mt-1">
                      +{(feed.sourceCount - feed.productCount).toLocaleString()}{" "}
                      new products available
                    </div>
                  )}
                </div>

                <div className="flex gap-4 text-sm mb-4">
                  <div>
                    <span className="text-green-400 font-medium">
                      {feedStatus?.live_count || 0}
                    </span>
                    <span className="text-neutral-500 ml-1">live</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium">
                      {feedStatus?.in_stock_count || 0}
                    </span>
                    <span className="text-neutral-500 ml-1">in stock</span>
                  </div>
                </div>

                <div className="text-xs text-neutral-500 mb-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Manual:</span>
                    <span>
                      {feedStatus?.last_imported
                        ? new Date(feedStatus.last_imported).toLocaleString()
                        : "Never"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto:</span>
                    <span>
                      {feedStatus?.last_auto_import
                        ? new Date(feedStatus.last_auto_import).toLocaleString()
                        : "Never"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    setImportingFeedId(feed.id);
                    setImporting(true);
                    setMessage("");
                    setImportResult(null);
                    try {
                      const res = await fetch("/api/admin/import", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ feedId: feed.id }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        setImportResult(data);
                        setMessage(
                          `Imported ${data.imported} products from ${feed.name}`,
                        );
                        await refreshStatus();
                      } else {
                        setMessage(`Error: ${data.error}`);
                      }
                    } catch (e: any) {
                      setMessage(`Error: ${e.message}`);
                    }
                    setImporting(false);
                    setImportingFeedId(null);
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
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/import/page.tsx
git commit -m "feat(admin): import page — feed cards, batch import (remove dead CSV upload)"
```

---

### Task 6: Create products/page.tsx

Source lines in original `page.tsx`: 1291–2127 (Products Tab block).
Dead code removed: Smart Categorization, Fix Parent Slugs, Normalize Product IDs, Run Smart Categorization, Normalization Tester.
Kept: Product Grouping (with Check Status, Preview, Run, Regroup buttons), Categorization (Preview dry run + Run + Force), Fix Categories, Smart Fix Categories.

**Files:**
- Create: `apps/admin/app/admin/products/page.tsx`

- [ ] **Step 1: Create the file**

Extract lines 1291–2127 from original `page.tsx` and wrap in a standalone page component, removing the 7 dead sections listed above. The kept sections are:
- Product Grouping section (lines 1293–1533)
- Smart Categorization section → **remove entirely** (calls `/api/admin/housekeeping/categorize`)
- Normalization Tester → **remove entirely** (calls `/api/admin/normalize-demo`)
- Fix Parent Slugs section → **remove entirely** (calls `/api/admin/fix-parent-slugs`)
- Normalize Product IDs section → **remove entirely** (calls `/api/admin/normalize-product-ids`)
- Smart Fix Categories section (lines 2028–2067) — **keep**, calls `/api/admin/smart-categorize`... wait this was listed as dead. **Remove**.
- Quick Fix Categories section (lines 2069–2126) — **keep**, calls `/api/admin/fix-categories` which exists ✅

```tsx
// apps/admin/app/admin/products/page.tsx
"use client";

import { useState } from "react";

export default function ProductsPage() {
  const [groupingRunning, setGroupingRunning] = useState(false);
  const [groupingResult, setGroupingResult] = useState<any>(null);
  const [categorizingRunning, setCategorizingRunning] = useState(false);
  const [categorizingResult, setCategorizingResult] = useState<any>(null);
  const [regrouping, setRegrouping] = useState(false);
  const [regroupRunId, setRegroupRunId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded ${message.startsWith("✅") || message.startsWith("Fixed") || message.startsWith("Grouping") || message.startsWith("Regroup") ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}
        >
          {message}
        </div>
      )}

      {/* Product Grouping */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Product Grouping</h3>
        <p className="text-sm text-neutral-400 mb-4">
          Groups size/color variants by normalized product name (parent_slug).
          Only parent products show in listings — all sizes/colors display on the
          product detail page.
        </p>
        <div className="flex gap-4 mb-4 flex-wrap">
          <button
            onClick={async () => {
              setGroupingRunning(true);
              setGroupingResult(null);
              setMessage("");
              try {
                const res = await fetch(
                  "/api/admin/housekeeping/group-products",
                );
                const data = await res.json();
                setGroupingResult({ ...data, dryRun: true });
                setMessage(
                  data.success
                    ? `Current status: ${data.stats?.parentProducts?.toLocaleString() ?? 0} parents, ${data.stats?.childProducts?.toLocaleString() ?? 0} children`
                    : `Error: ${data.error}`,
                );
              } catch (e: any) {
                setMessage(`Error: ${e.message}`);
              }
              setGroupingRunning(false);
            }}
            disabled={groupingRunning}
            className={`px-4 py-2 rounded font-medium transition-colors ${groupingRunning ? "bg-neutral-700 text-neutral-400 cursor-not-allowed" : "bg-neutral-600 hover:bg-neutral-500 text-white"}`}
          >
            {groupingRunning ? "Checking..." : "Check Status"}
          </button>

          <button
            onClick={async () => {
              setGroupingRunning(true);
              setGroupingResult(null);
              setMessage("");
              try {
                const res = await fetch(
                  "/api/admin/housekeeping/group-products",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ dryRun: true }),
                  },
                );
                const data = await res.json();
                setGroupingResult(data);
                setMessage(data.success ? data.message || "Dry run complete" : `Error: ${data.error}`);
              } catch (e: any) {
                setMessage(`Error: ${e.message}`);
              }
              setGroupingRunning(false);
            }}
            disabled={groupingRunning}
            className={`px-4 py-2 rounded font-medium transition-colors ${groupingRunning ? "bg-neutral-700 text-neutral-400 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-500 text-white"}`}
          >
            {groupingRunning ? "Running..." : "Preview Grouping"}
          </button>

          <button
            onClick={async () => {
              if (!confirm("This will RESET and re-group ALL products. Continue?")) return;
              setGroupingRunning(true);
              setGroupingResult(null);
              setMessage("Running grouping...");
              try {
                const res = await fetch(
                  "/api/admin/housekeeping/group-products",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ dryRun: false }),
                  },
                );
                const data = await res.json();
                setGroupingResult(data);
                setMessage(data.success ? data.message || "Grouping complete!" : `Error: ${data.error}`);
              } catch (e: any) {
                setMessage(`Error: ${e.message}`);
              }
              setGroupingRunning(false);
            }}
            disabled={groupingRunning}
            className={`px-4 py-2 rounded font-medium transition-colors ${groupingRunning ? "bg-neutral-700 text-neutral-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 text-white"}`}
          >
            {groupingRunning ? "Running..." : "Run Grouping"}
          </button>

          <button
            onClick={async () => {
              setRegrouping(true);
              setRegroupRunId(null);
              setMessage("");
              try {
                const res = await fetch("/api/admin/housekeeping/regroup", {
                  method: "POST",
                });
                const data = await res.json();
                if (data.started) {
                  setRegroupRunId(data.runId);
                  setMessage(`Regroup (24h) started — runId: ${data.runId}`);
                } else {
                  setMessage(`Error: ${data.error}`);
                }
              } catch (e: any) {
                setMessage(`Error: ${e.message}`);
              }
              setRegrouping(false);
            }}
            disabled={regrouping}
            className={`px-4 py-2 rounded font-medium transition-colors ${regrouping ? "bg-neutral-700 text-neutral-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 text-white"}`}
          >
            {regrouping ? "Starting..." : "Regroup (24h)"}
          </button>
        </div>

        {regroupRunId && (
          <p className="text-xs text-neutral-400 mt-1">Run ID: {regroupRunId}</p>
        )}

        {groupingResult && (
          <div className="bg-neutral-800 rounded p-4 text-sm">
            {groupingResult.message && (
              <div className="mb-4 text-green-400 font-medium">
                {groupingResult.message}
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Total Products", value: groupingResult.stats?.totalProducts, color: "text-white" },
                { label: "Product Families", value: groupingResult.stats?.uniqueProductFamilies, color: "text-white" },
                { label: "Multi-Variant Groups", value: groupingResult.stats?.multiVariantGroups, color: "text-purple-400" },
                { label: "Parents Marked", value: groupingResult.stats?.parentsMarked ?? groupingResult.stats?.finalParentCount, color: "text-green-400" },
                { label: "Children Marked", value: groupingResult.stats?.childrenMarked ?? groupingResult.stats?.finalChildCount, color: "text-blue-400" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-neutral-400">{s.label}</div>
                  <div className={`text-xl font-bold ${s.color}`}>
                    {(s.value || 0).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            {groupingResult.dryRun && (
              <div className="mt-3 text-yellow-400 text-xs">
                This was a dry run — no changes were made
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Fix Categories */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2">Quick Fix Categories</h3>
        <p className="text-sm text-neutral-400 mb-4">
          Normalizes gender (womens→women, mens→man), lowercases sub_category,
          and smart-categorizes products by keywords in their names (wedge→wedges,
          boot→boots, etc.)
        </p>
        <button
          onClick={async () => {
            setCategorizingRunning(true);
            setCategorizingResult(null);
            try {
              const res = await fetch("/api/admin/fix-categories", {
                method: "POST",
              });
              const data = await res.json();
              setCategorizingResult({ stats: data.stats, logs: data.logs });
              setMessage(
                data.success
                  ? "✅ Categories fixed successfully!"
                  : `Error: ${data.error}`,
              );
            } catch (e: any) {
              setMessage(`Error: ${e.message}`);
            }
            setCategorizingRunning(false);
          }}
          disabled={categorizingRunning}
          className={`px-4 py-2 rounded font-medium transition-colors ${categorizingRunning ? "bg-neutral-700 text-neutral-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 text-white"}`}
        >
          {categorizingRunning ? "Running..." : "Fix All Categories"}
        </button>

        {categorizingResult?.logs && (
          <div className="mt-4 bg-neutral-800 rounded p-4 text-xs font-mono max-h-48 overflow-y-auto">
            <div className="text-neutral-300">
              {categorizingResult.logs.map((log: string, i: number) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/products/page.tsx
git commit -m "feat(admin): products page — grouping tools, fix categories (remove dead stubs)"
```

---

### Task 7: Create archive/page.tsx

Source lines in original `page.tsx`: 2129–2164 (Archive Tab block).

**Files:**
- Create: `apps/admin/app/admin/archive/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
// apps/admin/app/admin/archive/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function ArchivePage() {
  const [archivedProducts, setArchivedProducts] = useState<any[]>([]);
  const [archiveLoading, setArchiveLoading] = useState(false);

  useEffect(() => {
    loadArchived();
  }, []);

  async function loadArchived() {
    setArchiveLoading(true);
    try {
      const res = await fetch("/api/admin/archive?visibility=archived&limit=50");
      const data = await res.json();
      setArchivedProducts(data.products);
    } catch (e) {
      console.error(e);
    }
    setArchiveLoading(false);
  }

  async function restoreProduct(productId: number) {
    try {
      const res = await fetch("/api/admin/archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore", productIds: [productId] }),
      });
      const data = await res.json();
      if (data.success) {
        setArchivedProducts((prev) => prev.filter((p) => p.id !== productId));
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={loadArchived}
        disabled={archiveLoading}
        className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-sm"
      >
        {archiveLoading ? "Loading..." : "Refresh Archived"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {archivedProducts.map((product) => (
          <div key={product.id} className="bg-neutral-900 p-4 rounded">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
            <h4 className="font-medium truncate">{product.name}</h4>
            <p className="text-sm text-neutral-400">{product.brand}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => restoreProduct(product.id)}
                className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-500 rounded text-sm"
              >
                Restore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/archive/page.tsx
git commit -m "feat(admin): archive page — archived products list, restore"
```

---

### Task 8: Create performance/page.tsx

Source lines in original `page.tsx`: 2166–2280 (Performance Tab block).

**Files:**
- Create: `apps/admin/app/admin/performance/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
// apps/admin/app/admin/performance/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function PerformancePage() {
  const [perfStats, setPerfStats] = useState<any>(null);
  const [perfLoading, setPerfLoading] = useState(false);

  useEffect(() => {
    loadPerfStats();
  }, []);

  async function loadPerfStats() {
    setPerfLoading(true);
    try {
      const res = await fetch("/api/admin/performance-stats");
      const data = await res.json();
      setPerfStats(data);
    } catch (e: any) {
      console.error("[PerfStats]", e);
    }
    setPerfLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Database Performance</h3>
        <button
          onClick={loadPerfStats}
          disabled={perfLoading}
          className={`px-4 py-2 rounded font-medium mb-4 ${perfLoading ? "bg-neutral-700 text-neutral-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white"}`}
        >
          {perfLoading ? "Loading..." : "Refresh Stats"}
        </button>

        {perfStats && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Total Products", value: (perfStats.database?.total_products || 0).toLocaleString(), color: "text-white" },
                { label: "Live & Listable", value: (perfStats.database?.live_listable || 0).toLocaleString(), color: "text-green-400" },
                { label: "Table Size", value: perfStats.database?.table_size || "N/A", color: "text-white", raw: true },
                { label: "Women Products", value: (perfStats.database?.women_products || 0).toLocaleString(), color: "" },
                { label: "Men Products", value: (perfStats.database?.men_products || 0).toLocaleString(), color: "" },
                { label: "On Sale", value: (perfStats.database?.sale_products || 0).toLocaleString(), color: "text-orange-400" },
              ].map((s) => (
                <div key={s.label} className="bg-neutral-800 rounded p-4">
                  <p className="text-xs text-neutral-400">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-bold mb-2">Indexes</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-neutral-300">
                  <thead className="bg-neutral-800">
                    <tr>
                      <th className="px-3 py-2 text-left">Index Name</th>
                      <th className="px-3 py-2 text-right">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perfStats.indexes?.map((idx: any, i: number) => (
                      <tr key={i} className="border-t border-neutral-700">
                        <td className="px-3 py-2">{idx.name}</td>
                        <td className="px-3 py-2 text-right">{idx.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded p-4 text-sm">
              <p className="text-blue-300 font-medium mb-2">✓ Optimization Status</p>
              <ul className="space-y-1 text-blue-200 text-xs">
                <li>• Product listing queries: &lt;1ms (5,700x faster)</li>
                <li>• Cache TTL: 60 seconds with SWR 300s</li>
                <li>• Cache pre-warming: Every 20 minutes</li>
                <li>• DB maintenance: Daily VACUUM ANALYZE</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/performance/page.tsx
git commit -m "feat(admin): performance page — DB stats and indexes"
```

---

### Task 9: Create grouping/page.tsx

Source lines in original `page.tsx`: 2282–2636 (Grouping Tab block).

**Files:**
- Create: `apps/admin/app/admin/grouping/page.tsx`

- [ ] **Step 1: Create the file**

Copy the entire Grouping tab block (lines 2282–2636) from `apps/admin/app/admin/page.tsx` and wrap it as a standalone page, keeping all state variables: `groupingRunning`, `groupingResult`, `groupingFeedId`, `groupingPreview`, `groupingStep`.

```tsx
// apps/admin/app/admin/grouping/page.tsx
"use client";

import { useState } from "react";

export default function GroupingPage() {
  const [groupingRunning, setGroupingRunning] = useState(false);
  const [groupingResult, setGroupingResult] = useState<any>(null);
  const [groupingFeedId, setGroupingFeedId] = useState<number>(161992);
  const [groupingPreview, setGroupingPreview] = useState<any>(null);
  const [groupingStep, setGroupingStep] = useState("");

  const FEED_OPTIONS = [
    { id: 161992, name: "Nautica (~11k)" },
    { id: 162750, name: "Banana Republic (~19k)" },
    { id: 280, name: "DSW" },
    { id: 9169, name: "Zappos" },
    { id: 10166, name: "Famous Footwear" },
    { id: 9186, name: "Steve Madden" },
    { id: 10140, name: "Aldo" },
    { id: 11285, name: "Kurt Geiger" },
    { id: 0, name: "— All Feeds —" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-1">Product Grouping</h2>
        <p className="text-sm text-neutral-400 mb-6">
          Re-normalizes product names (strips sizes, keeps colors) so all size
          variants of the same shoe collapse into one product. Run Preview first,
          then Apply to Feed, then Rebuild Groups.
        </p>

        <div className="flex flex-wrap items-end gap-3 mb-6">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Feed</label>
            <select
              value={groupingFeedId}
              onChange={(e) => {
                setGroupingFeedId(Number(e.target.value));
                setGroupingPreview(null);
                setGroupingResult(null);
              }}
              className="bg-neutral-800 border border-neutral-700 text-white text-sm rounded px-3 py-2 min-w-[220px]"
            >
              {FEED_OPTIONS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Preview */}
          <button
            disabled={groupingRunning}
            onClick={async () => {
              setGroupingRunning(true);
              setGroupingStep("Previewing…");
              setGroupingPreview(null);
              setGroupingResult(null);
              try {
                const body: any = { preview: true };
                if (groupingFeedId !== 0) body.programId = groupingFeedId;
                const res = await fetch("/api/admin/renormalize", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                setGroupingPreview(await res.json());
              } finally {
                setGroupingRunning(false);
                setGroupingStep("");
              }
            }}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-sm rounded font-medium transition-colors disabled:opacity-50"
          >
            {groupingRunning && groupingStep === "Previewing…" ? "Previewing…" : "🔍 Preview"}
          </button>

          {/* Apply Phase 1 */}
          <button
            disabled={groupingRunning}
            onClick={async () => {
              if (!confirm(`Apply name normalization to ${groupingFeedId === 0 ? "ALL feeds" : "this feed"}?`)) return;
              setGroupingRunning(true);
              setGroupingStep("Normalizing names…");
              setGroupingResult(null);
              try {
                const body: any = { phase: "1" };
                if (groupingFeedId !== 0) body.programId = groupingFeedId;
                const res = await fetch("/api/admin/renormalize", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                setGroupingResult(await res.json());
              } finally {
                setGroupingRunning(false);
                setGroupingStep("");
              }
            }}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-sm rounded font-medium transition-colors disabled:opacity-50"
          >
            {groupingRunning && groupingStep === "Normalizing names…" ? "Applying…" : "✏️ Apply to Feed"}
          </button>

          {/* Fix sale flags */}
          <button
            disabled={groupingRunning}
            onClick={async () => {
              setGroupingRunning(true);
              setGroupingStep("Fixing sale flags…");
              setGroupingResult(null);
              try {
                const body: any = { phase: "1b" };
                if (groupingFeedId !== 0) body.programId = groupingFeedId;
                const res = await fetch("/api/admin/renormalize", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                setGroupingResult(await res.json());
              } finally {
                setGroupingRunning(false);
                setGroupingStep("");
              }
            }}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-sm rounded font-medium transition-colors disabled:opacity-50"
          >
            {groupingRunning && groupingStep === "Fixing sale flags…" ? "Running…" : "💰 Fix Sale Flags"}
          </button>

          {/* Rebuild Groups */}
          <button
            disabled={groupingRunning}
            onClick={async () => {
              if (!confirm("Rebuild ALL product groups? This is global and may take up to 2 minutes.")) return;
              setGroupingRunning(true);
              setGroupingStep("Rebuilding groups…");
              setGroupingResult(null);
              try {
                const res = await fetch("/api/admin/renormalize", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ phase: "2" }),
                });
                setGroupingResult(await res.json());
              } finally {
                setGroupingRunning(false);
                setGroupingStep("");
              }
            }}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-sm rounded font-medium transition-colors disabled:opacity-50"
          >
            {groupingRunning && groupingStep === "Rebuilding groups…" ? "Rebuilding…" : "🔄 Rebuild Groups"}
          </button>
        </div>

        {groupingRunning && (
          <p className="text-sm text-yellow-400 animate-pulse mb-4">{groupingStep}</p>
        )}

        {groupingPreview && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Variants", value: groupingPreview.totalVariants?.toLocaleString() },
                { label: "Would Update", value: groupingPreview.wouldUpdate?.toLocaleString(), highlight: true },
                { label: "Current Groups (sample)", value: groupingPreview.currentGroupsInSample?.toLocaleString() },
                { label: "New Groups (sample)", value: groupingPreview.newGroupsInSample?.toLocaleString(), green: true },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`rounded p-3 border ${s.highlight ? "bg-yellow-900/30 border-yellow-700" : s.green ? "bg-green-900/30 border-green-700" : "bg-neutral-800 border-neutral-700"}`}
                >
                  <p className="text-xs text-neutral-400 mb-0.5">{s.label}</p>
                  <p className="text-xl font-bold">{s.value ?? "—"}</p>
                </div>
              ))}
            </div>

            {groupingPreview.groupReduction > 0 && (
              <p className="text-sm text-green-400">
                ✓ Estimated <strong>{groupingPreview.groupReduction}</strong> fewer duplicate product cards in this sample
              </p>
            )}

            {groupingPreview.sample?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-neutral-300 mb-2">
                  Sample changes ({groupingPreview.sample.length} shown):
                </p>
                <div className="overflow-auto max-h-80 rounded border border-neutral-700">
                  <table className="w-full text-xs">
                    <thead className="bg-neutral-800 sticky top-0">
                      <tr>
                        <th className="text-left px-3 py-2 text-neutral-400 font-medium">Original name</th>
                        <th className="text-left px-3 py-2 text-neutral-400 font-medium">Clean title</th>
                        <th className="text-left px-3 py-2 text-neutral-400 font-medium">New slug</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupingPreview.sample.map((row: any, i: number) => (
                        <tr key={i} className="border-t border-neutral-800 hover:bg-neutral-800/50">
                          <td className="px-3 py-2 text-neutral-400 max-w-[280px] truncate">{row.original}</td>
                          <td className="px-3 py-2 text-white font-medium max-w-[240px] truncate">{row.cleanTitle}</td>
                          <td className="px-3 py-2 text-neutral-500 max-w-[200px] truncate font-mono">{row.newSlug}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {groupingResult && (
          <div className={`mt-4 p-4 rounded border text-sm ${groupingResult.success ? "bg-green-900/20 border-green-700" : "bg-red-900/20 border-red-700"}`}>
            {groupingResult.success ? (
              <div className="space-y-1">
                <p className="font-semibold text-green-400">
                  ✓ Done in {((groupingResult.durationMs ?? 0) / 1000).toFixed(1)}s
                </p>
                {groupingResult.phase1 && (
                  <p className="text-neutral-300">
                    Phase 1 — {groupingResult.phase1.totalVariants?.toLocaleString()} scanned,{" "}
                    <strong>{groupingResult.phase1.totalUpdated?.toLocaleString()}</strong> slugs updated
                  </p>
                )}
                {groupingResult.phase1b && (
                  <p className="text-neutral-300">
                    Phase 1b — <strong>{groupingResult.phase1b.saleFixed?.toLocaleString()}</strong> sale flags recalculated
                  </p>
                )}
                {groupingResult.phase2 && (
                  <p className="text-neutral-300">
                    Phase 2 — <strong>{groupingResult.phase2.groupsUpserted?.toLocaleString()}</strong> groups rebuilt,{" "}
                    <strong>{groupingResult.phase2.hidden?.toLocaleString()}</strong> hidden
                  </p>
                )}
              </div>
            ) : (
              <p className="text-red-400">Error: {groupingResult.error}</p>
            )}
          </div>
        )}
      </div>

      {/* Workflow guide */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-sm text-neutral-400">
        <p className="font-semibold text-white mb-3">Recommended workflow</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Select a feed (start with <strong className="text-white">Nautica</strong> or <strong className="text-white">Banana Republic</strong>)</li>
          <li>Click <strong className="text-white">Preview</strong> — check sample shows clean titles and fewer duplicate slugs</li>
          <li>Click <strong className="text-white">Apply to Feed</strong> — updates parent_slug on that feed's variants only</li>
          <li>Repeat for other feeds you want to clean up</li>
          <li>Click <strong className="text-white">Fix Sale Flags</strong> on each feed to correct is_on_sale + discount_pct</li>
          <li>Click <strong className="text-white">Rebuild Groups</strong> once at the end — global, re-collapses all variants</li>
        </ol>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/grouping/page.tsx
git commit -m "feat(admin): grouping page — renormalize flow, preview/apply/rebuild"
```

---

### Task 10: Create jobs/page.tsx

**Files:**
- Create: `apps/admin/app/admin/jobs/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
// apps/admin/app/admin/jobs/page.tsx
import { JobsTab } from "../JobsTab";

export default function JobsPage() {
  return <JobsTab />;
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/jobs/page.tsx
git commit -m "feat(admin): jobs page — wraps existing JobsTab component"
```

---

### Task 11: Cleanup — delete old files

**Files:**
- Delete: `apps/admin/app/admin/pipeline/page.tsx`
- Delete: `apps/admin/app/admin/page.tsx` (now just a redirect, the old one is gone from task 2)

- [ ] **Step 1: Verify all 8 pages work in browser**

Open each URL and confirm it renders:
- http://localhost:3002/admin/status
- http://localhost:3002/admin/feeds
- http://localhost:3002/admin/import
- http://localhost:3002/admin/products
- http://localhost:3002/admin/archive
- http://localhost:3002/admin/performance
- http://localhost:3002/admin/grouping
- http://localhost:3002/admin/jobs

Also confirm http://localhost:3002/admin redirects to `/admin/status`.

- [ ] **Step 2: Delete pipeline page**

```bash
rm apps/admin/app/admin/pipeline/page.tsx
```

- [ ] **Step 3: Check TypeScript**

```bash
cd apps/admin && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat(admin): complete tab → URL pages migration, delete pipeline page"
```
