import { useTimeSlots } from "@/features/hooks/useTimeSlots";
import { formatTimeTo12h } from "@/features/misc/time";
import { NoAvailableTimeSlot } from "./NoAvailableTimeSlot";

type Props = {
  roomId: string;
  bookingDate: string;
  selectedSlots: string[];
  onToggleSlot: (id: string) => void;
};

export default function TimeSlotSelector({
  roomId,
  selectedSlots,
  bookingDate,
  onToggleSlot,
}: Props) {
  const { slots, bookedSlotIds, roomOverride } = useTimeSlots(
    roomId,
    bookingDate,
  );

  const sortedSlots = [...slots].sort((a, b) =>
    a.start_time.localeCompare(b.start_time),
  );

  if (roomOverride) {
    return (
      <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-5">
        <h2 className="font-semibold text-red-700">Bilik tidak tersedia</h2>

        {roomOverride.blocked_reason && (
          <p className="mt-1 text-sm text-red-600">
            {roomOverride.blocked_reason}
          </p>
        )}
      </div>
    );
  }
  if (!slots.length) {
    // return <NoAvailableTimeSlot />;
  }

  return (
    <>
      <div className="mb-8 mt-10">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Pilih Masa
        </h1>
        <div className="mt-4 rounded-xl border border-accent/15 bg-accent/5 p-4">
          <h3 className="text-sm font-semibold text-accent">Maklumat</h3>

          <ul className="mt-2 space-y-1 text-sm text-default-600">
            <li>
              • Anda boleh memilih sehingga <strong>2 slot masa</strong>.
            </li>

            <li>
              • Slot berwarna{" "}
              <span className="font-semibold text-danger">merah</span> telah
              ditempah dan tidak boleh dipilih.
            </li>

            <li>• Sila pilih slot lain yang masih tersedia.</li>
          </ul>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-3 ">
        {sortedSlots.map((slot) => {
          const isBooked = bookedSlotIds.has(slot.id);
          const isBlocked = slot.is_blocked === true;
          const isDisabled = Boolean(isBooked || isBlocked);
          const isActive = selectedSlots.includes(slot.id);

          return (
            <button
              key={slot.id}
              type="button"
              disabled={isDisabled}
              onClick={() => onToggleSlot(slot.id)}
              className={[
                "rounded-xl border px-4 py-3 text-sm font-medium transition-all ",

                "flex items-center justify-center whitespace-nowrap",

                isBooked
                  ? "bg-red-100 text-red-700 border-red-300"
                  : isBlocked
                    ? "bg-red-50 text-red-500 border-red-200"
                    : isActive
                      ? "border-[#6844C7] bg-[#6844C7]/10 text-[#6844C7]"
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
    </>
  );
}
