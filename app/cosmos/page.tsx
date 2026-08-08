import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, ArrowLink,
} from "@/app/components/ui";
import { CALENDLY_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Cosmos — Numerology & Astrology Insights",
  description:
    "Numerology and astrology, read like strategy. Life-path numbers, your Big Three, angel numbers, and the business chart — MK Parrish's grounded, no-superstition guide to using your chart as a mirror for voice, timing, and positioning.",
  alternates: { canonical: "/cosmos" },
  openGraph: {
    title: "Cosmos — Numerology & Astrology Insights — MK Parrish",
    description:
      "Your chart is a first draft. Numerology and astrology, read like strategy — a mirror for voice, timing, and positioning.",
    url: "https://www.mkparrish.com/cosmos",
    images: ["/og/default.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og/default.png"] },
};

// The three ways to read a chart on this page.
const READINGS = [
  {
    tag: "Numerology",
    title: "The Numbers",
    desc: "Your life-path and personal-year numbers, read as a language for how you're wired and what season you're actually in.",
    perks: ["Life-path meaning", "Personal-year timing", "Name & brand numerology"],
  },
  {
    tag: "Astrology",
    title: "The Big Three",
    desc: "Sun, moon, and rising — your core self, your inner life, and the first impression your brand makes before you say a word.",
    perks: ["Sun: the work", "Moon: the why", "Rising: the first impression"],
  },
  {
    tag: "For founders",
    title: "The Business Chart",
    desc: "The same lens turned on your company: a launch date, a founder's voice, and the timing windows worth planning around.",
    perks: ["Founder voice read", "Launch & season timing", "Positioning mirror"],
  },
] as const;

// Life-path numbers — the most-searched numerology content, kept grounded.
const LIFE_PATHS = [
  { n: "1", name: "The Initiator", line: "Built to start things. Your edge is originality; your trap is going it alone. Positioning: lead with the thing only you would say." },
  { n: "2", name: "The Diplomat", line: "Wired for partnership and nuance. Your edge is trust; your trap is disappearing to keep the peace. Positioning: let your standards show." },
  { n: "3", name: "The Communicator", line: "Made to express. Your edge is voice; your trap is scattering it across ten ideas. Positioning: pick one message and repeat it." },
  { n: "4", name: "The Builder", line: "Systems and follow-through. Your edge is reliability; your trap is rigidity. Positioning: sell the calm of a thing that actually works." },
  { n: "5", name: "The Free Agent", line: "Change, movement, reinvention. Your edge is adaptability; your trap is finishing nothing. Positioning: make the pivot the story." },
  { n: "6", name: "The Caretaker", line: "Responsibility and craft. Your edge is care; your trap is over-giving. Positioning: price the devotion, don't donate it." },
  { n: "7", name: "The Seeker", line: "Depth and analysis. Your edge is insight; your trap is hiding in research. Positioning: publish the thinking, not just the polish." },
  { n: "8", name: "The Executive", line: "Power and results. Your edge is ambition; your trap is measuring only in money. Positioning: say the number without flinching." },
  { n: "9", name: "The Old Soul", line: "Vision and meaning. Your edge is perspective; your trap is martyrdom. Positioning: tie the work to something larger than the sale." },
] as const;

// Angel numbers — heavy search volume; ties to the existing ebook.
const ANGEL_NUMBERS = [
  { seq: "111", meaning: "A doorway. An idea worth acting on before you talk yourself out of it." },
  { seq: "222", meaning: "Alignment. Keep going on the thing you just committed to." },
  { seq: "333", meaning: "Expression. Say the true thing you've been editing down." },
  { seq: "444", meaning: "Foundation. The unglamorous work is the work." },
  { seq: "555", meaning: "Change. A season is ending; stop clinging to the old version." },
  { seq: "777", meaning: "Confirmation. You're on the path — don't outsmart it." },
] as const;

const FAQ_LIKE = [
  {
    q: "Is this the same as a psychic reading?",
    a: "No. I read a chart the way I read a positioning brief — as a mirror, not a map. Nothing here decides your future or replaces your judgment.",
  },
  {
    q: "Why put this next to a business site?",
    a: "Because founders can rarely say the true thing about how they're wired. A life-path number or a rising sign gets us there faster than another brand questionnaire — and honest positioning is the whole game.",
  },
  {
    q: "Do I have to believe in it?",
    a: "Not even a little. Treat it as a language for self-knowledge. If it helps you be braver and more specific, it did its job.",
  },
] as const;

export default function CosmosPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[88vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[85vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.16),transparent_62%)]" />
          <div className="absolute bottom-0 right-0 h-[45vh] w-[55vw] bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,79,124,0.08),transparent_60%)]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-[1400px] items-end gap-12 lg:grid-cols-[1.35fr_0.65fr]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div>
            <Eyebrow pink>Numerology &amp; Astrology · Read like strategy</Eyebrow>
            <div className="mt-4">
              <H1>The<br /><span className="text-petal text-glow">Cosmos</span></H1>
            </div>
            <p className="mt-6 font-serif text-xl italic text-petal/85 md:text-2xl" style={{ fontWeight: 500 }}>
              Your chart is a first draft.
            </p>
            <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              Numerology and astrology have a bad habit of being sold as certainty. I use them the way I use a positioning brief — as a mirror. A life-path number, a rising sign, a personal year: a language for how you&apos;re wired, what season you&apos;re in, and the voice that&apos;s already yours. No superstition. No handing over your common sense.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BtnPrimary href="#insights">Read the Insights</BtnPrimary>
              <ArrowLink href="/shop/decoding-angel-numbers">Get the Angel Numbers book</ArrowLink>
            </div>
            <div className="mt-7 flex flex-wrap gap-6">
              {["Grounded, not woo", "A mirror, not a map", "Built for founders"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="h-1 w-1 bg-petal" />
                  <span className="font-body text-xs font-light text-smoke">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative aspect-[5/8] w-full overflow-hidden border border-graphite/70 bg-obsidian shadow-[0_12px_60px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.18),transparent_60%)]" />
              <div className="relative flex h-full flex-col items-center justify-center gap-6 p-10 text-center">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-petal">Sun · Moon · Rising</p>
                <p className="font-display text-7xl uppercase leading-[0.85] tracking-[0.03em] text-white">
                  Written<br />in the<br /><span className="text-petal">Stars</span>
                </p>
                <p className="font-serif text-lg italic text-smoke">Read like strategy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE THREE READINGS ── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow>How I read a chart</Eyebrow>
        <H2>Three lenses.{" "}<span className="text-petal">One honest mirror.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "56ch" }}>
          Numbers for how you&apos;re wired, planets for how you show up, and the same lens turned on the business itself.
        </p>
        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {READINGS.map((r) => (
            <div key={r.title} className="bg-obsidian p-8">
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.24em] text-iron">{r.tag}</p>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{r.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{r.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {r.perks.map((p) => (
                  <li key={p} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={7} />

      {/* ── LIFE PATH NUMBERS ── */}
      <RevealSection bg="void" num="02" id="insights">
        <Eyebrow>Numerology · Free insight</Eyebrow>
        <H2>Your life-path{" "}<span className="text-petal">number.</span></H2>
        <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
          Add the digits of your full birth date until you land on a single number (1–9). That&apos;s your life path — the most-searched number in numerology, and a surprisingly useful read on your natural edge and your natural trap.
        </p>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {LIFE_PATHS.map((lp) => (
            <div key={lp.n} className="bg-obsidian p-7">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl text-petal">{lp.n}</span>
                <span className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{lp.name}</span>
              </div>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{lp.line}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-4 border border-graphite p-6">
          <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 bg-petal" />
          <p className="font-body text-sm font-light leading-7 text-smoke">
            Master numbers (11, 22, 33) don&apos;t reduce — they carry the intensity of both digits. Want the founder version, applied to your voice and offer? <Link href="/shop/the-manifest" className="text-petal transition hover:text-blush">The Manifest</Link> puts it to work.
          </p>
        </div>
      </RevealSection>

      {/* ── ANGEL NUMBERS ── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>Angel numbers · Free insight</Eyebrow>
        <H2>The numbers{" "}<span className="text-petal">that keep finding you.</span></H2>
        <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
          Repeated sequences aren&apos;t a lottery. Read them as a nudge toward the thing you already know. The number isn&apos;t the message — your attention is.
        </p>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {ANGEL_NUMBERS.map((a) => (
            <div key={a.seq} className="bg-obsidian p-7">
              <span className="font-display text-4xl tracking-[0.08em] text-petal">{a.seq}</span>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{a.meaning}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <ArrowLink href="/shop/decoding-angel-numbers">The full guide — Decoding Angel Numbers</ArrowLink>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── PHILOSOPHY / FAQ ── */}
      <RevealSection bg="void" num="04">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>The honest part</Eyebrow>
            <H2>A mirror,<br /><span className="text-petal">not a map.</span></H2>
            <H3Script>Nothing here decides your future. It just helps you say the true thing sooner.</H3Script>
            <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              I&apos;m a strategist first. I reach for a chart the same way I reach for a good question in a session — because it gets a founder past the rehearsed answer and into the real one. That&apos;s where the positioning is.
            </p>
          </div>
          <div className="space-y-px bg-graphite">
            {FAQ_LIKE.map((f) => (
              <div key={f.q} className="bg-obsidian p-7">
                <h3 className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{f.q}</h3>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection bg="obsidian">
        <div className="relative overflow-hidden text-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.09),transparent_65%)]" />
          </div>
          <div className="relative py-12 md:py-20">
            <Eyebrow>Ready to read yours?</Eyebrow>
            <H2>Your chart,{" "}<span className="text-petal">put to work.</span></H2>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-8 text-smoke">
              Book a session and we&apos;ll use the mirror to get to honest positioning — or start with The Manifest and do it yourself.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <BtnPrimary href={CALENDLY_URL}>Book a Reading + Strategy Call</BtnPrimary>
              <ArrowLink href="/shop/the-manifest">Get The Manifest</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
