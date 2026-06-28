"use client";

import { useState, useEffect } from "react";

const FREE_CHAPTER = "/downloads/ebooks/rebecoming-sample.pdf";

export default function LeadCapture() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailed, setEmailed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("mkp_lead_seen")) return;

    const timer = setTimeout(() => setVisible(true), 8000);

    const onScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (pct >= 40 && !localStorage.getItem("mkp_lead_seen")) {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), offer: "rebecoming" }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json().catch(() => ({}));
      setEmailed(Boolean(data.emailed));
      setSubmitted(true);
      localStorage.setItem("mkp_lead_seen", "1");
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
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
        className="relative grid w-full max-w-[860px] overflow-hidden border border-graphite bg-void md:grid-cols-[0.85fr_1fr]"
        style={{
          transform: closing ? "translateY(20px) scale(0.97)" : "translateY(0) scale(1)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="absolute inset-x-0 top-0 z-10 h-px bg-petal" />

        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 z-20 font-body text-sm text-ash transition hover:text-pearl"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Cover panel */}
        <div className="relative hidden items-center justify-center bg-carbon p-8 md:flex">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,175,198,0.18),transparent_70%)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/downloads/covers/rebecoming-cover.jpg"
            alt="REBECOMING: From Fear to Faith — book cover"
            width={1600}
            height={2560}
            className="relative aspect-[5/8] w-full max-w-[240px] border border-graphite/70 object-cover shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          {!submitted ? (
            <>
              <p className="mb-4 font-body text-[0.6rem] font-bold uppercase tracking-[0.35em] text-petal">
                The Memoir · Free First Chapter
              </p>
              <h2
                className="font-display uppercase leading-[0.9] tracking-[0.02em] text-white"
                style={{ fontSize: "clamp(1.9rem, 5vw, 2.8rem)" }}
              >
                Read the first<br /><span className="text-petal">chapter free.</span>
              </h2>
              <p className="mt-4 font-serif text-base italic leading-7 text-smoke">
                <strong className="text-pearl not-italic">REBECOMING: From Fear to Faith</strong> — a memoir about losing your fear without losing yourself. Enter your email and I&apos;ll send you the opening chapter. Then you decide.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-graphite bg-carbon px-5 py-4 font-body text-sm text-pearl placeholder:text-iron transition-colors duration-200 focus:border-petal focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Send Me Chapter One →"}
                </button>
              </form>
              {error && <p className="mt-3 font-body text-[0.7rem] leading-5 text-petal">{error}</p>}
              <p className="mt-4 font-body text-[0.65rem] leading-5 text-iron">
                One email with your free chapter. A portion of every book sale is donated to my local parish. Unsubscribe any time.
              </p>
            </>
          ) : (
            <div className="py-2">
              <p className="font-display text-4xl uppercase leading-none tracking-[0.02em] text-petal">
                Chapter one<br />is yours.
              </p>
              <p className="mt-5 font-serif text-base italic leading-7 text-smoke">
                {emailed
                  ? "It is on its way to your inbox — and you can start reading right now."
                  : "Start reading right now — and a copy is in your inbox if email is on."}
              </p>

              <a
                href={FREE_CHAPTER}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center border border-graphite py-4 font-body text-[0.78rem] font-bold uppercase tracking-[0.2em] text-pearl transition-colors hover:border-petal hover:text-petal"
              >
                Read Chapter One →
              </a>

              <div className="mt-6 border-t border-graphite pt-6">
                <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.25em] text-petal">
                  Don&apos;t want to wait?
                </p>
                <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">
                  Read the whole story now — instant ebook or a paperback shipped to your door.
                </p>
                <a
                  href="/rebecoming"
                  onClick={() => setTimeout(dismiss, 300)}
                  className="btn-primary mt-4 inline-flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
                >
                  Get the Full Book →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
