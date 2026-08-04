import { supabaseClient } from "@/lib/supabase/client";

export const profileService = {
  async getProfile() {
    await supabaseClient.from("profiles").select("*").single();
  },
};
