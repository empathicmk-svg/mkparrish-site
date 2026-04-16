import type { Metadata } from "next";
import CalendlyEmbed from "@/app/components/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Book a Call — MK Parrish",
  description:
    "30 minutes. No pitch. We figure out what needs fixing, whether this is the right fit, and what makes sense next.",
};

const what = [
  {
    num: "01",
    title: "Where you are stuck",
    desc: "We name the exact problem. Not the symptoms, the actual issue. Whether it is the positioning, the copy, the story, or something upstream of all of it.",
  },
  {
    num: "02",
    title: "Whether there is a fit",
    desc: "I do not take every project. I work with people I can genuinely help. If I am not the right person, I will tell you who is.",
  },
  {
    num: "03",
    title: "What comes next",
    desc: "If it makes sense to work together, we talk scope. If it does not, you leave with clarity anyway. Either outcome is useful.",
  },
];

export default function BookPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[55vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.12),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            30 minutes &middot; No pitch &middot; No intake forms
          </p>
          <h1 className="mt-6 font-display uppercase text-white" style={{ fontSize: "clamp(4.5rem, 14vw, 13rem)", lineHeight: 0.88, letterSpacing: "0.02em" }}>
            Book a{" "}
            <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
              Call
            </span>
          </h1>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            You talk to me directly. I tell you exactly what I think.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "58ch" }}>
            Tell me what you are working on. I will tell you whether I can help, what the work looks like, and what makes sense as a starting point. No agencies. No layers. No pitch.
          </p>
        </div>
      </section>

      {/* ── WHAT WE COVER ────────────────────────────────────────── */}
      <section className="bg-obsidian" style={{ padding: "clamp(3.5rem, 7vw, 6rem) 0" }}>
        <div className="mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            What we cover
          </p>
          <div className="mt-10 grid gap-px bg-graphite sm:grid-cols-3">
            {what.map((item) => (
              <div key={item.num} className="bg-obsidian p-8">
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-iron">{item.num}</p>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALENDLY EMBED ───────────────────────────────────────── */}
      <section className="bg-void" style={{ padding: "clamp(3.5rem, 7vw, 6rem) 0" }}>
        <div className="mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
              Pick a time
            </p>
            <p className="font-body text-xs font-light text-iron">
              All times shown in your local timezone.
            </p>
          </div>
          <div className="border border-graphite">
            <CalendlyEmbed />
          </div>
        </div>
      </section>

      {/* ── REASSURANCE ──────────────────────────────────────────── */}
      <section className="bg-obsidian" style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
        <div className="mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { label: "Duration", value: "30 minutes" },
              { label: "Format",   value: "Video or phone, your call" },
              { label: "Cost",     value: "Free. No obligation." },
            ].map((item) => (
              <div key={item.label} className="border-t border-graphite pt-6">
                <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-iron">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-pearl">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "58ch" }}>
            Prefer email first? Reach me at{" "}
            <a href="mailto:mkp414@icloud.com" className="text-petal transition-colors hover:text-blush">
              mkp414@icloud.com
            </a>
            . I read everything and respond to the ones that are a good fit.
          </p>
        </div>
      </section>
    </>
  );
}
