import type { Metadata } from "next";
import Link from "next/link";
import { Database, ArrowLeft } from "lucide-react";
import { TabNav } from "./TabNav";
import { Toaster } from "sonner";
import { SignOutButton } from "./sign-out-button";

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
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="border-b border-neutral-800 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Database size={16} className="text-[var(--brand-rose)]" />
            <span className="text-sm font-semibold text-white">
              Shoetopia Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={12} /> Back to site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </div>

      <TabNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          classNames: {
            success:
              "!bg-emerald-950 !border-emerald-700 !text-emerald-200 [&>[data-icon]]:!text-emerald-400",
            error:
              "!bg-red-950 !border-red-700 !text-red-200 [&>[data-icon]]:!text-red-400",
            warning:
              "!bg-amber-950 !border-amber-700 !text-amber-200 [&>[data-icon]]:!text-amber-400",
            info: "!bg-sky-950 !border-sky-700 !text-sky-200 [&>[data-icon]]:!text-sky-400",
          },
        }}
      />
    </div>
  );
}
