import { FaWhatsapp } from "react-icons/fa6";

export function BookingTopInfoBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-purple-100 bg-white p-4 text-sm text-gray-600 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="font-medium">Ada pertanyaan? Hubungi</p>
      <a
        href="https://wa.me/60195426768"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#6844C7] hover:underline"
      >
        <FaWhatsapp className="text-[#25D366]" size={20} />
        <span>Puan Diana</span>
      </a>
    </div>
  );
}
