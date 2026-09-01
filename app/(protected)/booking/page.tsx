import BookingClient from "@/features/booking/components/BookingClient";
import BookingHeader from "@/features/booking/components/BookingHeader";
import BookingTabs from "@/features/booking/components/BookingTabs";
import { PublicFooter } from "@/features/shared/PublicFooter";
import { createClient } from "@/lib/supabase/server";

export default async function BookingPage() {
  const supabase = await createClient();
  const { data: bookingSettings, error } = await supabase
    .from("booking_settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    throw new Error(`Failed to load booking settings: ${error.message}`);
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-purple-50/40 to-white px-4 py-6 sm:py-10 flex justify-center">
      <div className="w-full max-w-2xl">
        <BookingHeader />
        <BookingTabs />
        <BookingClient bookingSettings={bookingSettings} />
        <PublicFooter />
      </div>
    </div>
  );
}
