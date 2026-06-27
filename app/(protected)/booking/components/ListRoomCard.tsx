import { useRooms } from "@/features/hooks/useRooms";

type Props = {
  onSelect: (id: string) => void;
  selectedRoomId: string | null;
};

export default function RoomList(props: Props) {
  const { onSelect, selectedRoomId } = props;
  const { rooms } = useRooms();

  return (
    <>
      <section className="mb-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Select a Room
          </h1>

          <p className="mt-1 text-sm leading-6 text-neutral-500">
            Choose an available room to continue your booking.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room) => {
            const active = selectedRoomId === room.id;

            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onSelect(room.id)}
                className={[
                  "relative rounded-xl border p-4 text-left transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-[#6844C7]/30",

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
      </section>
    </>
  );
}

/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room) => {
            const active = selectedRoomId === room.id;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onSelect(room.id)}
                className={[
                  "rounded-xl border p-4 text-left transition",
                  active
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white border-neutral-200 hover:border-neutral-400",
                ].join(" ")}
              >
                <div className="font-semibold text-sm">Room {room.name}</div>
                <div className="text-xs mt-1">
                  Max. Kapasiti {room.capacity}
                </div>

                {room.teacher_only && (
                  <div className="text-[10px] mt-2 opacity-70">
                    Pensyarah Sahaja
                  </div>
                )}
              </button>
            );
          })}
        </div> */
