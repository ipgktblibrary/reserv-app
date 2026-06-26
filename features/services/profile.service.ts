import { supabase } from "@/lib/supabase/client";

export const profileService = {
  async getProfile() {
    await supabase.from("profiles").select("*").single();
  },
};
