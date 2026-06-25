import { supabase } from "@/lib/supabase/client";

export interface BookingPayload {
  phone_number: string;
  room_id: string;
  slot_id: string;
  booking_date: string;
  user_role: string;
  full_name: string;
  jumlah_peserta: number;
  tajuk_projek: string | null;
  kelas: string | null;
}

// Fetch all reservations assigned to a phone number
export async function getBookingsByPhone(phone: string) {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("phone_number", phone)
    .order("booking_date", { ascending: true });

  if (error) throw error;
  return data || [];
}

// Insert a brand new reservation row
export async function createBooking(payload: BookingPayload) {
  const { data, error } = await supabase
    .from("reservations")
    .insert([payload])
    .select();

  if (error) throw error;
  return data || [];
}

// Delete an existing slot row matching the active number identity
export async function deleteBooking(bookingId: number, phone: string) {
  const { error } = await supabase
    .from("reservations")
    .delete()
    .eq("id", bookingId)
    .eq("phone_number", phone);

  if (error) throw error;
  return true;
}
