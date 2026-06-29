import { useRooms } from "@/features/hooks/useRooms";
import { getUser } from "@/lib/auth";
import { useEffect, useState } from "react";

type Props = {
  onSelect: (id: string) => void;
  selectedRoomId: string | null;
};

export default function RoomList(props: Props) {
  const { onSelect, selectedRoomId } = props;
  const { rooms } = useRooms();

  const [user, setUser] = useState<Awaited<ReturnType<typeof getUser>> | null>(
    null,
  );
  useEffect(() => {
    getUser().then(setUser);
  }, []);

  const visibleRooms = rooms.filter(
    (room) => !room.teacher_only || user?.role === "teacher",
  );

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Select a Room
        </h1>

        <p className="mt-1 text-sm leading-6 text-neutral-500">
          Choose an available room to continue your booking.
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
                "focus:outline-none  focus:ring-[#6844C7]/30",

                active
                  ? "border-[#6844C7] bg-[#6844C7]/5 shadow-sm"
                  : "border-neutral-200 bg-white hover:border-neutral-300",
              ].join(" ")}
            >
              {/* Title */}
              <div
                className={[
                  "text-sm font-semibold",
                  active ? "text-[#6844C7]" : "text-neutral-900",
                ].join(" ")}
              >
                Room {room.name}
              </div>

              {/* Meta */}
              <div className="mt-1 text-xs text-neutral-500">
                Max capacity {room.capacity}
              </div>

              {/* Badge */}
              {room.teacher_only && (
                <div className="mt-3 inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                  Teachers only
                </div>
              )}

              {/* Active indicator */}
              {active && (
                <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#6844C7]" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
