"use client";

import { useState, useEffect } from "react";
import { SUBSTACK_URL } from "@/app/lib/config";

export default function LeadCapture() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("mkp_lead_seen")) return;

    const timer = setTimeout(() => setVisible(true), 8000);

    const onScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (pct >= 45 && !localStorage.getItem("mkp_lead_seen")) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function dismiss() {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      localStorage.setItem("mkp_lead_seen", "1");
    }, 350);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    localStorage.setItem("mkp_lead_seen", "1");
    setSubmitted(true);
    window.open(
      `https://mkparrishthemargins.substack.com/subscribe?email=${encodeURIComponent(trimmed)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-6"
      style={{
        background: "rgba(8,8,8,0.85)",
        backdropFilter: "blur(8px)",
        opacity: closing ? 0 : 1,
        transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        className="relative w-full max-w-[520px] bg-void border border-graphite"
        style={{
          transform: closing ? "translateY(20px) scale(0.97)" : "translateY(0) scale(1)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-petal" />

        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute right-5 top-5 font-body text-sm text-ash transition hover:text-pearl"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-10 md:p-12">
          {!submitted ? (
            <>
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.35em] text-petal mb-5">
                Free Resource
              </p>
              <h2
                className="font-display uppercase tracking-[0.02em] text-white leading-[0.9]"
                style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)" }}
              >
                Stop Being<br />
                <span className="text-petal">Misread.</span>
              </h2>
              <p className="mt-5 font-serif italic text-smoke leading-7" style={{ fontSize: "1rem" }}>
                Get the free <strong className="text-pearl not-italic">Positioning Checklist</strong> — the 12-point audit I run on every client before we rewrite anything. Know exactly where your copy is losing people before you change a word.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-graphite bg-carbon px-5 py-4 font-body text-sm text-pearl placeholder:text-iron focus:border-petal focus:outline-none transition-colors duration-200"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Send Me the Checklist →
                </button>
              </form>
              <p className="mt-4 font-body text-[0.65rem] text-iron leading-5">
                No spam. No pitch sequence. One email with the checklist. Unsubscribe any time.
              </p>

              <div className="mt-8 border-t border-graphite pt-6 flex items-center justify-between">
                <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-iron">Or join The Margins</p>
                <a
                  href={SUBSTACK_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={dismiss}
                  className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush"
                >
                  Read free →
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="font-display text-5xl uppercase tracking-[0.02em] text-petal leading-none">Check your inbox.</p>
              <p className="mt-6 font-serif italic text-smoke text-lg leading-7">
                Substack just opened in a new tab — confirm your email there and the checklist is yours.
              </p>
              <p className="mt-2 font-body text-sm text-ash">
                Didn&apos;t get it?{" "}
                <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="text-petal hover:underline">
                  Join via Substack →
                </a>
              </p>
              <button
                onClick={dismiss}
                className="mt-8 btn-ghost px-8 py-3 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em]"
              >
                Keep Reading →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
