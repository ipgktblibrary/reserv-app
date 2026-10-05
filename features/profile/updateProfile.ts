import { supabaseClient } from "@/lib/supabase/client";

type UpdateProfileInput = {
  name: string;
};

export async function updateProfile({
  name,
}: UpdateProfileInput): Promise<void> {
  const supabase = supabaseClient;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in to update your profile.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      name,
    })
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }
}
