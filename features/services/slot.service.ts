import { supabaseClient } from "@/lib/supabase/client";

export type RoomTimeSlot = {
  id: string;
  room_id: string;
  slot_index: number;
  start_time: string;
  end_time: string;
  is_blocked: boolean;
  blocked_reason: string | null;
  day_of_week: 1 | 2 | 3 | 4 | 5;
};

export const timeSlotsService = {
  async getByRoom(roomId: string, date: string): Promise<RoomTimeSlot[]> {
    const { data } = await supabaseClient.rpc("get_room_time_slots_for_date", {
      p_room_id: roomId,
      p_date: date.slice(0, 10),
    });

    return (data ?? []) as RoomTimeSlot[];
  },
};
