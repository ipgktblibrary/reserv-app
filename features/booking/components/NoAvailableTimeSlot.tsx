export function NoAvailableTimeSlot() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
        <svg
          className="h-7 w-7 text-neutral-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10m-12 9h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
          />
        </svg>
      </div>

      <h3 className="text-sm font-medium text-neutral-900">
        Tiada Tempahan Tersedia
      </h3>

      <p className="mt-1 max-w-sm text-xs text-neutral-500">
        Tempahan tidak boleh dibuat pada hari Sabtu dan Ahad.
      </p>
    </div>
  );
}
