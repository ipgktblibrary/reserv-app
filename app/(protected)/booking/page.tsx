"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setName(data?.name ?? "");
      console.log("profiles:", data);
    };

    fetchData();
  }, []);

  return <div>HELLO WORLD {name}</div>;
}
