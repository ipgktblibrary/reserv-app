import { useTimeSlots } from "@/features/hooks/useTimeSlots";
import { formatTimeTo12h } from "@/features/misc/time";
import { getBookingDate } from "@/features/misc/booking-date";

type Props = {
  roomId: string;
  selectedSlots: string[];
  bookedSlotIds: Set<string>;
  onToggleSlot: (id: string) => void;
};

export default function TimeSlotSelector({
  roomId,
  selectedSlots,
  bookedSlotIds,
  onToggleSlot,
}: Props) {
  const bookingDate = getBookingDate();
  const { slots } = useTimeSlots(roomId, bookingDate);

  const sortedSlots = [...slots].sort((a, b) =>
    a.start_time.localeCompare(b.start_time),
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {sortedSlots.map((slot) => {
        //IF BOOKED
        const isBooked = bookedSlotIds.has(slot.id);
        const isBlocked = slot.is_blocked;
        const isDisabled = isBooked || isBlocked;
        const isActive = selectedSlots.includes(slot.id);

        return (
          <button
            key={slot.id}
            type="button"
            disabled={isBooked}
            onClick={() => {
              if (isDisabled) return;

              onToggleSlot(slot.id);
            }}
            title={slot.blocked_reason ?? undefined}
            className={[
              "rounded-xl border px-4 py-3 text-sm font-medium transition-all",

              "flex items-center justify-center whitespace-nowrap",

              isDisabled
                ? "bg-red-50 text-red-500 cursor-not-allowed opacity-60"
                : isActive
                  ? "border-black bg-black text-white"
                  : "border-neutral-200",
            ].join(" ")}
          >
            <span>
              {formatTimeTo12h(slot.start_time)}
              <span className="mx-2 opacity-50">→</span>
              {formatTimeTo12h(slot.end_time)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
