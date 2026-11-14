"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

// Native <dialog> gives focus trapping, Escape to close and a backdrop for free.
export default function Modal({
  open,
  onClose,
  labelledBy,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      // React's autoFocus fires before showModal, so focus the marked field ourselves.
      d.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={`m-auto max-h-[92vh] w-[calc(100%-2rem)] overflow-y-auto rounded-3xl bg-paper p-0 shadow-2xl ${
        wide ? "max-w-4xl" : "max-w-2xl"
      }`}
    >
      <div className="relative">
        {children}
        {/* After the content so opening focuses the first field, not this button. */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-forest shadow transition-transform hover:rotate-90"
        >
          <X size={18} />
        </button>
      </div>
    </dialog>
  );
}
