"use client";

import type { FeedRow, SortBy } from "./types";
import { FeedCsvUpload } from "./feed-csv-upload";

interface FeedTableProps {
  feeds: FeedRow[];
  loading: boolean;
  sortBy: SortBy;
  filterCountry: string;
  onSortChange: (v: SortBy) => void;
  onFilterChange: (v: string) => void;
  onRefresh: () => Promise<void>;
}

export const FeedTable = ({
  feeds,
  loading,
  sortBy,
  filterCountry,
  onSortChange,
  onFilterChange,
  onRefresh,
}: FeedTableProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div>
          <label className="text-sm text-neutral-400 mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded text-white"
          >
            <option value="pending">Pending First</option>
            <option value="products">Most Products</option>
            <option value="name">Name A-Z</option>
            <option value="imported">Recently Imported</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-neutral-400 mr-2">Country:</label>
          <select
            value={filterCountry}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded text-white"
          >
            <option value="all">All</option>
            <option value="US">US Only</option>
            <option value="CA">Canada</option>
            <option value="GB">UK</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-sm"
        >
          Refresh
        </button>
      </div>

      {loading && feeds.length === 0 ? (
        <div className="text-center py-12 text-neutral-400">
          Loading feeds...
        </div>
      ) : (
        <div className="bg-neutral-900 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-800">
              <tr>
                <th className="px-4 py-3 text-left">Advertiser</th>
                <th className="px-4 py-3 text-left">Country</th>
                <th className="px-4 py-3 text-right">Available</th>
                <th className="px-4 py-3 text-right">Imported</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Last Imported</th>
                <th className="px-4 py-3 text-left">HTTPS Link</th>
              </tr>
            </thead>
            <tbody>
              {feeds.map((feed) => (
                <tr
                  key={feed.program_id}
                  className={`border-t border-neutral-800 ${!feed.last_imported_at ? "bg-orange-900/10" : ""}`}
                >
                  <td className="px-4 py-3 font-medium">
                    {feed.program_name}
                    {feed.catalog_name &&
                      feed.catalog_name !== feed.program_name && (
                        <span className="text-neutral-500 text-xs block">
                          {feed.catalog_name}
                        </span>
                      )}
                  </td>
                  <td className="px-4 py-3">{feed.country}</td>
                  <td className="px-4 py-3 text-right">
                    {(feed.total_products || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-green-400">
                    {(feed.products_imported || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        feed.last_imported_at
                          ? "bg-green-900/50 text-green-300"
                          : feed.status === "ready"
                            ? "bg-blue-900/50 text-blue-300"
                            : "bg-orange-900/50 text-orange-300"
                      }`}
                    >
                      {feed.last_imported_at
                        ? "Processed"
                        : feed.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {feed.last_imported_at
                      ? new Date(feed.last_imported_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {feed.https_link ? (
                      <a
                        href={feed.https_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs truncate block max-w-50"
                        title={feed.https_link}
                      >
                        Download Feed
                      </a>
                    ) : (
                      <span className="text-neutral-500 text-xs">No link</span>
                    )}
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
