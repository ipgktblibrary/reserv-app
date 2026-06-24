export interface RoomTimeSlot {
  id: string;
  room_id: string;
  slot_index: number;
  start_time: string;
  end_time: string;
  is_blocked: boolean;
  blocked_reason: string | null;
  created_at: string;
  day_of_week: number;
}