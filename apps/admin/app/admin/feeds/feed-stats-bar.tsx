"use client";

import type { FeedStats } from "./types";

interface FeedStatsBarProps {
  stats: FeedStats;
}

export const FeedStatsBar = ({ stats }: FeedStatsBarProps) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Total Advertisers</div>
      <div className="text-3xl font-bold">{stats.total_feeds || 0}</div>
    </div>
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Processed</div>
      <div className="text-3xl font-bold text-green-400">
        {stats.processed_feeds || 0}
      </div>
    </div>
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Pending</div>
      <div className="text-3xl font-bold text-orange-400">
        {stats.pending_feeds || 0}
      </div>
    </div>
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Available Products</div>
      <div className="text-2xl font-bold text-blue-400">
        {Number(stats.total_available_products || 0).toLocaleString()}
      </div>
    </div>
    <div className="bg-neutral-900 p-4 rounded">
      <div className="text-neutral-400 text-sm">Imported Products</div>
      <div className="text-2xl font-bold text-purple-400">
        {Number(stats.total_imported_products || 0).toLocaleString()}
      </div>
    </div>
  </div>
);
