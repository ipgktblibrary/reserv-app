/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import RoomList from "./components/ListRoomCard";
import TimeSlotSelector from "./components/TimeSlotSelector";
import BookingForm, { BookingFormState } from "./components/BookingForm";
import { useRooms } from "@/features/hooks/useRooms";
import { ProjectType } from "@/features/misc/enums";
import { useLogout } from "@/features/hooks/useLogout";

import { reservationService } from "@/features/services/reservation.service";
import {
  getBookingDate,
  getTodayDisplay,
  getTomorrowDisplay,
} from "@/features/misc/booking-date";
import { getUser } from "@/lib/auth";
import { bookerService } from "@/features/services/booker.service";
import BookingSuccess from "./components/BookingSuccess";
import { useRouter } from "next/navigation";
import BookingFailed from "./components/BookingFailed";
import SlotLimitModal from "./components/SlotLimitModal";

export default function Page() {
  const { rooms } = useRooms();

  const router = useRouter();
  const logout = useLogout();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [bookingDate, setBookingDate] = useState(getBookingDate());

  useEffect(() => {
    if (!selectedRoomId) return;
    setSelectedSlots([]);
    setError(null);
  }, [selectedRoomId]);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  const tomorrow = getTomorrowDisplay();

  // GET NAME
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    const load = async () => {
      const user = await getUser();
      setName(user?.name ?? null);
    };

    load();
  }, []);

  const [slotLimitOpen, setSlotLimitOpen] = useState(false);

  function onToggleSlot(id: string) {
    setSelectedSlots((prev) => {
      const exists = prev.includes(id);

      if (exists) {
        return prev.filter((s) => s !== id);
      }

      if (prev.length >= 2) {
        setSlotLimitOpen(true);
        return prev;
      }
      return [...prev, id];
    });
  }

  const [form, setForm] = useState<BookingFormState>({
    participants: "",
    projectType: "",
    progressStatus: "",
  });

  function handleChange(patch: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function handleSubmit() {
    const user = await getUser();
    const roomId = selectedRoomId!;
    const slotIds = selectedSlots;

    if (!user) return;
    const booker = await bookerService.ensure(user.id, {
      name: name ?? "",
    });

    try {
      await reservationService.createReservation({
        roomId: roomId,
        slotIds: slotIds,
        bookerId: booker.id,
        userRole: user.role,
        fullName: name ?? "",
        projectType: form.projectType,
        projectProgress: form.progressStatus,
        participants: Number(form.participants),
        // bookingDate: getBookingDate(),
        bookingDate: bookingDate,
      });

      setStatus("success");
    } catch (err: any) {
      const message = err?.message || err?.error?.message;
      const isSlotLimitError =
        message?.includes("Daily booking limit exceeded") ||
        err?.code === "P0001";

      if (isSlotLimitError) {
        setSlotLimitOpen(true);
        return;
      }

      setStatus("error");
      console.error(err);
    }
  }

  function resetForm() {
    setForm({
      participants: "",
      projectType: "",
      progressStatus: "",
    });

    setSelectedSlots([]);
    setSelectedRoomId(null);
  }

  const today = getTodayDisplay();
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-purple-50/40 to-white px-4 py-6 sm:py-10 flex justify-center">
      <div className="w-full max-w-2xl">
        <SlotLimitModal
          open={slotLimitOpen}
          onClose={() => setSlotLimitOpen(false)}
        />

        <BookingSuccess
          open={status === "success"}
          onClose={() => {
            setStatus("idle");
            resetForm();
            router.push("/history");
          }}
        />

        <BookingFailed
          open={status === "error"}
          onClose={() => {
            setStatus("idle");
            resetForm();
          }}
        />

        {/* Top info bar */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-purple-100 bg-white px-4 py-3 text-xs text-gray-600 shadow-sm">
          <div className="font-medium">Ada masalah atau perlukan bantuan?</div>

          <a
            href="https://wa.me/601127374120"
            target="_blank"
            className="text-[#6844C7] font-semibold hover:underline"
          >
            Hubungi kami
          </a>
        </div>

        {/* Header */}
        <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/library-hero.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Purple Tint */}
          <div className="absolute inset-0 bg-linear-to-r from-[#6844C7]/60 via-[#6844C7]/20 to-transparent" />

          <div className="relative flex items-start justify-between gap-4 p-6">
            {/* Left */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Sistem Tempahan Perpustakaan Za’ba
              </h1>

              <p className="mt-2 text-sm text-white/80">
                Selamat datang,{" "}
                <span className="font-semibold text-white">
                  {name?.toUpperCase()}
                </span>
              </p>
            </div>

            {/* Right Badge */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Aktif
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 w-full border-b border-purple-100">
          <nav className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              type="button"
              className="border-[#6844C7] text-[#6844C7] whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-semibold tracking-tight"
            >
              Tempahan Saya
            </button>

            <button
              type="button"
              onClick={() => router.push("/history")}
              className="border-transparent text-gray-400 hover:text-[#6844C7] whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition"
            >
              Sejarah
            </button>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="border-transparent text-gray-400 hover:text-red-500 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition"
            >
              Log Keluar
            </button>
          </nav>
        </div>

        {/* Logout modal */}
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-purple-100">
              <h2 className="text-base font-semibold text-gray-900">
                Log keluar?
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Anda akan keluar dari akaun ini pada peranti ini.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  onClick={async () => {
                    setConfirmOpen(false);
                    await logout();
                  }}
                  className="flex-1 rounded-xl bg-[#6844C7] py-2 text-sm font-medium text-white hover:bg-purple-500"
                >
                  Log keluar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Room list */}
        <div className="rounded-2xl bg-white border border-purple-100 shadow-sm p-4">
          <RoomList
            selectedRoomId={selectedRoomId}
            onSelect={setSelectedRoomId}
          />
        </div>

        <div className="mb-8 mt-10">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Pilih Tarikh Tempahan
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Anda boleh membuat tempahan untuk hari ini atau esok.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setBookingDate(new Date().toISOString().split("T")[0])
              }
              className={`rounded-2xl border p-4 text-left transition ${
                bookingDate === new Date().toISOString().split("T")[0]
                  ? "border-[#6844C7] bg-purple-50"
                  : "border-gray-200 hover:border-[#6844C7]"
              }`}
            >
              <p className="font-semibold text-gray-900">Hari Ini</p>

              <p className="mt-1 text-sm text-gray-500">
                {today.day}, {today.date}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setBookingDate(getBookingDate())}
              className={`rounded-2xl border p-4 text-left transition ${
                bookingDate === getBookingDate()
                  ? "border-[#6844C7] bg-purple-50"
                  : "border-gray-200 hover:border-[#6844C7]"
              }`}
            >
              <p className="font-semibold text-gray-900">Esok</p>

              <p className="mt-1 text-sm text-gray-500">
                {tomorrow.day}, {tomorrow.date}
              </p>
            </button>
          </div>
        </div>

        {/* Time slot */}
        <div className="mb-8 mt-10">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Pilih Masa
          </h1>
          {/* <p className="mt-1 text-sm text-gray-500">
            Anda boleh pilih sehingga 2 slot masa
          </p> */}
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="text-sm font-semibold text-blue-900">Maklumat</h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-800">
              <li>
                • Anda boleh memilih sehingga <strong>2 slot masa</strong>.
              </li>
              <li>
                • Slot berwarna{" "}
                <span className="font-semibold text-red-600">merah</span> telah
                ditempah dan tidak boleh dipilih.
              </li>
              <li>• Sila pilih slot lain yang masih tersedia.</li>
            </ul>
          </div>
        </div>

        {selectedRoomId && (
          <div className="rounded-2xl bg-white border border-purple-100 shadow-sm p-4">
            {/* <TimeSlotSelector
              roomId={selectedRoomId}
              selectedSlots={selectedSlots}
              onToggleSlot={onToggleSlot}
            /> */}

            <TimeSlotSelector
              roomId={selectedRoomId}
              bookingDate={bookingDate}
              selectedSlots={selectedSlots}
              onToggleSlot={onToggleSlot}
            />
          </div>
        )}

        {/* Confirm section */}
        <div className="mb-8 mt-10">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Sahkan Tempahan
          </h1>

          {/* <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-purple-100 bg-purple-50 px-3 py-2 text-sm text-gray-700">
            <span className="h-2 w-2 rounded-full bg-[#6844C7]" />
            Tempahan untuk:
            <span className="font-semibold text-gray-900">
              {tomorrow.day}, {tomorrow.date}
            </span>
          </div> */}

          <div className="mt-3 rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm text-gray-600">
            Sila semak semula slot masa sebelum membuat tempahan.
          </div>
        </div>

        {/* Form */}
        {selectedRoomId && selectedSlots.length > 0 && (
          <div className="rounded-2xl bg-white border border-purple-100 shadow-sm p-4">
            <BookingForm
              form={form}
              capacity={selectedRoom?.capacity ?? 0}
              projectTypes={Object.values(ProjectType)}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-purple-100 text-xs text-gray-500 text-center space-y-2">
          <div className="text-gray-400">Built with ❤️</div>

          <a
            href="https://instagram.com/raufsemi"
            target="_blank"
            className="text-[#6844C7] hover:underline font-medium"
          >
            @raufsemi
          </a>

          <a> | </a>

          <a
            href="https://instagram.com/faizlatiff__"
            target="_blank"
            className="text-[#6844C7] hover:underline font-medium"
          >
            @faizlatiff__
          </a>
        </div>
      </div>
    </div>
  );
}
