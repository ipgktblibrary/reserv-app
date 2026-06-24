export interface Room {
  id: string;
  name: string;
  teacher_only: boolean | null;
  created_at: string | null;
  capacity: number;
  label: string | null;
}