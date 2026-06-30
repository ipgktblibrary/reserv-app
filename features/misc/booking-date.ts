export function getTomorrowDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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

export function getTomorrowDisplay(): { date: string; day: string } {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return {
    date: date.toISOString().split("T")[0],
    day: dayNames[date.getDay()],
  };
}
