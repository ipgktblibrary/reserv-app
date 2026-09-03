"use client";

import { useLogout } from "@/features/hooks/useLogout";
import { ThemeSwitcher } from "@/themes/ThemeSwitcher";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingTabs() {
  const router = useRouter();
  const logout = useLogout();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="mb-8 w-full border-b border-purple-100">
      <nav className="-mb-px flex items-end space-x-6 overflow-x-auto no-scrollbar scroll-smooth">
        <button
          type="button"
          className="border-accent text-accent whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-semibold tracking-tight"
        >
          Tempahan Saya
        </button>

        <button
          type="button"
          onClick={() => router.push("/history")}
          className="border-transparent text-gray-400 hover:text-accent whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition"
        >
          Sejarah
        </button>

        {/* MASUKKAAN LINK GOOLGE DRIVE ATAU MAKLUMAT YANG BERKENAAN */}
        <a
          href="https://wa.me/60195426768/?text=Hai,Puan Diana"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-400 transition hover:text-accent"
        >
          Info
        </a>

        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="border-transparent text-gray-400 hover:text-red-500 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition"
        >
          Log Keluar
        </button>

        <ThemeSwitcher />
      </nav>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-purple-100">
            <h2 className="text-base font-semibold text-gray-900">
              Log keluar?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Anda akan keluar dari akaun ini pada peranti ini.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                onClick={async () => {
                  setConfirmOpen(false);
                  await logout();
                }}
                className="flex-1 rounded-xl bg-accent py-2 text-sm font-medium text-white hover:bg-accent-hover"
              >
                Log keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
