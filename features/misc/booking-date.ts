export function getTomorrowDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}

export function getBookingDate(): string {
  return getTomorrowDate();
}

export function isAllowedBookingDate(date: string): boolean {
  return date === getTomorrowDate();
}
