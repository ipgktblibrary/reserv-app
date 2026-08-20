import { supabaseClient } from "@/lib/supabase/client";

export type Room = {
  id: string;
  name: string;
  teacher_only: boolean;
  capacity: number;
  label: string | null;
  created_at: string;
};

export type RoomOverride = {
  id: string;
  room_id: string;
  start_date: string;
  end_date: string;
  is_blocked: boolean;
  blocked_reason: string | null;
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

  async getRoomOverride(
    roomId: string,
    date: string,
  ): Promise<RoomOverride | null> {
    const { data, error } = await supabaseClient
      .from("room_overrides")
      .select("*")
      .eq("room_id", roomId)
      .eq("is_blocked", true)
      .lte("start_date", date)
      .gte("end_date", date)
      .maybeSingle();
    if (error) {
      throw new Error(`Failed to fetch room override: ${error.message}`);
    }
    return data;
  },
};
