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
import { STRIPE_EDIT, STRIPE_REWRITE } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Rewrite Your Brand — MK Parrish",
  description:
    "Brand messaging, voice strategy, and positioning for businesses that perform better than they sound. Strategic brand writing and repositioning.",
};

const faqItems = [
  {
    q: "What kind of brands do you work with?",
    a: "Founder-led businesses, boutique agencies, professional services firms, and startups that have outgrown their original positioning. If the business is delivering real results and the brand copy is not reflecting that, that is where I come in.",
  },
  {
    q: "Is this copywriting or strategy?",
    a: "Both. Copy without strategy is just decoration. I start with positioning, move into voice, then into execution. The deliverable is not just words on a page. It is a brand that knows what it is saying, who it is saying it to, and why they should care.",
  },
  {
    q: "What is the difference between The Rewrite and The New Chapter for a brand?",
    a: "The Rewrite sharpens core messaging on one or two surfaces: the homepage, the about page, the pitch. The New Chapter is for brands building from scratch, repositioning for a new market, or making a significant strategic shift that needs the whole language to move.",
  },
  {
    q: "Do you write the full website?",
    a: "Yes, within The New Chapter scope. Homepage, about, services, contact, any additional pages the site needs. The Rewrite covers one or two pages depending on what was agreed at the start.",
  },
  {
    q: "Can you help with tone of voice for a team?",
    a: "Yes. A brand voice guide is a standard deliverable in The New Chapter. It documents the voice, tone, and style with real on-brand examples your team can reference when you need to write something and I am not in the room.",
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
            Your business is better than it sounds. That gap is not a design problem or a marketing budget problem. It is a language problem. The words are not doing the work the business is doing. That costs you every time someone lands on your homepage and leaves.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href="/book">Start the Conversation</BtnPrimary>
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
              Most brand copy is written by people who do not know the business well enough, or by founders who know it too well to see where the explanation falls apart. The result is copy that is technically accurate and completely inert.
            </p>
            <p>
              It does not convert. It does not position. It does not make the person reading it feel like they have found the right place. It just sits on a homepage, describing things without arguing for them.
            </p>
            <p>
              Strong brand copy is specific. It names the problem your client could not articulate before they found you. It stakes a position. It makes the right person feel seen and makes the wrong person self-select out. That is not an accident. That is craft.
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
            desc="One surface rewritten with strategic intent. Homepage tagline, about page, services description. You already know what is not working. This fixes that specific thing."
            perks={[
              "Tagline or homepage headline",
              "About page or brand story",
              "Services or offerings copy",
              "3 to 5 business day turnaround",
            ]}
            cta="Buy The Edit"
            href={STRIPE_EDIT}
          />
          <ServiceCard
            tag="Core Messaging"
            title="The Rewrite"
            price="From $1,500"
            desc="Core messaging overhauled with a positioning strategy built underneath it. Homepage rewritten, voice direction documented, and a 30-minute strategy session to make sure we are writing toward the right goal."
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
            desc="Full brand build from positioning to final page copy. Voice guide, complete website, messaging framework, and a copy bank your team can use after we are done. For launches, repositions, and brands that have grown past what their original copy was built for."
            perks={[
              "Brand voice and messaging guide",
              "Full website copy",
              "Tagline and positioning",
              "On-brand copy bank for your team",
            ]}
            cta="Let's Talk"
            href="/book"
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
            { title: "Positioning Statement", desc: "One sentence that tells people what you do, who you do it for, and why you are the specific answer to their specific problem. Not a mission statement. Something sharper." },
            { title: "Brand Voice Guide", desc: "Documented voice, tone, and style with real examples pulled from your brand. So the next thing you publish sounds like the same company that wrote the last one." },
            { title: "Homepage Copy", desc: "The first and often only impression. Hero, about, services, and CTA written to move someone from curious to convinced without a phone call." },
            { title: "About Page", desc: "The story that earns trust. Not a founding timeline. A clear argument for why you are the right choice for the specific person reading it." },
            { title: "Tagline and Messaging", desc: "The phrases that follow the brand everywhere. Short, specific, and impossible to confuse with a competitor. Built to travel." },
            { title: "Services Copy", desc: "What you offer, reframed around the outcome it creates and the person it is built for. Not a feature list. A reason to reach out." },
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
              <ArrowLink href="/book">Schedule a call</ArrowLink>
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
            <BtnPrimary href="/book">Let&apos;s Talk</BtnPrimary>
            <BtnGhost href={STRIPE_REWRITE}>Start The Rewrite</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
