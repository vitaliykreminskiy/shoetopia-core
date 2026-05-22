"use client";

import { useState, useEffect } from "react";

import { DailySyncWidget } from "./daily-sync-widget";

export default function StatusPage() {
  const [status, setStatus] = useState<any>(null);
  const [reprocessing, setReprocessing] = useState(false);
  const [reprocessRunId, setReprocessRunId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    refreshStatus();
  }, []);

  const refreshStatus = async () => {
    try {
      const res = await fetch("/api/admin/status");
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded ${message.includes("Error") || message.includes("Failed") ? "bg-red-900/30 text-red-300" : "bg-green-900/30 text-green-300"}`}
        >
          {message}
        </div>
      )}

      <DailySyncWidget onMessage={setMessage} />

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
  );
}
