import type { Metadata } from "next";
import {
  RevealSection,
  QuoteDivider,
  Eyebrow,
  H1,
  H2,
  H3Script,
  BtnPrimary,
  BtnGhost,
  ArrowLink,
} from "@/app/components/ui";
import { PATREON_URL, SHOP_URL, STRIPE_EDIT, STRIPE_REWRITE } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Shop — MK Parrish",
  description:
    "Ebooks, poem prints, and digital guides from MK Parrish. The Invisible Bruise, The Reinvention Workbook, Write Yourself Into the Room, and more. Raw writing tools built from real experience.",
};

const ebooks = [
  {
    tag: "New Release",
    title: "The Invisible Bruise",
    price: "$22",
    desc: "Surviving emotional abuse, suffering in silence, and rewriting your life. For the woman who knows something is wrong but cannot yet prove it. Raw, honest, and written from inside it.",
    features: [
      "8 chapters on emotional abuse + recovery",
      "20 Instagram quotes included",
      "The Rewrite framework for rebuilding",
      "Instant PDF download",
    ],
    cta: "Get the Book",
    href: SHOP_URL,
    highlight: true,
  },
  {
    tag: "Digital Download",
    title: "The Reinvention Workbook",
    price: "$18",
    desc: "A guided writing workbook for people in the middle of becoming someone new. Exercises, prompts, and frameworks pulled from real reinvention — not theory.",
    features: [
      "20 guided writing exercises",
      "The identity audit framework",
      "Voice and narrative prompts",
      "Instant PDF download",
    ],
    cta: "Get the Workbook",
    href: SHOP_URL,
    highlight: false,
  },
  {
    tag: "Most Requested",
    title: "Write Yourself Into the Room",
    price: "$28",
    desc: "The personal brand writing guide for people who are tired of sounding like everyone else. Learn to write bios, LinkedIn copy, and positioning statements that actually sound like you.",
    features: [
      "The three-layer positioning framework",
      "Bio writing templates + real examples",
      "LinkedIn audit checklist",
      "Tone and voice calibration exercises",
    ],
    cta: "Get the Guide",
    href: SHOP_URL,
    highlight: true,
  },
  {
    tag: "Digital Download",
    title: "The Brand Voice Playbook",
    price: "$35",
    desc: "Build a brand voice document from scratch. The exact process used with clients — documented so you can run it yourself. Includes a complete example brand voice guide.",
    features: [
      "Full brand voice framework",
      "Tone spectrum mapping",
      "Do/don't vocabulary lists",
      "Complete client example included",
    ],
    cta: "Get the Playbook",
    href: SHOP_URL,
    highlight: false,
  },
];

const prints = [
  {
    title: "Promise Me",
    desc: "High-quality art print of the full poem. Printed on archival matte stock.",
    price: "From $22",
    sizes: ["8×10", "11×14", "16×20"],
  },
  {
    title: "Mirage",
    desc: "Art print of the full poem on archival stock. Ships in protective sleeve.",
    price: "From $22",
    sizes: ["8×10", "11×14", "16×20"],
  },
  {
    title: "Selected Lines",
    desc: "Single-line poem prints — choose your line from the collection. Minimal. Stark. Stays with you.",
    price: "From $18",
    sizes: ["5×7", "8×10"],
  },
];

export default function ShopPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>The Work, On Demand</Eyebrow>
          <div className="mt-4">
            <H1>Shop</H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Ebooks, guides, poem prints, and membership access.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Everything here is built from real work — not repurposed content. The guides come from client engagements. The prints are from poems that people keep coming back to.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={SHOP_URL}>Visit the Full Shop</BtnPrimary>
            <BtnGhost href="/margins">Join The Margins</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── EBOOKS & GUIDES ──────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow>Digital Downloads</Eyebrow>
        <H2>
          Guides built from{" "}
          <span className="text-petal">real work.</span>
        </H2>
        <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
          Not theory. Not content repurposed from a podcast episode. These are the actual frameworks, documented and made accessible.
        </p>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {ebooks.map((e) => {
            const external = e.href.startsWith("http");
            return (
              <div
                key={e.title}
                className={`relative flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 ${
                  e.highlight ? "bg-carbon shadow-[0_0_60px_rgba(242,175,198,0.08)]" : "bg-obsidian"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {e.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">{e.tag}</p>
                <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{e.title}</h3>
                <p className="mt-2 font-display text-4xl text-white">{e.price}</p>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{e.desc}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {e.features.map((f) => (
                    <li key={f} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={e.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={`btn-primary mt-8 inline-flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void`}
                >
                  {e.cta}
                </a>
              </div>
            );
          })}
        </div>
      </RevealSection>

      <QuoteDivider index={16} />

      {/* ── POEM PRINTS ──────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Poem Prints</Eyebrow>
        <H2>
          The words,{" "}
          <span className="text-petal">on your wall.</span>
        </H2>
        <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
          Archival-quality prints of the poems. For the women, survivors, and overthinkers who want the words somewhere they can see them.
        </p>

        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-3">
          {prints.map((p) => (
            <div
              key={p.title}
              className="group relative flex flex-col bg-obsidian p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              {/* Decorative quote mark */}
              <span className="select-none font-serif text-[5rem] leading-none text-petal/[0.12]">&ldquo;</span>
              <h3 className="font-display text-3xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
              <p className="mt-1 font-display text-2xl text-white">{p.price}</p>
              <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <span key={s} className="border border-graphite px-3 py-1 font-mono text-[0.65rem] tracking-[0.15em] text-iron">
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-8 inline-flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
              >
                Shop Prints
              </a>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={18} />

      {/* ── THE MARGINS MEMBERSHIP ───────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Membership</Eyebrow>
            <H2>
              The{" "}
              <span className="text-petal">Margins.</span>
            </H2>
            <H3Script>The real work. Before it goes anywhere.</H3Script>
            <div className="mt-8 space-y-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              <p>
                Weekly essays, raw strategy notes, memoir in progress, and the writing that is too honest for a public feed. The Margins is where members get it all — unfiltered and early.
              </p>
              <p>
                For the women, survivors, romantics, and overthinkers who know what it feels like to rebuild from scratch and want company for that process.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
              <ArrowLink href="/margins">See what's inside</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col gap-px">
            {[
              { tier: "Soft Cover", price: "$5/mo", desc: "Weekly essays and strategy notes that never go to the public feed." },
              { tier: "Marked Up", price: "$12/mo", desc: "Everything in Soft Cover plus raw frameworks from client work.", highlight: true },
              { tier: "First Edition", price: "$28/mo", desc: "Full access, monthly live Q&A, and direct message access." },
            ].map((t, i) => (
              <div key={t.tier} className={`relative p-8 ${i === 1 ? "bg-carbon" : "bg-void"}`}>
                {i === 1 && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{t.tier}</p>
                  <p className={`font-display text-2xl ${i === 1 ? "text-petal" : "text-white"}`}>{t.price}</p>
                </div>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{t.desc}</p>
              </div>
            ))}
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-px flex w-full items-center justify-center py-5 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Join The Margins →
            </a>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={6} />

      {/* ── COPYWRITING SERVICES TEASER ──────────────────────────── */}
      <RevealSection bg="void" num="04">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Need more than a download?</Eyebrow>
            <H2>
              Work with me{" "}
              <span className="text-petal">directly.</span>
            </H2>
            <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              The guides are the self-serve option. For founders, executives, and people mid-reinvention who need the full thing — copy, strategy, and someone who actually writes — I take on a limited number of direct clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/book">Book a Call</BtnPrimary>
              <BtnGhost href="/#rewrites">See All Services</BtnGhost>
            </div>
          </div>
          <div className="grid gap-px bg-graphite sm:grid-cols-2">
            {[
              { label: "Quick Fix", title: "The Edit", price: "From $100", href: STRIPE_EDIT },
              { label: "Most Requested", title: "The Rewrite", price: "From $1,500", href: STRIPE_REWRITE },
              { label: "Ongoing", title: "The Byline", price: "From $1,500/mo", href: "/presence" },
              { label: "Full Reset", title: "The Build", price: "Custom", href: "/book" },
            ].map((s) => {
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.title}
                  href={s.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group relative flex flex-col justify-between bg-obsidian p-6 transition-all duration-300 hover:-translate-y-px hover:bg-carbon"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                  <div>
                    <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-iron">{s.label}</p>
                    <p className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{s.title}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="font-display text-xl text-petal">{s.price}</p>
                    <span className="flex h-7 w-7 items-center justify-center border border-petal/20 text-sm text-petal/50 transition-all duration-300 group-hover:border-petal group-hover:bg-petal group-hover:text-void">
                      &rarr;
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </RevealSection>
    </>
  );
}
