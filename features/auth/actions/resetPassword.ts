"use server";

import { createClient } from "@/lib/supabase/server";

export async function resetPassword(password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
