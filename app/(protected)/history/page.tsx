/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { bookerService } from "@/features/services/booker.service";
import { reservationService } from "@/features/services/reservation.service";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReservationCard } from "./components/ReservationCard";

type Reservation = {
  id: string;
  booking_date: string;
  capacity: number;
  project_type: string;
  project_progress: string;
  status: string;
  rooms: {
    id: string;
    name: string;
    label: string;
  };

  room_time_slots: {
    start_time: string;
    end_time: string;
  };
};
export default function BookingHistoryPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReservation() {
      try {
        const user = await getUser();
        if (!user) return;
        const booker = await bookerService.ensure(user.id);
        const result = await reservationService.getMyReservations(booker.id);
        console.log("MY RESERVATIONS", result);

        setReservations(result ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadReservation();
  }, []);
  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-6 sm:py-10 flex justify-center selection:bg-neutral-900 selection:text-white">
      <div className="w-full max-w-2xl">
        {/* Tabs */}
        <div className="mb-6 border-b border-neutral-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => router.push("/booking")}
              className="text-neutral-400 hover:text-neutral-600 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
            >
              My Bookings
            </button>

            <button
              type="button"
              className="border-neutral-900 text-neutral-900 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-semibold"
            >
              History
            </button>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Booking History
            </h1>
            <p className="text-sm text-neutral-500">
              View your past allocations and usage
            </p>
          </div>

          <span className="shrink-0 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700">
            {reservations.length} Past Records
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl border bg-white p-4 text-sm text-neutral-500">
            Loading history...
          </div>
        )}

        {/* Empty */}
        {!loading && reservations.length === 0 && (
          <div className="rounded-xl border bg-white p-6 text-sm text-neutral-500">
            No booking history found.
          </div>
        )}

        {/* Cards */}
        {!loading && reservations.length > 0 && (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
