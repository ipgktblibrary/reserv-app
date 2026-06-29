import { supabase } from "@/lib/supabase/client";

type CreateReservationInput = {
  fullName: string;
  participants: number;
  projectType: string;
  projectProgress: string;
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
    project_type: input.projectType,
    project_progress: input.projectProgress,
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
    console.log("PAY LOAD", payload);
    const { data } = await supabase
      .from("reservations")
      .insert(payload)
      .select();

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

  async getMyReservations(bookerId: string) {
    const { data, error } = await supabase

      .from("reservations")

      .select(
        `
    *,
    room_time_slots (*),
    rooms (*)

  `,
      )
      .eq("booker_id", bookerId)
      .order("booking_date", { ascending: false });

    if (error) throw error;
    console.log("DATA RESERVATION", data);

    return data;
  },
};
