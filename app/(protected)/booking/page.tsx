"use client";

import { supabase } from "@/lib/supabase/client";

import { useEffect, useState } from "react";

export default function BookingPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .single();

      setName(data?.name);

      if (error) {
        console.error(error);
        return;
      }

      console.log("profiles:", data);
    };

    fetchData();
  }, []);

  return <div> HELLO WORLD {name} </div>;
}
