export type BookingDate = {
  value: string;
  label: string;
  date: string;
};

export type BookingSettings = {
  booking_enabled: boolean;
  min_days_ahead: number;
  max_days_ahead: number;
  max_slots_per_user_per_day: number;
  allowed_days: number[];
};
