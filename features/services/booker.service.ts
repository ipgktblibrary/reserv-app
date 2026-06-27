import { supabase } from "@/lib/supabase/client";

export type Booker = {
  id: string;
  name: string | null;
  phone_number: string;
  profile_id: string;
  is_blocked: boolean;
  block_reason: string | null;
};

export const bookerService = {
  /**
   * Get booker linked to a profile
   */
  async getByProfileId(profileId: string): Promise<Booker | null> {
    const { data } = await supabase
      .from("bookers")
      .select("*")
      .eq("profile_id", profileId)
      .maybeSingle();

    return data;
  },

  /**
   * Create booker for a profile (first-time user)
   */
  async create(profileId: string, payload?: { name?: string }) {
    const { data } = await supabase
      .from("bookers")
      .insert({
        profile_id: profileId,
        name: payload?.name ?? null,
      })
      .select()
      .single();

    return data;
  },

  /**
   * Ensure booker exists (MAIN ENTRY POINT)
   */
  async ensure(profileId: string, payload?: { name?: string; role?: string }) {
    const existing = await this.getByProfileId(profileId);

    if (existing) {
      return existing;
    }

    return this.create(profileId, payload);
  },
};
