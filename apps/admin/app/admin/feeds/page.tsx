"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { FeedRow, FeedStats, SortBy } from "./types";
import { FeedStatsBar } from "./feed-stats-bar";
import { FeedTable } from "./feed-table";
import { FeedImportGrid } from "./feed-import-grid";

export default function FeedsPage() {
  const [feedsData, setFeedsData] = useState<{
    feeds: FeedRow[];
    stats: FeedStats;
  } | null>(null);
  const [feedsLoading, setFeedsLoading] = useState(false);
  const [feedsSortBy, setFeedsSortBy] = useState<SortBy>("pending");
  const [feedsFilterCountry, setFeedsFilterCountry] = useState<string>("all");

  const [importing, setImporting] = useState(false);
  const [importingFeedId, setImportingFeedId] = useState<number | null>(null);
  const [batchImporting, setBatchImporting] = useState(false);
  const [batchProgress, setBatchProgress] = useState({
    current: 0,
    total: 0,
    currentFeed: "",
  });
  const [selectedFeedIds, setSelectedFeedIds] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    setFeedsLoading(true);
    try {
      const res = await fetch("/api/admin/import-feeds");
      if (!res.ok)
        throw new Error(`API error ${res.status}: ${await res.text()}`);
      const data = await res.json();
      setFeedsData(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setFeedsLoading(false);
    }
  };

  const toggleFeedSelection = (programId: number) => {
    setSelectedFeedIds((prev) => {
      const next = new Set(prev);
      if (next.has(programId)) next.delete(programId);
      else next.add(programId);
      return next;
    });
  };

  const importOne = async (feedId: number) => {
    const feed = feedsData?.feeds?.find((f) => f.program_id === feedId);
    setImportingFeedId(feedId);
    setImporting(true);
    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(
          `Imported ${data.imported} products from ${feed?.program_name}`,
        );
        await loadFeeds();
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    }
    setImporting(false);
    setImportingFeedId(null);
  };

  const importSelected = async () => {
    if (selectedFeedIds.size === 0) {
      toast.error("Select at least one feed");
      return;
    }
    setBatchImporting(true);
    const feedIds = Array.from(selectedFeedIds);
    let totalImported = 0;
    let totalSkipped = 0;

    for (let i = 0; i < feedIds.length; i++) {
      const feedId = feedIds[i];
      const feed = feedsData?.feeds?.find((f) => f.program_id === feedId);
      setBatchProgress({
        current: i + 1,
        total: feedIds.length,
        currentFeed: feed?.program_name || "",
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

    await loadFeeds();
    toast.success(
      `Batch import complete: ${totalImported} imported, ${totalSkipped} skipped across ${feedIds.length} feeds`,
    );
    setSelectedFeedIds(new Set());
    setBatchImporting(false);
    setBatchProgress({ current: 0, total: 0, currentFeed: "" });
  };

  const uploadCSV = async (text: string) => {
    setFeedsLoading(true);
    try {
      const res = await fetch("/api/admin/import-feeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvText: text }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(
          `Imported ${data.imported} new feeds, updated ${data.updated} existing`,
        );
        await loadFeeds();
      } else {
        toast.error(`Error: ${data.error}`);
        throw new Error(data.error);
      }
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    } finally {
      setFeedsLoading(false);
    }
  };

  const sortedFilteredFeeds =
    feedsData?.feeds
      ?.filter(
        (f) => feedsFilterCountry === "all" || f.country === feedsFilterCountry,
      )
      .sort((a, b) => {
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
      }) ?? [];

  return (
    <div className="space-y-6">
      {feedsData?.stats && <FeedStatsBar stats={feedsData.stats} />}

      <FeedImportGrid
        feeds={sortedFilteredFeeds}
        selectedIds={selectedFeedIds}
        importing={importing}
        importingFeedId={importingFeedId}
        batchImporting={batchImporting}
        batchProgress={batchProgress}
        onToggleSelect={toggleFeedSelection}
        onClearSelection={() => setSelectedFeedIds(new Set())}
        onImportOne={importOne}
        onImportSelected={importSelected}
      />

      <FeedTable
        feeds={sortedFilteredFeeds}
        loading={feedsLoading}
        sortBy={feedsSortBy}
        filterCountry={feedsFilterCountry}
        onSortChange={setFeedsSortBy}
        onFilterChange={setFeedsFilterCountry}
        onRefresh={loadFeeds}
        onUploadCSV={uploadCSV}
      />
    </div>
  );
}
