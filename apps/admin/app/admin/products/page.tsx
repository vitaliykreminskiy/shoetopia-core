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
