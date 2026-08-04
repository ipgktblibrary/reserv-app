import BookingClient from "@/features/booking/components/BookingClient";
import BookingHeader from "@/features/booking/components/BookingHeader";
import BookingTabs from "@/features/booking/components/BookingTabs";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-purple-50/40 to-white px-4 py-6 sm:py-10 flex justify-center">
      <div className="w-full max-w-2xl">
        <BookingHeader />
        <BookingTabs />
        <BookingClient />
      </div>
    </div>
  );
}
