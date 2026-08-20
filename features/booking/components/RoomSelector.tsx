import type { Room } from "@/features/services/room.service";
import { useEffect } from "react";

type Props = {
  rooms: Room[];
  userRole: "student" | "teacher" | null;
  selectedRoomId: string | null;
  onSelect: (id: string) => void;
};

export default function RoomSelector({
  rooms,
  userRole,
  selectedRoomId,
  onSelect,
}: Props) {
  const visibleRooms = rooms.filter(
    (room) => !room.teacher_only || userRole === "teacher",
  );

  useEffect(() => {
    if (visibleRooms.length > 0 && !selectedRoomId) {
      onSelect(visibleRooms[0].id);
    }
  }, [visibleRooms, selectedRoomId, onSelect]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Pilih bilik</h1>

        <p className="mt-1 text-sm">
          Pilih bilik yang tersedia untuk meneruskan tempahan anda.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visibleRooms.map((room) => {
          const active = selectedRoomId === room.id;
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => onSelect(room.id)}
              className={[
                "relative rounded-xl border p-5 text-left transition-all",
                // "focus:outline-  focus:ring-[#6844C7]/30",

                active
                  ? "border-accent bg-accent/10 shadow-sm"
                  : "border-default-200 bg-white hover:border-accent/40",
              ].join(" ")}
            >
              {/* Title */}
              <div
                className={[
                  "text-sm font-semibold",
                  active ? "text-primary" : "text-foreground",
                ].join(" ")}
              >
                {room.name}
              </div>

              {/* Meta */}
              <div className="mt-1 text-xs text-default-500">
                Maks. kapasiti {room.capacity}
              </div>

              {/* Badge */}
              {room.teacher_only && (
                <div className="mt-3 inline-flex rounded-full bg-default-100 px-2 py-0.5 text-[10px] font-medium text-default-600">
                  Pensyarah Sahaja
                </div>
              )}

              {/* Active indicator */}
              {active && (
                <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
