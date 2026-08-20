"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRooms } from "@/features/hooks/useRooms";
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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { rooms } = useRooms();

  const [user, setUser] = useState<Awaited<
    ReturnType<typeof getUserProfile>
  > | null>(null);

  useEffect(() => {
    getUserProfile().then(setUser);
  }, []);

  const router = useRouter();

  const booking = useBooking(bookingSettings.max_slots_per_user_per_day);

  const selectedRoom = rooms.find((room) => room.id === booking.selectedRoomId);

  async function handleSubmit() {
    try {
      const user = await getUserProfile();
      if (!user || !booking.selectedRoomId) return;

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
        <RoomSelector
          rooms={rooms}
          userRole={user?.role ?? null}
          selectedRoomId={booking.selectedRoomId}
          onSelect={booking.setSelectedRoomId}
        />

        <BookingDateSelector
          bookingDate={booking.bookingDate}
          setBookingDate={booking.setBookingDate}
          settings={bookingSettings}
        />

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
