"use client";

import { useEffect, useMemo, useState } from "react";

const FREE_CHAPTER = "/downloads/ebooks/rebecoming-sample.pdf";
const STORAGE_KEY = "mkp_lead_capture_status";
const DISMISS_DAYS = 7;

function getDaysFromNow(days: number) {
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

function shouldSuppressPopup() {
  if (typeof window === "undefined") return true;

  const pathname = window.location.pathname;
  const suppressedPaths = ["/rebecoming", "/contact", "/shop", "/services", "/book", "/portfolio", "/partners"];
  if (suppressedPaths.some((path) => pathname.startsWith(path))) return true;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return false;

  try {
    const status = JSON.parse(saved) as { expiresAt?: number; submitted?: boolean };
    if (status.submitted) return true;
    if (status.expiresAt && status.expiresAt > Date.now()) return true;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return false;
}

function rememberPopup(status: "dismissed" | "submitted") {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      status,
      submitted: status === "submitted",
      expiresAt: status === "submitted" ? getDaysFromNow(365) : getDaysFromNow(DISMISS_DAYS),
    }),
  );
}

export default function LeadCapture() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailed, setEmailed] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(FREE_CHAPTER);

  const pageSource = useMemo(() => {
    if (typeof window === "undefined") return "popup";
    return `popup:${window.location.pathname}`;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || shouldSuppressPopup()) return;

    let hasOpened = false;
    const openOnce = () => {
      if (hasOpened || shouldSuppressPopup()) return;
      hasOpened = true;
      setVisible(true);
    };

    const timer = window.setTimeout(openOnce, 12000);

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      if (pct >= 45) openOnce();
    };

    const onMouseOut = (event: MouseEvent) => {
      if (window.innerWidth < 900) return;
      if (event.clientY <= 0) openOnce();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  function dismiss() {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      rememberPopup("dismissed");
    }, 350);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          offer: "rebecoming-sample",
          source: pageSource,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "failed");

      if (typeof data.download === "string" && data.download) {
        setDownloadUrl(data.download);
      } else if (typeof data.checklist === "string" && data.checklist) {
        setDownloadUrl(data.checklist);
      }
      setEmailed(Boolean(data.emailed));
      setSubmitted(true);
      rememberPopup("submitted");
    } catch (err) {
      setError(err instanceof Error && err.message !== "failed"
        ? err.message
        : "Something went wrong. You can still read the chapter below, then try your email again.");
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
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-capture-title"
    >
      <div
        className="relative grid w-full max-w-[860px] overflow-hidden border border-graphite bg-void md:grid-cols-[0.85fr_1fr]"
        style={{
          transform: closing ? "translateY(20px) scale(0.97)" : "translateY(0) scale(1)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="absolute inset-x-0 top-0 z-10 h-px bg-petal" />

        <button
          onClick={dismiss}
          className="absolute right-4 top-4 z-20 font-body text-sm text-ash transition hover:text-pearl"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="relative hidden items-center justify-center bg-carbon p-8 md:flex">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,175,198,0.18),transparent_70%)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/downloads/covers/rebecoming-cover.jpg"
            alt="REBECOMING: From Fear to Faith book cover"
            width={1600}
            height={2560}
            className="relative aspect-[5/8] w-full max-w-[240px] border border-graphite/70 object-cover shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div className="p-8 md:p-10">
          {!submitted ? (
            <>
              <p className="mb-4 font-body text-[0.6rem] font-bold uppercase tracking-[0.35em] text-petal">
                Rewrite Your Story · Free First Chapter
              </p>
              <h2
                id="lead-capture-title"
                className="font-display uppercase leading-[0.9] tracking-[0.02em] text-white"
                style={{ fontSize: "clamp(1.9rem, 5vw, 2.8rem)" }}
              >
                Read the first<br /><span className="text-petal">chapter free.</span>
              </h2>
              <p className="mt-4 font-serif text-base italic leading-7 text-smoke">
                <strong className="text-pearl not-italic">REBECOMING: From Fear to Faith</strong> is a memoir about losing your fear without losing yourself. You are not starting over. You are rebecoming. Enter your email and I&apos;ll send the opening chapter.
              </p>
              <ul className="mt-5 space-y-2 font-body text-xs leading-5 text-smoke">
                <li>• Immediate chapter access after signup.</li>
                <li>• A direct inbox copy when email delivery is available.</li>
                <li>• Occasional field notes on voice, faith, work, and rebuilding. No spam.</li>
              </ul>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                <label className="sr-only" htmlFor="lead-email">Email address</label>
                <input
                  id="lead-email"
                  type="email"
                  required
                  autoComplete="email"
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
              {error && <p className="mt-3 font-body text-[0.7rem] leading-5 text-petal" aria-live="polite">{error}</p>}
              {error && (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal underline underline-offset-4"
                >
                  Read without waiting →
                </a>
              )}
              <p className="mt-4 font-body text-[0.65rem] leading-5 text-iron">
                One email with your free chapter. A portion of every book sale is donated to my local parish. Unsubscribe any time.
              </p>
            </>
          ) : (
            <div className="py-2" aria-live="polite">
              <p className="font-display text-4xl uppercase leading-none tracking-[0.02em] text-petal">
                Chapter one<br />is yours.
              </p>
              <p className="mt-5 font-serif text-base italic leading-7 text-smoke">
                {emailed
                  ? "It is on its way to your inbox, and you can start reading right now."
                  : "Email delivery is not connected right now, but the chapter is ready below."}
              </p>

              <a
                href={downloadUrl}
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
                  Read the whole story now - instant ebook or a paperback shipped to your door.
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
