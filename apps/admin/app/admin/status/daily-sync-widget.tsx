"use client";

import { useEffect, useState } from "react";
import { TableSkeleton } from "@/components/table-skeleton";

const PIPELINE_STEPS = [
  "1. Fetch Feeds",
  "2. Upsert Products",
  "3. Hide Stale",
  "4. Fix Gender/Groups",
  "5. Promote to Live",
];

interface Props {
  onMessage: (msg: string) => void;
}

export const DailySyncWidget = ({ onMessage }: Props) => {
  const [syncLog, setSyncLog] = useState<any[]>([]);
  const [syncLogLoading, setSyncLogLoading] = useState(false);
  const [triggering, setTriggering] = useState(false);

  const loadSyncLog = async () => {
    setSyncLogLoading(true);
    try {
      const res = await fetch("/api/admin/sync-log");
      const data = await res.json();
      if (data.success) setSyncLog(data.logs);
    } catch (e) {
      console.error(e);
    }
    setSyncLogLoading(false);
  };

  useEffect(() => {
    loadSyncLog();
  }, []);

  const runNow = async () => {
    if (
      !confirm(
        "Trigger a full sync now? This runs in the background — check the sync log for progress.",
      )
    )
      return;
    setTriggering(true);
    try {
      const res = await fetch("/api/cron/daily-sync", { method: "POST" });
      const data = await res.json();
      onMessage(
        data.started
          ? `Sync started in background. Run ID: ${data.runId ?? "—"}. Refresh the sync log in a few minutes.`
          : `Failed to start sync: ${data.error}`,
      );
    } catch (e: any) {
      onMessage(`Error: ${e.message}`);
    }
    setTriggering(false);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">Daily Sync</h3>
          <p className="text-sm text-neutral-400">
            Runs automatically every day at{" "}
            <span className="text-white font-medium">10:30 PM PST</span> (6:30
            AM UTC). Imports all feeds, hides stale products, fixes
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
            onClick={runNow}
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

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs text-center mb-4">
        {PIPELINE_STEPS.map((step, i) => (
          <div
            key={i}
            className="bg-neutral-800 rounded px-2 py-2 text-neutral-300"
          >
            {step}
          </div>
        ))}
      </div>

      {syncLogLoading ? (
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
            <TableSkeleton rows={5} cols={6} />
          </table>
        </div>
      ) : syncLog.length === 0 ? (
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
  );
};
