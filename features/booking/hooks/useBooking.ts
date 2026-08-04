"use client";

import { useState } from "react";
import type { BookingFormState } from "../components/BookingForm";

export function useBooking() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const [slotLimitOpen, setSlotLimitOpen] = useState(false);

  const [bookingDate, setBookingDate] = useState("");

  const initialForm: BookingFormState = {
    participants: "",
    projectType: "",
    progressStatus: "",
  };

  const [form, setForm] = useState<BookingFormState>({
    participants: "",
    projectType: "",
    progressStatus: "",
  });

  function toggleSlot(id: string) {
    setSelectedSlots((prev) => {
      const exists = prev.includes(id);

      if (exists) {
        return prev.filter((slot) => slot !== id);
      }

      if (prev.length >= 2) {
        setSlotLimitOpen(true);
        return prev;
      }
      return [...prev, id];
    });
  }

  function updateForm(patch: Partial<BookingFormState>) {
    setForm((prev) => ({
      ...prev,
      ...patch,
    }));
  }

  function reset() {
    setSelectedRoomId(null);
    setSelectedSlots([]);
    setForm(initialForm);
    setSlotLimitOpen(false);
  }

  return {
    selectedRoomId,
    setSelectedRoomId,

    selectedSlots,
    toggleSlot,

    bookingDate,
    setBookingDate,

    form,
    updateForm,

    slotLimitOpen,
    setSlotLimitOpen,

    reset,
  };
}
