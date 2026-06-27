import { supabase } from "./supabase/client";

export async function getUser() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, name, email, phone_number")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email!,
    name: profile.name,
    role: profile.role,
    phone_number: profile.phone_number,
  };
}
