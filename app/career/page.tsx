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
  title: "Leadership & Executive Positioning — MK Parrish",
  description:
    "Founder stories, executive bios, and leadership team positioning for B2B companies. When your team is the product, the words have to earn it.",
};

const faqItems = [
  {
    q: "Who is this for?",
    a: "B2B companies whose founders, executives, or senior team members are active in public-facing roles — investor conversations, sales outreach, partnership development, speaking, or media. If your VP of Sales is cold outreaching and their LinkedIn still describes the last company, that gap is costing you deals.",
  },
  {
    q: "What does The Edit cover?",
    a: "One piece of leadership copy: a founder or exec LinkedIn headline and about section, an executive bio, a speaker profile, or a short positioning statement. Delivered within 3 to 5 business days. Scoped and specific — no strategy session required to get started.",
  },
  {
    q: "What does The Rewrite cover?",
    a: "A full leadership narrative overhaul for one or two key team members. LinkedIn rebuilt from scratch, career and authority narrative written to reflect where they are now, plus a 30-minute strategy session to anchor all of it.",
  },
  {
    q: "Can you position a full leadership team?",
    a: "Yes. The New Chapter scope covers complete executive team positioning — aligned voice, consistent messaging, and bios that work together to tell a coherent story about the company and its leadership. Particularly valuable for funding milestones, partnership plays, or company relaunches.",
  },
  {
    q: "How long does it take?",
    a: "The Edit: 3 to 5 business days. The Rewrite: 7 to 10 business days from our strategy session. The New Chapter: 3 to 4 weeks depending on scope. Timeline is confirmed at the start of every engagement.",
  },
];

export default function CareerPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Leadership Positioning &middot; Founder Story &middot; Executive Narrative
          </p>
          <div className="mt-6">
            <H1>
              Rewrite Your{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Leadership
              </span>
            </H1>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Your founders and executives are one of your best marketing assets. Right now, their LinkedIn profiles and bios are probably describing who they were at the last company instead of what they are building at yours. That gap is visible to every investor, customer, and partner who looks them up.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={STRIPE_REWRITE}>Start The Rewrite</BtnPrimary>
            <BtnGhost href="/book">Book a Call First</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Why it matters</Eyebrow>
            <H2>
              Your leadership is not the{" "}
              <span className="text-petal">problem.</span>
            </H2>
            <H3Script>How people are reading them is.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>Strong leaders with weak copy are still losing the room before they walk into it. The track record is there. The words are not earning it. Those are not the same problem — and only one of them takes a week to fix.</p>
            <p>
              The investors, partners, and customers deciding whether to take the meeting have already Googled your team. What they found formed an opinion before anyone picked up the phone. That online presence is standing in for a full conversation. It needs to be written like one.
            </p>
            <p>Leadership positioning is not a bio exercise. It is a strategic asset. I approach it the way I would approach any high-stakes campaign, because that is exactly what it is. Your team has built something real. The words should make that legible.</p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={0} />

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Leadership positioning services</Eyebrow>
        <H2>
          Choose your{" "}
          <span className="text-petal">scope.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-3">
          <ServiceCard
            tag="Quick Fix"
            title="The Edit"
            price="From $250"
            desc="One piece of leadership copy rewritten with precision. Founder or exec LinkedIn, executive bio, or positioning blurb. You know what is broken. This fixes it, fast."
            perks={[
              "Founder or exec LinkedIn headline and about",
              "Executive or speaker bio",
              "Short positioning statement",
              "3 to 5 business day turnaround",
            ]}
            cta="Buy The Edit"
            href={STRIPE_EDIT}
          />
          <ServiceCard
            tag="Most Requested"
            title="The Rewrite"
            price="From $2,500"
            desc="Full leadership narrative overhaul for one or two key team members. LinkedIn rebuilt from scratch, authority story rewritten to reflect the company you are running today, anchored in a 30-minute strategy session."
            perks={[
              "Full LinkedIn overhaul",
              "Founder or executive narrative",
              "Authority and credibility reframe",
              "30-minute strategy session",
            ]}
            cta="Start The Rewrite"
            href={STRIPE_REWRITE}
            highlight
          />
          <ServiceCard
            tag="Full Team"
            title="The New Chapter"
            price="Custom"
            desc="Complete executive team positioning. Aligned messaging, consistent voice, and bios that work together to tell a coherent story about the company and the people running it. For funding milestones, relaunches, and partnership plays."
            perks={[
              "Full executive team positioning",
              "Aligned leadership narrative",
              "Investor-ready founder story",
              "Press and pitch copy",
            ]}
            cta="Let's Talk"
            href="/book"
          />
        </div>
      </RevealSection>

      <QuoteDivider index={6} />

      {/* ── WHAT GETS REWRITTEN ──────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>What changes</Eyebrow>
        <H2>
          Every word that{" "}
          <span className="text-petal">represents your team.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Founder LinkedIn", desc: "The profile that gets checked before every investor call, partnership conversation, and inbound inquiry. Rewritten to position the founder as a credible, specific operator — not just a resume." },
            { title: "Executive Bio", desc: "Third-person copy that does not read like it was written by a committee. Built for press features, conference programs, board decks, and anywhere credibility needs to land fast." },
            { title: "About Section", desc: "The first real thing people read about your team when they decide whether to take the meeting. Rewritten to reflect the company you have built, not the one you described in the pitch deck." },
            { title: "Leadership Narrative", desc: "The connective thread between your team's backgrounds and what you are building now. Surfaced and framed as a deliberate arc — not a list of previous employers." },
            { title: "Authority Statement", desc: "One or two sentences that name what each leader does, who they do it for, and why they are the specific person to do it. The thing that makes a cold intro land like a warm one." },
            { title: "Outreach and Pitch Copy", desc: "Executive outreach that does not read as templated. Specific, credible, and written to open real conversations with the people worth having them with." },
          ].map((item) => (
            <div key={item.title} className="bg-obsidian p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={7} />

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
            Ready to{" "}
            <span className="text-petal">reposition your leadership?</span>
          </H2>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Start with The Edit if you know exactly what is broken and want it fixed fast. Start with a call if you need to map the full scope first.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href={STRIPE_EDIT}>Buy The Edit</BtnPrimary>
            <BtnGhost href="/book">Book a Call</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
