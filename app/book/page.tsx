import type { Metadata } from "next";
import CalendlyEmbed from "@/app/components/CalendlyEmbed";
import { CONTACT } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "The First Conversation — MK Parrish",
  description:
    "Thirty minutes. Tell me what is not working. I will tell you what I see, whether I can help, and what makes sense next.",
};

const what = [
  {
    num: "01",
    title: "What is not landing",
    desc: "We name the exact problem. Not the symptoms — the actual issue. Whether it is the positioning, the copy, the story, or something upstream of all of it.",
  },
  {
    num: "02",
    title: "Whether I can help",
    desc: "I only take work I can genuinely move. If someone else is a better fit for what you need, I will tell you that directly.",
  },
  {
    num: "03",
    title: "What happens next",
    desc: "If it makes sense to work together, we talk scope and timeline. If it does not, you leave with a clear read on the situation. Either outcome is useful.",
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
            One conversation &middot; No pitch &middot; No intake form
          </p>
          <h1 className="mt-6 font-display uppercase text-white" style={{ fontSize: "clamp(4rem, 13vw, 12rem)", lineHeight: 0.88, letterSpacing: "0.02em" }}>
            The First{" "}
            <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
              Conversation
            </span>
          </h1>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Tell me what is not working. I will tell you what I see.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "58ch" }}>
            Thirty minutes. You talk, I listen, I ask questions. If there is a fit, I will tell you what the work looks like. If there is not, I will tell you that too. Either way, you leave knowing something you did not before.
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

      {/* ── DETAILS ──────────────────────────────────────────────── */}
      <section className="bg-obsidian" style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
        <div className="mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { label: "Duration",  value: "30 minutes" },
              { label: "Format",    value: "Video or phone, your call" },
              { label: "Cost",      value: "No charge. No obligation." },
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
          <p className="mt-10 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "54ch" }}>
            Prefer to write first? Reach me at{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-petal transition-colors hover:text-blush">
              {CONTACT.email}
            </a>
            . Tell me what you are working on. I read everything.
          </p>
        </div>
      </section>
    </>
  );
}
