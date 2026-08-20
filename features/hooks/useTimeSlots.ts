import { useState, useEffect } from "react";
import { RoomTimeSlot, timeSlotsService } from "../services/slot.service";
import { reservationService } from "../services/reservation.service";
import { RoomOverride, roomService } from "../services/room.service";

export function useTimeSlots(roomId: string, date: string) {
  const [slots, setSlots] = useState<RoomTimeSlot[]>([]);
  const [bookedSlotIds, setBookedSlotIds] = useState<Set<string>>(new Set());
  const [roomOverride, setRoomOverride] = useState<RoomOverride | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!roomId || !date) return;

      setLoading(true);

      const [slotData, bookedData, overrideData] = await Promise.all([
        timeSlotsService.getByRoom(roomId, date),
        reservationService.getBookedSlots(roomId, date),
        roomService.getRoomOverride(roomId, date),
      ]);

      if (!active) return;

      setSlots(slotData);
      setBookedSlotIds(new Set(bookedData));
      setRoomOverride(overrideData);
      setLoading(false);
    };

    load();

    return () => {
      active = false;
    };
  }, [roomId, date]);

  return {
    slots,
    bookedSlotIds,
    roomOverride,
    loading,
  };
}
