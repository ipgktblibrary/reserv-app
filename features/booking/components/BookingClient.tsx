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

export default function BookingClient() {
  const { rooms } = useRooms();
  const router = useRouter();

  const booking = useBooking();

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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
    } catch (error) {
      console.error(error);
      booking.setSlotLimitOpen(true);
      setStatus("error");
      console.error(error);
    }
  }

  const selectedRoom = rooms.find((room) => room.id === booking.selectedRoomId);

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

      <div className="rounded-2xl bg-white border border-purple-100 shadow-sm p-4">
        <RoomSelector
          selectedRoomId={booking.selectedRoomId}
          onSelect={booking.setSelectedRoomId}
        />
      </div>

      <BookingDateSelector
        bookingDate={booking.bookingDate}
        setBookingDate={booking.setBookingDate}
      />

      <div className="mb-8 mt-10">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Pilih Masa
        </h1>
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="text-sm font-semibold text-blue-900">Maklumat</h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-800">
            <li>
              • Anda boleh memilih sehingga <strong>2 slot masa</strong>.
            </li>
            <li>
              • Slot berwarna
              <span className="font-semibold text-red-600">merah</span> telah
              ditempah dan tidak boleh dipilih.
            </li>
            <li>• Sila pilih slot lain yang masih tersedia.</li>
          </ul>
        </div>
      </div>

      {booking.selectedRoomId && (
        <div className="rounded-2xl bg-white border border-purple-100 shadow-sm p-4">
          <TimeSlotSelector
            roomId={booking.selectedRoomId}
            bookingDate={booking.bookingDate}
            selectedSlots={booking.selectedSlots}
            onToggleSlot={booking.toggleSlot}
          />
        </div>
      )}

      <div className="mb-8 mt-10">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Sahkan Tempahan
        </h1>
        <div className="mt-3 rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm text-gray-600">
          Sila semak semula slot masa sebelum membuat tempahan.
        </div>
      </div>

      {booking.selectedRoomId && booking.selectedSlots.length > 0 && (
        <div className="rounded-2xl bg-white border border-purple-100 shadow-sm p-4">
          <BookingForm
            form={booking.form}
            capacity={selectedRoom?.capacity ?? 0}
            projectTypes={Object.values(ProjectType)}
            onChange={booking.updateForm}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
}
