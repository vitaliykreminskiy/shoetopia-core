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
