/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBookingsByPhone, deleteBooking, BookingPayload, createBooking } from "@/services/bookingService";
import { useState, useEffect } from "react";

export function useBookingSession() {
  const [phone, setPhone] = useState<string | null>(null);
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Load session string from storage on client mount
  useEffect(() => {
    const savedPhone = localStorage.getItem("user_phone");
    if (savedPhone) setPhone(savedPhone);
  }, []);

  // Fetch list updates immediately when user identification changes
  useEffect(() => {
    if (!phone) return;

    async function loadData() {
      setLoadingBookings(true);
      try {
        const data = await getBookingsByPhone(phone!);
        setMyBookings(data);
      } catch (err: any) {
        alert("Error loading your slots: " + err.message);
      } finally {
        setLoadingBookings(false);
      }
    }
    loadData();
  }, [phone]);

  const login = (phoneNumber: string) => {
    const cleanPhone = phoneNumber.trim();
    if (!cleanPhone) return;
    localStorage.setItem("user_phone", cleanPhone);
    setPhone(cleanPhone);
  };

  const logout = () => {
    localStorage.removeItem("user_phone");
    setPhone(null);
    setMyBookings([]);
  };

  const handleCancel = async (bookingId: number) => {
    if (!phone || !confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await deleteBooking(bookingId, phone);
      setMyBookings((prev) => prev.filter((b) => b.id !== bookingId));
      alert("Booking successfully cancelled.");
    } catch (err: any) {
      alert("Failed to cancel: " + err.message);
    }
  };

  const handleAddBooking = async (bookingDetails: Omit<BookingPayload, "phone_number">) => {
    if (!phone) return;

    try {
      const payload: BookingPayload = { ...bookingDetails, phone_number: phone };
      const data = await createBooking(payload);
      setMyBookings((prev) => [...prev, ...data]);
      alert("Reservation successful!");
      return true;
    } catch (err: any) {
      alert("Booking failed: " + err.message);
      return false;
    }
  };

  return {
    phone,
    myBookings,
    loadingBookings,
    login,
    logout,
    handleCancel,
    handleAddBooking,
  };
}