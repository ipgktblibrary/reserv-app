"use client";

import { useRouter } from "next/navigation";

// Mock Status Types if needed for your real state logic later
const BookingStatus = {
  COMPLETED: "Selesai",
  CANCELLED: "Batal",
};

export default function BookingHistoryPage() {
  const router = useRouter();
  // Mock data structurally built to align with your setup
  const historyRecords = [
    {
      id: "BKM-8921",
      date: "25 Jun 2026",
      day: "Khamis",
      room: { name: "Makmal A", capacity: 30 },
      slots: ["09:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
      projectName: "Final Year Presentation",
      status: BookingStatus.COMPLETED,
    },
    {
      id: "BKM-7704",
      date: "18 Jun 2026",
      day: "Khamis",
      room: { name: "Tutorial 3", capacity: 15 },
      slots: ["02:00 PM - 03:00 PM"],
      projectName: "Group Study Session",
      status: BookingStatus.CANCELLED,
    },
    {
      id: "BKM-6120",
      date: "12 Jun 2026",
      day: "Jumaat",
      room: { name: "Makmal B", capacity: 40 },
      slots: ["11:00 AM - 12:00 PM", "12:00 PM - 01:00 PM"],
      projectName: "Coding Assessment",
      status: BookingStatus.COMPLETED,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-6 sm:py-10 flex justify-center selection:bg-neutral-900 selection:text-white">
      <div className="w-full max-w-2xl">
        {/* Navigation Tab Track */}
        <div className="mb-8 w-full border-b border-neutral-200">
          <nav
            className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth"
            aria-label="Tabs"
          >
            <button
              type="button"
              onClick={() => router.replace("/booking")}
              className="border-transparent text-neutral-400 hover:border-neutral-300 hover:text-neutral-600 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition-all duration-200"
            >
              My Bookings
            </button>

            <button
              type="button"
              className="border-neutral-900 text-neutral-900 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-semibold tracking-tight transition-all duration-200"
            >
              History
            </button>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Booking History
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              View your past allocations and usage
            </p>
          </div>
          <span className="bg-white text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-sm shrink-0">
            {historyRecords.length} Past Records
          </span>
        </div>

        {/* History Cards Stack */}
        <div className="space-y-4">
          {historyRecords.map((record) => (
            <div
              key={record.id}
              className="group rounded-2xl border border-neutral-200/80 bg-white p-5 transition-all duration-300 hover:border-neutral-300 hover:shadow-md hover:shadow-neutral-200/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                    {record.date} • {record.day}
                  </span>
                  <h3 className="font-semibold text-base text-neutral-900 mt-0.5">
                    Room {record.room.name}
                  </h3>
                  <div className="flex flex-col gap-0.5 mt-1.5">
                    {record.slots.map((slot, i) => (
                      <span
                        key={i}
                        className="text-xs text-neutral-500 flex items-center gap-1.5"
                      >
                        <span className="h-1 w-1 rounded-full bg-neutral-300" />
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dynamic Status Badge */}
                <span
                  className={[
                    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border transition-colors duration-200",
                    record.status === BookingStatus.COMPLETED
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                      : "bg-neutral-100 text-neutral-600 border-neutral-200",
                  ].join(" ")}
                >
                  {record.status}
                </span>
              </div>

              {/* Card Footer Meta Area */}
              <div className="mt-5 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-400">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-neutral-500">Tujuan:</span>
                  <span className="truncate max-w-[280px] sm:max-w-none">
                    {record.projectName}
                  </span>
                </div>
                <div className="font-mono text-[11px] self-end sm:self-auto bg-neutral-50 px-1.5 py-0.5 rounded border border-neutral-100">
                  ID: {record.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
