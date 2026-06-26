import { useRooms } from "@/features/hooks/useRooms";

type Props = {
  onSelect: (id: string) => void;
  selectedRoomId: string | null;
};

export default function RoomList(props: Props) {
  const { onSelect, selectedRoomId } = props;
  const { rooms } = useRooms();

  console.log("ROOMS", rooms);

  return (
    <>
      <section className="mb-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Select Rooms</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
            inventore earum quam quas nam odit, omnis at minus cum libero
            consequatur doloribus, aliquam placeat, et ab deleniti explicabo
            pariatur. Veritatis.
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
        </div>
      </section>
    </>
  );
}
