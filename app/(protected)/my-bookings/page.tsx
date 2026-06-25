// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { supabase } from "@/lib/supabase/client";
// import { useRooms } from "@/features/rooms/hooks/useRooms";

// export default function MyBookingsPage() {
//   const [bookerId, setBookerId] = useState<Bookers["id"] | null>(null);
//   const [bookings, setBookings] = useState<Reservation[]>([]);

//   const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
//   const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

//   const { rooms } = useRooms();

//   const { slots, loading: slotLoading } = usePublicTimeSlot(
//     selectedRoom ?? undefined,
//   );

//   const bookingDate = useMemo(() => {
//     const d = new Date();
//     d.setDate(d.getDate() + 1);
//     return d;
//   }, []);

//   const dayOfWeek = ((bookingDate.getDay() + 6) % 7) + 1;
//   const visibleSlots = useMemo(() => {
//     return slots.filter((slot) => slot.day_of_week === dayOfWeek);
//   }, [slots, dayOfWeek]);

//   const sortedSlots = [...slots].sort((a, b) =>
//     a.start_time.localeCompare(b.start_time),
//   );
//   const roomStart = sortedSlots[0]?.start_time;
//   const roomEnd = sortedSlots.at(-1)?.end_time;
//   const availableSlots = useAvailableIntervals(
//     roomStart,
//     roomEnd,
//     slots,
//     bookings,
//   );

//   const bookedSlotIds = useMemo(() => {
//     return new Set(
//       bookings.filter((b) => b.status === "confirmed").map((b) => b.slot_id),
//     );
//   }, [bookings]);

//   const [form, setForm] = useState({
//     fullName: "",
//     participants: 0,
//     projectType: "",
//     progressStatus: "",
//     userRole: "Student" as const,
//   });

//   useEffect(() => {
//     const stored = localStorage.getItem("booker_id");
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     if (stored) setBookerId(stored);
//   }, []);

//   useEffect(() => {
//     const load = async () => {
//       if (!bookerId) return;
//       const { data } = await supabase.from("reservations").select("*");
//       setBookings(data ?? []);
//     };
//     load();
//   }, [bookerId]);

//   const handleCancel = async (id: string) => {
//     await supabase
//       .from("reservations")
//       .update({
//         status: "cancelled",
//         cancel_reason: "Cancelled by user",
//       })
//       .eq("id", id);
//     setBookings((prev) =>
//       prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
//     );
//   };

//   const toggleSlot = (slotId: string) => {
//     if (bookedSlotIds.has(slotId)) {
//       alert("This slot is already booked.");
//       return;
//     }
//     setSelectedSlots((prev) => {
//       const exists = prev.includes(slotId);
//       // remove if already selected
//       if (exists) {
//         return prev.filter((id) => id !== slotId);
//       }
//       // block if already 2 selected
//       if (prev.length >= 2) {
//         alert("You can only select up to 2 slots.");
//         return prev;
//       }

//       return [...prev, slotId];
//     });
//   };

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!bookerId || !selectedRoom || selectedSlots.length === 0) return;

//     const selectedSlotIds = availableSlots
//       .filter((s) => selectedSlots.includes(s.start))
//       .map((s) => {
//         const fullSlot = slots.find((db) => db.start_time === s.start);
//         return fullSlot?.id;
//       })
//       .filter(Boolean) as string[];
//     const inserts = selectedSlotIds.map((slotId) => ({
//       booker_id: bookerId,
//       room_id: selectedRoom,
//       slot_id: slotId,
//       booking_date: new Date().toISOString().split("T")[0],
//       full_name: form.fullName,
//       capacity: Number(form.participants),
//       project: form.projectType,
//       student_class: form.progressStatus,
//       user_role: form.userRole,
//       status: "confirmed",
//     }));
//     const { error } = await supabase.from("reservations").insert(inserts);
//     if (error) {
//       console.error("Booking failed:", error);
//       return;
//     }
//     setForm({
//       fullName: "",
//       participants: 0,
//       projectType: "",
//       progressStatus: "",
//       userRole: "Student",
//     });

//     setSelectedSlots([]);
//   }

//   if (!bookerId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-sm text-neutral-500">
//         No session found
//       </div>
//     );
//   }

//   const selectedRoomData = rooms.find((room) => room.id === selectedRoom);

//   return (
//     <div className="min-h-screen bg-neutral-50 px-4 py-10 flex justify-center">
//       <div className="w-full max-w-2xl">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold">My Bookings</h1>
//           <p className="mt-1 text-sm text-neutral-500">Booker ID: {bookerId}</p>
//         </div>

//         {/* Existing Bookings */}
//         <section className="mb-10">
//           <h2 className="mb-4 text-lg font-semibold">Current Bookings</h2>
//           <div className="space-y-3">
//             {bookings.map((b) => (
//               <div
//                 key={b.id}
//                 className="bg-white border border-neutral-200 rounded-xl p-4 flex justify-between items-center"
//               >
//                 <div>
//                   <div className="font-medium text-neutral-900">
//                     Room {b.room_id}
//                   </div>

//                   <div className="text-xs text-neutral-500">
//                     {b.booking_date} • Slot {b.slot_id}
//                   </div>

//                   <div className="text-xs mt-1">
//                     Status:{" "}
//                     <span
//                       className={
//                         b.status === "cancelled"
//                           ? "text-red-500"
//                           : "text-green-600"
//                       }
//                     >
//                       {b.status}
//                     </span>
//                   </div>
//                 </div>

//                 {b.status !== "cancelled" && (
//                   <button
//                     onClick={() => handleCancel(b.id)}
//                     className="text-xs px-3 py-1 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* GET ROOM */}
//         <section className="mb-10">
//           <h2 className="mb-4 text-lg font-semibold">Select Room</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {rooms.map((room) => {
//               const active = selectedRoom === room.id;
//               return (
//                 <button
//                   key={room.id}
//                   type="button"
//                   onClick={() => setSelectedRoom(room.id)}
//                   className={[
//                     "rounded-xl border p-4 text-left transition",

//                     active
//                       ? "bg-neutral-900 text-white border-neutral-900"
//                       : "bg-white border-neutral-200 hover:border-neutral-400",
//                   ].join(" ")}
//                 >
//                   <div className="font-semibold text-sm">Room {room.id}</div>

//                   <div className="text-xs mt-1">{room.capacity} pax</div>

//                   {room.teacher_only && (
//                     <div className="text-[10px] mt-2 opacity-70">
//                       Teacher only
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </section>

//         {selectedRoom && (
//           <section className="mb-10">
//             <div className="mb-4">
//               <h2 className="text-lg font-semibold">Available Time Slots</h2>
//               <p className="text-sm text-neutral-500">
//                 Select a time for Room {selectedRoom}
//               </p>
//             </div>

//             {slotLoading ? (
//               <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center text-sm text-neutral-500">
//                 Loading slots...
//               </div>
//             ) : (
//               <div className="flex flex-wrap gap-3">
//                 {visibleSlots.map((slot) => {
//                   const active = selectedSlots.includes(slot.id);
//                   const isBooked = bookedSlotIds.has(slot.id);

//                   return (
//                     <button
//                       key={slot.id}
//                       type="button"
//                       onClick={() => toggleSlot(slot.id)}
//                       disabled={isBooked}
//                       className={[
//                         "rounded-xl border px-4 py-3 text-sm font-medium transition-all",
//                         "flex items-center justify-center whitespace-nowrap",
//                         isBooked
//                           ? "bg-red-50 text-red-500 cursor-not-allowed"
//                           : active
//                             ? "border-black bg-black text-white"
//                             : "border-neutral-200",
//                       ].join(" ")}
//                     >
//                       <span>
//                         {formatTimeRange(slot.start_time, slot.end_time)}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </section>
//         )}

//         {selectedRoom && selectedSlots && (
//           <div className="mb-10 rounded-2xl border bg-white p-5">
//             <h3 className="text-base font-semibold text-neutral-900 mb-4">
//               Confirm Booking
//             </h3>

//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <input
//                 className="w-full rounded-xl border border-neutral-200 px-3 py-3 text-sm"
//                 value={form.fullName}
//                 placeholder="Full name"
//                 onChange={(e) =>
//                   setForm((prev) => ({ ...prev, fullName: e.target.value }))
//                 }
//                 required
//               />

//               <select
//                 required
//                 className="w-full rounded-xl border border-neutral-200 px-3 py-3 text-sm"
//                 value={form.participants || ""}
//                 onChange={(e) =>
//                   setForm((prev) => ({
//                     ...prev,
//                     participants: Number(e.target.value),
//                   }))
//                 }
//               >
//                 <option value="">Select participants</option>
//                 {Array.from(
//                   { length: selectedRoomData?.capacity ?? 0 },
//                   (_, i) => i + 1,
//                 ).map((num) => (
//                   <option key={num} value={num}>
//                     {num} {num === 1 ? "Participant" : "Participants"}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 className="w-full rounded-xl border border-neutral-200 px-3 py-3 text-sm bg-white"
//                 required
//                 value={form.projectType}
//                 onChange={(e) =>
//                   setForm((prev) => ({ ...prev, projectType: e.target.value }))
//                 }
//               >
//                 <option value="" disabled>
//                   Select project type
//                 </option>
//                 {Object.values(ProjectType).map((type) => (
//                   <option key={type} value={type}>
//                     {type
//                       .toLowerCase()
//                       .replace(/_/g, " ")
//                       .replace(/\b\w/g, (c) => c.toUpperCase())}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 className="w-full rounded-xl border border-neutral-200 px-3 py-3 text-sm bg-white"
//                 value={form.progressStatus}
//                 onChange={(e) =>
//                   setForm((prev) => ({
//                     ...prev,
//                     progressStatus: e.target.value,
//                   }))
//                 }
//                 required
//               >
//                 <option value="" disabled>
//                   Progress status
//                 </option>
//                 {Object.values(ProgressStatus).map((type) => (
//                   <option key={type} value={type}>
//                     {type
//                       .toLowerCase()
//                       .replace(/_/g, " ")
//                       .replace(/\b\w/g, (c) => c.toUpperCase())}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="submit"
//                 className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white"
//               >
//                 Confirm Booking
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
