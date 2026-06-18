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
