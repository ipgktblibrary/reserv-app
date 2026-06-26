// import { useState, useEffect } from "react";
// import { RoomTimeSlot, timeSlotsService } from "../services/slot.service";

// export function useTimeSlots(roomId: string, date: string) {
//   const [slots, setSlots] = useState<RoomTimeSlot[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let active = true;
//     const load = async () => {
//       if (!roomId) {
//         setSlots([]);
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       const data = await timeSlotsService.getByRoom(roomId);
//       if (!active) return;
//       setSlots(data);
//       setLoading(false);
//     };
//     load();
//     return () => {
//       active = false;
//     };
//   }, [roomId]);

//   return { slots, loading };
// }

// import { useState, useEffect } from "react";
// import { RoomTimeSlot, timeSlotsService } from "../services/slot.service";

// export function useTimeSlots(roomId: string, date: string) {
//   const [slots, setSlots] = useState<RoomTimeSlot[]>([]);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let active = true;

//     const load = async () => {
//       if (!roomId || !date) {
//         setSlots([]);
//         setLoading(false);
//         return;
//       }

//       setLoading(true);

//       const data = await timeSlotsService.getByRoom(roomId, date);

//       if (!active) return;
//       setSlots(data);
//       setLoading(false);
//     };

//     load();

//     return () => {
//       active = false;
//     };
//   }, [roomId, date]);

//   return { slots, loading };
// }

import { useState, useEffect } from "react";
import { RoomTimeSlot, timeSlotsService } from "../services/slot.service";
import { reservationService } from "../services/reservation.service";

export function useTimeSlots(roomId: string, date: string) {
  const [slots, setSlots] = useState<RoomTimeSlot[]>([]);
  const [bookedSlotIds, setBookedSlotIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

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
      setBookedSlotIds(bookedData);
      setLoading(false);
    };

    load();

    return () => {
      active = false;
    };
  }, [roomId, date]);

  return { slots, bookedSlotIds, loading };
}
