"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useAuthReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      await supabase.auth.getSession();
      setReady(true);
    };

    check();

    const { data } = supabase.auth.onAuthStateChange(() => {
      setReady(true);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return ready;
}
