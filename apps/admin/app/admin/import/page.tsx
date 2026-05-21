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
