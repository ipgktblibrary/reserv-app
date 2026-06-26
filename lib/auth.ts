// import { supabase } from "./supabase/client";

// export async function getUser() {
//   const { data } = await supabase.auth.getUser();

//   if (!data.user) return null;

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("role, name, email")
//     .eq("id", data.user.id)
//     .single();

//   return {
//     id: data.user.id,
//     role: data.user.role,
//     email: data.user.email,
//     profile: profile ?? null,
//   };
// }

import { supabase } from "./supabase/client";

export async function getUser() {
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError || !auth.user) return null;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, name, email")
    .eq("id", auth.user.id)
    .single();

  if (authError || profileError || !profile) {
    throw new Error("User profile missing or invalid");
  }
  return {
    id: auth.user.id,
    email: auth.user.email,
    role: profile.role,
    name: profile.name,
  };
}
