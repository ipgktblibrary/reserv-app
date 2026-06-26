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

  if (!slots.length) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-14 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
          <svg
            className="h-6 w-6 text-neutral-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10m-12 9h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h3 className="text-sm font-medium text-neutral-900">
          No time slots available
        </h3>

        <p className="mt-1 max-w-sm text-xs text-neutral-500">
          This room has no available booking slots for the selected date. Try a
          different day or room.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {sortedSlots.map((slot) => {
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
