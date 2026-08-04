import { supabaseClient } from "@/lib/supabase/client";

export type Room = {
  id: string;
  name: string;
  teacher_only: boolean;
  capacity: number;
  label: string | null;
  created_at: string;
};

export const roomService = {
  async getRooms(): Promise<Room[]> {
    const { data, error } = await supabaseClient
      .from("rooms")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch rooms: ${error.message}`);
    }
    return data ?? [];
  },
};
