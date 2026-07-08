import { supabase } from "@/lib/supabase/client";

type CreateReservationInput = {
  fullName: string;
  participants: number;
  projectType: string;
  projectProgress: string;
  roomId: string;
  slotIds: string[];
  bookingDate: string;
  userRole: "student" | "teacher";
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
    const { error } = await supabase.rpc("create_reservation", {
      p_slot_ids: input.slotIds,
      p_room_id: input.roomId,
      p_booking_date: input.bookingDate,
      p_full_name: input.fullName,
      p_user_role: input.userRole,
      p_capacity: input.participants,
      p_project_type: input.projectType,
      p_project_progress: input.projectProgress,
      p_booker_id: input.bookerId ?? null,
    });

    if (error) throw error;
    return true;
  },

  async getBookedSlots(roomId: string, date: string) {
    const { data, error } = await supabase.rpc("get_booked_slots", {
      p_room_id: roomId,
      p_date: date.slice(0, 10),
    });
    if (error) throw error;
    const rows = (data ?? []) as { slot_id: string }[];
    return new Set(rows.map((r) => r.slot_id));
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

  async cancelReservation(reservationId: string) {
    const { data, error } = await supabase
      .from("reservations")
      .update({
        status: "cancelled",
        cancel_reason: "user_cancelled",
      })

      .eq("id", reservationId)
      .select()
      .single();

    if (error) throw error;

    return data;
  },
};
