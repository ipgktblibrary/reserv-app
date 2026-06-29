import { useState, useEffect } from "react";
import { RoomTimeSlot, timeSlotsService } from "../services/slot.service";
import { reservationService } from "../services/reservation.service";

// export function useTimeSlots(roomId: string, date: string) {
//   const [slots, setSlots] = useState<RoomTimeSlot[]>([]);
//   const [bookedSlotIds, setBookedSlotIds] = useState<Set<string>>(new Set());
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let active = true;

//     const load = async () => {
//       if (!roomId || !date) return;

//       setLoading(true);

//       const [slotData, bookedData] = await Promise.all([
//         timeSlotsService.getByRoom(roomId, date),
//         reservationService.getBookedSlots(roomId, date),
//       ]);

//       if (!active) return;

//       setSlots(slotData);
//       setBookedSlotIds(bookedData);
//       setLoading(false);
//     };

//     load();
//     return () => {
//       active = false;
//     };
//   }, [roomId, date]);

//   return { slots, bookedSlotIds, loading };
// }

export function useTimeSlots(roomId: string, date: string) {
  const [slots, setSlots] = useState<RoomTimeSlot[]>([]);
  const [bookedSlotIds, setBookedSlotIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!roomId || !date) return;

      setLoading(true);

      const [slotData, bookedData] = await Promise.all([
        timeSlotsService.getByRoom(roomId, date),
        reservationService.getBookedSlots(roomId, date),
      ]);

      if (!active) return;

      setSlots(slotData);
      setBookedSlotIds(new Set(bookedData)); // ensure immutability safety
      setLoading(false);
    };

    load();
    return () => {
      active = false;
    };
  }, [roomId, date]);

  return { slots, bookedSlotIds, loading };
}
