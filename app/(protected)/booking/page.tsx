"use client";

import { useState } from "react";
import RoomList from "./components/ListRoomCard";
import TimeSlotSelector from "./components/TimeSlotSelector";
import BookingForm, { BookingFormState } from "./components/BookingForm";
import { useRooms } from "@/features/hooks/useRooms";
import { ProgressStatus, ProjectType } from "@/features/misc/enums";
import { useLogout } from "@/features/hooks/useLogout";

import { reservationService } from "@/features/services/reservation.service";
import { getBookingDate } from "@/features/misc/booking-date";
import { getUser } from "@/lib/auth";
import { bookerService } from "@/features/services/booker.service";
import BookingSuccess from "./components/BookingSuccess";
import { useRouter } from "next/navigation";

export default function Page() {
  const { rooms } = useRooms();

  const router = useRouter();
  const logout = useLogout();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  function onToggleSlot(id: string) {
    setSelectedSlots((prev) => {
      const exists = prev.includes(id);
      if (exists) return prev.filter((s) => s !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }

  const [form, setForm] = useState<BookingFormState>({
    fullName: "",
    participants: "",
    projectType: "",
    progressStatus: "",
  });

  function handleChange(patch: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...patch }));

    console.log("ROOM ID : ", selectedRoomId!);
  }

  async function handleSubmit() {
    console.log("SUBMIT CLICKED");
    const user = await getUser();
    console.log(user);
    alert(JSON.stringify(user));

    if (!user) return;

    const booker = await bookerService.ensure(user.id, {
      name: user.name,
    });

    console.log("ROLE", user.role);
    console.log("SELECTED SLOT", selectedSlots);
    try {
      await reservationService.createReservation({
        fullName: form.fullName,
        participants: Number(form.participants),
        projectType: form.projectType,
        roomId: selectedRoomId!, //ROOM ID
        slotIds: selectedSlots, //LIST OF SLOT ID
        bookingDate: getBookingDate(), //GET TOMOROW DATE BOOKING
        userRole: user.role,
        bookerId: booker.id,
      });

      setSuccess(true);
      // optional: success UX

      console.log("Booking created");
    } catch (err) {
      console.error(err);

      // show toast/modal
    }
  }

  function resetForm() {
    setForm({
      fullName: "",
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
        <BookingSuccess
          open={success}
          onClose={() => {
            setSuccess(false);
            resetForm();
            setTimeout(() => {
              router.replace("/history");
            }, 600);
          }}
        />{" "}
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            My Bookings
          </h1>
          <p className="mt-1 text-sm text-neutral-500">Booker ID: {}</p>
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
              onClick={() => router.replace("/history")}
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
            Select Time Slots
          </h1>
          <p className="mt-1 text-sm text-neutral-500">Max Two Slots</p>
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
            Booking Form
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Booking for Tomorrow [FULL DATE] [DAY]
          </p>
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
        <div className="mt-12 pt-6 border-t border-neutral-200/60 flex flex-col gap-1 text-xs text-neutral-400 font-mono">
          <div>Selected Room: {selectedRoomId ?? "none"}</div>
          <div>Selected Time Slots: {[selectedSlots]}</div>
        </div>
      </div>
    </div>
  );
}
