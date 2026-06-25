import { supabase } from "./supabase/client";

export async function getUser() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, name, email")
    .eq("id", data.user.id)
    .single();

  return {
    id: data.user.id,
    email: data.user.email,
    profile: profile ?? null,
  };
}
