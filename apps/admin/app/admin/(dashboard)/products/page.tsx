"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ProductsPage() {
  const [groupingRunning, setGroupingRunning] = useState(false);
  const [categorizingRunning, setCategorizingRunning] = useState(false);
  const [regrouping, setRegrouping] = useState(false);
  const [regroupRunId, setRegroupRunId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
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
              try {
                const res = await fetch(
                  "/api/admin/housekeeping/group-products",
                );
                const data = await res.json();
                if (data.success) toast.success(`Current status: ${data.stats?.parentProducts?.toLocaleString() ?? 0} parents, ${data.stats?.childProducts?.toLocaleString() ?? 0} children`)
                else toast.error(`Error: ${data.error}`)
              } catch (e: any) {
                toast.error(`Error: ${e.message}`)
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
                if (data.success) toast.success(data.message || "Dry run complete")
                else toast.error(`Error: ${data.error}`)
              } catch (e: any) {
                toast.error(`Error: ${e.message}`)
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
              toast.loading("Running grouping...", { id: "grouping" })
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
                toast.dismiss("grouping")
                if (data.success) toast.success(data.message || "Grouping complete!")
                else toast.error(`Error: ${data.error}`)
              } catch (e: any) {
                toast.dismiss("grouping")
                toast.error(`Error: ${e.message}`)
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
              try {
                const res = await fetch("/api/admin/housekeeping/regroup", {
                  method: "POST",
                });
                const data = await res.json();
                if (data.started) {
                  setRegroupRunId(data.runId);
                  toast.success(`Regroup (24h) started — runId: ${data.runId}`)
                } else {
                  toast.error(`Error: ${data.error}`)
                }
              } catch (e: any) {
                toast.error(`Error: ${e.message}`)
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
            try {
              const res = await fetch("/api/admin/fix-categories", {
                method: "POST",
              });
              const data = await res.json();
              if (data.success) toast.success("Categories fixed successfully!")
              else toast.error(`Error: ${data.error}`)
            } catch (e: any) {
              toast.error(`Error: ${e.message}`)
            }
            setCategorizingRunning(false);
          }}
          disabled={categorizingRunning}
          className={`px-4 py-2 rounded font-medium transition-colors ${categorizingRunning ? "bg-neutral-700 text-neutral-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 text-white"}`}
        >
          {categorizingRunning ? "Running..." : "Fix All Categories"}
        </button>
      </div>
    </div>
  );
}
