export type ReservationStatus = "confirmed" | "cancelled";
export type UserRole = "Student" | "Teacher";

export interface Reservation {
  id: string;
  room_id: string;
  slot_id: string;
  booking_date: string;
  phone_number: string;
  full_name: string;
  user_role: UserRole;
  capacity: number;
  project: string | null;
  student_class: string | null; 
  status: ReservationStatus;
  created_at: string | null;
}