// import type { Room } from "@/features/services/room.service";
// import { useEffect } from "react";

// type Props = {
//   rooms: Room[];
//   userRole: "student" | "teacher" | null;
//   selectedRoomId: string | null;
//   onSelect: (id: string) => void;
// };

// export default function RoomSelector({
//   rooms,
//   userRole,
//   selectedRoomId,
//   onSelect,
// }: Props) {
//   const visibleRooms = rooms.filter(
//     (room) => !room.teacher_only || userRole === "teacher",
//   );

//   useEffect(() => {
//     if (visibleRooms.length > 0 && !selectedRoomId) {
//       onSelect(visibleRooms[0].id);
//     }
//   }, [visibleRooms, selectedRoomId, onSelect]);

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold">Pilih bilik</h1>

//         <p className="mt-1 text-sm">
//           Pilih bilik yang tersedia untuk meneruskan tempahan anda.
//         </p>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {visibleRooms.map((room) => {
//           const active = selectedRoomId === room.id;
//           return (
//             <button
//               key={room.id}
//               type="button"
//               onClick={() => onSelect(room.id)}
//               className={[
//                 "relative rounded-xl border p-5 text-left transition-all",
//                 active
//                   ? "border-accent bg-accent/10 shadow-sm"
//                   : "border-default-200 bg-white hover:border-accent/40",
//               ].join(" ")}
//             >
//               {/* Title */}
//               <div
//                 className={[
//                   "text-sm font-semibold",
//                   active ? "text-primary" : "text-foreground",
//                 ].join(" ")}
//               >
//                 {room.name}
//               </div>

//               {/* Meta */}
//               <div className="mt-1 text-xs text-default-500">
//                 Maks. kapasiti {room.capacity}
//               </div>

//               {/* Badge */}
//               {room.teacher_only && (
//                 <div className="mt-3 inline-flex rounded-full bg-default-100 px-2 py-0.5 text-[10px] font-medium text-default-600">
//                   Pensyarah Sahaja
//                 </div>
//               )}

//               {/* Active indicator */}
//               {active && (
//                 <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-accent" />
//               )}

//             </button>
//           );
//         })}
//       </div>
//     </>
//   );
// }

"use client";

import { useMemo } from "react";
import { LockKeyhole } from "lucide-react";

import type { RoomWithOverride } from "@/features/services/room.service";

type Props = {
  rooms: RoomWithOverride[];
  loading?: boolean;
  userRole: "student" | "teacher" | null;
  selectedRoomId: string | null;
  onSelect: (id: string) => void;
};

export default function RoomSelector({
  rooms,
  loading = false,
  userRole,
  selectedRoomId,
  onSelect,
}: Props) {
  const visibleRooms = useMemo(
    () => rooms.filter((room) => !room.teacher_only || userRole === "teacher"),
    [rooms, userRole],
  );

  return (
    <section className="mt-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Pilih bilik</h1>

        <p className="mt-1 text-sm">
          Pilih bilik yang tersedia untuk meneruskan tempahan anda.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-default-200 bg-white px-4 py-6 text-center">
          <p className="text-sm text-default-500">
            Memeriksa ketersediaan bilik...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visibleRooms.map((room) => {
            const active = selectedRoomId === room.id;
            const blocked = room.override?.is_blocked === true;

            return (
              <button
                key={room.id}
                type="button"
                disabled={blocked}
                onClick={() => onSelect(room.id)}
                className={[
                  "relative w-full rounded-xl border p-4 text-left transition-colors",
                  blocked
                    ? "cursor-not-allowed border-danger-200 bg-danger-50/40"
                    : active
                      ? "border-accent bg-accent/10"
                      : "border-default-200 bg-white hover:border-accent/40",
                ].join(" ")}
              >
                {/* Room */}
                <div className="pr-5">
                  <div
                    className={[
                      "text-sm font-semibold",
                      blocked
                        ? "text-default-700"
                        : active
                          ? "text-primary"
                          : "text-foreground",
                    ].join(" ")}
                  >
                    {room.name}
                  </div>

                  <div className="text-[13px] text-default-500">
                    Kapasiti {room.capacity} orang
                  </div>
                </div>

                {room.teacher_only && (
                  <span className="text-[10px] text-default-500">
                    Pensyarah Sahaja
                  </span>
                )}
                {/* Blocked */}
                {blocked && (
                  <div className="mt-4 border-t border-danger-200 pt-3">
                    <div className="flex gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-danger-100">
                        <LockKeyhole className="h-3.5 w-3.5 text-danger-600" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-danger-700">
                          Bilik tidak tersedia
                        </p>

                        {room.override?.blocked_reason && (
                          <p className="mt-0.5 text-xs leading-5 text-danger">
                            {room.override.blocked_reason}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Selected */}
                {active && !blocked && (
                  <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
