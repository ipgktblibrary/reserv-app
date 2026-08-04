"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/lib/auth";

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

  return <>{children}</>;
}
