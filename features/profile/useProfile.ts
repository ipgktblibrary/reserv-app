"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/auth";

export function useUserProfile() {
  const [user, setUser] = useState<{
    id: string;
    name: string | null;
    email: string;
    role: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const user = await getUserProfile();
      setUser(user);
      setLoading(false);
    }
    load();
  }, []);

  return {
    user,
    loading,
    name: user?.name ?? null,
  };
}
