export function formatBookingDate(date: Date) {
  return new Intl.DateTimeFormat("ms-MY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatBookingDay(date: Date) {
  return new Intl.DateTimeFormat("ms-MY", {
    weekday: "long",
  }).format(date);
}

export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTomorrowDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  return toDateString(date);
}

export function getMonday(): string {
  const date = new Date();
  const day = date.getDay();

  const diff = (8 - day) % 7 || 7;

  date.setDate(date.getDate() + diff);

  return toDateString(date);
}

export function getBookingDate(): string {
  return getTomorrowDate();
}

export function isAllowedBookingDate(date: string): boolean {
  return date === getTomorrowDate();
}

export function getTodayDisplay() {
  const today = new Date();

  return {
    day: formatBookingDay(today),
    date: formatBookingDate(today),
  };
}

export function getTomorrowDisplay() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return {
    date: toDateString(tomorrow),
    day: formatBookingDay(tomorrow),
  };
}
