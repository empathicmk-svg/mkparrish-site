import type { Metadata } from "next";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, ArrowLink,
} from "@/app/components/ui";
import {
  STRIPE_SESSION, STRIPE_SOCIAL, STRIPE_YOUTUBE, STRIPE_BUILD,
} from "@/app/lib/config";

export const metadata: Metadata = {
  title: "The Tools — MK Parrish",
  description:
    "Three systems pulled straight from the studio: the Authority Carousel System, the Interactive Ebook Experience, and the Video Sales Page. Buy the DIY kit, hire me to build yours, or book a session.",
};

type Tier = {
  label: string;
  price: string;
  desc: string;
  cta: string;
  href: string;
};

type Tool = {
  num: string;
  tag: string;
  title: string;
  tagline: string;
  desc: string;
  highlight?: boolean;
  tiers: Tier[];
};

const TOOLS: Tool[] = [
  {
    num: "01",
    tag: "LinkedIn Authority",
    title: "The Authority Carousel System",
    tagline: "Turn one idea into a polished LinkedIn carousel — without the Canva chaos.",
    desc:
      "The same house style, seven-slide story format, and voice rules behind the carousels on this site. A repeatable system for founders, consultants, and operators who need to show up like the authority they already are.",
    highlight: true,
    tiers: [
      {
        label: "DIY Kit",
        price: "$38",
        desc: "The Social Strategy Playbook — the carousel formula, content pillars, and a 30-day sprint you can run yourself.",
        cta: "Buy the DIY kit",
        href: "/shelf/the-social-strategy-playbook",
      },
      {
        label: "Done For You",
        price: "From $2,000/mo",
        desc: "The Social Suite — branded carousels, captions, and a content engine, built and run for you every month.",
        cta: "Hire me to build yours",
        href: STRIPE_SOCIAL,
      },
      {
        label: "Strategy Session",
        price: "$300",
        desc: "Sixty minutes to map your authority angle, your pillars, and your first five carousel concepts together.",
        cta: "Book a $300 session",
        href: STRIPE_SESSION,
      },
    ],
  },
  {
    num: "02",
    tag: "Guided Reading",
    title: "The Interactive Ebook Experience",
    tagline: "Turn your PDF into a beautiful guided reading experience.",
    desc:
      "Not another PDF that dies in a downloads folder. A chapter-by-chapter reader with reflection prompts, email capture, and a checkout path — so your book becomes a product that converts, not just a file.",
    tiers: [
      {
        label: "DIY Kit",
        price: "From $9",
        desc: "Start with a guide from The Shelf — the frameworks for writing, structuring, and selling a digital book that earns its price.",
        cta: "Buy the DIY kit",
        href: "/shelf",
      },
      {
        label: "Done For You",
        price: "From $6,000",
        desc: "The Build — your book turned into a hosted, branded interactive reader with a checkout and lead-capture flow.",
        cta: "Hire me to build yours",
        href: STRIPE_BUILD,
      },
      {
        label: "Strategy Session",
        price: "$300",
        desc: "Sixty minutes to shape the offer, the price, and the read-reflect-buy flow before you build a thing.",
        cta: "Book a $300 session",
        href: STRIPE_SESSION,
      },
    ],
  },
  {
    num: "03",
    tag: "Conversion Pages",
    title: "The Video Sales Page",
    tagline: "Turn one video into a page that actually converts.",
    desc:
      "A single hosted video, a clear offer, and every section engineered to move the viewer to yes — bio, testimonials, CTA, checkout, and email capture. Built for coaches, consultants, authors, and founders.",
    tiers: [
      {
        label: "DIY Kit",
        price: "$45",
        desc: "The Build: Copy Guide — page-by-page copy architecture and CTA frameworks so every word on the page works.",
        cta: "Buy the DIY kit",
        href: "/shelf/the-build-copy-guide",
      },
      {
        label: "Done For You",
        price: "From $1,500",
        desc: "The Channel — a hosted video sales page, built end to end, with a repurposing plan for short-form.",
        cta: "Hire me to build yours",
        href: STRIPE_YOUTUBE,
      },
      {
        label: "Strategy Session",
        price: "$300",
        desc: "Sixty minutes to script the video, structure the page, and pick the one CTA that earns the click.",
        cta: "Book a $300 session",
        href: STRIPE_SESSION,
      },
    ],
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div
      className={`relative flex flex-col p-8 md:p-10 ${
        tool.highlight ? "bg-carbon shadow-[0_0_60px_rgba(242,175,198,0.08)]" : "bg-obsidian"
      }`}
    >
      {tool.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
      <p className="font-mono text-xs tracking-[0.2em] text-petal/60">{tool.num}</p>
      <p className="mt-4 font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">
        {tool.tag}
      </p>
      <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl md:text-4xl">
        {tool.title}
      </h3>
      <p className="mt-4 font-serif text-lg italic text-petal/80" style={{ fontWeight: 500 }}>
        {tool.tagline}
      </p>
      <p className="mt-4 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "60ch" }}>
        {tool.desc}
      </p>

      <div className="mt-8 grid gap-px bg-graphite md:grid-cols-3">
        {tool.tiers.map((tier) => {
          const external = tier.href.startsWith("http");
          return (
            <div key={tier.label} className="flex flex-col bg-obsidian p-6">
              <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.25em] text-iron">
                {tier.label}
              </p>
              <p className="mt-2 font-display text-2xl text-white">{tier.price}</p>
              <p className="mt-3 flex-1 font-body text-[0.8rem] font-light leading-6 text-smoke">
                {tier.desc}
              </p>
              <a
                href={tier.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="mt-6 flex w-full items-center justify-center py-3 font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] btn-ghost"
              >
                {tier.cta}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[80vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>The Tools · Productized</Eyebrow>
          <div className="mt-4">
            <H1>The<br /><span className="text-petal">Tools</span></H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Three systems from the studio — yours to buy, to commission, or to learn.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
            The same engines behind this site, packaged three ways. Buy the DIY kit and run it yourself, hire me to build yours, or book a session and we&apos;ll plan it together.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BtnPrimary href="#carousels">See the Tools</BtnPrimary>
            <ArrowLink href="/book">Or book a call first</ArrowLink>
          </div>
        </div>
      </section>

      {/* ── THE TOOLS ── */}
      <RevealSection bg="obsidian" num="01" id="carousels">
        <Eyebrow>What&apos;s in the kit</Eyebrow>
        <H2>Pick the system,{" "}<span className="text-petal">then pick the lane.</span></H2>
        <p className="mt-4 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "56ch" }}>
          Every tool comes three ways — a low-ticket DIY kit, a done-for-you build, and a working session in between. Start small or start at the top.
        </p>
        <div className="mt-12 flex flex-col gap-px bg-graphite">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={17} />

      {/* ── CTA ── */}
      <RevealSection bg="void">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Not sure which one</Eyebrow>
          <H3Script>Bring the idea. I&apos;ll tell you which tool turns it into a product.</H3Script>
          <BtnPrimary href={STRIPE_SESSION}>Book a $300 session</BtnPrimary>
          <ArrowLink href="/shelf">Or browse The Shelf first</ArrowLink>
        </div>
      </RevealSection>
    </>
  );
}
