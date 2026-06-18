"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Status", href: "/admin/status" },
  { label: "Feeds", href: "/admin/feeds" },
  { label: "Products", href: "/admin/products" },
{ label: "Performance", href: "/admin/performance" },
  { label: "Grouping", href: "/admin/grouping" },
  { label: "Jobs", href: "/admin/jobs" },
];

export function TabNav() {
  const pathname = usePathname();
  return (
    <div className="border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1">
        {TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-5 py-3 text-sm font-medium capitalize transition-colors ${
              pathname.startsWith(tab.href)
                ? "border-b-2 border-blue-500 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
