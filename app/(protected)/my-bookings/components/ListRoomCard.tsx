import { usePublicRooms } from "@/features/rooms/hooks/usePublicRooms";

type Props = {
  selectedRoom: string | null;
  onSelectRoom: (id: string) => void;
};
export default function ListRoomCard({ selectedRoom, onSelectRoom }: Props) {
  const { rooms } = usePublicRooms();
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-lg font-semibold">Select Room</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.map((room) => {
          const active = selectedRoom === room.id;
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => onSelectRoom(room.id)}
              className={[
                "rounded-xl border p-4 text-left transition",

                active
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white border-neutral-200 hover:border-neutral-400",
              ].join(" ")}
            >
              <div className="font-semibold text-sm">Room {room.id}</div>
              <div className="text-xs mt-1">{room.capacity} pax</div>

              {room.teacher_only && (
                <div className="text-[10px] mt-2 opacity-70">Teacher only</div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
