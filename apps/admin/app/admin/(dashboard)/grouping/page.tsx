"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function GroupingPage() {
  const [groupingRunning, setGroupingRunning] = useState(false);
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
              try {
                const body: any = { phase: "1" };
                if (groupingFeedId !== 0) body.programId = groupingFeedId;
                const res = await fetch("/api/admin/renormalize", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                const data = await res.json();
                if (data.success) {
                  toast.success(`Done in ${((data.durationMs ?? 0) / 1000).toFixed(1)}s`)
                } else {
                  toast.error(`Error: ${data.error}`)
                }
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
              try {
                const body: any = { phase: "1b" };
                if (groupingFeedId !== 0) body.programId = groupingFeedId;
                const res = await fetch("/api/admin/renormalize", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                const data = await res.json();
                if (data.success) {
                  toast.success(`Done in ${((data.durationMs ?? 0) / 1000).toFixed(1)}s`)
                } else {
                  toast.error(`Error: ${data.error}`)
                }
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
              try {
                const res = await fetch("/api/admin/renormalize", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ phase: "2" }),
                });
                const data = await res.json();
                if (data.success) {
                  toast.success(`Done in ${((data.durationMs ?? 0) / 1000).toFixed(1)}s`)
                } else {
                  toast.error(`Error: ${data.error}`)
                }
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
