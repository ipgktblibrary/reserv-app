import { supabase } from "@/lib/supabase/client";

type CreateReservationInput = {
  fullName: string;
  participants: number;
  projectType: string;
  roomId: string;
  slotIds: string[];
  bookingDate: string;
  userRole: string;
  bookerId?: string;
};

export function toReservationInsert(input: CreateReservationInput) {
  return input.slotIds.map((slotId) => ({
    full_name: input.fullName,
    capacity: input.participants,
    project: input.projectType,
    room_id: input.roomId,
    slot_id: slotId,
    booking_date: input.bookingDate,
    user_role: input.userRole,
    booker_id: input.bookerId ?? null,
    status: "confirmed",
  }));
}

export const reservationService = {
  async createReservation(input: CreateReservationInput) {
    const payload = toReservationInsert(input);
    const { data, error } = await supabase
      .from("reservations")
      .insert(payload)
      .select();

    if (error) throw new Error(error.message);

    return data;
  },

  async getBookedSlots(roomId: string, date: string) {
    const { data, error } = await supabase
      .from("reservations")
      .select("slot_id")
      .eq("room_id", roomId)
      .eq("booking_date", date)
      .eq("status", "confirmed");
    if (error) throw new Error(error.message);
    return new Set(data.map((r) => r.slot_id));
  },
};
