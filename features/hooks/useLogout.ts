import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useLogout() {
  const router = useRouter();

  const logout = useCallback(async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    router.replace("/signin");
    router.refresh();
  }, [router]);

  return logout;
}
