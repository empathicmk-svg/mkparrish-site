"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Reusable interactive primitives + animated infographics for the iDeals microsite.
// Self-contained; the accent color is read from the CSS var --id-accent set by the
// scroll-driven palette transition in Microsite.tsx, so every mark shifts from
// MK's petal-pink toward the advisory gold/teal as the reader descends.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, type ReactNode } from "react";

// ── prefers-reduced-motion ───────────────────────────────────────────────────
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ── In-view hook (IntersectionObserver, fires once) ──────────────────────────
export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { rootMargin, threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

// ── Reveal wrapper ───────────────────────────────────────────────────────────
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

// ── Count-up stat ────────────────────────────────────────────────────────────
export type StatData = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub?: string;
};

export function useCountUp(target: number, run: boolean, decimals = 0, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => setVal(target));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-US");
}

export function Stat({ data, big = false }: { data: StatData; big?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const shown = useCountUp(data.value, inView, data.decimals ?? 0);
  return (
    <div ref={ref} className="id-stat">
      <div
        className="font-display leading-[0.9] tracking-[0.01em]"
        style={{
          color: "var(--id-accent)",
          fontSize: big ? "clamp(2.6rem,6vw,4.6rem)" : "clamp(2rem,4.5vw,3.2rem)",
          textShadow: "0 0 30px color-mix(in srgb, var(--id-accent) 30%, transparent)",
        }}
      >
        {data.prefix}
        {shown}
        {data.suffix}
      </div>
      <div className="mt-2 font-body text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-pearl">
        {data.label}
      </div>
      {data.sub && (
        <div className="mt-1 font-body text-[0.78rem] font-light leading-5 text-smoke">{data.sub}</div>
      )}
    </div>
  );
}

// ── Animated funnel (labels on a full-width row above a tapering bar) ─────────
export function Funnel({ stages }: { stages: { stage: string; value: number; note: string }[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = stages[0].value;
  return (
    <div ref={ref} className="flex flex-col gap-4">
      {stages.map((s, i) => {
        const pct = (s.value / max) * 100;
        const shown = Math.max(pct, 18);
        return (
          <div key={s.stage}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-pearl md:text-[0.8rem]">
                {s.stage}
              </span>
              <span className="shrink-0 font-display text-xl leading-none md:text-2xl" style={{ color: "var(--id-accent)" }}>
                {inView ? s.value.toLocaleString("en-US") : "0"}
              </span>
            </div>
            <div
              className="mx-auto h-8"
              style={{
                width: inView ? `${shown}%` : "8%",
                background:
                  "linear-gradient(90deg, var(--id-accent), color-mix(in srgb, var(--id-accent) 30%, transparent))",
                boxShadow: "0 0 20px color-mix(in srgb, var(--id-accent) 30%, transparent)",
                transition: `width 1s cubic-bezier(.16,1,.3,1) ${i * 110}ms`,
              }}
            />
            <span className="mt-1.5 block text-center font-body text-[0.68rem] font-light text-ash">{s.note}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Animated bar/waterfall ───────────────────────────────────────────────────
export function Bars({
  data,
  unit = "$",
  suffix = "M",
}: {
  data: { label: string; value: number }[];
  unit?: string;
  suffix?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div ref={ref} className="flex flex-col gap-4">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="font-body text-[0.78rem] font-medium text-smoke">{d.label}</span>
            <span className="font-display text-lg" style={{ color: "var(--id-accent)" }}>
              {unit}
              {d.value}
              {suffix}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden bg-white/[0.06]">
            <div
              className="h-full"
              style={{
                width: inView ? `${(d.value / max) * 100}%` : "0%",
                background: "linear-gradient(90deg, var(--id-accent), color-mix(in srgb, var(--id-accent) 55%, #fff))",
                boxShadow: "0 0 18px color-mix(in srgb, var(--id-accent) 45%, transparent)",
                transition: `width 1.1s cubic-bezier(.16,1,.3,1) ${i * 110}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Interactive A/B test toggle ──────────────────────────────────────────────
type AB = {
  control: { label: string; angle: string; ctr: number; mqlToSql: number };
  variant: { label: string; angle: string; ctr: number; mqlToSql: number };
  ctrLift: number;
  conversionLift: number;
  takeaway: string;
};

export function ABToggle({ ab }: { ab: AB }) {
  const [showVariant, setShowVariant] = useState(true);
  const active = showVariant ? ab.variant : ab.control;
  const maxCtr = Math.max(ab.control.ctr, ab.variant.ctr);
  return (
    <div className="id-panel p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.24em] text-ash">
          Live A/B · message test
        </p>
        <div className="id-switch" role="tablist" aria-label="A/B message test">
          <button
            role="tab"
            aria-selected={!showVariant}
            onClick={() => setShowVariant(false)}
            className={`id-switch-btn ${!showVariant ? "is-active" : ""}`}
          >
            Control A
          </button>
          <button
            role="tab"
            aria-selected={showVariant}
            onClick={() => setShowVariant(true)}
            className={`id-switch-btn ${showVariant ? "is-active" : ""}`}
          >
            Variant B
          </button>
        </div>
      </div>

      <h4 className="mt-5 font-serif text-xl italic text-pearl md:text-2xl" style={{ fontWeight: 700 }}>
        {active.label}
      </h4>
      <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{active.angle}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ash">Click-through rate</p>
          <p className="mt-1 font-display text-4xl" style={{ color: "var(--id-accent)" }}>
            {active.ctr}%
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden bg-white/[0.06]">
            <div
              className="h-full"
              style={{
                width: `${(active.ctr / maxCtr) * 100}%`,
                background: "var(--id-accent)",
                transition: "width .6s cubic-bezier(.16,1,.3,1)",
              }}
            />
          </div>
        </div>
        <div>
          <p className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ash">MQL → SQL</p>
          <p className="mt-1 font-display text-4xl" style={{ color: "var(--id-accent)" }}>
            {active.mqlToSql}%
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden bg-white/[0.06]">
            <div
              className="h-full"
              style={{
                width: `${active.mqlToSql * 2.4}%`,
                background: "var(--id-accent)",
                transition: "width .6s cubic-bezier(.16,1,.3,1)",
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t pt-5"
        style={{ borderColor: "color-mix(in srgb, var(--id-accent) 22%, transparent)" }}
      >
        <p className="font-body text-sm text-smoke">
          <span className="font-display text-2xl" style={{ color: "var(--id-accent)" }}>
            +{ab.ctrLift}%
          </span>{" "}
          CTR lift
        </p>
        <p className="font-body text-sm text-smoke">
          <span className="font-display text-2xl" style={{ color: "var(--id-accent)" }}>
            +{ab.conversionLift}%
          </span>{" "}
          conversion lift
        </p>
      </div>
      <p className="mt-4 font-body text-[0.82rem] font-light italic leading-6 text-ash">{ab.takeaway}</p>
    </div>
  );
}

// ── Interactive region switcher (localization) ───────────────────────────────
type Region = {
  code: string;
  name: string;
  language: string;
  message: string;
  channel: string;
  event: string;
  localized: string;
};

export function RegionSwitcher({ regions }: { regions: Region[] }) {
  const [active, setActive] = useState(0);
  const r = regions[active];
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="EMEA regions">
        {regions.map((reg, i) => (
          <button
            key={reg.code}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className="id-region-tab"
            data-active={i === active}
          >
            {reg.code}
          </button>
        ))}
      </div>

      <div key={active} className="id-panel id-fade mt-5 p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h4 className="font-display text-3xl uppercase tracking-[0.02em] text-white md:text-4xl">{r.name}</h4>
          <span
            className="font-body text-[0.72rem] font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--id-accent)" }}
          >
            {r.language}
          </span>
        </div>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          {[
            ["Message decision", r.message],
            ["Channel mix", r.channel],
            ["Local event", r.event],
            ["Localized details", r.localized],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-body text-[0.66rem] font-bold uppercase tracking-[0.18em] text-ash">{k}</dt>
              <dd className="mt-1.5 font-body text-sm font-light leading-6 text-smoke">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="id-modal-scrim"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="id-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5 md:px-8">
          <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-white md:text-3xl">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="font-display text-2xl leading-none text-ash transition-colors hover:text-pearl"
            style={{ color: "var(--id-accent)" }}
          >
            ✕
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 md:px-8">{children}</div>
      </div>
    </div>
  );
}

// ── Slide-in CTA (timed + exit-intent, dismissible) ──────────────────────────
export function FloatingCTA({
  email,
  onOpenContact,
}: {
  email: string;
  onOpenContact: () => void;
}) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = window.setTimeout(() => setShow(true), 14000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setShow(true);
    };
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [dismissed]);

  if (!show || dismissed) return null;
  return (
    <div className="id-floating" role="complementary" aria-label="Quick contact">
      <button
        aria-label="Dismiss"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-3 text-ash transition-colors hover:text-pearl"
      >
        ✕
      </button>
      <p className="font-body text-[0.66rem] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--id-accent)" }}>
        Reviewing for iDeals?
      </p>
      <p className="mt-2 font-serif text-lg italic leading-snug text-pearl" style={{ fontWeight: 700 }}>
        Happy to walk Esther through any of these live.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={() => {
            onOpenContact();
            setDismissed(true);
          }}
          className="id-btn-accent w-full justify-center"
        >
          Start the conversation →
        </button>
        <a
          href={`mailto:${email}`}
          className="text-center font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ash transition-colors hover:text-pearl"
        >
          {email}
        </a>
      </div>
    </div>
  );
}
