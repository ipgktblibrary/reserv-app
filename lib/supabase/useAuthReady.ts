"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";

export function useAuthReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      await supabaseClient.auth.getSession();
      setReady(true);
    };

    check();

    const { data } = supabaseClient.auth.onAuthStateChange(() => {
      setReady(true);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return ready;
}
