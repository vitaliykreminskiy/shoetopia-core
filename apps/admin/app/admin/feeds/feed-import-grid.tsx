"use client";

import type { FeedRow } from "./types";

interface BatchProgress {
  current: number;
  total: number;
  currentFeed: string;
}

interface FeedImportGridProps {
  feeds: FeedRow[];
  selectedIds: Set<number>;
  importing: boolean;
  importingFeedId: number | null;
  batchImporting: boolean;
  batchProgress: BatchProgress;
  onToggleSelect: (id: number) => void;
  onClearSelection: () => void;
  onImportOne: (id: number) => Promise<void>;
  onImportSelected: () => Promise<void>;
}

export const FeedImportGrid = ({
  feeds,
  selectedIds,
  importing,
  importingFeedId,
  batchImporting,
  batchProgress,
  onToggleSelect,
  onClearSelection,
  onImportOne,
  onImportSelected,
}: FeedImportGridProps) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Import Products</h2>

    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-4">
        <span className="text-neutral-400 text-sm">
          {selectedIds.size} feed{selectedIds.size !== 1 ? "s" : ""} selected
        </span>
        {selectedIds.size > 0 && (
          <button
            onClick={onClearSelection}
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
          onClick={onImportSelected}
          disabled={selectedIds.size === 0 || batchImporting}
          className={`px-6 py-2 rounded font-medium transition-colors ${
            selectedIds.size === 0 || batchImporting
              ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 text-white"
          }`}
        >
          {batchImporting
            ? "Importing..."
            : `Import Selected (${selectedIds.size})`}
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...feeds]
        .sort((a, b) => a.product_count - b.product_count)
        .map((feed) => {
          const isImporting = importing && importingFeedId === feed.program_id;
          const isSelected = selectedIds.has(feed.program_id);

          return (
            <div
              key={feed.program_id}
              className={`bg-neutral-900 border rounded-lg p-5 flex flex-col cursor-pointer transition-colors ${
                isSelected
                  ? "border-green-500 bg-green-900/10"
                  : "border-neutral-800 hover:border-neutral-700"
              }`}
              onClick={() => onToggleSelect(feed.program_id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(feed.program_id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-green-500 focus:ring-green-500 focus:ring-offset-0"
                  />
                  <div>
                    <h3 className="font-semibold text-white">
                      {feed.program_name}
                    </h3>
                    <span className="text-xs text-neutral-500 uppercase">
                      {feed.country}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xl font-bold ${feed.product_count === 0 ? "text-orange-400" : "text-white"}`}
                  >
                    {feed.product_count}
                  </div>
                  <div className="text-xs text-neutral-500">in database</div>
                </div>
              </div>

              <div className="bg-neutral-800/50 rounded p-2 mb-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">In feed source:</span>
                  <span className="font-bold text-purple-400">
                    {feed.total_products.toLocaleString()}
                  </span>
                </div>
                {feed.product_count < feed.total_products && (
                  <div className="text-xs text-yellow-400 mt-1">
                    +{(feed.total_products - feed.product_count).toLocaleString()}{" "}
                    new products available
                  </div>
                )}
              </div>

              <div className="flex gap-4 text-sm mb-4">
                <div>
                  <span className="text-green-400 font-medium">
                    {feed.live_count}
                  </span>
                  <span className="text-neutral-500 ml-1">live</span>
                </div>
                <div>
                  <span className="text-blue-400 font-medium">
                    {feed.in_stock_count}
                  </span>
                  <span className="text-neutral-500 ml-1">in stock</span>
                </div>
              </div>

              <div className="text-xs text-neutral-500 mb-4">
                <div className="flex justify-between">
                  <span>Last imported:</span>
                  <span>
                    {feed.last_imported_at
                      ? new Date(feed.last_imported_at).toLocaleString()
                      : "Never"}
                  </span>
                </div>
              </div>

              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  await onImportOne(feed.program_id);
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
