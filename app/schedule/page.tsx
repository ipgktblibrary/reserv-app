"use client";

import React from "react";

const ROOMS = [
  { id: "A", name: "Room A", label: "Discussion Room A" },
  { id: "B", name: "Room B", label: "Discussion Room B" },
  { id: "C", name: "Room C", label: "Media Room C" },
  { id: "D", name: "Room D", label: "Faculty Room D" },
];

const SLOTS = [
  { id: "1", time: "08:30 - 10:00" },
  { id: "2", time: "10:30 - 12:30" },
  { id: "3", time: "01:00 - 02:00" },
  { id: "4", time: "02:30 - 04:00" },
];

const MOCK_BOOKINGS = [
  { room_id: "A", slot_id: "1", name: "John", role: "Student" },
  { room_id: "A", slot_id: "3", name: "Sarah", role: "Student" },
  { room_id: "B", slot_id: "2", name: "Prof. Charles", role: "Teacher" },
  { room_id: "D", slot_id: "1", name: "Dr. Aris", role: "Teacher" },
];

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-8 font-sans">
      <div className="max-w-md mx-auto sm:max-w-4xl">
        <header className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Live Room Schedule
            </h1>
            <p className="text-xs text-slate-500">Tomorrow Bookings</p>
          </div>
          <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-600">
            Tuesday, June 16, 2026
          </span>
        </header>

        {/* Mobile: Stack of cards | Desktop: Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ROOMS.map((room) => {
            const roomBookings = MOCK_BOOKINGS.filter(
              (b) => b.room_id === room.id,
            );

            return (
              <div
                key={room.id}
                className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs"
              >
                <h2 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2 mb-3">
                  {room.label}
                </h2>

                <div className="space-y-2">
                  {SLOTS.map((slot) => {
                    const booking = roomBookings.find(
                      (b) => b.slot_id === slot.id,
                    );

                    return (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between text-xs py-1.5"
                      >
                        <span className="text-slate-500 font-medium">
                          {slot.time}
                        </span>

                        {booking ? (
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                              booking.role === "Teacher"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-red-50 text-red-700 border border-red-100"
                            }`}
                          >
                            {booking.name} (
                            {booking.role === "Teacher" ? "Staff" : "Stud"})
                          </span>
                        ) : (
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-100">
                            Available
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
