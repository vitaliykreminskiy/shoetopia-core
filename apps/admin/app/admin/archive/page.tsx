"use client";

import { useState, useEffect } from "react";

export default function ArchivePage() {
  const [archivedProducts, setArchivedProducts] = useState<any[]>([]);
  const [archiveLoading, setArchiveLoading] = useState(false);

  useEffect(() => {
    loadArchived();
  }, []);

  async function loadArchived() {
    setArchiveLoading(true);
    try {
      const res = await fetch(
        "/api/admin/archive?visibility=archived&limit=50",
      );
      const data = await res.json();
      setArchivedProducts(data.products || []);
    } catch (e) {
      console.error(e);
    }
    setArchiveLoading(false);
  }

  async function restoreProduct(productId: number) {
    try {
      const res = await fetch("/api/admin/archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore", productIds: [productId] }),
      });
      const data = await res.json();
      if (data.success) {
        setArchivedProducts((prev) => prev.filter((p) => p.id !== productId));
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={loadArchived}
        disabled={archiveLoading}
        className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-sm"
      >
        {archiveLoading ? "Loading..." : "Refresh Archived"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {archivedProducts.map((product) => (
          <div key={product.id} className="bg-neutral-900 p-4 rounded">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
            <h4 className="font-medium truncate">{product.name}</h4>
            <p className="text-sm text-neutral-400">{product.brand}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => restoreProduct(product.id)}
                className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-500 rounded text-sm"
              >
                Restore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
