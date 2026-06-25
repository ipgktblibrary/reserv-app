import { useEffect, useState } from "react";
import { Room, roomService } from "../services/room.service";

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRooms() {
      try {
        setLoading(true);
        const data = await roomService.getRooms();
        setRooms(data);
      } catch (error) {
        console.error("loadRooms error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadRooms();
  }, []);

  return {
    rooms,
    loading,
  };
}
