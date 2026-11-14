"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Modal from "./Modal";
import QuoteForm, { type QuotePrefill } from "./QuoteForm";
import SearchPalette from "./SearchPalette";
import LeadPopup from "./LeadPopup";
import { btn, type ButtonVariant } from "./styles";

type Site = {
  openQuote: (prefill?: QuotePrefill) => void;
  openSearch: () => void;
  notify: (message: string) => void;
};

const SiteContext = createContext<Site>({ openQuote: () => {}, openSearch: () => {}, notify: () => {} });

export const useSite = () => useContext(SiteContext);

// Holds the site-wide popups: the quote form, page search, lead offer and toasts.
export default function SiteProvider({ children }: { children: React.ReactNode }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [prefill, setPrefill] = useState<QuotePrefill>({});
  const [quoteKey, setQuoteKey] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKey, setSearchKey] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const openQuote = useCallback((p: QuotePrefill = {}) => {
    setPrefill(p);
    setQuoteKey((k) => k + 1);
    setQuoteOpen(true);
  }, []);

  const openSearch = useCallback(() => {
    setSearchKey((k) => k + 1);
    setSearchOpen(true);
  }, []);

  const notify = useCallback((message: string) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 6000);
  }, []);

  return (
    <SiteContext.Provider value={{ openQuote, openSearch, notify }}>
      {children}

      <Modal open={quoteOpen} onClose={() => setQuoteOpen(false)} labelledBy="quote-title">
        <div className="bg-gradient-to-br from-forest to-moss px-6 pb-8 pt-10 text-white sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Request a quote</p>
          <h2 id="quote-title" className="mt-2 font-display text-3xl font-semibold">
            Tell us about your product
          </h2>
          <p className="mt-2 text-sm text-white/75">We reply within one business day with pricing, minimums and lead times.</p>
        </div>
        <div className="p-6 sm:p-10">
          <QuoteForm
            key={quoteKey}
            prefill={prefill}
            source="quote-popup"
            onSuccess={() => {
              setQuoteOpen(false);
              notify("Thanks! Your request is in. We'll reply within one business day.");
            }}
          />
        </div>
      </Modal>

      <SearchPalette key={searchKey} open={searchOpen} onClose={() => setSearchOpen(false)} onOpen={openSearch} />
      <LeadPopup />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {toast && (
          <div className="toast pointer-events-auto flex items-center gap-3 rounded-2xl bg-forest px-5 py-4 text-sm font-medium text-white shadow-2xl">
            <CheckCircle2 className="shrink-0 text-lime" size={20} aria-hidden="true" />
            {toast}
          </div>
        )}
      </div>
    </SiteContext.Provider>
  );
}

export function QuoteButton({
  children,
  prefill,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  prefill?: QuotePrefill;
  variant?: ButtonVariant;
  className?: string;
}) {
  const { openQuote } = useSite();
  return (
    <button type="button" onClick={() => openQuote(prefill)} className={`${btn(variant)} ${className}`}>
      {children}
    </button>
  );
}
