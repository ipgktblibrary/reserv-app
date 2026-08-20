import type { BookingDate, BookingSettings } from "./bookingDate";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ms-MY", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function toDateString(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function createBookingDate(date: Date, prefix?: string): BookingDate {
  const formattedDate = formatDate(date);
  const dateString = toDateString(date);

  return {
    value: dateString,
    label: prefix ? `${prefix} (${formattedDate})` : formattedDate,
    date: dateString,
  };
}

/**
 * Convert JavaScript's day format:
 *
 * JS:
 *   Sunday = 0
 *   Monday = 1
 *   ...
 *   Saturday = 6
 *
 * Database:
 *   Monday = 1
 *   ...
 *   Sunday = 7
 */
function getBookingDay(date: Date): number {
  const day = date.getDay();

  return day === 0 ? 7 : day;
}

export function generateBookingDates(settings: BookingSettings): BookingDate[] {
  if (!settings.booking_enabled) {
    return [];
  }

  const dates: BookingDate[] = [];
  const today = new Date();

  for (
    let offset = settings.min_days_ahead;
    offset <= settings.max_days_ahead;
    offset++
  ) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);

    const bookingDay = getBookingDay(date);

    if (!settings.allowed_days.includes(bookingDay)) {
      continue;
    }

    dates.push(createBookingDate(date, offset === 0 ? "Hari ini" : undefined));
  }

  return dates;
}
