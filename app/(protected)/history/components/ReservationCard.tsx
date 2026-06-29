import { CalendarDays, Clock3, Users } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type Reservation = {
  id: string;
  booking_date: string;
  capacity: number;
  project_type: string;
  project_progress: string;
  status: string;
  rooms: {
    id: string;
    name: string;
    label: string;
  };

  room_time_slots: {
    start_time: string;
    end_time: string;
  };
};

type ReservationCardProps = {
  reservation: Reservation;
};

export function ReservationCard({ reservation }: ReservationCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">
            {reservation.rooms.name}
          </h3>
          <p className="text-xs text-neutral-500">{reservation.rooms.label}</p>
        </div>

        <StatusBadge status={reservation.status} />
      </div>

      {/* Meta */}
      <div className="mt-4 space-y-2 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-neutral-400" />
          <span>{reservation.booking_date}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={16} className="text-neutral-400" />
          <span>
            {reservation.room_time_slots.start_time} -{" "}
            {reservation.room_time_slots.end_time}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Users size={16} className="text-neutral-400" />
          <span>{reservation.capacity} participants</span>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
          {reservation.project_type}
        </span>

        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
          {reservation.project_progress.replaceAll("_", " ")}
        </span>
      </div>
    </div>
  );
}
