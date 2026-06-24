// ==========================================
// 1. RESERVATIONS LEDGER
// ==========================================

import { supabase } from "@/lib/supabase";


export async function getAllReservations() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("booking_date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function adminDeleteReservation(id: string) {
  const { error } = await supabase
    .from("reservations")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function adminTruncateAllReservations() {
  const { error } = await supabase
    .from("reservations")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); 

  if (error) throw error;
}

// ==========================================
// 2. ROOMS MANAGEMENT
// ==========================================

export async function getRooms() {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateRoomCapacity(roomId: string, capacity: number) {
 const cleanRoomId = roomId.trim().toLowerCase();
  const { data, error } = await supabase
    .from("rooms")
    .update({ capacity })
    .ilike("id", cleanRoomId)
    .select();

  if (error) {
    console.error("❌ [updateRoomCapacity Error]:", error);
    throw error;
  }

  console.log("🍏 [updateRoomCapacity Success!]: Updated rows data:", data);
  return data;
}

// ==========================================
// 3. TIME SLOTS / BLOCK CONTROLS
// ==========================================


// export async function getTimeSlots(roomId: string) {
//   const { data, error } = await supabase
//     .from("room_time_slots")
//     .select("*")
//     .eq("room_id", roomId)
//     .order("slot_index", { ascending: true });

//   if (error) throw error;
//   return data;
// }

export async function getSlotOverrides(roomId: string, date: string) {
  const { data, error } = await supabase
    .from("room_time_slot_overrides")
    .select("*")
    .eq("room_id", roomId)
    .eq("date", date);

  if (error) throw error;
  return data ?? [];
}

export async function getEffectiveSlots(roomId: string, date: Date) {
  const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
  const dateStr = date.toISOString().split("T")[0];

  const [baseSlots, overrides] = await Promise.all([
    supabase
      .from("room_time_slots")
      .select("*")
      .eq("room_id", roomId)
      .eq("day_of_week", dayOfWeek),

    supabase
      .from("room_time_slot_overrides")
      .select("*")
      .eq("room_id", roomId)
      .eq("date", dateStr),
  ]);

  if (baseSlots.error) throw baseSlots.error;
  if (overrides.error) throw overrides.error;

  const overrideMap = new Map(
    overrides.data.map(o => [o.slot_id, o])
  );

  const merged = (baseSlots.data ?? []).map(slot => {
    const ov = overrideMap.get(slot.id);

    if (!ov) return slot;

    return {
      ...slot,
      is_blocked: ov.is_blocked,
      blocked_reason: ov.reason ?? slot.blocked_reason,
    };
  });

  return merged;
}


export async function getTimeSlots(roomId: string, date: Date) {
  const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();

  const { data, error } = await supabase
    .from("room_time_slots")
    .select("*")
    .eq("room_id", roomId)
    .eq("day_of_week", dayOfWeek)
    .order("slot_index", { ascending: true });

  if (error) throw error;

  return data ?? [];
}



export async function blockTimeSlot(slotId: string, reason?: string) {
  const { error } = await supabase
    .from("room_time_slots")
    .update({ 
      is_blocked: true, 
      blocked_reason: reason || "Blocked by Administrator" 
    })
    .eq("id", slotId);

  if (error) throw error;
}

export async function unblockTimeSlot(slotId: string) {
  const { error } = await supabase
    .from("room_time_slots")
    .update({ 
      is_blocked: false, 
      blocked_reason: null 
    })
    .eq("id", slotId);

  if (error) throw error;
}

// ==========================================
// 4. AUTHENTICATION SERVICE
// ==========================================

/**
 * Verifies an access code against the public.admins table.
 * Returns true if a match is found, false otherwise.
 */
export async function verifyAdminPasscode(accessCode: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("admins")
    .select("id")
    .eq("access_code", accessCode);

  if (error) {
    console.error("❌ [SUPABASE ADMIN ERROR]:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    throw error;
  }
  

  console.log("🍏 [SUPABASE ADMIN DATA]:", data);

  // If data array contains matching entries, authentication succeeds
  return data && data.length > 0;
}