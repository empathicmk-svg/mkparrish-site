"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import Modal from "./Modal";
import QuoteForm from "./QuoteForm";
import { useSite } from "./SiteProvider";

const STORAGE_KEY = "nv-lead-popup-seen";
const QUIET_DAYS = 14;
const DELAY_MS = 30000;

// Offers a free formula review once per visitor every two weeks: after 30
// seconds on the site, or when the pointer leaves the window on desktop.
// Never shown on the quote pages, or over another popup.
export default function LeadPopup() {
  const pathname = usePathname();
  const { notify } = useSite();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/contact") || pathname.startsWith("/start")) return;
    try {
      const seen = Number(localStorage.getItem(STORAGE_KEY));
      if (seen && Date.now() - seen < QUIET_DAYS * 864e5) return;
    } catch {
      // Storage blocked: fall through and show it once this page view.
    }

    function show() {
      cleanup();
      if (document.querySelector("dialog[open]")) return;
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {}
      setOpen(true);
    }
    function onLeave(e: MouseEvent) {
      if (!e.relatedTarget && e.clientY <= 0) show();
    }
    const timer = setTimeout(show, DELAY_MS);
    document.addEventListener("mouseout", onLeave);
    function cleanup() {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    }
    return cleanup;
  }, [pathname]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} labelledBy="lead-title" wide>
      <div className="grid md:grid-cols-[1fr_1.3fr]">
        <div className="relative isolate overflow-hidden bg-forest p-8 text-white sm:p-10">
          <div aria-hidden="true" className="absolute -bottom-16 -right-16 -z-10 h-56 w-56 rounded-full bg-lime/20" />
          <Sparkles className="text-lime" size={28} aria-hidden="true" />
          <h2 id="lead-title" className="mt-4 font-display text-3xl font-semibold leading-tight">
            Get a free formula review
          </h2>
          <p className="mt-3 text-white/75">
            Tell us what you want to make. Our team will look at your idea or formula and suggest the best format,
            ingredients and next steps, at no cost.
          </p>
        </div>
        <div className="p-6 sm:p-10">
          <QuoteForm
            variant="short"
            source="popup"
            onSuccess={() => {
              setOpen(false);
              notify("Thanks! We'll be in touch about your free formula review.");
            }}
          />
          <button type="button" onClick={() => setOpen(false)} className="mt-4 text-sm text-stone underline">
            No thanks
          </button>
        </div>
      </div>
    </Modal>
  );
}
