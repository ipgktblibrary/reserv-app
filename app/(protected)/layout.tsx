"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/lib/auth";
import MobileBottomNavigation from "@/features/misc/MobileBottomNavigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const user = await getUserProfile();

      if (!user) {
        router.replace("/signin");
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) return null;

  return (
    <>
      {/* {children}
      <MobileBottomNavigation /> */}

      <div className="min-h-screen sm:pb-0">
        <main className="pb-28 sm:pb-0">{children}</main>

        <MobileBottomNavigation />
      </div>
    </>
  );
}
