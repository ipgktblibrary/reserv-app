// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useRooms } from "@/features/hooks/useRooms";
// import { reservationService } from "@/features/services/reservation.service";
// import { bookerService } from "@/features/services/booker.service";
// import { getUserProfile } from "@/lib/auth";
// import BookingSuccessModal from "./BookingSuccessModal";
// import BookingFailedModal from "./BookingFailedModal";
// import BookingWarningModal from "./BookingWarningModal";
// import RoomSelector from "./RoomSelector";
// import BookingDateSelector from "./BookingDateSelector";
// import TimeSlotSelector from "./TimeSlotSelector";
// import BookingForm from "./BookingForm";
// import { ProjectType } from "@/features/misc/enums";
// import { useBooking } from "../hooks/useBooking";

// import type { BookingSettings } from "@/features/booking-dates/bookingDate";
// import { Surface } from "@heroui/react";

// export default function BookingClient({
//   bookingSettings,
// }: {
//   bookingSettings: BookingSettings;
// }) {
//   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
//   const { rooms } = useRooms();
//   const router = useRouter();

//   const [user, setUser] = useState<Awaited<
//     ReturnType<typeof getUserProfile>
//   > | null>(null);

//   const [bookedSlotCount, setBookedSlotCount] = useState(0);
//   const booking = useBooking(
//     bookingSettings.max_slots_per_user_per_day,
//     bookedSlotCount,
//   );

//   useEffect(() => {
//     getUserProfile().then(setUser);
//   }, []);

//   useEffect(() => {
//     async function loadBookedSlotCount() {
//       if (!user?.id || !booking.bookingDate) {
//         setBookedSlotCount(0);

//         return;
//       }

//       const booker = await bookerService.ensure(user.id);

//       const reservations = await reservationService.getMyReservations(
//         booker.id,
//       );

//       const count = reservations.filter(
//         (reservation) =>
//           reservation.booking_date === booking.bookingDate &&
//           reservation.status === "confirmed",
//       ).length;

//       setBookedSlotCount(count);
//     }

//     loadBookedSlotCount();
//   }, [user?.id, booking.bookingDate]);

//   const selectedRoom = rooms.find((room) => room.id === booking.selectedRoomId);

//   async function handleSubmit() {
//     try {
//       const user = await getUserProfile();
//       if (!user || !booking.selectedRoomId) return;

//       const booker = await bookerService.ensure(user.id);

//       await reservationService.createReservation({
//         roomId: booking.selectedRoomId,
//         slotIds: booking.selectedSlots,
//         bookerId: booker.id,
//         userRole: user.role,
//         fullName: booker.name ?? "",

//         projectType: booking.form.projectType,
//         projectProgress: booking.form.progressStatus,
//         participants: Number(booking.form.participants),
//         bookingDate: booking.bookingDate,
//       });

//       setStatus("success");
//     } catch {
//       booking.setSlotLimitOpen(true);
//       setStatus("error");
//     }
//   }

//   return (
//     <>
//       <BookingWarningModal
//         open={booking.slotLimitOpen}
//         onClose={() => booking.setSlotLimitOpen(false)}
//       />

//       <BookingSuccessModal
//         open={status === "success"}
//         onClose={() => {
//           setStatus("idle");
//           booking.reset();
//           router.push("/history");
//         }}
//       />
//       <BookingFailedModal
//         open={status === "error"}
//         onClose={() => {
//           setStatus("idle");
//         }}
//       />

//       <Surface
//         variant="default"
//         className="rounded-2xl border border-accent/10 bg-linear-to-br from-accent/10 via-surface to-surface-secondary p-5 shadow-sm"
//       >
//         <RoomSelector
//           rooms={rooms}
//           userRole={user?.role ?? null}
//           selectedRoomId={booking.selectedRoomId}
//           onSelect={booking.changeRoom}
//         />

//         <BookingDateSelector
//           bookingDate={booking.bookingDate}
//           setBookingDate={booking.changeBookingDate}
//           settings={bookingSettings}
//         />

//         {booking.selectedRoomId && (
//           <TimeSlotSelector
//             roomId={booking.selectedRoomId}
//             bookingDate={booking.bookingDate}
//             selectedSlots={booking.selectedSlots}
//             onToggleSlot={booking.toggleSlot}
//           />
//         )}

//         {booking.selectedRoomId && booking.selectedSlots.length > 0 && (
//           <BookingForm
//             form={booking.form}
//             capacity={selectedRoom?.capacity ?? 0}
//             projectTypes={Object.values(ProjectType)}
//             onChange={booking.updateForm}
//             onSubmit={handleSubmit}
//           />
//         )}
//       </Surface>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useRooms } from "@/features/hooks/useRooms";
import {
  roomService,
  type RoomWithOverride,
} from "@/features/services/room.service";
import { reservationService } from "@/features/services/reservation.service";
import { bookerService } from "@/features/services/booker.service";
import { getUserProfile } from "@/lib/auth";

import BookingSuccessModal from "./BookingSuccessModal";
import BookingFailedModal from "./BookingFailedModal";
import BookingWarningModal from "./BookingWarningModal";
import RoomSelector from "./RoomSelector";
import BookingDateSelector from "./BookingDateSelector";
import TimeSlotSelector from "./TimeSlotSelector";
import BookingForm from "./BookingForm";

import { ProjectType } from "@/features/misc/enums";
import { useBooking } from "../hooks/useBooking";

import type { BookingSettings } from "@/features/booking-dates/bookingDate";
import { Surface } from "@heroui/react";

export default function BookingClient({
  bookingSettings,
}: {
  bookingSettings: BookingSettings;
}) {
  const router = useRouter();

  const { rooms } = useRooms();

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [user, setUser] = useState<Awaited<
    ReturnType<typeof getUserProfile>
  > | null>(null);

  const [roomsForDate, setRoomsForDate] = useState<RoomWithOverride[]>([]);
  const [roomsLoading, setRoomsLoading] = useState(false);

  const [bookedSlotCount, setBookedSlotCount] = useState(0);

  const booking = useBooking(
    bookingSettings.max_slots_per_user_per_day,
    bookedSlotCount,
  );

  useEffect(() => {
    getUserProfile().then(setUser);
  }, []);

  /*
   * DATE CHANGED
   *
   * Clear dependent booking state immediately.
   *
   * Date
   *   ↓
   * Room
   *   ↓
   * Time slots
   */
  useEffect(() => {
    booking.changeRoom("");
  }, [booking.bookingDate]);

  /*
   * Load user's existing reservation count
   * for the selected date.
   */
  useEffect(() => {
    async function loadBookedSlotCount() {
      if (!user?.id || !booking.bookingDate) {
        setBookedSlotCount(0);
        return;
      }

      const booker = await bookerService.ensure(user.id);

      const reservations = await reservationService.getMyReservations(
        booker.id,
      );

      const count = reservations.filter(
        (reservation) =>
          reservation.booking_date === booking.bookingDate &&
          reservation.status === "confirmed",
      ).length;

      setBookedSlotCount(count);
    }

    loadBookedSlotCount();
  }, [user?.id, booking.bookingDate]);

  /*
   * Load rooms for the selected date.
   *
   * IMPORTANT:
   * Do not display the previous date's room state while
   * the new date is loading.
   */
  useEffect(() => {
    if (!booking.bookingDate || rooms.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoomsForDate([]);
      return;
    }

    let cancelled = false;

    async function loadRoomsForDate() {
      setRoomsLoading(true);
      setRoomsForDate([]);

      try {
        const data = await roomService.getRoomsForDate(booking.bookingDate);

        if (cancelled) {
          return;
        }

        setRoomsForDate(data);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load room availability:", error);
          setRoomsForDate([]);
        }
      } finally {
        if (!cancelled) {
          setRoomsLoading(false);
        }
      }
    }

    loadRoomsForDate();

    return () => {
      cancelled = true;
    };
  }, [booking.bookingDate, rooms]);

  /*
   * Before a date is selected, use the base room list.
   *
   * Once a date exists, ONLY use roomsForDate.
   */
  const displayRooms: RoomWithOverride[] = booking.bookingDate
    ? roomsForDate
    : rooms.map((room) => ({
        ...room,
        override: null,
      }));

  const selectedRoom = displayRooms.find(
    (room) => room.id === booking.selectedRoomId,
  );

  async function handleSubmit() {
    try {
      const user = await getUserProfile();

      if (!user || !booking.selectedRoomId) {
        return;
      }

      const booker = await bookerService.ensure(user.id);

      await reservationService.createReservation({
        roomId: booking.selectedRoomId,
        slotIds: booking.selectedSlots,
        bookerId: booker.id,
        userRole: user.role,
        fullName: booker.name ?? "",
        projectType: booking.form.projectType,
        projectProgress: booking.form.progressStatus,
        participants: Number(booking.form.participants),
        bookingDate: booking.bookingDate,
      });

      setStatus("success");
    } catch {
      booking.setSlotLimitOpen(true);
      setStatus("error");
    }
  }

  return (
    <>
      <BookingWarningModal
        open={booking.slotLimitOpen}
        onClose={() => booking.setSlotLimitOpen(false)}
      />

      <BookingSuccessModal
        open={status === "success"}
        onClose={() => {
          setStatus("idle");
          booking.reset();
          router.push("/history");
        }}
      />

      <BookingFailedModal
        open={status === "error"}
        onClose={() => {
          setStatus("idle");
        }}
      />

      <Surface
        variant="default"
        className="rounded-2xl border border-accent/10 bg-linear-to-br from-accent/10 via-surface to-surface-secondary p-5 shadow-sm"
      >
        {/* DATE FIRST */}
        <BookingDateSelector
          bookingDate={booking.bookingDate}
          setBookingDate={booking.changeBookingDate}
          settings={bookingSettings}
        />

        {/* ROOM FOR THAT DATE */}
        <RoomSelector
          rooms={displayRooms}
          loading={roomsLoading}
          userRole={user?.role ?? null}
          selectedRoomId={booking.selectedRoomId}
          onSelect={booking.changeRoom}
        />

        {/* TIME SLOTS FOR THAT DATE + ROOM */}
        {booking.selectedRoomId && (
          <TimeSlotSelector
            roomId={booking.selectedRoomId}
            bookingDate={booking.bookingDate}
            selectedSlots={booking.selectedSlots}
            onToggleSlot={booking.toggleSlot}
          />
        )}

        {booking.selectedRoomId && booking.selectedSlots.length > 0 && (
          <BookingForm
            form={booking.form}
            capacity={selectedRoom?.capacity ?? 0}
            projectTypes={Object.values(ProjectType)}
            onChange={booking.updateForm}
            onSubmit={handleSubmit}
          />
        )}
      </Surface>
    </>
  );
}
