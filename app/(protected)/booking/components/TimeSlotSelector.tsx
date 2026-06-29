import { useTimeSlots } from "@/features/hooks/useTimeSlots";
import { formatTimeTo12h } from "@/features/misc/time";
import { getBookingDate } from "@/features/misc/booking-date";
import { NoTimeSlot } from "./NoTimeSlot";

type Props = {
  roomId: string;
  selectedSlots: string[];
  onToggleSlot: (id: string) => void;
};

export default function TimeSlotSelector({
  roomId,
  selectedSlots,
  onToggleSlot,
}: Props) {
  const bookingDate = getBookingDate();
  const { slots, bookedSlotIds } = useTimeSlots(roomId, bookingDate);

  const sortedSlots = [...slots].sort((a, b) =>
    a.start_time.localeCompare(b.start_time),
  );

  if (!slots.length) {
    return <NoTimeSlot />;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {sortedSlots.map((slot) => {
        const isBooked = bookedSlotIds.has(slot.id);
        const isBlocked = slot.is_blocked === true;
        const isDisabled = Boolean(isBooked || isBlocked);
        const isActive = selectedSlots.includes(slot.id);

        console.log("UI CHECK", {
          slotId: slot.id,
          isBooked: bookedSlotIds.has(slot.id),
          isBlocked: slot.is_blocked,
          isDisabled: bookedSlotIds.has(slot.id) || slot.is_blocked,
        });

        return (
          <button
            key={slot.id}
            type="button"
            disabled={isDisabled}
            onClick={() => {
              if (bookedSlotIds.has(slot.id) || slot.is_blocked) return;

              onToggleSlot(slot.id);
            }}
            className={[
              "rounded-xl border px-4 py-3 text-sm font-medium transition-all",

              "flex items-center justify-center whitespace-nowrap",

              isBooked
                ? "bg-red-100 text-red-700 border-red-300"
                : isBlocked
                  ? "bg-red-50 text-red-500 border-red-200"
                  : isActive
                    ? "border-black bg-black text-white"
                    : "border-neutral-200",

              isDisabled ? "cursor-not-allowed" : "cursor-pointer",
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
