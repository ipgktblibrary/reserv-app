"use client";

import type { BookingSettings } from "@/features/booking-dates/bookingDate";
import { useAvailableBookingDates } from "@/features/booking-dates/useAvailableBookingDates";

export default function BookingDateSelector({
  bookingDate,
  setBookingDate,
  settings,
}: {
  bookingDate: string;
  setBookingDate: (date: string) => void;
  settings: BookingSettings;
}) {
  const { dates, loading } = useAvailableBookingDates(settings);

  if (loading) {
    return <div className="mt-8">Loading dates...</div>;
  }

  return (
    <div className="mb-8 mt-10">
      <h2 className="text-xl font-bold tracking-tight text-gray-900">
        Pilih Tarikh Tempahan
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Pilih tarikh yang tersedia untuk tempahan.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {dates.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setBookingDate(item.value)}
            className={[
              "rounded-2xl border p-4 text-left transition-all",
              bookingDate === item.value
                ? "border-accent bg-accent/10 shadow-sm"
                : "border-default-200 bg-white hover:border-accent/40",
            ].join(" ")}
          >
            <p className="font-semibold text-gray-900 capitalize">
              {item.label}
            </p>

            <p className="mt-1 text-sm text-gray-500">{item.date}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
