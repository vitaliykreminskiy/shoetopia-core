"use client";

import { useState, useEffect } from "react";
import { FEEDS } from "@/lib/feeds";
import { JobsTab } from "./JobsTab";

export default function AdminPage() {
  const [tab, setTab] = useState<
    | "import"
    | "products"
    | "archive"
    | "status"
    | "feeds"
    | "performance"
    | "grouping"
    | "jobs"
  >("status");
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Import state
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null);
  const [selectedFeedIds, setSelectedFeedIds] = useState<Set<number>>(
    new Set(),
  );
  const [importResult, setImportResult] = useState<any>(null);
  const [importing, setImporting] = useState(false);
  const [importingFeedId, setImportingFeedId] = useState<number | null>(null);
  const [batchImporting, setBatchImporting] = useState(false);
  const [batchProgress, setBatchProgress] = useState({
    current: 0,
    total: 0,
    currentFeed: "",
  });

  // Archive state
  const [archivedProducts, setArchivedProducts] = useState<any[]>([]);
  const [archiveLoading, setArchiveLoading] = useState(false);

  // Housekeeping state
  const [groupingRunning, setGroupingRunning] = useState(false);
  const [groupingResult, setGroupingResult] = useState<any>(null);
  const [categorizingRunning, setCategorizingRunning] = useState(false);
  const [categorizingResult, setCategorizingResult] = useState<any>(null);

  // Sync log state
  const [syncLog, setSyncLog] = useState<any[]>([]);
  const [syncLogLoading, setSyncLogLoading] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [reprocessing, setReprocessing] = useState(false);
  const [reprocessRunId, setReprocessRunId] = useState<string | null>(null);
  const [regrouping, setRegrouping] = useState(false);
  const [regroupRunId, setRegroupRunId] = useState<string | null>(null);

  // Performance state
  const [perfStats, setPerfStats] = useState<any>(null);
  const [perfLoading, setPerfLoading] = useState(false);

  // Normalize demo state
  const [demoInput, setDemoInput] = useState("");
  const [demoResult, setDemoResult] = useState<any>(null);
  const [demoGroups, setDemoGroups] = useState<any>(null);
  const [demoLoading, setDemoLoading] = useState(false);

  // Grouping tab state (groupingRunning + groupingResult reuse vars declared above)
  const [groupingFeedId, setGroupingFeedId] = useState<number>(161992); // default Nautica
  const [groupingPreview, setGroupingPreview] = useState<any>(null);
  const [groupingStep, setGroupingStep] = useState("");

  // Feeds state
  const [feedsData, setFeedsData] = useState<{
    feeds: any[];
    stats: any;
  } | null>(null);
  const [feedsLoading, setFeedsLoading] = useState(false);
  const [feedsSortBy, setFeedsSortBy] = useState<
    "pending" | "products" | "name" | "imported"
  >("pending");
  const [feedsFilterCountry, setFeedsFilterCountry] = useState<string>("all");

  useEffect(() => {
    refreshStatus();
  }, []);

  async function loadPerfStats() {
    setPerfLoading(true);
    try {
      const res = await fetch("/api/admin/performance-stats");
      const data = await res.json();
      setPerfStats(data);
    } catch (e: any) {
      console.error("[PerfStats]", e);
      setMessage(`Error loading performance stats: ${e.message}`);
    }
    setPerfLoading(false);
  }

  async function loadSyncLog() {
    setSyncLogLoading(true);
    try {
      const res = await fetch("/api/admin/sync-log");
      const data = await res.json();
      if (data.success) setSyncLog(data.logs);
    } catch (e) {
      console.error("[SyncLog]", e);
    }
    setSyncLogLoading(false);
  }

  async function loadFeeds() {
    setFeedsLoading(true);
    try {
      const res = await fetch("/api/admin/import-feeds");
      const data = await res.json();
      setFeedsData(data);
    } catch (e) {
      console.error("[LoadFeeds]", e);
    }
    setFeedsLoading(false);
  }

  async function refreshStatus() {
    try {
      const res = await fetch("/api/admin/status");
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function importFeed() {
    if (!selectedFeedId) {
      setMessage("Select a feed");
      return;
    }

    setImporting(true);
    setMessage("");
    setImportResult(null);

    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedId: selectedFeedId }),
      });
      const data = await res.json();

      if (data.success) {
        setImportResult(data);
        setMessage(
          `✓ Imported ${data.imported} products (${data.skipped} skipped)`,
        );
        await refreshStatus();
      } else {
        setMessage(`✗ Error: ${data.error}`);
      }
    } catch (e: any) {
      setMessage(`✗ Error: ${e.message}`);
    }

    setImporting(false);
  }

  // Toggle feed selection
  function toggleFeedSelection(feedId: number) {
    setSelectedFeedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(feedId)) {
        newSet.delete(feedId);
      } else {
        newSet.add(feedId);
      }
      return newSet;
    });
  }

  // Batch import selected feeds
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

  async function loadArchived() {
    setArchiveLoading(true);
    try {
      const res = await fetch(
        "/api/admin/archive?visibility=archived&limit=50",
      );
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
        await refreshStatus();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shoetopia Admin</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-neutral-800">
          {(
            [
              "status",
              "feeds",
              "import",
              "products",
              "archive",
              "performance",
              "grouping",
              "jobs",
            ] as const
          ).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                if (t === "archive") loadArchived();
                if (t === "feeds") loadFeeds();
                if (t === "performance") loadPerfStats();
              }}
              className={`px-6 py-3 font-medium capitalize ${
                tab === t
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Status Tab */}
        {tab === "status" && (
          <div className="space-y-8">
            {/* Daily Sync Control */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">Daily Sync</h3>
                  <p className="text-sm text-neutral-400">
                    Runs automatically every day at{" "}
                    <span className="text-white font-medium">10:30 PM PST</span>{" "}
                    (6:30 AM UTC). Imports all feeds, hides stale products,
                    fixes gender/grouping, and promotes to live.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={async () => {
                      await loadSyncLog();
                    }}
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
                        <tr
                          key={row.run_id}
                          className="border-t border-neutral-800"
                        >
                          <td className="px-3 py-2 text-neutral-300">
                            {new Date(row.started_at).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {row.feeds_synced}
                          </td>
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
                  <h3 className="text-lg font-bold mb-1">
                    Reprocess All Products
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Runs gender correction, grouping, and promote/hide logic
                    across all{" "}
                    <span className="text-white font-medium">
                      existing products
                    </span>
                    . Use after changing categorization logic or to fix
                    historical misclassifications. Runs as a background workflow
                    — no timeout risk.
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
                        "This will reprocess gender, grouping, and visibility for ALL products. " +
                          "It runs in the background — are you sure?",
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-neutral-900 p-4 rounded">
                <div className="text-neutral-400 text-sm">Total Products</div>
                <div className="text-3xl font-bold">
                  {status?.stats?.total || 0}
                </div>
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
                        <td className="px-4 py-2 text-right">
                          {feed.product_count}
                        </td>
                        <td className="px-4 py-2 text-right text-green-400">
                          {feed.live_count}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {feed.in_stock_count}
                        </td>
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
        )}

        {/* Feeds Tab */}
        {tab === "feeds" && (
          <div className="space-y-6">
            {/* Upload Feeds CSV */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">
                Upload Advertiser Feeds CSV
              </h3>
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
                      document.getElementById(
                        "feeds-csv-upload",
                      ) as HTMLInputElement
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
                  <div className="text-neutral-400 text-sm">
                    Total Advertisers
                  </div>
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
                  <div className="text-neutral-400 text-sm">
                    Available Products
                  </div>
                  <div className="text-2xl font-bold text-blue-400">
                    {Number(
                      feedsData.stats.total_available_products || 0,
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="bg-neutral-900 p-4 rounded">
                  <div className="text-neutral-400 text-sm">
                    Imported Products
                  </div>
                  <div className="text-2xl font-bold text-purple-400">
                    {Number(
                      feedsData.stats.total_imported_products || 0,
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* Filters & Sort */}
            <div className="flex gap-4 items-center">
              <div>
                <label className="text-sm text-neutral-400 mr-2">
                  Sort by:
                </label>
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
                <label className="text-sm text-neutral-400 mr-2">
                  Country:
                </label>
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
                    {feedsData?.feeds
                      ?.filter(
                        (f: any) =>
                          feedsFilterCountry === "all" ||
                          f.country === feedsFilterCountry,
                      )
                      ?.sort((a: any, b: any) => {
                        if (feedsSortBy === "pending") {
                          if (!a.last_imported_at && b.last_imported_at)
                            return -1;
                          if (a.last_imported_at && !b.last_imported_at)
                            return 1;
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
                              ? new Date(
                                  feed.last_imported_at,
                                ).toLocaleDateString()
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
                              <span className="text-neutral-500 text-xs">
                                No link
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Import Tab */}
        {tab === "import" && (
          <div className="space-y-6">
            {/* CSV Upload Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Upload Custom CSV Feed</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm text-neutral-400 mb-2">
                    CSV File
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    id="csv-upload"
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-neutral-400 mb-2">
                    Feed Name
                  </label>
                  <input
                    type="text"
                    id="feed-name"
                    placeholder="e.g. ASICS"
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
                  />
                </div>
                <button
                  onClick={async () => {
                    const file = (
                      document.getElementById("csv-upload") as HTMLInputElement
                    )?.files?.[0];
                    const feedName = (
                      document.getElementById("feed-name") as HTMLInputElement
                    )?.value;

                    if (!file || !feedName) {
                      setMessage(
                        "Please select a CSV file and enter a feed name",
                      );
                      return;
                    }

                    setImporting(true);
                    setMessage("");
                    setImportResult(null);

                    try {
                      const formData = new FormData();
                      formData.append("file", file);
                      formData.append("feedName", feedName);

                      const res = await fetch("/api/admin/import-csv", {
                        method: "POST",
                        body: formData,
                      });
                      const data = await res.json();

                      if (data.success) {
                        setImportResult(data);
                        setMessage(
                          `Imported ${data.imported} products from ${feedName}`,
                        );
                        await refreshStatus();
                        // Clear inputs
                        (
                          document.getElementById(
                            "csv-upload",
                          ) as HTMLInputElement
                        ).value = "";
                        (
                          document.getElementById(
                            "feed-name",
                          ) as HTMLInputElement
                        ).value = "";
                      } else {
                        setMessage(`Error: ${data.error}`);
                      }
                    } catch (e: any) {
                      setMessage(`Error: ${e.message}`);
                    }

                    setImporting(false);
                  }}
                  disabled={importing}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 rounded font-medium"
                >
                  {importing ? "Uploading..." : "Upload & Import"}
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded ${
                  message.startsWith("✓") || message.startsWith("Imported")
                    ? "bg-green-900/30 text-green-300"
                    : "bg-red-900/30 text-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {importResult && (
              <div className="bg-neutral-900 p-6 rounded mb-6">
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
                        <div className="text-neutral-400 text-sm">
                          No Price/URL/Image
                        </div>
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
                              Insert Errors:{" "}
                              {importResult.skipReasons.insert_error}
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

                {/* Debug: Show CSV columns and sample row */}
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
                          <div className="text-xs text-neutral-400 mb-1">
                            Sample Row:
                          </div>
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
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-neutral-400 text-sm">
                  {selectedFeedIds.size} feed
                  {selectedFeedIds.size !== 1 ? "s" : ""} selected
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

            {/* Feed Cards - Sorted by product count (lowest first) */}
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
                            <h3 className="font-semibold text-white">
                              {feed.name}
                            </h3>
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
                          <div className="text-xs text-neutral-500">
                            in database
                          </div>
                        </div>
                      </div>

                      {/* Feed source info - show available products from source */}
                      <div className="bg-neutral-800/50 rounded p-2 mb-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">
                            In feed source:
                          </span>
                          <span className="font-bold text-purple-400">
                            {feed.sourceCount.toLocaleString()}
                          </span>
                        </div>
                        {feed.productCount < feed.sourceCount && (
                          <div className="text-xs text-yellow-400 mt-1">
                            +
                            {(
                              feed.sourceCount - feed.productCount
                            ).toLocaleString()}{" "}
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
                          <span className="text-neutral-500 ml-1">
                            in stock
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-neutral-500 mb-4 space-y-1">
                        <div className="flex justify-between">
                          <span>Manual:</span>
                          <span>
                            {feedStatus?.last_imported
                              ? new Date(
                                  feedStatus.last_imported,
                                ).toLocaleString()
                              : "Never"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Auto:</span>
                          <span>
                            {feedStatus?.last_auto_import
                              ? new Date(
                                  feedStatus.last_auto_import,
                                ).toLocaleString()
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
        )}

        {/* Products Tab - Housekeeping Tools */}
        {tab === "products" && (
          <div className="space-y-8">
            {/* Product Grouping Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Product Grouping</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Groups size/color variants by normalized product name
                (parent_slug). Only parent products show in listings - all
                sizes/colors display on the product detail page.
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
                      if (data.success) {
                        setMessage(
                          `Current status: ${data.stats.parentProducts.toLocaleString()} parents, ${data.stats.childProducts.toLocaleString()} children, ${data.stats.ungrouped.toLocaleString()} ungrouped`,
                        );
                      } else {
                        setMessage(`Error: ${data.error}`);
                      }
                    } catch (e: any) {
                      setMessage(`Error: ${e.message}`);
                    }
                    setGroupingRunning(false);
                  }}
                  disabled={groupingRunning}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    groupingRunning
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-neutral-600 hover:bg-neutral-500 text-white"
                  }`}
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
                      if (data.success) {
                        setMessage(data.message || `Dry run complete`);
                      } else {
                        setMessage(`Error: ${data.error}`);
                      }
                    } catch (e: any) {
                      setMessage(`Error: ${e.message}`);
                    }
                    setGroupingRunning(false);
                  }}
                  disabled={groupingRunning}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    groupingRunning
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-yellow-600 hover:bg-yellow-500 text-white"
                  }`}
                >
                  {groupingRunning ? "Running..." : "Preview Grouping"}
                </button>

                <button
                  onClick={async () => {
                    if (
                      !confirm(
                        "This will RESET and re-group ALL products. This may take a minute. Continue?",
                      )
                    )
                      return;
                    setGroupingRunning(true);
                    setGroupingResult(null);
                    setMessage(
                      "Running grouping... This may take a minute for large catalogs.",
                    );
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
                      if (data.success) {
                        setMessage(data.message || `Grouping complete!`);
                        await refreshStatus();
                      } else {
                        setMessage(`Error: ${data.error}`);
                      }
                    } catch (e: any) {
                      setMessage(`Error: ${e.message}`);
                    }
                    setGroupingRunning(false);
                  }}
                  disabled={groupingRunning}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    groupingRunning
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-500 text-white"
                  }`}
                >
                  {groupingRunning ? "Running..." : "Run Grouping"}
                </button>

                <button
                  onClick={async () => {
                    setRegrouping(true);
                    setRegroupRunId(null);
                    setMessage("");
                    try {
                      const res = await fetch(
                        "/api/admin/housekeeping/regroup",
                        { method: "POST" },
                      );
                      const data = await res.json();
                      if (data.started) {
                        setRegroupRunId(data.runId);
                        setMessage(
                          `Regroup (24h) started — runId: ${data.runId}`,
                        );
                      } else {
                        setMessage(`Error: ${data.error}`);
                      }
                    } catch (e: any) {
                      setMessage(`Error: ${e.message}`);
                    }
                    setRegrouping(false);
                  }}
                  disabled={regrouping}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    regrouping
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  }`}
                >
                  {regrouping ? "Starting..." : "Regroup (24h)"}
                </button>
              </div>
              {regroupRunId && (
                <p className="text-xs text-neutral-400 mt-1">
                  Run ID: {regroupRunId}
                </p>
              )}

              {groupingResult && (
                <div className="bg-neutral-800 rounded p-4 text-sm">
                  {groupingResult.message && (
                    <div className="mb-4 text-green-400 font-medium">
                      {groupingResult.message}
                    </div>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <div className="text-neutral-400">Total Products</div>
                      <div className="text-xl font-bold text-white">
                        {(
                          groupingResult.stats?.totalProducts || 0
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Product Families</div>
                      <div className="text-xl font-bold text-white">
                        {(
                          groupingResult.stats?.uniqueProductFamilies || 0
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400">
                        Multi-Variant Groups
                      </div>
                      <div className="text-xl font-bold text-purple-400">
                        {(
                          groupingResult.stats?.multiVariantGroups || 0
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Parents Marked</div>
                      <div className="text-xl font-bold text-green-400">
                        {(
                          groupingResult.stats?.parentsMarked ||
                          groupingResult.stats?.finalParentCount ||
                          0
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Children Marked</div>
                      <div className="text-xl font-bold text-blue-400">
                        {(
                          groupingResult.stats?.childrenMarked ||
                          groupingResult.stats?.finalChildCount ||
                          0
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {groupingResult.stats?.finalListingsCount && (
                    <div className="mt-3 text-neutral-300 text-sm">
                      <span className="text-neutral-400">
                        Products showing in listings:
                      </span>{" "}
                      <span className="font-bold">
                        {groupingResult.stats.finalListingsCount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {groupingResult.dryRun && (
                    <div className="mt-3 text-yellow-400 text-xs">
                      This was a dry run - no changes were made
                    </div>
                  )}
                  {groupingResult.errors &&
                    groupingResult.errors.length > 0 && (
                      <div className="mt-3 text-red-400 text-xs">
                        Errors: {groupingResult.errors.slice(0, 3).join(", ")}
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Normalization Demo Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1">
                Normalization Tester
              </h3>
              <p className="text-sm text-neutral-400 mb-4">
                Test how any product name will be normalized and grouped.
                Products that produce the same{" "}
                <code className="bg-neutral-800 px-1 rounded">parent_slug</code>{" "}
                will be grouped as variants.
              </p>

              {/* Custom input tester */}
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    demoInput.trim() &&
                    (async () => {
                      setDemoLoading(true);
                      const res = await fetch(
                        `/api/admin/normalize-demo?name=${encodeURIComponent(demoInput.trim())}`,
                      );
                      setDemoResult(await res.json());
                      setDemoLoading(false);
                    })()
                  }
                  placeholder='Paste a product title, e.g. "Nike Air Max 90 - White/Black - Size 10.5"'
                  className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm placeholder:text-neutral-500"
                />
                <button
                  onClick={async () => {
                    if (!demoInput.trim()) return;
                    setDemoLoading(true);
                    const res = await fetch(
                      `/api/admin/normalize-demo?name=${encodeURIComponent(demoInput.trim())}`,
                    );
                    setDemoResult(await res.json());
                    setDemoLoading(false);
                  }}
                  disabled={demoLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 rounded text-sm font-medium"
                >
                  Test
                </button>
                <button
                  onClick={async () => {
                    setDemoLoading(true);
                    setDemoResult(null);
                    const res = await fetch("/api/admin/normalize-demo");
                    setDemoGroups(await res.json());
                    setDemoLoading(false);
                  }}
                  disabled={demoLoading}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-700 rounded text-sm font-medium"
                >
                  Load Examples
                </button>
              </div>

              {/* Single test result */}
              {demoResult && (
                <div className="bg-neutral-800 rounded p-4 mb-4 text-sm font-mono">
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <span className="text-neutral-400">Input: </span>
                      <span className="text-white">
                        {demoResult.input?.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Normalized: </span>
                      <span className="text-yellow-300">
                        {demoResult.normalized}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400">parent_slug: </span>
                      <span className="text-green-400">
                        {demoResult.parent_slug}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400">variant_slug:</span>
                      <span className="text-blue-400">
                        {demoResult.variant_slug}
                      </span>
                    </div>
                  </div>
                  <p className="text-neutral-400 text-xs mt-3">
                    All products with{" "}
                    <span className="text-green-400">
                      parent_slug = &quot;{demoResult.parent_slug}&quot;
                    </span>{" "}
                    will be grouped together as size/color variants of the same
                    product.
                  </p>
                </div>
              )}

              {/* Grouped examples */}
              {demoGroups && (
                <div className="space-y-4">
                  <p className="text-sm text-neutral-400">
                    {demoGroups.total} example names grouped into{" "}
                    <strong className="text-white">
                      {Object.keys(demoGroups.groups).length}
                    </strong>{" "}
                    product families:
                  </p>
                  {Object.entries(
                    demoGroups.groups as Record<string, any[]>,
                  ).map(([slug, variants]) => (
                    <div
                      key={slug}
                      className="border border-neutral-700 rounded overflow-hidden"
                    >
                      <div className="bg-neutral-800 px-4 py-2 flex items-center gap-3">
                        <span className="text-green-400 font-mono text-xs">
                          {slug}
                        </span>
                        <span className="text-neutral-500 text-xs">
                          {variants.length} variant
                          {variants.length > 1 ? "s" : ""}
                        </span>
                        {variants.length > 1 && (
                          <span className="text-xs bg-green-900/50 text-green-300 px-2 py-0.5 rounded">
                            Grouped correctly
                          </span>
                        )}
                      </div>
                      <table className="w-full text-xs">
                        <thead className="bg-neutral-850">
                          <tr className="border-b border-neutral-700">
                            <th className="px-4 py-2 text-left text-neutral-400 font-normal">
                              Original Name
                            </th>
                            <th className="px-4 py-2 text-left text-neutral-400 font-normal">
                              Normalized
                            </th>
                            <th className="px-4 py-2 text-left text-neutral-400 font-normal">
                              variant_slug
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {variants.map((v, i) => (
                            <tr key={i} className="border-t border-neutral-800">
                              <td className="px-4 py-2 text-neutral-300">
                                {v.original}
                              </td>
                              <td className="px-4 py-2 text-yellow-300 font-mono">
                                {v.normalized}
                              </td>
                              <td className="px-4 py-2 text-blue-400 font-mono truncate max-w-[200px]">
                                {v.variant_slug}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Categorization Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                Smart Categorization
              </h3>
              <p className="text-sm text-neutral-400 mb-4">
                Assigns gender and category based on product titles. Unisex
                items are placed in both men&apos;s and women&apos;s categories.
                Kids/infant products are separated by size or title keywords.
              </p>

              <div className="flex gap-4 mb-4">
                <button
                  onClick={async () => {
                    setCategorizingRunning(true);
                    setCategorizingResult(null);
                    setMessage("");
                    try {
                      const res = await fetch(
                        "/api/admin/housekeeping/categorize",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ dryRun: true }),
                        },
                      );
                      const data = await res.json();
                      setCategorizingResult(data);
                      if (data.success) {
                        setMessage(
                          `Dry run complete: Would categorize ${data.stats.categorized} and update gender for ${data.stats.genderUpdated} products`,
                        );
                      } else {
                        setMessage(`Error: ${data.error}`);
                      }
                    } catch (e: any) {
                      setMessage(`Error: ${e.message}`);
                    }
                    setCategorizingRunning(false);
                  }}
                  disabled={categorizingRunning}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    categorizingRunning
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-yellow-600 hover:bg-yellow-500 text-white"
                  }`}
                >
                  {categorizingRunning
                    ? "Running..."
                    : "Preview Categorization (Dry Run)"}
                </button>

                <button
                  onClick={async () => {
                    if (
                      !confirm(
                        "This will update product categories and genders. Continue?",
                      )
                    )
                      return;
                    setCategorizingRunning(true);
                    setCategorizingResult(null);
                    setMessage("");
                    try {
                      const res = await fetch(
                        "/api/admin/housekeeping/categorize",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ dryRun: false }),
                        },
                      );
                      const data = await res.json();
                      setCategorizingResult(data);
                      if (data.success) {
                        setMessage(
                          `Categorization complete: Updated ${data.stats.categorized} categories and ${data.stats.genderUpdated} genders`,
                        );
                        await refreshStatus();
                      } else {
                        setMessage(`Error: ${data.error}`);
                      }
                    } catch (e: any) {
                      setMessage(`Error: ${e.message}`);
                    }
                    setCategorizingRunning(false);
                  }}
                  disabled={categorizingRunning}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    categorizingRunning
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-500 text-white"
                  }`}
                >
                  {categorizingRunning ? "Running..." : "Run Categorization"}
                </button>

                <button
                  onClick={async () => {
                    if (
                      !confirm(
                        "This will FORCE recategorize ALL products from scratch, even if already categorized. This may take a while. Continue?",
                      )
                    )
                      return;
                    setCategorizingRunning(true);
                    setCategorizingResult(null);
                    setMessage("");
                    try {
                      const res = await fetch(
                        "/api/admin/housekeeping/categorize",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            dryRun: false,
                            forceAll: true,
                          }),
                        },
                      );
                      const data = await res.json();
                      setCategorizingResult(data);
                      if (data.success) {
                        setMessage(
                          `Force recategorization complete: Updated ${data.stats.categorized} categories and ${data.stats.genderUpdated} genders`,
                        );
                        await refreshStatus();
                      } else {
                        setMessage(`Error: ${data.error}`);
                      }
                    } catch (e: any) {
                      setMessage(`Error: ${e.message}`);
                    }
                    setCategorizingRunning(false);
                  }}
                  disabled={categorizingRunning}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    categorizingRunning
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-500 text-white"
                  }`}
                >
                  {categorizingRunning
                    ? "Running..."
                    : "Force Recategorize All"}
                </button>
              </div>

              {categorizingResult && (
                <div className="bg-neutral-800 rounded p-4 text-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-neutral-400">Total Processed</div>
                      <div className="text-xl font-bold text-white">
                        {categorizingResult.stats?.totalProcessed || 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Categories Updated</div>
                      <div className="text-xl font-bold text-green-400">
                        {categorizingResult.stats?.categorized || 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Genders Updated</div>
                      <div className="text-xl font-bold text-blue-400">
                        {categorizingResult.stats?.genderUpdated || 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Skipped</div>
                      <div className="text-xl font-bold text-neutral-400">
                        {categorizingResult.stats?.skipped || 0}
                      </div>
                    </div>
                  </div>

                  {categorizingResult.stats?.categoryBreakdown &&
                    Object.keys(categorizingResult.stats.categoryBreakdown)
                      .length > 0 && (
                      <div className="mt-3">
                        <div className="text-neutral-400 text-xs mb-2">
                          Category Breakdown:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(
                            categorizingResult.stats.categoryBreakdown,
                          ).map(([cat, count]) => (
                            <span
                              key={cat}
                              className="px-2 py-1 bg-neutral-700 rounded text-xs"
                            >
                              {cat}: {count as number}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {categorizingResult.stats?.genderBreakdown &&
                    Object.keys(categorizingResult.stats.genderBreakdown)
                      .length > 0 && (
                      <div className="mt-3">
                        <div className="text-neutral-400 text-xs mb-2">
                          Gender Breakdown:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(
                            categorizingResult.stats.genderBreakdown,
                          ).map(([gender, count]) => (
                            <span
                              key={gender}
                              className="px-2 py-1 bg-neutral-700 rounded text-xs"
                            >
                              {gender}: {count as number}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {categorizingResult.dryRun && (
                    <div className="mt-3 text-yellow-400 text-xs">
                      This was a dry run - no changes were made
                    </div>
                  )}
                  {categorizingResult.errors &&
                    categorizingResult.errors.length > 0 && (
                      <div className="mt-3 text-red-400 text-xs">
                        Errors:{" "}
                        {categorizingResult.errors.slice(0, 3).join(", ")}
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Quick Fix Parent Slugs */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Fix Parent Slugs</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Regenerates parent_slug from product names for all products with
                invalid/corrupted slugs (missing first letters, starting with -,
                etc.)
              </p>
              <button
                onClick={async () => {
                  setCategorizingRunning(true);
                  setCategorizingResult(null);
                  try {
                    const res = await fetch("/api/admin/fix-parent-slugs", {
                      method: "POST",
                    });
                    const data = await res.json();
                    setCategorizingResult({
                      stats: data.stats,
                      logs: [data.message],
                    });
                    if (data.success) {
                      setMessage(
                        `Fixed ${data.updated} products! ${data.stats.valid} valid, ${data.stats.invalid} invalid remaining`,
                      );
                      await refreshStatus();
                    } else {
                      setMessage(`Error: ${data.error}`);
                    }
                  } catch (e: any) {
                    setMessage(`Error: ${e.message}`);
                  }
                  setCategorizingRunning(false);
                }}
                disabled={categorizingRunning}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  categorizingRunning
                    ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                {categorizingRunning ? "Running..." : "Fix Parent Slugs"}
              </button>
            </div>

            {/* Normalize Product IDs */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Normalize Product IDs</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Removes spaces from all product_id values (e.g., &quot;5.5
                M&quot; becomes &quot;5.5M&quot;) to fix URL issues.
              </p>
              <button
                onClick={async () => {
                  setCategorizingRunning(true);
                  try {
                    const res = await fetch(
                      "/api/admin/normalize-product-ids",
                      { method: "POST" },
                    );
                    const data = await res.json();
                    if (data.success) {
                      setMessage(
                        `Product IDs normalized! ${data.remaining} remaining with spaces.`,
                      );
                      await refreshStatus();
                    } else {
                      setMessage(`Error: ${data.error}`);
                    }
                  } catch (e: any) {
                    setMessage(`Error: ${e.message}`);
                  }
                  setCategorizingRunning(false);
                }}
                disabled={categorizingRunning}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  categorizingRunning
                    ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-500 text-white"
                }`}
              >
                {categorizingRunning ? "Running..." : "Normalize Product IDs"}
              </button>
            </div>

            {/* Fix Categories + Smart Multi-Category */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Smart Fix Categories</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Normalizes gender, and smart-categorizes products with
                multi-category support. E.g., &quot;Wedge Sandals&quot; appears
                in both /wedges AND /sandals.
              </p>
              <button
                onClick={async () => {
                  setCategorizingRunning(true);
                  try {
                    const res = await fetch("/api/admin/smart-categorize", {
                      method: "POST",
                    });
                    const data = await res.json();
                    if (data.success) {
                      setMessage(
                        `Smart categorization complete! ${data.totalUpdated} products updated.`,
                      );
                      await refreshStatus();
                    } else {
                      setMessage(`Error: ${data.error}`);
                    }
                  } catch (e: any) {
                    setMessage(`Error: ${e.message}`);
                  }
                  setCategorizingRunning(false);
                }}
                disabled={categorizingRunning}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  categorizingRunning
                    ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-500 text-white"
                }`}
              >
                {categorizingRunning
                  ? "Running..."
                  : "Run Smart Categorization"}
              </button>
            </div>

            {/* Fix Categories */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Quick Fix Categories</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Normalizes gender (womens��women, mens→men), lowercases
                sub_category, and smart-categorizes products by keywords in
                their names (wedge→wedges, boot→boots, etc.)
              </p>
              <button
                onClick={async () => {
                  setCategorizingRunning(true);
                  setCategorizingResult(null);
                  try {
                    console.log("[shoetopia] Starting fix-categories...");
                    const res = await fetch("/api/admin/fix-categories", {
                      method: "POST",
                    });
                    const data = await res.json();
                    console.log("[shoetopia] fix-categories response:", data);
                    setCategorizingResult({
                      stats: data.stats,
                      logs: data.logs,
                    });
                    if (data.success) {
                      setMessage(
                        "✅ Categories fixed successfully! Check logs below.",
                      );
                      await refreshStatus();
                    } else {
                      setMessage(`❌ Error: ${data.error}`);
                    }
                  } catch (e: any) {
                    console.error("[shoetopia] fix-categories error:", e);
                    setMessage(`❌ Error: ${e.message}`);
                  }
                  setCategorizingRunning(false);
                }}
                disabled={categorizingRunning}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  categorizingRunning
                    ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-500 text-white"
                }`}
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
        )}

        {/* Archive Tab */}
        {tab === "archive" && (
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
        )}

        {/* Performance Tab */}
        {tab === "performance" && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Database Performance</h3>
              <button
                onClick={loadPerfStats}
                disabled={perfLoading}
                className={`px-4 py-2 rounded font-medium mb-4 ${
                  perfLoading
                    ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                {perfLoading ? "Loading..." : "Refresh Stats"}
              </button>

              {perfStats && (
                <div className="space-y-4">
                  {/* Database Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-800 rounded p-4">
                      <p className="text-xs text-neutral-400">Total Products</p>
                      <p className="text-2xl font-bold text-white">
                        {(
                          perfStats.database?.total_products || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-neutral-800 rounded p-4">
                      <p className="text-xs text-neutral-400">
                        Live & Listable
                      </p>
                      <p className="text-2xl font-bold text-green-400">
                        {(
                          perfStats.database?.live_listable || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-neutral-800 rounded p-4">
                      <p className="text-xs text-neutral-400">Table Size</p>
                      <p className="text-xl font-bold text-white">
                        {perfStats.database?.table_size || "N/A"}
                      </p>
                    </div>
                    <div className="bg-neutral-800 rounded p-4">
                      <p className="text-xs text-neutral-400">Women Products</p>
                      <p className="text-xl font-bold">
                        {(
                          perfStats.database?.women_products || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-neutral-800 rounded p-4">
                      <p className="text-xs text-neutral-400">Men Products</p>
                      <p className="text-xl font-bold">
                        {(
                          perfStats.database?.men_products || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-neutral-800 rounded p-4">
                      <p className="text-xs text-neutral-400">On Sale</p>
                      <p className="text-xl font-bold text-orange-400">
                        {(
                          perfStats.database?.sale_products || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Indexes */}
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
                              <td className="px-3 py-2 text-right">
                                {idx.size}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Performance Notes */}
                  <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded p-4 text-sm">
                    <p className="text-blue-300 font-medium mb-2">
                      ✓ Optimization Status
                    </p>
                    <ul className="space-y-1 text-blue-200 text-xs">
                      <li>
                        • Product listing queries: &lt;1ms (5,700x faster)
                      </li>
                      <li>• Cache TTL: 60 seconds with SWR 300s</li>
                      <li>• Cache pre-warming: Every 20 minutes</li>
                      <li>• DB maintenance: Daily VACUUM ANALYZE</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Grouping Tab ─────────────────────────────────────────────────── */}
        {tab === "grouping" && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-1">Product Grouping</h2>
              <p className="text-sm text-neutral-400 mb-6">
                Re-normalizes product names (strips sizes, keeps colors) so all
                size variants of the same shoe collapse into one product. Run
                Preview first, then Apply to Feed, then Rebuild Groups.
              </p>

              {/* Feed selector */}
              <div className="flex flex-wrap items-end gap-3 mb-6">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Feed
                  </label>
                  <select
                    value={groupingFeedId}
                    onChange={(e) => {
                      setGroupingFeedId(Number(e.target.value));
                      setGroupingPreview(null);
                      setGroupingResult(null);
                    }}
                    className="bg-neutral-800 border border-neutral-700 text-white text-sm rounded px-3 py-2 min-w-[220px]"
                  >
                    {[
                      { id: 161992, name: "Nautica (~11k)" },
                      { id: 162750, name: "Banana Republic (~19k)" },
                      { id: 280, name: "DSW" },
                      { id: 9169, name: "Zappos" },
                      { id: 10166, name: "Famous Footwear" },
                      { id: 9186, name: "Steve Madden" },
                      { id: 10140, name: "Aldo" },
                      { id: 11285, name: "Kurt Geiger" },
                      { id: 0, name: "— All Feeds —" },
                    ].map((f) => (
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
                  {groupingRunning && groupingStep === "Previewing…"
                    ? "Previewing…"
                    : "🔍 Preview"}
                </button>

                {/* Apply Phase 1 */}
                <button
                  disabled={groupingRunning}
                  onClick={async () => {
                    if (
                      !confirm(
                        `Apply name normalization to ${groupingFeedId === 0 ? "ALL feeds" : "this feed"}? This updates parent_slug on variants — safe to undo by running again.`,
                      )
                    )
                      return;
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
                  {groupingRunning && groupingStep === "Normalizing names…"
                    ? "Applying…"
                    : "✏️ Apply to Feed"}
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
                  {groupingRunning && groupingStep === "Fixing sale flags…"
                    ? "Running…"
                    : "💰 Fix Sale Flags"}
                </button>

                {/* Rebuild Groups (always global) */}
                <button
                  disabled={groupingRunning}
                  onClick={async () => {
                    if (
                      !confirm(
                        "Rebuild ALL product groups? This is global and may take up to 2 minutes.",
                      )
                    )
                      return;
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
                  {groupingRunning && groupingStep === "Rebuilding groups…"
                    ? "Rebuilding…"
                    : "🔄 Rebuild Groups"}
                </button>
              </div>

              {groupingRunning && (
                <p className="text-sm text-yellow-400 animate-pulse mb-4">
                  {groupingStep}
                </p>
              )}

              {/* Preview results */}
              {groupingPreview && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      {
                        label: "Total Variants",
                        value: groupingPreview.totalVariants?.toLocaleString(),
                      },
                      {
                        label: "Would Update",
                        value: groupingPreview.wouldUpdate?.toLocaleString(),
                        highlight: true,
                      },
                      {
                        label: "Current Groups (sample)",
                        value:
                          groupingPreview.currentGroupsInSample?.toLocaleString(),
                      },
                      {
                        label: "New Groups (sample)",
                        value:
                          groupingPreview.newGroupsInSample?.toLocaleString(),
                        green: true,
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className={`rounded p-3 border ${s.highlight ? "bg-yellow-900/30 border-yellow-700" : s.green ? "bg-green-900/30 border-green-700" : "bg-neutral-800 border-neutral-700"}`}
                      >
                        <p className="text-xs text-neutral-400 mb-0.5">
                          {s.label}
                        </p>
                        <p className="text-xl font-bold">{s.value ?? "—"}</p>
                      </div>
                    ))}
                  </div>

                  {groupingPreview.groupReduction > 0 && (
                    <p className="text-sm text-green-400">
                      ✓ Estimated{" "}
                      <strong>{groupingPreview.groupReduction}</strong> fewer
                      duplicate product cards in this sample
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
                              <th className="text-left px-3 py-2 text-neutral-400 font-medium">
                                Original name
                              </th>
                              <th className="text-left px-3 py-2 text-neutral-400 font-medium">
                                Clean title
                              </th>
                              <th className="text-left px-3 py-2 text-neutral-400 font-medium">
                                New slug
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {groupingPreview.sample.map(
                              (row: any, i: number) => (
                                <tr
                                  key={i}
                                  className="border-t border-neutral-800 hover:bg-neutral-800/50"
                                >
                                  <td className="px-3 py-2 text-neutral-400 max-w-[280px] truncate">
                                    {row.original}
                                  </td>
                                  <td className="px-3 py-2 text-white font-medium max-w-[240px] truncate">
                                    {row.cleanTitle}
                                  </td>
                                  <td className="px-3 py-2 text-neutral-500 max-w-[200px] truncate font-mono">
                                    {row.newSlug}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Apply / phase results */}
              {groupingResult && (
                <div
                  className={`mt-4 p-4 rounded border text-sm ${groupingResult.success ? "bg-green-900/20 border-green-700" : "bg-red-900/20 border-red-700"}`}
                >
                  {groupingResult.success ? (
                    <div className="space-y-1">
                      <p className="font-semibold text-green-400">
                        ✓ Done in{" "}
                        {((groupingResult.durationMs ?? 0) / 1000).toFixed(1)}s
                      </p>
                      {groupingResult.phase1 && (
                        <p className="text-neutral-300">
                          Phase 1 —{" "}
                          {groupingResult.phase1.totalVariants?.toLocaleString()}{" "}
                          scanned,{" "}
                          <strong>
                            {groupingResult.phase1.totalUpdated?.toLocaleString()}
                          </strong>{" "}
                          slugs updated
                        </p>
                      )}
                      {groupingResult.phase1b && (
                        <p className="text-neutral-300">
                          Phase 1b —{" "}
                          <strong>
                            {groupingResult.phase1b.saleFixed?.toLocaleString()}
                          </strong>{" "}
                          sale flags recalculated
                        </p>
                      )}
                      {groupingResult.phase2 && (
                        <p className="text-neutral-300">
                          Phase 2 —{" "}
                          <strong>
                            {groupingResult.phase2.groupsUpserted?.toLocaleString()}
                          </strong>{" "}
                          groups rebuilt,{" "}
                          <strong>
                            {groupingResult.phase2.hidden?.toLocaleString()}
                          </strong>{" "}
                          hidden
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-400">
                      Error: {groupingResult.error}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Workflow guide */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-sm text-neutral-400">
              <p className="font-semibold text-white mb-3">
                Recommended workflow
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Select a feed (start with{" "}
                  <strong className="text-white">Nautica</strong> or{" "}
                  <strong className="text-white">Banana Republic</strong>)
                </li>
                <li>
                  Click <strong className="text-white">Preview</strong> — check
                  the sample shows clean titles and fewer duplicate slugs
                </li>
                <li>
                  Click <strong className="text-white">Apply to Feed</strong> —
                  updates parent_slug on that feed's variants only
                </li>
                <li>Repeat for other feeds you want to clean up</li>
                <li>
                  Click <strong className="text-white">Fix Sale Flags</strong>{" "}
                  on each feed (or All Feeds) to correct is_on_sale +
                  discount_pct
                </li>
                <li>
                  Click <strong className="text-white">Rebuild Groups</strong>{" "}
                  once at the end — this is global and re-collapses all variants
                  into product groups
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {tab === "jobs" && <JobsTab />}
      </div>
    </div>
  );
}
