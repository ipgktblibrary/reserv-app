"use client";

import { useMemo } from "react";
import { generateBookingDates } from "./generateBookingDates";
import type { BookingSettings } from "./bookingDate";

export function useAvailableBookingDates(settings: BookingSettings) {
  const dates = useMemo(() => generateBookingDates(settings), [settings]);

  return {
    dates,
    loading: false,
  };
}
