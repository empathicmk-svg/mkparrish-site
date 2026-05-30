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
  STRIPE_INBOUND_SYSTEM,
  STRIPE_REVENUE_SYSTEMS,
} from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Growth Marketing — MK Parrish",
  description:
    "Full-funnel growth marketing and demand generation for B2B SaaS. Paid, organic, SEO, content, and lifecycle — built and run by one AI-native operator who strategizes, ships, and owns the number. Not an agency.",
};

const tiers = [
  {
    tag: "Outbound",
    title: "The Outbound Engine",
    price: "From $2,500/mo",
    desc: "Qualified calls on your calendar. I build the lists, write the cold email and LinkedIn outreach, run the sends, and handle every reply — so your team talks to buyers, not tire-kickers. Recent campaigns: 32% reply rates. Performance-based and rev-share structures available.",
    perks: [
      "ICP research and clean, targeted lead lists",
      "Cold email and LinkedIn copy that earns replies",
      "Follow-up sequences and reply handling, end to end",
      "Qualified, briefed calls booked into your calendar",
    ],
    cta: "Fill My Calendar",
    href: "/book",
    highlight: false,
  },
  {
    tag: "Most Popular",
    title: "Full-Funnel Growth",
    price: "From $6,500/mo",
    desc: "Acquisition through activation, run as one motion. Paid, organic, and lifecycle wired together with a hyper-experimentation loop that tells you what is working — and what to kill this week.",
    perks: [
      "Paid + organic + lifecycle, orchestrated together",
      "Landing pages, campaigns, and email sequences shipped weekly",
      "Hybrid-motion fluency — PLG layered on SLG, self-serve + assisted",
      "Experiment velocity: test, read the numbers, double down, cut",
      "Positioning and messaging that moves numbers, not slide decks",
    ],
    cta: "Run the Funnel",
    href: STRIPE_INBOUND_SYSTEM,
    highlight: true,
  },
  {
    tag: "Embedded",
    title: "Fractional Growth Lead",
    price: "Custom",
    desc: "I sit on your team and own the number. A senior growth operator who strategizes, ships, and owns the outcome — partnering cleanly with your product and PLG side. Not an agency. Not a strategist who needs a team to execute.",
    perks: [
      "Embedded ownership of the growth function",
      "Agent-orchestrated execution stack, built and run",
      "Full-funnel: demand gen, capture, activation, conversion",
      "Founder-facing — senior enough to own the room",
      "Clean, project-by-project collaboration with your team",
    ],
    cta: "Partner With Me",
    href: STRIPE_REVENUE_SYSTEMS,
    highlight: false,
  },
];

const faqItems = [
  {
    q: "How is this different from hiring an agency?",
    a: "An agency sells you a strategist, a deck, and a pod of juniors who execute it. You get the senior name on the pitch and the junior work on the deliverable. This is the opposite: one senior operator who does the thinking and the shipping. No account managers, no hand-offs, no subcontracting. The person who strategizes is the person who builds the landing page, writes the campaign, and reads the numbers.",
  },
  {
    q: "What channels do you actually run?",
    a: "Whatever fits the motion and the math — paid, organic, SEO, content, and lifecycle. I pick the weapons based on where your demand actually is, not based on what I want to sell you. For an early-stage team with no traffic, that usually starts with organic, founder-led, and SEO. For a funded SLG company layering on PLG, it is often paid plus lifecycle plus a self-serve capture flow. The point is full-funnel coverage, not a single-channel specialty.",
  },
  {
    q: "What does 'AI-native execution' mean in practice?",
    a: "It means a one-to-two-person motion produces what used to take a team of ten. Landing pages, campaign variants, lifecycle sequences, and experiments are built and orchestrated with an agent stack — so the bottleneck becomes judgment and taste, not production capacity. More shots on goal, faster reads, lower cost per experiment. Hyper-experimentation is only possible because the execution is cheap and fast.",
  },
  {
    q: "Do you work with PLG, SLG, or both?",
    a: "Both, and especially the hybrid in between. Most real B2B SaaS motions are not purely one or the other — they are PLG layered on SLG, product-led sales, or self-serve plus an assisted path for larger accounts. I am fluent in those hybrid motions and build demand that feeds whichever path a given segment takes. I also partner well with a dedicated PLG consultant who owns product growth from sign-up onward — clean lanes, shared outcome.",
  },
  {
    q: "Can you partner alongside another consultant or in-house team?",
    a: "Yes — this is often the cleanest model. I run marketing growth and demand; a product-growth partner or your in-house team runs activation, onboarding, and conversion from sign-up forward. Different lanes, same client, one number. Splits and scope are clean and project-by-project. I work the same way with founders who want to keep parts of the function in-house.",
  },
  {
    q: "Who is this not for?",
    a: "Companies that want a vendor to take orders, produce slide decks, or run a single channel in isolation. If you want someone with strong opinions who will disagree with you when the numbers say so, own the outcome, and ship without being managed — that is the fit. If you want a yes-person or an agency to point at when it does not work, it is not.",
  },
];

export default function GrowthPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Growth Marketing &middot; Demand Gen &middot; Full-Funnel
          </p>
          <div className="mt-6">
            <H1>
              Strategize.{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Ship.
              </span>
              <br />
              Own the number.
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            One operator. The whole growth function, built and run end to end.
          </p>
          <div className="mt-6 max-w-2xl">
            <p className="font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
              Demand generation and capture across the channels that fit — paid, organic, SEO, content, lifecycle. AI-native execution and hyper-experimentation: a one-to-two-person motion that runs what used to take ten. For B2B SaaS teams that need demand before anything downstream can work.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href="#systems">See the Offering</BtnPrimary>
            <BtnGhost href="/book">Book a Discovery Call</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── THE GAP ──────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>The gap</Eyebrow>
            <H2>
              They need demand{" "}
              <span className="text-petal">before</span>{" "}
              they need anything else.
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            <p>
              Plenty of teams have the product, the positioning, and the activation flow figured out. What they do not have is anyone showing up at the top of the funnel.
            </p>
            <p>
              An SLG company trying to layer PLG on top still needs a reason for self-serve users to arrive. An early-stage team starting from scratch needs traffic before retention, onboarding, or conversion even matters. You cannot optimize a funnel that nobody enters.
            </p>
            <p>
              That is the work I own: acquisition, demand gen, demand capture — the marketing growth that has to exist before everything downstream has anything to do.
            </p>
            <p>
              I do not hand you a strategy and walk away. I pick the channels, build the assets, run the experiments, and own the number with you.
            </p>
            <div className="mt-8">
              <ArrowLink href="/book">Book a discovery call</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={0} />

      {/* ── HOW I OPERATE ────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>How I operate</Eyebrow>
        <H2>
          A practitioner who{" "}
          <span className="text-petal">ships.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {[
            {
              num: "01",
              title: "Operator, not agency",
              desc: "Operator background, not an agency career. The person who strategizes is the person who builds the landing page, writes the campaign, and reads the numbers. No pods, no hand-offs, no subcontracting.",
            },
            {
              num: "02",
              title: "AI-native, hyper-experimental",
              desc: "A one-to-two-person motion orchestrated through an agent stack — landing pages, campaigns, and lifecycle that used to take ten people. Cheap experiments, fast reads, more shots on goal.",
            },
            {
              num: "03",
              title: "Owns the outcome",
              desc: "Strong opinions, comfortable disagreeing with you, allergic to fluff. Senior enough to sit across from a founder and own the room. I hold my own output to a higher bar than anyone else would set.",
            },
          ].map((item) => (
            <div key={item.num} className="bg-obsidian p-8">
              <p className="font-mono text-xs tracking-[0.2em] text-iron">{item.num}</p>
              <h3 className="mt-5 font-display text-2xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={3} />

      {/* ── TIERS ────────────────────────────────────────────────── */}
      <RevealSection id="systems" bg="obsidian" num="03">
        <Eyebrow>The offering</Eyebrow>
        <H2>
          Three ways to{" "}
          <span className="text-petal">put me on it.</span>
        </H2>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          Start where the gap is. Scale when the motion proves itself. Every tier is full-funnel — the difference is how much of it I own and how deep I sit on your team.
        </p>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {tiers.map((t) => (
            <ServiceCard key={t.title} {...t} />
          ))}
        </div>

        <div className="mt-10 border-t border-graphite pt-8">
          <p className="font-body text-sm font-light text-smoke">
            Every engagement starts with a discovery call. No contracts without a fit conversation first.
          </p>
          <a
            href="/book"
            className="mt-4 inline-block font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors hover:text-blush"
          >
            Book a discovery call &rarr;
          </a>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <RevealSection bg="void" num="04">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>The process</Eyebrow>
            <H2>
              How the{" "}
              <span className="text-petal">motion gets built.</span>
            </H2>
            <H3Script>Pick the weapons. Ship fast. Read the numbers. Compound.</H3Script>
          </div>
          <div className="space-y-px bg-graphite">
            {[
              { step: "01", title: "Map the Motion", desc: "Where demand actually is, which channels fit the math, and how the funnel hands off to activation and sales. PLG, SLG, or the hybrid in between — the motion gets defined before a dollar is spent or a page is built." },
              { step: "02", title: "Stand Up the Channels", desc: "The weapons that fit get built and launched — paid, organic, SEO, content, lifecycle. Landing pages and campaigns shipped, not specced. The agent stack that runs them gets wired up so execution is fast and cheap." },
              { step: "03", title: "Run Experiments", desc: "Hyper-experimentation against real numbers. Multiple variants, fast reads, ruthless cuts. What works gets more budget; what does not gets killed the same week. Velocity is the advantage." },
              { step: "04", title: "Wire the Capture", desc: "Demand without capture is awareness that evaporates. Opt-in flows, lifecycle sequences, and self-serve paths built to convert the traffic into pipeline — and to feed whatever activation motion sits downstream." },
              { step: "05", title: "Own the Number", desc: "Pipeline and CAC tracked against the goal, weekly. Attribution clear enough to make decisions from. The motion compounds because every iteration is informed by data — and because one operator owns the whole loop." },
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

      {/* ── PARTNERSHIP MODEL ────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="05">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>The model</Eyebrow>
            <H2>
              Clean lanes.{" "}
              <span className="text-petal">Shared number.</span>
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            <p>
              I work well as the marketing-growth half of a two-operator motion. A product-growth or PLG partner owns everything from sign-up forward — onboarding, activation, conversion. I own everything before it — demand gen, capture, the top of the funnel.
            </p>
            <p>
              Different lanes, same client, one outcome. Trust on both sides. Splits stay clean and project-by-project. I bring counterparts in with me rather than referring clients out, and I plug into the same arrangement on the other side.
            </p>
            <p>
              It is a partnership, not a hire. If you are a consultant who keeps hitting the same gap — prospects who need demand before they need you — that is exactly the seam I fill.
            </p>
            <div className="mt-8">
              <ArrowLink href="/contact">Talk about a partnership</ArrowLink>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={6} />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <RevealSection bg="void" num="06">
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
              Build the demand.{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.3)" }}>
                Own the number.
              </span>
            </H2>
          </div>
          <p className="mx-auto mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "54ch" }}>
            A 30-minute discovery call to map the gap, the motion, and which way of working fits where you are right now.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">Book a Discovery Call</BtnPrimary>
            <BtnGhost href="/contact">Get in Touch</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
