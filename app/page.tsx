// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Room, ROOMS, TIME_SLOTS, TimeSlot } from "./data/bookingData";

// export default function RoomReservation() {
//   // Properly typed state management
//   const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
//   const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
//   const [studentName, setStudentName] = useState<string>("");
//   const [studentId, setStudentId] = useState<string>("");

//   const [userRole, setUserRole] = useState<string>("");

//   const formRef = useRef<HTMLDivElement>(null);

//   // --- ADDED HERE: Dynamic Tomorrow Date Calculator ---
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const formattedTomorrow = tomorrow.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   // Smooth scroll to form when both room and time are selected
//   useEffect(() => {
//     if (selectedRoom && selectedTime) {
//       formRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [selectedRoom, selectedTime]);

//   const handleConfirmBooking = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!selectedRoom || !selectedTime) return;

//     // Browser feedback logic
//     alert(
//       `Reservation Successful!\n\n` +
//         `Date: ${formattedTomorrow}\n` +
//         `Room: ${selectedRoom.name}\n` +
//         `Time: ${selectedTime.value}\n` +
//         `Reserved By: ${studentName} (${studentId})`,
//     );

//     // Reset Form State natively
//     setSelectedRoom(null);
//     setSelectedTime(null);
//     setStudentName("");
//     setStudentId("");
//   };

//   return (
//     <div className="min-h-screen p-8 flex justify-center items-start">
//       <div className="w-full max-w-200 bg-(--surface) p-8 rounded-xl shadow-md border border-(--border)">
//         <header className="text-center mb-8">
//           <h1 className="text-3xl font-bold mb-2">Reserve a Study Room</h1>
//           <p className="text-[var(--text-light)]">
//             Select a room and your preferred timing below.
//           </p>
//         </header>

//         {/* Reservation Rules & Guidelines Context Board */}
//         <div className="mb-10 p-5 bg-slate-50 border border-slate-200 rounded-xl">
//           <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3 text-left px-1">
//             Important Guidelines
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 text-left">
//             {/* UPDATED GUIDELINE SPOT */}
//             <div className="flex items-start gap-2.5 p-2 bg-white rounded-lg border border-slate-100 shadow-xs">
//               <span className="text-amber-500 font-bold mt-0.5">⚠️</span>
//               <p>
//                 <strong className="text-slate-800">
//                   Advanced Booking Only:
//                 </strong>{" "}
//                 Reservations must be made 1 day in advance. You are currently
//                 booking for tomorrow:{" "}
//                 <span className="text-blue-600 font-semibold underline">
//                   {formattedTomorrow}
//                 </span>
//                 .
//               </p>
//             </div>

//             <div className="flex items-start gap-2.5 p-2 bg-white rounded-lg border border-slate-100 shadow-xs">
//               <span className="text-blue-500 font-bold mt-0.5">⏱️</span>
//               <p>
//                 <strong className="text-slate-800">Time Limit:</strong> Each
//                 student group is limited to{" "}
//                 <strong>one time slot per day</strong> to ensure fair access for
//                 everyone.
//               </p>
//             </div>

//             <div className="flex items-start gap-2.5 p-2 bg-white rounded-lg border border-slate-100 shadow-xs">
//               <span className="text-emerald-500 font-bold mt-0.5">✅</span>
//               <p>
//                 <strong className="text-slate-800">Grace Period:</strong> Held
//                 for <strong>15 minutes</strong> past start time. Rooms not
//                 occupied by then will automatically be released.
//               </p>
//             </div>

//             <div className="flex items-start gap-2.5 p-2 bg-white rounded-lg border border-slate-100 shadow-xs">
//               <span className="text-purple-500 font-bold mt-0.5">🧹</span>
//               <p>
//                 <strong className="text-slate-800">Room Etiquette:</strong>{" "}
//                 Please keep the room clean, maintain proper noise levels, and
//                 leave promptly when your slot ends.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 1. Room Selection */}
//         <h2 className="text-lg font-semibold mb-4">1. Select a Room</h2>
//         <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 mb-8">
//           {ROOMS.map((room) => {
//             const isSelected = selectedRoom?.id === room.id;

//             return (
//               <div
//                 key={room.id}
//                 onClick={() => setSelectedRoom(room)}
//                 className={`relative border-2 p-5 pt-8 rounded-lg text-center cursor-pointer transition-all duration-200 flex flex-col justify-center items-center gap-1 min-h-[120px] ${
//                   room.teacherOnly && !isSelected
//                     ? "border-amber-200 bg-amber-50/40 hover:border-amber-300 hover:bg-amber-50"
//                     : isSelected
//                       ? "border-[var(--selected)] bg-[#eff6ff] shadow-[0_0_0_1px_var(--selected)]"
//                       : "border-[var(--border)] bg-white hover:border-[var(--primary)] hover:bg-[#f0f7ff]"
//                 }`}
//               >
//                 {/* Tag Label with precise positioning & clear space */}
//                 {room.teacherOnly && (
//                   <span className="absolute top-2.5 right-2.5 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider">
//                     Teacher Only
//                   </span>
//                 )}

//                 {/* Content has natural breathing room now */}
//                 <h3 className="text-lg font-semibold text-[var(--text)] mt-1">
//                   {room.label}
//                 </h3>
//                 <p className="text-sm text-[var(--text-light)]">
//                   {room.capacity}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         {/* 2. Time Slot Selection */}
//         <h2 className="text-lg font-semibold mb-4">2. Select Time Slot</h2>
//         <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 mb-8">
//           {TIME_SLOTS.map((slot) => (
//             <button
//               key={slot.id}
//               onClick={() => setSelectedTime(slot)}
//               className={`border p-3 rounded-md font-medium text-center transition-all duration-200 hover:border-(--text) ${
//                 selectedTime?.id === slot.id
//                   ? "bg-(--selected) text-white border-(--selected)"
//                   : "bg-(--surface) border-(--border)"
//               }`}
//             >
//               {slot.display}
//             </button>
//           ))}
//         </div>

//         {/* 3. Dynamic Booking Form */}
//         {selectedRoom && selectedTime && (
//           <div
//             ref={formRef}
//             className="bg-[#f1f5f9] p-6 rounded-lg transition-all duration-300"
//           >
//             <h2 className="text-lg font-semibold mb-2">
//               3. Verification & Identity
//             </h2>
//             <p className="text-sm text-(--primary) font-medium mb-4">
//               You are reserving:{" "}
//               <span className="font-bold">{selectedRoom.name}</span> for
//               tomorrow (
//               <span className="text-slate-800 font-bold">
//                 {formattedTomorrow}
//               </span>
//               ) during the slot{" "}
//               <span className="font-bold">{selectedTime.value}</span>
//             </p>

//             {/* Added: Role Selection Dropdown */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2 text-slate-700">
//                 I am a...
//               </label>
//               <select
//                 value={userRole} // Add a [userRole, setUserRole] = useState("Student") at top of component
//                 onChange={(e) => setUserRole(e.target.value)}
//                 className="w-full p-3 border border-slate-200 bg-white rounded-md text-base text-black focus:outline-none focus:ring-3 focus:ring-blue-100"
//               >
//                 <option value="Student">Student</option>
//                 <option value="Teacher">Teacher / Faculty Staff</option>
//               </select>
//             </div>

//             <form onSubmit={handleConfirmBooking} className="space-y-4">
//               <div>
//                 <label
//                   className="block text-sm font-medium mb-2"
//                   htmlFor="studentName"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="studentName"
//                   required
//                   placeholder="e.g. John Doe"
//                   value={studentName}
//                   onChange={(e) => setStudentName(e.target.value)}
//                   className="w-full p-3 border border-[var(--border)] rounded-md text-base text-black focus:outline-none focus:border-[var(--primary)] focus:ring-3 focus:ring-blue-100"
//                 />
//               </div>

//               <div>
//                 <label
//                   className="block text-sm font-medium mb-2"
//                   htmlFor="studentId"
//                 >
//                   {/* Dynamic clean label change depending on selection */}
//                   {userRole === "Teacher"
//                     ? "Staff ID Number"
//                     : "Student ID Number"}
//                 </label>
//                 <input
//                   type="text"
//                   id="studentId"
//                   required
//                   placeholder={
//                     userRole === "Teacher" ? "e.g. T-14023" : "e.g. S-90210"
//                   }
//                   value={studentId}
//                   onChange={(e) => setStudentId(e.target.value)}
//                   className="w-full p-3 border border-[var(--border)] rounded-md text-base text-black focus:outline-none focus:border-[var(--primary)] focus:ring-3 focus:ring-blue-100"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-[var(--primary)] text-white p-3 rounded-md font-semibold text-lg hover:bg-[var(--primary-hover)] transition-colors duration-200"
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

import React, { useState, useRef, useEffect } from "react";
import { Room, ROOMS, TIME_SLOTS, TimeSlot } from "./data/bookingData";

export default function RoomReservation() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [studentName, setStudentName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("Student");

  const formRef = useRef<HTMLDivElement>(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (selectedRoom && selectedTime) {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedRoom, selectedTime]);

  const handleConfirmBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedRoom || !selectedTime) return;

    alert(
      `Reservation Successful!\n\n` +
        `Date: ${formattedTomorrow}\n` +
        `Room: ${selectedRoom.name}\n` +
        `Time: ${selectedTime.value}\n` +
        `Reserved By: ${studentName} (${studentId})`,
    );

    setSelectedRoom(null);
    setSelectedTime(null);
    setStudentName("");
    setStudentId("");
  };

  return (
    // Breathable wrapper wrapper for outer edge screen margins on mobile
    <div className="min-h-screen p-4 sm:p-8 flex justify-center items-start bg-slate-50">
      <div className="w-full max-w-2xl bg-[var(--surface)] p-5 sm:p-8 rounded-xl shadow-sm border border-[var(--border)]">
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1.5 tracking-tight text-slate-900">
            Reserve a Study Room
          </h1>
          <p className="text-sm text-[var(--text-light)]">
            Select a room and your preferred timing below.
          </p>
        </header>

        {/* Compact, Ultra-breathable Guidelines Info Board */}
        <div className="mb-6 p-4 bg-slate-50/80 border border-slate-200 rounded-lg">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Booking Guidelines
          </h3>
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-600">
            <div className="flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              <p>
                <strong className="text-slate-800">
                  Advanced Booking Only:
                </strong>{" "}
                Currently reserving for tomorrow:{" "}
                <span className="text-blue-600 font-semibold underline">
                  {formattedTomorrow}
                </span>
                .
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5">⏱️</span>
              <p>
                <strong className="text-slate-800">Limits:</strong> One slot per
                day per group. Held for 15 mins max before release.
              </p>
            </div>
          </div>
        </div>

        {/* 1. Room Selection */}
        <h2 className="text-base sm:text-lg font-semibold mb-3 text-slate-900">
          1. Select a Room
        </h2>
        {/* Adjusted to grid-cols-2 for mobile to keep screen height clean and breathable */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {ROOMS.map((room) => {
            const isSelected = selectedRoom?.id === room.id;

            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-3.5 rounded-lg text-center cursor-pointer transition-all duration-200 flex flex-col justify-between items-center gap-2 min-h-[105px] border-2 ${
                  room.teacherOnly && !isSelected
                    ? "border-amber-200 bg-amber-50/40 hover:border-amber-300 hover:bg-amber-50"
                    : isSelected
                      ? "border-[var(--selected)] bg-[#eff6ff] shadow-[0_0_0_1px_var(--selected)]"
                      : "border-[var(--border)] bg-white hover:border-[var(--primary)] hover:bg-[#f0f7ff]"
                }`}
              >
                <div className="w-full flex flex-col items-center gap-1">
                  <h3 className="text-base font-semibold text-slate-900 leading-tight">
                    {room.label}
                  </h3>
                  <p className="text-xs text-[var(--text-light)]">
                    {room.capacity}
                  </p>
                </div>

                {/* Inline Label Tag - Prevents ever overlapping text titles on small screens */}
                {room.teacherOnly && (
                  <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-2 py-0.5 rounded-md border border-amber-200 uppercase tracking-wide">
                    Teacher Only
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* 2. Time Slot Selection */}
        <h2 className="text-base sm:text-lg font-semibold mb-3 text-slate-900">
          2. Select Time Slot
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot.id}
              onClick={() => setSelectedTime(slot)}
              className={`border p-2.5 rounded-lg text-sm font-medium text-center transition-all duration-200 ${
                selectedTime?.id === slot.id
                  ? "bg-[var(--selected)] text-white border-[var(--selected)]"
                  : "bg-[var(--surface)] border-[var(--border)] text-slate-700 hover:border-slate-400"
              }`}
            >
              {slot.display}
            </button>
          ))}
        </div>

        {/* 3. Dynamic Booking Form */}
        {selectedRoom && selectedTime && (
          <div
            ref={formRef}
            className="bg-slate-100 p-4 sm:p-6 rounded-xl border border-slate-200/60 transition-all duration-300"
          >
            <h2 className="text-base sm:text-lg font-semibold mb-1 text-slate-900">
              3. Verification & Identity
            </h2>
            <p className="text-xs sm:text-sm text-blue-700 font-medium mb-4 leading-relaxed">
              Reserving:{" "}
              <span className="font-bold text-slate-900">
                {selectedRoom.name}
              </span>{" "}
              for tomorrow (
              <span className="text-slate-900 font-bold">
                {formattedTomorrow}
              </span>
              ) at{" "}
              <span className="font-bold text-slate-900">
                {selectedTime.value}
              </span>
              .
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 text-slate-700">
                  I am a...
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 bg-white rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher / Faculty Staff</option>
                </select>
              </div>

              <form onSubmit={handleConfirmBooking} className="space-y-3.5">
                <div>
                  <label
                    className="block text-xs sm:text-sm font-medium mb-1.5 text-slate-700"
                    htmlFor="studentName"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    required
                    placeholder="e.g. John Doe"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 bg-white rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs sm:text-sm font-medium mb-1.5 text-slate-700"
                    htmlFor="studentId"
                  >
                    {userRole === "Teacher"
                      ? "Staff ID Number"
                      : "Student ID Number"}
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    required
                    placeholder={
                      userRole === "Teacher" ? "e.g. T-14023" : "e.g. S-90210"
                    }
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 bg-white rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-[var(--primary)] text-white p-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--primary-hover)] active:scale-[0.99] transition-all duration-150 shadow-xs"
                >
                  Confirm Reservation
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
