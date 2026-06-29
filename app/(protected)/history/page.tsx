"use client";

import { bookerService } from "@/features/services/booker.service";
import { reservationService } from "@/features/services/reservation.service";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        if (!user) return;

        const booker = await bookerService.ensure(user.id);
        const data = await reservationService.getMyReservations(booker.id);

        setReservations(data ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function confirmCancel() {
    if (!cancelId) return;

    await reservationService.cancelReservation(cancelId);

    setReservations((prev) =>
      prev.map((r) => (r.id === cancelId ? { ...r, status: "cancelled" } : r)),
    );

    setCancelId(null);
  }

  // 🔥 NOTION-STYLE SORT
  const timeline = useMemo(() => {
    const active = reservations
      .filter((r) => r.status !== "cancelled")
      .sort(
        (a, b) =>
          new Date(b.booking_date).getTime() -
          new Date(a.booking_date).getTime(),
      );

    const cancelled = reservations
      .filter((r) => r.status === "cancelled")
      .sort(
        (a, b) =>
          new Date(b.booking_date).getTime() -
          new Date(a.booking_date).getTime(),
      );

    return { active, cancelled };
  }, [reservations]);

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* TABS */}

        <div className="mb-6 border-b border-neutral-200">
          <nav className="flex space-x-6">
            <button
              onClick={() => router.push("/booking")}
              className="text-neutral-400 pb-4 text-sm hover:text-neutral-600"
            >
              Bookings
            </button>

            <button className="border-b-2 border-black pb-4 text-sm font-semibold">
              History
            </button>
          </nav>
        </div>
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">
            Booking History
          </h1>
          <p className="text-sm text-neutral-500">
            Timeline of your reservations
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="rounded-xl border bg-white p-4 text-sm text-neutral-500">
            Loading timeline...
          </div>
        )}

        {/* EMPTY */}
        {!loading && reservations.length === 0 && (
          <div className="rounded-xl border bg-white p-6 text-sm text-neutral-500">
            No history yet
          </div>
        )}

        {/* TIMELINE */}
        {!loading && reservations.length > 0 && (
          <div className="space-y-10">
            {/* ACTIVE SECTION */}
            <div>
              <div className="mb-3 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                Active
              </div>

              <div className="space-y-3 border-l border-neutral-200 pl-4">
                {timeline.active.map((r) => (
                  <ReservationCard
                    key={r.id}
                    reservation={r}
                    onCancel={setCancelId}
                  />
                ))}
              </div>
            </div>

            {/* CANCELLED SECTION */}
            <div>
              <div className="mb-3 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                Cancelled
              </div>

              <div className="space-y-3 border-l border-neutral-200 pl-4">
                {timeline.cancelled.map((r) => (
                  <ReservationCard
                    key={r.id}
                    reservation={r}
                    onCancel={setCancelId}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CANCEL MODAL */}
        {cancelId && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl p-6">
              <h2 className="font-semibold text-lg">Cancel reservation?</h2>

              <p className="text-sm text-neutral-500 mt-1">
                This will move it to cancelled history.
              </p>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setCancelId(null)}
                  className="flex-1 border rounded-xl py-2 text-sm"
                >
                  Keep
                </button>

                <button
                  onClick={confirmCancel}
                  className="flex-1 bg-red-600 text-white rounded-xl py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
