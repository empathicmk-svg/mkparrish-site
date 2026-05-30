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
  ServiceCard,
  FAQ,
} from "@/app/components/ui";
import {
  STRIPE_BUILD,
  STRIPE_HOSTING,
  STRIPE_SOCIAL,
  STRIPE_YOUTUBE,
} from "@/app/lib/config";

export const metadata: Metadata = {
  title: "The Studio — MK Parrish",
  description:
    "Production and media, done in-house: website production, managed hosting, complete social packages, and YouTube video production. On-brand, shipped finished, kept running.",
};

const tiers = [
  {
    tag: "Website",
    title: "The Build",
    price: "From $6,000",
    desc: "Your company website, built from the ground up — strategy, copy, design, and production in one engagement. Launch-ready in 3–4 weeks on fast, modern infrastructure, built to turn traffic into booked calls and yours to keep.",
    perks: [
      "Positioning, messaging, and page architecture",
      "Full website copy and custom design",
      "Mobile-first, fast, and SEO-ready build",
      "Launch and domain setup handled for you",
    ],
    cta: "Start The Build",
    href: STRIPE_BUILD,
    highlight: false,
  },
  {
    tag: "Always-On",
    title: "The Upkeep",
    price: "From $300/mo",
    desc: "Managed hosting, maintenance, and care so your site never goes stale. Updates, backups, monitoring, and small changes handled — you never touch a dashboard or worry about something breaking.",
    perks: [
      "Managed hosting and uptime monitoring",
      "Security, backups, and software updates",
      "Monthly content and copy edits included",
      "Priority turnaround on requests",
    ],
    cta: "Keep It Running",
    href: STRIPE_HOSTING,
    highlight: false,
  },
  {
    tag: "Most Requested",
    title: "The Social Suite",
    price: "From $2,000/mo",
    desc: "A complete social package, produced and managed. Content, graphics, captions, and scheduling across the platforms that fit your audience — a consistent, on-brand presence without you producing a single post.",
    perks: [
      "Full content calendar across chosen platforms",
      "Custom graphics, carousels, and short-form video",
      "Captions and copy written in your voice",
      "Scheduling, publishing, and performance reporting",
    ],
    cta: "Launch the Suite",
    href: STRIPE_SOCIAL,
    highlight: true,
  },
  {
    tag: "Video",
    title: "The Channel",
    price: "From $1,500/video",
    desc: "YouTube and long-form video, end to end. Scripting, editing, thumbnails, and publishing — built to grow a channel that compounds, not a pile of clips nobody finds.",
    perks: [
      "Scripting and story structure",
      "Editing, captions, and thumbnail design",
      "SEO-optimized titles and descriptions",
      "Repurposing into short-form clips",
    ],
    cta: "Start the Channel",
    href: STRIPE_YOUTUBE,
    highlight: false,
  },
];

const faqItems = [
  {
    q: "Do I have to buy copy and strategy to use the production services?",
    a: "No. If your messaging is already sorted, I can produce against it. But production is at its best when the words and the strategy come from the same place — a site or social presence built on sharp positioning outperforms a pretty shell every time. Bundle it or bring me in for the build alone; both work.",
  },
  {
    q: "What platform do you build websites on?",
    a: "Whatever fits the project — modern frameworks for custom builds, or a managed platform when you want to edit things yourself later. The default is fast, mobile-first, and SEO-ready infrastructure that you fully own. If you want me to keep hosting and maintaining it, The Upkeep covers that. If you want to take it in-house, it hands off clean.",
  },
  {
    q: "What's included in a complete social package?",
    a: "Strategy, content calendar, custom graphics and short-form video, captions written in your voice, scheduling, publishing, and a monthly performance report. You approve; I produce and ship. It is a done-for-you presence — not a templates-and-advice product. Platforms are chosen based on where your audience actually is, not all of them by default.",
  },
  {
    q: "How does YouTube video production work?",
    a: "It runs per video or on a monthly cadence. I handle scripting and story structure, editing, captions, thumbnails, and SEO-optimized titles and descriptions, then repurpose each video into short-form clips for other channels. You bring the footage or we plan a shoot; you get a finished, published video built to grow the channel.",
  },
  {
    q: "Can production and hosting be a single ongoing arrangement?",
    a: "Yes — that is the most common setup. The Build ships it, The Upkeep keeps it live and current, and The Social Suite or The Channel keeps the presence active. One point of contact for everything that ships, so nothing falls through the gaps between a designer, a host, and a social manager.",
  },
];

export default function StudioPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            The Studio &middot; Production &amp; Media
          </p>
          <div className="mt-6">
            <H1>
              Ship it{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                finished.
              </span>
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Websites, hosting, social, and video — produced in-house, on-brand.
          </p>
          <div className="mt-6 max-w-2xl">
            <p className="font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
              The strategy and the words are only half of it. Something has to build the site, keep it running, and produce the content that fills it. The Studio is where that gets made — and where the presence finally keeps up with the positioning.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href="#offering">See the Offering</BtnPrimary>
            <BtnGhost href="/book">Scope a Project</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── THE GAP ──────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>The gap</Eyebrow>
            <H2>
              Great words on a{" "}
              <span className="text-petal">stale presence</span>{" "}
              still lose.
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            <p>
              You can nail the positioning and write the perfect page — and still watch it land flat because the site is slow, the socials are dormant, and there is no video where your audience actually spends its time.
            </p>
            <p>
              Production is usually the part that gets stitched together from three vendors who never talk to each other: a designer, a host, a social manager. The result is a presence that drifts out of sync with the brand the day it ships.
            </p>
            <p>
              The Studio closes that gap. One place that builds it, keeps it running, and produces what fills it — so what people see matches what you actually mean.
            </p>
            <div className="mt-8">
              <ArrowLink href="/book">Scope a project</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={0} />

      {/* ── TIERS ────────────────────────────────────────────────── */}
      <RevealSection id="offering" bg="void" num="02">
        <Eyebrow>The offering</Eyebrow>
        <H2>
          Four ways to{" "}
          <span className="text-petal">put it into production.</span>
        </H2>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          Take one or stack them. Build the site, keep it running, and keep the presence active — all from one place, all on-brand.
        </p>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <ServiceCard key={t.title} {...t} />
          ))}
        </div>

        <div className="mt-10 border-t border-graphite pt-8">
          <p className="font-body text-sm font-light text-smoke">
            Every engagement starts with a scoping call. Production is quoted to the project, not a template.
          </p>
          <a
            href="/book"
            className="mt-4 inline-block font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors hover:text-blush"
          >
            Scope a project &rarr;
          </a>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>The process</Eyebrow>
            <H2>
              How it gets{" "}
              <span className="text-petal">made and shipped.</span>
            </H2>
            <H3Script>Scope it. Build it. Ship it. Keep it running.</H3Script>
          </div>
          <div className="space-y-px bg-graphite">
            {[
              { step: "01", title: "Scope and Plan", desc: "What needs to ship, on which platforms, and how it connects to the brand and the funnel. A clear, fixed scope and timeline before anything gets built — no open-ended retainers, no surprises." },
              { step: "02", title: "Produce", desc: "Sites designed and built, social content and graphics created, videos scripted and edited. Produced in your voice and visual language so every asset looks like it came from the same place — because it did." },
              { step: "03", title: "Launch", desc: "Sites deployed on fast infrastructure, domains and analytics wired up. Content scheduled and published. Everything goes live finished, tested, and working on every screen." },
              { step: "04", title: "Keep It Running", desc: "Optional ongoing care: hosting, maintenance, and a steady cadence of social and video so the presence stays current. One point of contact for everything that ships." },
            ].map((item) => (
              <div key={item.step} className="bg-obsidian p-8">
                <div className="flex items-start gap-6">
                  <p className="w-10 flex-shrink-0 font-mono text-xs tracking-[0.2em] text-petal">{item.step}</p>
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
                    <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="04">
        <Eyebrow>Common questions</Eyebrow>
        <H2>
          What you{" "}
          <span className="text-petal">need to know.</span>
        </H2>
        <div className="mt-12">
          <FAQ items={faqItems} />
        </div>
      </RevealSection>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="relative bg-void" style={{ padding: "clamp(5rem, 12vw, 11rem) 0" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.09),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Start here
          </p>
          <div className="mt-6">
            <H2>
              Make the presence{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.3)" }}>
                match the work.
              </span>
            </H2>
          </div>
          <p className="mx-auto mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "54ch" }}>
            A scoping call to map what needs to ship — the site, the hosting, the social, the video — and how it all fits together.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">Scope a Project</BtnPrimary>
            <BtnGhost href="/contact">Get in Touch</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
