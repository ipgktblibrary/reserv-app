// components/BookingSuccess.tsx
type Props = {
  open: boolean;
  onClose?: () => void;
};

export default function BookingSuccess({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
          ✓
        </div>

        <h2 className="text-base font-semibold text-neutral-900">
          Booking Successful
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Your reservation has been confirmed.
        </p>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-black py-2 text-sm text-white"
        >
          OK
        </button>
      </div>
    </div>
  );
}
