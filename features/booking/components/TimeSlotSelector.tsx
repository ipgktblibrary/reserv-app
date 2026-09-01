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
      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-amber-600">⚠</div>

          <div className="min-w-0">
            <h2 className="font-fraunces font-semibold text-amber-900">
              Bilik tidak tersedia
            </h2>

            <p className="mt-1 text-sm text-amber-800">
              Bilik ini sedang disekat untuk sementara waktu.
            </p>

            {roomOverride.blocked_reason && (
              <div className="mt-3 rounded-lg border border-amber-200 bg-white/70 px-3 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  Sebab sekatan
                </p>

                <p className="mt-1 text-sm font-bold uppercase leading-5 text-amber-950">
                  {roomOverride.blocked_reason}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (!slots.length) {
    return <NoAvailableTimeSlot />;
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

      <div className="grid grid-cols-2 gap-3">
        {sortedSlots.map((slot) => {
          const isBooked = bookedSlotIds.has(slot.id);
          const isBlocked = slot.is_blocked === true;
          const isDisabled = isBooked || isBlocked;
          const isActive = selectedSlots.includes(slot.id);

          return (
            <button
              key={slot.id}
              type="button"
              disabled={isDisabled}
              onClick={() => onToggleSlot(slot.id)}
              className={[
                "flex w-full min-w-0 items-center justify-center",
                "rounded-xl border py-3",
                "px-3",
                "text-[10px] font-medium leading-5",
                "min-[360px]:px-2.5 min-[360px]:text-[11px]",
                "sm:text-xs",
                "transition-all",

                isBooked
                  ? "border-red-300 bg-red-100 text-red-700"
                  : isBlocked
                    ? "border-red-200 bg-red-50 text-red-500"
                    : isActive
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-neutral-200",

                isDisabled
                  ? "cursor-not-allowed"
                  : "cursor-pointer active:scale-[0.98]",
              ].join(" ")}
            >
              <span className="whitespace-nowrap">
                {formatTimeTo12h(slot.start_time)}
                <span className="mx-1 opacity-50">→</span>
                {formatTimeTo12h(slot.end_time)}
              </span>
            </button>
          );
        })}
      </div>
      {/* <div className=" grid grid-cols-2 gap-3 ">
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
                      ? "border-accent bg-accent/10 text-accent"
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
      </div> */}
    </>
  );
}
