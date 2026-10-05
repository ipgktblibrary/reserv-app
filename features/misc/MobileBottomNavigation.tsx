"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  CalendarDays,
  History,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  {
    label: "Tempahan",
    href: "/booking",
    icon: CalendarDays,
  },
  {
    label: "Sejarah",
    href: "/history",
    icon: History,
  },
  {
    label: "Profil",
    href: "/profile",
    icon: UserRound,
  },
];

export default function MobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-around rounded-2xl border border-black/5 bg-white/90 px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-2 transition active:scale-95"
            >
              <span
                className={`flex h-8 w-10 items-center justify-center rounded-xl transition ${
                  isActive ? "bg-black text-white" : "text-gray-500"
                }`}
              >
                <Icon
                  className="h-4.5 w-4.5"
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
              </span>

              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
