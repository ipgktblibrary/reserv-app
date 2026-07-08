/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose?: () => void;
};

export default function SlotLimitModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          !
        </div>

        <h2 className="text-base font-semibold text-neutral-900">
          Slot Maksimum
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Anda hanya boleh memilih 2 slot masa sahaja setiap hari
        </p>

        <button
          onClick={() => onClose?.()}
          className="mt-5 w-full rounded-xl bg-[#6844C7] py-2 text-sm text-white"
        >
          OK
        </button>
      </div>
    </div>,
    document.body,
  );
}
