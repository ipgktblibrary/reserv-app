/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

type Props = {
  reservation: any;
  onCancel: (id: string) => void;
};

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

      <div className="pl-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div>
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

            <div
              className={[
                "text-xs mt-1",
                isCancelled ? "text-neutral-400" : "text-neutral-500",
              ].join(" ")}
            >
              {reservation.booking_date} •{" "}
              {reservation.room_time_slots?.start_time} -{" "}
              {reservation.room_time_slots?.end_time}
            </div>
          </div>

          {/* status badge */}
          <span
            className={[
              "text-[10px] px-2 py-1 rounded-full border",
              isCancelled
                ? "bg-red-50 text-red-500 border-red-100"
                : "bg-green-50 text-green-600 border-green-100",
            ].join(" ")}
          >
            {isCancelled ? "Cancelled" : "Active"}
          </span>
        </div>

        {/* meta */}
        <div className="mt-3 text-xs text-neutral-500">
          {reservation.project_type} • {reservation.project_progress}
        </div>

        {/* actions */}
        {!isCancelled && (
          <div className="mt-4 flex justify-end">
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
