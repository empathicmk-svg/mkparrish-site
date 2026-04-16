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
  FAQ,
  ServiceCard,
} from "@/app/components/ui";
import { CALENDLY_URL, STRIPE_REWRITE, STRIPE_NEW_CHAPTER } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Rewrite Your Brand — MK Parrish",
  description:
    "Brand messaging, voice strategy, and positioning for businesses that perform better than they sound. Strategic brand writing and repositioning.",
};

const faqItems = [
  {
    q: "What kind of brands do you work with?",
    a: "Founder-led businesses, boutique agencies, professional service firms, and startups that have grown past their original positioning. Companies that perform better than they sound, and need the brand to catch up.",
  },
  {
    q: "Is this copywriting or strategy?",
    a: "Both. The copy is useless without the strategy behind it. I start with positioning, then move into voice, then into execution. The deliverable is not just words. It is a brand that knows what it is saying and why.",
  },
  {
    q: "What is the difference between The Rewrite and The New Chapter for a brand?",
    a: "The Rewrite is for brands that need their core messaging sharpened. One or two surfaces: the about page, the homepage, the pitch. The New Chapter is for brands building from scratch or repositioning for a new era.",
  },
  {
    q: "Do you write the full website?",
    a: "Yes, within The New Chapter scope. If you need homepage copy, about, services, and a contact page, we build all of that together. The Rewrite covers one or two pages depending on scope.",
  },
  {
    q: "Can you help with tone of voice for a team?",
    a: "Yes. A brand voice guide is part of The New Chapter deliverables. It documents the voice, tone, dos and don'ts, and on-brand copy examples your team can use going forward.",
  },
];

export default function BrandPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Brand Voice &middot; Messaging &middot; Positioning
          </p>
          <div className="mt-6">
            <H1>
              Rewrite Your{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Brand
              </span>
            </H1>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Your business is better than it sounds. The gap between what you deliver and how you talk about it is a revenue problem. Let's close it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={CALENDLY_URL}>Start the Conversation</BtnPrimary>
            <BtnGhost href={STRIPE_REWRITE}>Buy The Rewrite</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>The gap</Eyebrow>
            <H2>
              The brand that does not{" "}
              <span className="text-petal">sound like you.</span>
            </H2>
            <H3Script>Most brand copy fails before anyone reads it.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              Most brand copy is written by people who do not know the business well enough, or by founders who know it too well to explain it simply. The result is copy that is technically accurate and strategically useless.
            </p>
            <p>
              It does not convert. It does not position. It does not make anyone feel like they are in the right place. It just exists, sitting on a homepage, doing nothing.
            </p>
            <p>
              Strong brand copy is specific. It names the problem your client did not have a word for. It says something true in a way that feels a little dangerous. It earns trust without performing it.
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={3} />

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Brand services</Eyebrow>
        <H2>
          Choose your{" "}
          <span className="text-petal">scope.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-3">
          <ServiceCard
            tag="Targeted Fix"
            title="The Edit"
            price="From $100"
            desc="One surface rewritten. Homepage tagline, about page, services description. Sharp, done, positioned."
            perks={[
              "Tagline or homepage headline",
              "About page or brand story",
              "Services or offerings copy",
              "3 to 5 business day turnaround",
            ]}
            cta="Buy The Edit"
            href={STRIPE_REWRITE}
          />
          <ServiceCard
            tag="Core Messaging"
            title="The Rewrite"
            price="From $1,500"
            desc="Homepage plus positioning strategy. Brand voice direction and 1 to 2 key pages rewritten with a clear strategic brief."
            perks={[
              "Positioning statement and voice direction",
              "Homepage copy",
              "About page",
              "30-minute strategy session",
            ]}
            cta="Start The Rewrite"
            href={STRIPE_REWRITE}
            highlight
          />
          <ServiceCard
            tag="Full Build"
            title="The New Chapter"
            price="Custom"
            desc="Brand voice guide, full website copy, messaging framework. For launches, repositions, and brands ready to mean something."
            perks={[
              "Brand voice and messaging guide",
              "Full website copy",
              "Tagline and positioning",
              "On-brand copy bank for your team",
            ]}
            cta="Let's Talk"
            href={CALENDLY_URL}
          />
        </div>
      </RevealSection>

      <QuoteDivider index={4} />

      {/* ── WHAT GETS BUILT ──────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>Deliverables</Eyebrow>
        <H2>
          What you walk away{" "}
          <span className="text-petal">with.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Positioning Statement", desc: "One sentence that earns attention and defines your category. Not a mission statement. A weapon." },
            { title: "Brand Voice Guide", desc: "Documented voice, tone, and style with examples. So every piece of writing sounds like one person wrote it." },
            { title: "Homepage Copy", desc: "The first impression that converts. Hero, about, services, and CTA written with strategic intent." },
            { title: "About Page", desc: "The story that builds trust. Not a timeline. A reason to believe you are the right choice." },
            { title: "Tagline and Messaging", desc: "The phrases that stick. Short, specific, and impossible to mistake for anyone else." },
            { title: "Services Copy", desc: "What you offer, framed by the problem it solves and the person it is for." },
          ].map((item) => (
            <div key={item.title} className="bg-obsidian p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={8} />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="04">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <H2>Before we begin.</H2>
            <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
              Not here? Book a call. No pitch, just clarity.
            </p>
            <div className="mt-6">
              <ArrowLink href={CALENDLY_URL}>Schedule a call</ArrowLink>
            </div>
          </div>
          <FAQ items={faqItems} />
        </div>
      </RevealSection>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-obsidian" style={{ padding: "clamp(4rem, 8vw, 8rem) 0" }}>
        <div className="mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <H2>
            Ready to sound like{" "}
            <span className="text-petal">the brand you are?</span>
          </H2>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Start with a call if you are not sure what needs fixing. Start with The Rewrite if you already know.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href={STRIPE_NEW_CHAPTER}>Discuss The New Chapter</BtnPrimary>
            <BtnGhost href={CALENDLY_URL}>Book a Call</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
