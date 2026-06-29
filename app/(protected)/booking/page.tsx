"use client";

import { useEffect, useState } from "react";
import RoomList from "./components/ListRoomCard";
import TimeSlotSelector from "./components/TimeSlotSelector";
import BookingForm, { BookingFormState } from "./components/BookingForm";
import { useRooms } from "@/features/hooks/useRooms";
import { ProgressStatus, ProjectType } from "@/features/misc/enums";
import { useLogout } from "@/features/hooks/useLogout";

import { reservationService } from "@/features/services/reservation.service";
import { getBookingDate, getTomorrowDate } from "@/features/misc/booking-date";
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

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  // function onToggleSlot(id: string) {
  //   setSelectedSlots((prev) => {
  //     const exists = prev.includes(id);
  //     if (exists) return prev.filter((s) => s !== id);
  //     if (prev.length >= 2) return prev;
  //     return [...prev, id];
  //   });
  // }

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
    const booker = await bookerService.ensure(user.id);

    try {
      const result = await reservationService.createReservation({
        roomId: roomId,
        slotIds: slotIds,
        bookerId: booker.id,
        userRole: user.role,
        fullName: name ?? "",
        projectType: form.projectType,
        projectProgress: form.progressStatus,
        participants: Number(form.participants),
        bookingDate: getBookingDate(),
      });

      setStatus("success");
      console.log("RESULT", result);
    } catch (err) {
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

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-6 sm:py-10 flex justify-center">
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
        <div className="mb-6 flex items-center justify-between rounded-xl border border-neutral-200/60 bg-white px-4 py-3 text-xs text-neutral-500 shadow-sm">
          <div>Built with care ❤️ by Rauf & Faiz</div>

          <a
            href="https://instagram.com/raufsemi"
            target="_blank"
            className="text-[#6844C7] font-medium hover:underline"
          >
            Need help? Contact me here
          </a>
        </div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            My Bookings
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Name: {name?.toUpperCase()}
          </p>
        </div>

        <div className="mb-8 w-full border-b border-neutral-200">
          <nav
            className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth"
            aria-label="Tabs"
          >
            <button
              type="button"
              className="border-neutral-900 text-neutral-900 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-semibold tracking-tight transition-all duration-200"
            >
              My Bookings
            </button>

            <button
              type="button"
              onClick={() => router.push("/history")}
              className="border-transparent text-neutral-400 hover:border-neutral-300 hover:text-neutral-600 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition-all duration-200"
            >
              History
            </button>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="border-transparent text-neutral-400 hover:border-neutral-300 hover:text-neutral-600 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition-all duration-200"
            >
              Log Out
            </button>
            {confirmOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                  <h2 className="text-base font-semibold text-neutral-900">
                    Confirm logout
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    You’ll be signed out of your account on this device.
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setConfirmOpen(false)}
                      className="flex-1 rounded-xl border border-neutral-200 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={async () => {
                        setConfirmOpen(false);
                        await logout();
                      }}
                      className="flex-1 rounded-xl bg-black py-2 text-sm font-medium text-white hover:bg-neutral-800"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
        <RoomList
          selectedRoomId={selectedRoomId}
          onSelect={setSelectedRoomId}
        />

        <div className="mb-8 mt-8">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Choose Your Time Slot
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            You can select up to 2 time slots per booking
          </p>
        </div>

        {selectedRoomId && (
          <TimeSlotSelector
            roomId={selectedRoomId}
            selectedSlots={selectedSlots}
            onToggleSlot={onToggleSlot}
          />
        )}
        <div className="mb-8 mt-8">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Confirm Your Booking
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Your booking is set for{" "}
            <span className="font-medium text-neutral-700">
              {getTomorrowDate()}
            </span>
          </p>

          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
            ⚠️ Bookings are made for the next day only. Please double-check your
            time slot before confirming.
          </div>
        </div>
        {selectedRoomId && selectedSlots.length > 0 && (
          <BookingForm
            form={form}
            capacity={selectedRoom?.capacity ?? 0}
            projectTypes={Object.values(ProjectType)}
            progressStatuses={Object.values(ProgressStatus)}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
        {/* <div className="mt-12 pt-6 border-t border-neutral-200/60 flex flex-col gap-1 text-xs text-neutral-400 font-mono">
          <div>Selected Room: {selectedRoomId ?? "none"}</div>
          <div>Selected Time Slots: {[selectedSlots]}</div>
        </div> */}

        <div className="mt-12 pt-6 border-t border-neutral-200/60 text-xs text-neutral-400">
          <div>Built with care ❤️ </div>
          <a
            href="https://instagram.com/raufsemi"
            target="_blank"
            className="text-[#6844C7] hover:underline"
          >
            Need help? Contact me on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
