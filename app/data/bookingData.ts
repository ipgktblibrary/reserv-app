export interface Room {
  id: string;
  name: string;
  label: string;
  capacity: string;
  teacherOnly?: boolean;
}

export interface TimeSlot {
  id: string;
  display: string;
  value: string;
}

export const ROOMS: Room[] = [
  { id: 'A', name: 'Bilik  Interaksi', label: 'Bilik  Interaksi', capacity: '20 Pax',teacherOnly: true },
  { id: 'B', name: 'Bilik  Serbaguna', label: 'Bilik  Serbaguna', capacity: '20 Pax' ,teacherOnly: true},
  { id: 'H', name: 'Bilik  Pemikiran Kreatif', label: 'Bilik  Pemikiran Kreatif', capacity: '20 Pax' ,teacherOnly: true},
  { id: 'C', name: 'Bilik  Perbincangan 1', label: 'Bilik  Perbincangan 1', capacity: '4 Pax' },
  { id: 'D', name: 'Bilik  Perbincangan 2', label: 'Bilik  Perbincangan 2', capacity: '4 Pax' },
  { id: 'E', name: 'Bilik  Perbincangan 3', label: 'Bilik  Perbincangan 3', capacity: '8 Pax' },
  { id: 'F', name: 'Bilik  Perbincangan 4', label: 'Bilik  Perbincangan 4', capacity: '10 Pax' },
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'slot1', display: '8:30AM - 10:00AM', value: '8:30 AM - 10:00 AM' },
  { id: 'slot2', display: '10:30AM - 12:30PM', value: '10:30 AM - 12:30 PM' },
  { id: 'slot3', display: '1:00PM - 2:00PM', value: '1:00 PM - 2:00 PM' },
  { id: 'slot4', display: '2:30PM - 4:00PM', value: '2:30 PM - 4:30 PM' },
];