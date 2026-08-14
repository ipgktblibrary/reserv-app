export type BookingDate = {
  value: string;
  label: string;
  date: string;
};

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
  return {
    value: toDateString(date),
    label: prefix ? `${prefix} (${formattedDate})` : formattedDate,
    date: toDateString(date),
  };
}

/**
 * Booking rule:
 *
 * Monday - Thursday:
 *   Today until Friday
 *
 * Friday:
 *   Next Monday until next Friday
 *
 * Saturday/Sunday:
 *   No booking
 */
export function generateWeeklyBookingDates(): BookingDate[] {
  const today = new Date();
  const day = today.getDay();

  // Sunday
  if (day === 0) {
    return [];
  }

  // Saturday
  if (day === 6) {
    return [];
  }

  // Friday
  if (day === 5) {
    const dates: BookingDate[] = [];

    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 3);

    for (let i = 0; i < 5; i++) {
      const date = new Date(nextMonday);
      date.setDate(nextMonday.getDate() + i);

      dates.push(createBookingDate(date));
    }

    return dates;
  }

  // Monday - Thursday
  const dates: BookingDate[] = [];
  const remainingDays = 5 - day;
  for (let i = 0; i <= remainingDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(createBookingDate(date));
  }
  return dates;
}

export function generateTodayTomorrowBookingDates(): BookingDate[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return [
    createBookingDate(today, "Hari ini"),
    createBookingDate(tomorrow, "Esok"),
  ];
}

export function generateBookingDates(): BookingDate[] {
  const today = new Date();
  const day = today.getDay();

  // Friday, Saturday, Sunday
  if (day === 5 || day === 6 || day === 0) {
    const monday = new Date(today);

    const daysUntilMonday = day === 5 ? 3 : day === 6 ? 2 : 1;

    monday.setDate(today.getDate() + daysUntilMonday);

    return [createBookingDate(today, "Hari ini"), createBookingDate(monday)];
  }

  // Monday - Thursday
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return [
    createBookingDate(today, "Hari ini"),
    createBookingDate(tomorrow, "Esok"),
  ];
}
