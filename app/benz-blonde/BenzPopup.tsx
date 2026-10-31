"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BENZ } from "./data";

const STORAGE_KEY = "bb_capture_v1";
const DISMISS_DAYS = 7;

/**
 * The offer. No PDF, no "check your inbox" — the list appears on screen the
 * second they submit. Instant delivery is the whole reason this converts, and it
 * also means there is no asset to keep in sync.
 */
export const QUESTIONS = [
  "What is the out-the-door number, not the monthly payment?",
  "What is the money factor, and what does it work out to as an APR?",
  "What is the residual, and what percentage of MSRP is that?",
  "What is the acquisition fee and is it in the payment or due at signing?",
  "What is the actual selling price before any rebate is applied?",
  "Which rebates am I getting, and do I qualify for all of them?",
  "What is my trade being valued at, and what would you sell it for?",
  "What is due at signing — first payment, taxes, fees, all of it?",
  "If I walk out today, what changes about this deal on the first of next month?",
];

// Deal pages are not the place to interrupt someone who is already converting.
const SUPPRESSED = ["/benz-blonde/book", "/benz-blonde/trade", "/benz-blonde/lease-end"];

function suppressed(pathname: string) {
  if (SUPPRESSED.some((p) => pathname.startsWith(p))) return true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;
    const status = JSON.parse(saved) as { expiresAt?: number; submitted?: boolean };
    if (status.submitted) return true;
    return Boolean(status.expiresAt && status.expiresAt > Date.now());
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return false;
  }
}

function remember(status: "dismissed" | "submitted") {
  const days = status === "submitted" ? 365 : DISMISS_DAYS;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status, submitted: status === "submitted", expiresAt: Date.now() + days * 864e5 }),
    );
  } catch {
    /* Private browsing — the popup simply shows again next visit. */
  }
}

export default function BenzPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || suppressed(pathname)) return;

    let opened = false;
    const open = () => {
      if (opened || suppressed(pathname)) return;
      opened = true;
      setVisible(true);
    };

    const timer = window.setTimeout(open, 18000);

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if ((window.scrollY / scrollable) * 100 >= 50) open();
    };

    // Exit intent, desktop only — on a phone there is no cursor to leave with.
    const onMouseOut = (e: MouseEvent) => {
      if (window.innerWidth < 900) return;
      if (e.clientY <= 0) open();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  function dismiss() {
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
      remember("dismissed");
    }, 320);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/benz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          website,
          intent: "guide",
          source: `popup:${pathname}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "failed");
      setSubmitted(true);
      remember("submitted");
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "failed"
          ? err.message
          : `Something broke on my end. Text me instead — ${BENZ.phone}.`,
      );
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center overflow-y-auto p-4 md:p-6"
      style={{
        background: "rgba(8,8,8,0.88)",
        backdropFilter: "blur(8px)",
        opacity: closing ? 0 : 1,
        transition: "opacity 0.32s cubic-bezier(0.16,1,0.3,1)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bb-popup-title"
    >
      <div
        className="relative my-auto w-full max-w-[620px] border border-graphite bg-void"
        style={{
          transform: closing ? "translateY(18px) scale(0.975)" : "translateY(0) scale(1)",
          transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-petal" />
        <button
          onClick={dismiss}
          className="absolute right-4 top-3 z-20 font-body text-sm text-ash transition hover:text-pearl"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-7 md:p-10">
          {!submitted ? (
            <>
              <p className="mb-4 font-body text-[0.6rem] font-bold uppercase tracking-[0.35em] text-petal">
                Before you sign anything
              </p>
              <h2
                id="bb-popup-title"
                className="font-display uppercase leading-[0.9] tracking-[0.02em] text-white"
                style={{ fontSize: "clamp(1.9rem, 5.5vw, 2.9rem)" }}
              >
                The 9 questions
                <br />
                <span className="text-petal">dealers hope you skip.</span>
              </h2>
              <p className="mt-4 font-body text-base font-light leading-7 text-smoke">
                I work at a dealership. I am still going to hand you the list. Ask these nine questions anywhere you
                shop — here, the store down the road, the one in Jersey — and you will not get taken.
              </p>
              <ul className="mt-5 space-y-2 font-body text-xs leading-5 text-smoke">
                <li>• The list appears right here, the second you hit send. No inbox, no waiting.</li>
                <li>• Once a month I text what is actually moving — real numbers, not a flyer.</li>
                <li>• Your number comes to me. Not a call center, not four other salespeople.</li>
              </ul>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor="bb-popup-website">Website</label>
                  <input id="bb-popup-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="bb-popup-email">Email address</label>
                    <input
                      id="bb-popup-email"
                      type="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-graphite bg-carbon px-5 py-4 font-body text-sm text-pearl placeholder:text-iron transition-colors focus:border-petal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="bb-popup-phone">Phone number</label>
                    <input
                      id="bb-popup-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-graphite bg-carbon px-5 py-4 font-body text-sm text-pearl placeholder:text-iron transition-colors focus:border-petal focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Show Me The 9 Questions →"}
                </button>
              </form>

              {error && <p className="mt-3 font-body text-[0.72rem] leading-5 text-petal" aria-live="polite">{error}</p>}

              <p className="mt-4 font-body text-[0.65rem] leading-5 text-iron">
                One text a month at most. Reply STOP and it stops. I am a salesperson, not a spammer — those are
                different jobs.
              </p>
            </>
          ) : (
            <div aria-live="polite">
              <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.35em] text-petal">
                Here it is. Screenshot this.
              </p>
              <p className="mt-4 font-display text-4xl uppercase leading-none tracking-[0.02em] text-white">
                The 9 <span className="text-petal">questions</span>
              </p>
              <ol className="mt-6 space-y-3">
                {QUESTIONS.map((q, i) => (
                  <li key={q} className="flex gap-4 font-body text-sm font-light leading-6 text-smoke">
                    <span className="font-mono text-[0.72rem] leading-6 text-petal">{String(i + 1).padStart(2, "0")}</span>
                    {q}
                  </li>
                ))}
              </ol>
              <div className="mt-7 border-t border-graphite pt-6">
                <p className="font-body text-sm font-light leading-6 text-smoke">
                  Ask me all nine. I will answer every one before you sit down. That is the entire pitch.
                </p>
                <a
                  href={BENZ.smsHref}
                  onClick={() => window.setTimeout(dismiss, 300)}
                  className="btn-primary mt-4 inline-flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                >
                  Text me: {BENZ.phone} →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
