import type { Metadata } from "next";
import Link from "next/link";
import { Database, ArrowLeft } from "lucide-react";
import { TabNav } from "./TabNav";

export const metadata: Metadata = {
  title: "Admin — Shoetopia",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Database size={16} className="text-[var(--brand-rose)]" />
            <span className="text-sm font-semibold text-foreground">
              Shoetopia Admin
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> Back to site
          </Link>
        </div>
      </div>

      <TabNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
