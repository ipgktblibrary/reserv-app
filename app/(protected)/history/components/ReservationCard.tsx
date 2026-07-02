/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

type Props = {
  reservation: any;
  onCancel: (id: string) => void;
};

export function formatDatePretty(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatter.format(date);
}

export function formatTime(time?: string): string {
  if (!time) return "-";
  const [h, m] = time.split(":");
  if (!h || !m) return time;
  const hour = Number(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalizedHour.toString().padStart(2, "0")}:${m} ${ampm}`;
}

export function ReservationCard({ reservation, onCancel }: Props) {
  const isCancelled = reservation.status === "cancelled";

  return (
    <div className="relative rounded-xl border bg-white p-4 transition">
      {/* left accent */}
      <div
        className={[
          "absolute left-0 top-0 h-full w-1 rounded-l-xl",
          isCancelled ? "bg-red-200" : "bg-[#6844C7]",
        ].join(" ")}
      />

      <div className="pl-3 space-y-3">
        {/* HEADER ROW */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div
              className={[
                "text-sm font-semibold",
                isCancelled
                  ? "text-neutral-400 line-through"
                  : "text-neutral-900",
              ].join(" ")}
            >
              {reservation.rooms?.name}
            </div>

            {/* DATE + TIME (primary context) */}
            <div
              className={[
                "text-xs",
                isCancelled ? "text-neutral-400" : "text-neutral-500",
              ].join(" ")}
            >
              {formatDatePretty(reservation.booking_date)}
            </div>

            <div
              className={[
                "text-xs font-medium",
                isCancelled ? "text-neutral-400" : "text-neutral-700",
              ].join(" ")}
            >
              {formatTime(reservation.room_time_slots?.start_time)} -{" "}
              {formatTime(reservation.room_time_slots?.end_time)}
            </div>
          </div>

          {/* STATUS */}
          <span
            className={[
              "text-[10px] px-2 py-1 rounded-full border whitespace-nowrap",
              isCancelled
                ? "bg-red-50 text-red-500 border-red-100"
                : "bg-green-50 text-green-600 border-green-100",
            ].join(" ")}
          >
            {isCancelled ? "Cancelled" : "Active"}
          </span>
        </div>

        {/* DIVIDER */}
        <div className="border-t" />

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 gap-1 text-xs">
          <div className="text-neutral-500">
            <span className="font-medium text-neutral-600">Nama:</span>{" "}
            {reservation.full_name}
          </div>

          <div className="text-neutral-500">
            <span className="font-medium text-neutral-600">Jenis Projek:</span>{" "}
            {reservation.project_type}
          </div>
        </div>

        {/* ACTION */}
        {!isCancelled && (
          <div className="flex justify-end pt-2">
            <button
              onClick={() => onCancel(reservation.id)}
              className="text-xs px-3 py-1.5 rounded-lg border text-red-600 hover:bg-red-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
