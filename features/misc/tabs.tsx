"use client";

import { usePathname, useRouter } from "next/navigation";

export function Tabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Booking", path: "/booking" },
    { label: "History", path: "/history" },
  ];

  return (
    <div className="flex gap-6 border-b border-neutral-200">
      {tabs.map((tab) => {
        const active = pathname === tab.path;

        return (
          <button
            key={tab.path}
            type="button"
            onClick={() => router.push(tab.path)}
            className={[
              "pb-3 text-sm font-medium border-b-2 transition",
              active
                ? "border-accent text-accent"
                : "border-transparent text-neutral-400 hover:text-neutral-700",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
