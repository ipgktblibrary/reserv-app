"use client";

import { useState } from "react";
import {
  generateBookingDates,
  type BookingDate,
} from "../utils/generateBookingDates";

export function useAvailableBookingDates() {
  const [dates] = useState<BookingDate[]>(() => generateBookingDates());
  return {
    dates,
    loading: false,
  };
}
