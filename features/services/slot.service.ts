import { supabase } from "@/lib/supabase/client";

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

function getDayOfWeek(dateStr: string): 1 | 2 | 3 | 4 | 5 {
  const jsDay = new Date(dateStr).getDay();
  const mapped = jsDay === 0 ? 7 : jsDay;
  if (mapped < 1 || mapped > 5) {
    throw new Error("Booking only allowed on weekdays");
  }
  return mapped as 1 | 2 | 3 | 4 | 5;
}

export const timeSlotsService = {
  async getByRoom(roomId: string, date: string): Promise<RoomTimeSlot[]> {
    const dayOfWeek = getDayOfWeek(date);

    const { data, error } = await supabase
      .from("room_time_slots")
      .select("*")
      .eq("room_id", roomId)
      .eq("day_of_week", dayOfWeek);

    console.log("DATE TODAY", dayOfWeek);
    if (error) {
      console.error(error);
      return [];
    }

    return data ?? [];
  },
};
