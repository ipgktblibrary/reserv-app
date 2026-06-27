export function getTomorrowDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}

export function getMonday(): string {
  const date = new Date();
  const day = date.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const diff = (8 - day) % 7 || 7; // always go to next Monday
  date.setDate(date.getDate() + diff);
  return date.toISOString().split("T")[0];
}
export function getBookingDate(): string {
  return getTomorrowDate();
}

export function isAllowedBookingDate(date: string): boolean {
  return date === getTomorrowDate();
}
