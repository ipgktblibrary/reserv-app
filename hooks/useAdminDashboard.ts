/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import {
  getAllReservations,
  adminDeleteReservation,
  adminTruncateAllReservations,
  getRooms,
  updateRoomCapacity,
  blockTimeSlot,
  unblockTimeSlot,
  verifyAdminPasscode,
  getEffectiveSlots,
} from "../services/adminService";

//TYPES
import { Room } from "../types/room";
import { Reservation } from "../types/reservation";
import { RoomTimeSlot } from "../types/roomTimeSlot";

export function useAdminDashboard(initialRoomId?: string) {
  // --- STATE MANAGEMENT ---
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState<boolean>(false); 
  
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(initialRoomId);
  
  const [rooms, setRooms] = useState<Room[]>([]);
  const [timeSlots, setTimeSlots] = useState<RoomTimeSlot[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  

  // --- HYDRATION LIFECYCLE CONTROLLER ---
  useEffect(() => {
    const savedSession = localStorage.getItem("system_admin_session");
    if (savedSession === "active") {
      setIsAdmin(true);
    }
    setIsHydrated(true); 
  }, []);

  // --- AUTHENTICATION ENGINE ---
const verifyPasscode = async (code: string) => {
  setLoading(true);
  setError(null);
  try {
    const isMatched = await verifyAdminPasscode(code);
    if (isMatched) {
      setIsAdmin(true);
      localStorage.setItem("system_admin_session", "active");
    } else {
      setError("Invalid administrative passcode.");
    }
  } catch {
    setError("Authentication service fault.");
  } finally {
    setLoading(false);
  }
};

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("system_admin_session");
    setReservations([]);
    setRooms([]);
    setTimeSlots([]);
  };

  // --- READ ACTIONS ---
  const fetchReservations = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const data = await getAllReservations();
      console.log("reservations",data);
      setReservations(data || []);
    } catch  {
      setError("Failed to fetch reservations");
    }
  }, [isAdmin]);

  const fetchRooms = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const data = await getRooms();
      setRooms(data || []);
      if (!selectedRoomId && data && data.length > 0) {
        setSelectedRoomId(data[0].id);
        console.log("ROOM",data)
      }
    } catch {
      setError( "Failed to fetch rooms");
    }
  }, [selectedRoomId, isAdmin]);


const fetchTimeSlots = useCallback(async () => {
  if (!selectedRoomId || !isAdmin) return;

  try {
  
    const data = await getEffectiveSlots(selectedRoomId, new Date("2026-06-18"));

    setTimeSlots(data || []);

    console.log("LOCAL:", new Date());
console.log("ISO:", new Date().toISOString());
console.log("DAY:", new Date().getDay());
  } catch {
    setError("Failed to fetch time slots");
  }
}, [selectedRoomId, isAdmin]);




  const refreshDashboard = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    setError(null);
    await Promise.all([fetchReservations(), fetchRooms(), fetchTimeSlots()]);
    setLoading(false);
  }, [fetchReservations, fetchRooms, fetchTimeSlots, isAdmin]);

  useEffect(() => {
    if (selectedRoomId && isAdmin) {
      fetchTimeSlots();
    }
  }, [selectedRoomId, fetchTimeSlots, isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      refreshDashboard();
    }
  }, [isAdmin, refreshDashboard]);

  // --- MUTATION ACTIONS ---
  const deleteReservation = async (id: string) => {
    setError(null);
    try {
      await adminDeleteReservation(id);
      setReservations((prev) => prev.filter((res) => res.id !== id));
    } catch {
      setError("Failed to delete reservation");
      
    }
  };

  const purgeAllReservations = async () => {
    if (!window.confirm("NUCLEAR OPTION: Are you absolutely sure you want to delete ALL reservations?")) return;
    setError(null);
    try {
      await adminTruncateAllReservations();
      setReservations([]);
    } catch {
      setError("Failed to clear reservation ledger");
    }
  };


  const modifyRoomCapacity = async (roomId: string, capacity: number) => {
    setError(null);
    try {
      await updateRoomCapacity(roomId, capacity);
      setRooms((prev) =>
        prev.map((room) => (room.id === roomId ? { ...room, capacity } : room))
      );
    } catch{
      setError("Failed to update room capacity");
      
    }
  };

  const toggleBlockSlot = async (slotId: string, currentlyBlocked: boolean, reason?: string) => {
    setError(null);
    try {
      if (currentlyBlocked) {
        await unblockTimeSlot(slotId);
        setTimeSlots((prev) =>
          prev.map((slot) =>
            slot.id === slotId ? { ...slot, is_blocked: false, blocked_reason: null } : slot
          )
        );
      } else {
        await blockTimeSlot(slotId, reason);
        setTimeSlots((prev) =>
          prev.map((slot) =>
            slot.id === slotId
              ? { ...slot, is_blocked: true, blocked_reason: reason || "Blocked by Administrator" }
              : slot
          )
        );
      }
    } catch {
      setError("Failed to alter slot blocking status");
    }
  };

  return {
    isAdmin,             
    isHydrated, 
    reservations,
    rooms,
    timeSlots,
    selectedRoomId,
    loading,
    error,

    setSelectedRoomId,
    setError,
    verifyPasscode,      
    adminLogout,         
    refreshDashboard,
    deleteReservation,
    purgeAllReservations,
    modifyRoomCapacity,
    toggleBlockSlot,
  };
}