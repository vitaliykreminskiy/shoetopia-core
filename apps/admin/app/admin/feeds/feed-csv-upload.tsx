"use client";

import { useState } from "react";
import { toast } from "sonner";

interface FeedCsvUploadProps {
  onSuccess: () => Promise<void>;
}

export const FeedCsvUpload = ({ onSuccess }: FeedCsvUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async () => {
    const input = document.getElementById("feeds-csv-upload") as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) { setUploadError("Please select a CSV file"); return; }
    setUploadError(null);
    setUploading(true);
    try {
      const text = await file.text();
      const res = await fetch("/api/admin/import-feeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvText: text }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Imported ${data.imported} new feeds, updated ${data.updated} existing`);
        input.value = "";
        await onSuccess();
      } else {
        toast.error(`Error: ${data.error}`);
        setUploadError(data.error);
      }
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
      setUploadError(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
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
          onClick={handleUpload}
          disabled={uploading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 rounded font-medium"
        >
          {uploading ? "Uploading..." : "Upload Feeds"}
        </button>
      </div>
      {uploadError && (
        <p className="text-sm text-red-400 mt-2">{uploadError}</p>
      )}
    </div>
  );
};
