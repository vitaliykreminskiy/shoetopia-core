"use client";

import { useState, useEffect } from "react";

export default function FeedsPage() {
  const [feedsData, setFeedsData] = useState<{ feeds: any[]; stats: any } | null>(null);
  const [feedsLoading, setFeedsLoading] = useState(false);
  const [feedsSortBy, setFeedsSortBy] = useState<"pending" | "products" | "name" | "imported">("pending");
  const [feedsFilterCountry, setFeedsFilterCountry] = useState<string>("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadFeeds();
  }, []);

  async function loadFeeds() {
    setFeedsLoading(true);
    try {
      const res = await fetch("/api/admin/import-feeds");
      const data = await res.json();
      setFeedsData(data);
    } catch (e) {
      console.error(e);
    }
    setFeedsLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Upload Feeds CSV */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Upload Advertiser Feeds CSV</h3>
        <p className="text-sm text-neutral-400 mb-4">
          Upload your FlexOffers export CSV with columns: Id, ProgramName,
          HTTPSLink, TotalProducts, Status, etc.
        </p>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <input
              type="file"
              accept=".csv"
              id="feeds-csv-upload"
              className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
            />
          </div>
          <button
            onClick={async () => {
              const file = (
                document.getElementById("feeds-csv-upload") as HTMLInputElement
              )?.files?.[0];
              if (!file) {
                setMessage("Please select a CSV file");
                return;
              }
              setFeedsLoading(true);
              setMessage("");
              try {
                const formData = new FormData();
                formData.append("file", file);
                const res = await fetch("/api/admin/import-feeds", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                if (data.success) {
                  setMessage(
                    `Imported ${data.imported} new feeds, updated ${data.updated} existing`,
                  );
                  await loadFeeds();
                  (
                    document.getElementById(
                      "feeds-csv-upload",
                    ) as HTMLInputElement
                  ).value = "";
                } else {
                  setMessage(`Error: ${data.error}`);
                }
              } catch (e: any) {
                setMessage(`Error: ${e.message}`);
              }
              setFeedsLoading(false);
            }}
            disabled={feedsLoading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 rounded font-medium"
          >
            {feedsLoading ? "Uploading..." : "Upload Feeds"}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded ${message.includes("Error") ? "bg-red-900/30 text-red-300" : "bg-green-900/30 text-green-300"}`}
        >
          {message}
        </div>
      )}

      {/* Stats */}
      {feedsData?.stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Total Advertisers</div>
            <div className="text-3xl font-bold">
              {feedsData.stats.total_feeds || 0}
            </div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Processed</div>
            <div className="text-3xl font-bold text-green-400">
              {feedsData.stats.processed_feeds || 0}
            </div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Pending</div>
            <div className="text-3xl font-bold text-orange-400">
              {feedsData.stats.pending_feeds || 0}
            </div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Available Products</div>
            <div className="text-2xl font-bold text-blue-400">
              {Number(feedsData.stats.total_available_products || 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-neutral-400 text-sm">Imported Products</div>
            <div className="text-2xl font-bold text-purple-400">
              {Number(feedsData.stats.total_imported_products || 0).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Filters & Sort */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="text-sm text-neutral-400 mr-2">Sort by:</label>
          <select
            value={feedsSortBy}
            onChange={(e) => setFeedsSortBy(e.target.value as any)}
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
            value={feedsFilterCountry}
            onChange={(e) => setFeedsFilterCountry(e.target.value)}
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
          onClick={loadFeeds}
          disabled={feedsLoading}
          className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-sm"
        >
          Refresh
        </button>
      </div>

      {/* Feeds Table */}
      {feedsLoading && !feedsData ? (
        <div className="text-center py-12 text-neutral-400">Loading feeds...</div>
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
              {feedsData?.feeds
                ?.filter(
                  (f: any) =>
                    feedsFilterCountry === "all" ||
                    f.country === feedsFilterCountry,
                )
                ?.sort((a: any, b: any) => {
                  if (feedsSortBy === "pending") {
                    if (!a.last_imported_at && b.last_imported_at) return -1;
                    if (a.last_imported_at && !b.last_imported_at) return 1;
                    return b.total_products - a.total_products;
                  }
                  if (feedsSortBy === "products")
                    return b.total_products - a.total_products;
                  if (feedsSortBy === "name")
                    return a.program_name.localeCompare(b.program_name);
                  if (feedsSortBy === "imported") {
                    if (!a.last_imported_at) return 1;
                    if (!b.last_imported_at) return -1;
                    return (
                      new Date(b.last_imported_at).getTime() -
                      new Date(a.last_imported_at).getTime()
                    );
                  }
                  return 0;
                })
                ?.map((feed: any) => (
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
                          className="text-blue-400 hover:text-blue-300 text-xs truncate block max-w-[200px]"
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
}
