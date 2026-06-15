// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { Room, ROOMS, TIME_SLOTS_BY_ROOM, TimeSlot } from "./data/bookingData";

// export default function RoomReservation() {
//   const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
//   const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
//   const [studentName, setStudentName] = useState("");
//   const [userRole, setUserRole] = useState("Student");

//   const [tajukProjek, setTajukProjek] = useState("");
//   const [kelas, setKelas] = useState("");
//   const [jumlahPeserta, setJumlahPeserta] = useState("");

//   const formRef = useRef<HTMLDivElement>(null);

//   const formattedTomorrow = useMemo(() => {
//     const d = new Date();
//     d.setDate(d.getDate() + 1);
//     return d.toLocaleDateString("en-GB", {
//       weekday: "short",
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   }, []);

//   useEffect(() => {
//     if (selectedRoom?.teacherOnly) {
//       queueMicrotask(() => {
//         setUserRole("Teacher");
//       });
//     }
//   }, [selectedRoom]);

//   useEffect(() => {
//     if (selectedRoom && selectedTime) {
//       formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [selectedRoom, selectedTime]);

//   const handleConfirmBooking = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedRoom || !selectedTime) return;

//     if (selectedRoom.teacherOnly && userRole !== "Teacher") {
//       alert("Restricted to faculty only");
//       return;
//     }

//     alert("Reservation successful");

//     setSelectedRoom(null);
//     setSelectedTime(null);
//     setStudentName("");
//     setJumlahPeserta("");
//     setTajukProjek("");
//     setKelas("");
//   };
//   // const isFriday = new Date().getDay() === 5;

//   const MOCK_FRIDAY = true;

//   const isFriday = MOCK_FRIDAY || new Date().getDay() === 5;

//   const timeSlots: TimeSlot[] = useMemo(() => {
//     if (!selectedRoom) return [];
//     if (selectedRoom.id === "C") {
//       return TIME_SLOTS_BY_ROOM.creative ?? [];
//     }
//     if (isFriday) {
//       return TIME_SLOTS_BY_ROOM.friday ?? [];
//     }
//     return TIME_SLOTS_BY_ROOM.default ?? [];
//   }, [selectedRoom, isFriday]);

//   return (
//     <div className="min-h-screen bg-neutral-50 flex justify-center px-4 py-10">
//       <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 sm:p-10">
//         {/* Header */}
//         <header className="text-center mb-8">
//           <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
//             Room Reservation
//           </h1>
//           <p className="text-sm text-neutral-500 mt-1">
//             Book a study room for {formattedTomorrow}
//           </p>
//         </header>

//         {/* Guidelines */}
//         <section className="mb-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600 space-y-3">
//           <p className="font-medium text-neutral-900">Booking rules</p>
//           <p>• Only tomorrow bookings allowed</p>
//           <p>• One slot per group</p>
//           <p>• Teacher priority override enabled</p>
//           <p>• 15 min auto-release</p>
//         </section>

//         {/* Rooms */}
//         <section className="mb-8">
//           <h2 className="text-sm font-medium text-neutral-900 mb-3">
//             Select Room
//           </h2>

//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {ROOMS.map((room) => {
//               const active = selectedRoom?.id === room.id;

//               return (
//                 <button
//                   key={room.id}
//                   type="button"
//                   onClick={() => setSelectedRoom(room)}
//                   className={[
//                     "rounded-xl border p-4 text-left transition",
//                     active
//                       ? "bg-neutral-900 text-white border-neutral-900"
//                       : "bg-white border-neutral-200 hover:border-neutral-400",
//                     room.teacherOnly && !active ? "opacity-70" : "",
//                   ].join(" ")}
//                 >
//                   <div className="font-medium">{room.label}</div>
//                   <div className="text-xs mt-1 opacity-70">{room.capacity}</div>

//                   {room.teacherOnly && (
//                     <span className="inline-block mt-3 text-[10px] uppercase tracking-wide opacity-70">
//                       Teacher only
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </section>

//         {/* Time */}
//         <section className="mb-8">
//           <h2 className="text-sm font-medium text-neutral-900 mb-3">
//             Select Time
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//             {(timeSlots ?? []).map((slot) => {
//               const active = selectedTime?.id === slot.id;

//               return (
//                 <button
//                   key={slot.id}
//                   type="button"
//                   onClick={() => setSelectedTime(slot)}
//                   className={[
//                     "rounded-xl border px-4 py-2 text-sm font-medium transition-all",
//                     "active:scale-[0.98]",
//                     "focus:outline-none focus:ring-2 focus:ring-black/10",
//                     active
//                       ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
//                       : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50",
//                   ].join(" ")}
//                 >
//                   {slot.display}
//                 </button>
//               );
//             })}
//           </div>
//         </section>

//         {/* Form */}
//         {selectedRoom && selectedTime && (
//           <div ref={formRef} className="rounded-xl border bg-neutral-50 p-6">
//             <div className="mb-5">
//               <h3 className="font-medium text-neutral-900">Confirm booking</h3>
//               <p className="text-sm text-neutral-500 mt-1">
//                 {selectedRoom.name} • {selectedTime.value} • {formattedTomorrow}
//               </p>
//             </div>

//             <form onSubmit={handleConfirmBooking} className="space-y-4">
//               <select
//                 required
//                 value={userRole}
//                 onChange={(e) => setUserRole(e.target.value)}
//                 className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm"
//               >
//                 {!selectedRoom.teacherOnly && (
//                   <option value="Student">Student</option>
//                 )}
//                 <option value="Teacher">Teacher</option>
//               </select>

//               <input
//                 required
//                 placeholder="Full name"
//                 value={studentName}
//                 onChange={(e) => setStudentName(e.target.value)}
//                 className="w-full rounded-lg border border-neutral-200 p-3 text-sm"
//               />

//               <input
//                 required
//                 type="number"
//                 min={1}
//                 placeholder="Jumlah peserta"
//                 value={jumlahPeserta}
//                 onChange={(e) => setJumlahPeserta(e.target.value)}
//                 className="w-full rounded-lg border border-neutral-200 p-3 text-sm"
//               />

//               <input
//                 placeholder="Tajuk projek (optional)"
//                 value={tajukProjek}
//                 onChange={(e) => setTajukProjek(e.target.value)}
//                 className="w-full rounded-lg border border-neutral-200 p-3 text-sm"
//               />

//               <input
//                 placeholder="Kelas (optional)"
//                 value={kelas}
//                 onChange={(e) => setKelas(e.target.value)}
//                 className="w-full rounded-lg border border-neutral-200 p-3 text-sm"
//               />

//               <button
//                 type="submit"
//                 className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white hover:opacity-90 active:scale-[0.99] transition"
//               >
//                 Confirm Reservation
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Room, ROOMS, TIME_SLOTS_BY_ROOM, TimeSlot } from "./data/bookingData";
import { useBookingSession } from "./hooks/useBookingSession";

export default function RoomReservation() {
  const {
    phone,
    myBookings,
    loadingBookings,
    login,
    logout,
    handleCancel,
    handleAddBooking,
  } = useBookingSession();

  // --- LOCAL INPUT STATE ---
  const [inputPhone, setInputPhone] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [studentName, setStudentName] = useState("");
  const [userRole, setUserRole] = useState("Student");
  const [tajukProjek, setTajukProjek] = useState("");
  const [kelas, setKelas] = useState("");
  const [jumlahPeserta, setJumlahPeserta] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  // Time calculations
  const formattedTomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, []);

  const formattedTomorrowDateString = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    if (selectedRoom?.teacherOnly) {
      queueMicrotask(() => {
        setUserRole("Teacher");
      });
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedRoom && selectedTime) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedRoom, selectedTime]);

  const isFriday = useMemo(() => new Date().getDay() === 5, []);

  const timeSlots: TimeSlot[] = useMemo(() => {
    if (!selectedRoom) return [];
    if (selectedRoom.id === "C") return TIME_SLOTS_BY_ROOM.creative ?? [];
    if (isFriday) return TIME_SLOTS_BY_ROOM.friday ?? [];
    return TIME_SLOTS_BY_ROOM.default ?? [];
  }, [selectedRoom, isFriday]);

  // Form submission dispatcher
  const onSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || !selectedTime) return;

    if (selectedRoom.teacherOnly && userRole !== "Teacher") {
      alert("Restricted to faculty only");
      return;
    }

    const success = await handleAddBooking({
      room_id: selectedRoom.id,
      slot_id: selectedTime.id,
      booking_date: formattedTomorrowDateString,
      user_role: userRole,
      full_name: studentName,
      jumlah_peserta: parseInt(jumlahPeserta),
      tajuk_projek: tajukProjek || null,
      kelas: kelas || null,
    });

    if (success) {
      setSelectedRoom(null);
      setSelectedTime(null);
      setStudentName("");
      setJumlahPeserta("");
      setTajukProjek("");
      setKelas("");
    }
  };

  // --- UI VIEW A: LOG IN SCREEN ---
  if (!phone) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-xl font-bold text-neutral-900 text-center mb-1">
            Library Room Booking
          </h1>
          <p className="text-xs text-neutral-500 text-center mb-6">
            Enter phone number to track your active slots.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(inputPhone);
            }}
            className="space-y-4"
          >
            <input
              type="tel"
              required
              placeholder="e.g. 0123456789"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 p-3 text-sm text-black focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white"
            >
              Check My Bookings
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- UI VIEW B: WORKSPACE DESKTOP ---
  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 sm:p-10">
        {/* User Badge row */}
        <div className="flex justify-between items-center bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 text-xs mb-6 text-neutral-600">
          <span>
            Logged in as: <strong className="text-neutral-900">{phone}</strong>
          </span>
          <button
            onClick={logout}
            className="text-red-600 hover:underline font-medium"
          >
            Change Number
          </button>
        </div>

        {/* Live Active Tracker Cards */}
        <section className="mb-8 p-4 border border-neutral-200 rounded-xl bg-neutral-50/50">
          <h3 className="text-sm font-bold text-neutral-900 mb-3">
            Your Upcoming Bookings
          </h3>
          {loadingBookings ? (
            <p className="text-xs text-neutral-400 animate-pulse">
              Loading reservations...
            </p>
          ) : myBookings.length === 0 ? (
            <p className="text-xs text-neutral-400 italic">
              No bookings found for this number.
            </p>
          ) : (
            <div className="space-y-2">
              {myBookings.map((b) => (
                <div
                  key={b.id}
                  className="flex justify-between items-center bg-white border border-neutral-200 p-3 rounded-lg text-xs"
                >
                  <div>
                    <span className="font-semibold text-neutral-800">
                      Room {b.room_id}
                    </span>
                    <span className="mx-1.5 text-neutral-300">•</span>
                    <span className="text-neutral-500">
                      {b.booking_date} (Slot {b.slot_id})
                    </span>
                  </div>
                  <button
                    onClick={() => handleCancel(b.id)}
                    className="text-red-600 border border-red-200 bg-red-50/20 px-2.5 py-1 rounded font-medium"
                  >
                    Cancel Slot
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            Room Reservation
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Book a study room for {formattedTomorrow}
          </p>
        </header>

        {/* Rooms Selection */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-neutral-900 mb-3">
            Select Room
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ROOMS.map((room) => {
              const active = selectedRoom?.id === room.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className={[
                    "rounded-xl border p-4 text-left transition",
                    active
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white border-neutral-200 hover:border-neutral-400",
                    room.teacherOnly && !active ? "opacity-70" : "",
                  ].join(" ")}
                >
                  <div className="font-medium">{room.label}</div>
                  <div className="text-xs mt-1 opacity-70">{room.capacity}</div>
                  {room.teacherOnly && (
                    <span className="inline-block mt-3 text-[10px] uppercase tracking-wide opacity-70">
                      Teacher only
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Time Selection */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-neutral-900 mb-3">
            Select Time
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(timeSlots ?? []).map((slot) => {
              const active = selectedTime?.id === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={[
                    "rounded-xl border px-4 py-2 text-sm font-medium transition-all active:scale-[0.98]",
                    active
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  {slot.display}
                </button>
              );
            })}
          </div>
        </section>

        {/* Confirmation Form Box */}
        {selectedRoom && selectedTime && (
          <div ref={formRef} className="rounded-xl border bg-neutral-50 p-6">
            <div className="mb-5">
              <h3 className="font-medium text-neutral-900">Confirm booking</h3>
              <p className="text-sm text-neutral-500 mt-1">
                {selectedRoom.name} • {selectedTime.value} • {formattedTomorrow}
              </p>
            </div>

            <form onSubmit={onSubmitBooking} className="space-y-4">
              <select
                required
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm text-black"
              >
                {!selectedRoom.teacherOnly && (
                  <option value="Student">Student</option>
                )}
                <option value="Teacher">Teacher</option>
              </select>

              <input
                required
                placeholder="Full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 p-3 text-sm text-black bg-white"
              />
              <input
                required
                type="number"
                min={1}
                placeholder="Jumlah peserta"
                value={jumlahPeserta}
                onChange={(e) => setJumlahPeserta(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 p-3 text-sm text-black bg-white"
              />
              <input
                placeholder="Tajuk projek (optional)"
                value={tajukProjek}
                onChange={(e) => setTajukProjek(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 p-3 text-sm text-black bg-white"
              />
              <input
                placeholder="Kelas (optional)"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 p-3 text-sm text-black bg-white"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white transition"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
