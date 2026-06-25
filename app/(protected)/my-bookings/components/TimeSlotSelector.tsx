import { usePublicTimeSlot } from "@/features/time-slots/hooks/usePublicTimeSlots";

type Props = {
  roomId: string;
  selectedSlots: string[];
  onSelectedSlots: React.Dispatch<React.SetStateAction<string[]>>;
  bookedSlotIds: Set<string>;
};

export default function TimeSlotSelector({
  roomId,
  selectedSlots,
  onSelectedSlots,
  bookedSlotIds,
}: Props) {
  const { slots } = usePublicTimeSlot(roomId);

  //CHOOSE SLOT HOURS
  function toggleSlot(id: string) {
    if (selectedSlots.includes(id)) {
      onSelectedSlots(selectedSlots.filter((s) => s !== id));
    } else {
      if (selectedSlots.length >= 2) return;
      onSelectedSlots([...selectedSlots, id]);
    }
  }

  //SLOTS FORMAT
  function formatTime(time: string) {
    return new Date(`2000-01-01T${time}`)
      .toLocaleTimeString("en-MY", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  }

  return (
    <div className="flex flex-wrap gap-3">
      {slots.map((slot) => {
        const active = selectedSlots.includes(slot.id);
        const isBooked = bookedSlotIds.has(slot.id);
        return (
          <button
            key={slot.id}
            type="button"
            disabled={isBooked}
            onClick={() => toggleSlot(slot.id)}
            className={[
              "rounded-xl border px-4 py-3 text-sm font-medium transition-all",
              "flex items-center justify-center whitespace-nowrap",
              isBooked
                ? "bg-red-50 text-red-500 cursor-not-allowed"
                : active
                  ? "border-black bg-black text-white"
                  : "border-neutral-200",
            ].join(" ")}
          >
            <span>
              {formatTime(slot.start_time)}
              <span className="mx-2 opacity-50">→</span>
              {formatTime(slot.end_time)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
