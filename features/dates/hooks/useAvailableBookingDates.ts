"use client";

import { useState } from "react";
import {
  generateTodayTomorrowBookingDates,
  type BookingDate,
} from "../utils/generateBookingDates";

export function useAvailableBookingDates() {
  const [dates] = useState<BookingDate[]>(() =>
    generateTodayTomorrowBookingDates(),
  );
  return {
    dates,
    loading: false,
  };
}
