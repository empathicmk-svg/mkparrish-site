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
  title: "Rewrite Your Career — MK Parrish",
  description:
    "Career repositioning, LinkedIn overhauls, and professional story rewrites for people who have outgrown how the world is currently reading them.",
};

const faqItems = [
  {
    q: "Who is this for?",
    a: "Professionals changing industries, executives stepping into new roles, and people whose work has outpaced the story they are still telling about themselves. If your LinkedIn was written three years ago for a job you no longer want, we start there.",
  },
  {
    q: "What does The Edit cover?",
    a: "A single piece of career copy: LinkedIn headline and summary, executive bio, speaker profile, or short positioning statement. Delivered within 5 business days.",
  },
  {
    q: "What does The Rewrite cover?",
    a: "A full career narrative overhaul: LinkedIn headline, about section, and experience copy, plus a positioning statement and 30-minute strategy session. This is for people who need the whole story to change, not just one section.",
  },
  {
    q: "Do you work with people changing industries?",
    a: "Yes. Career pivots are some of my most interesting engagements. The challenge is not inventing a new story. It is finding the connective tissue between what you have done and where you are going, and writing it in a way that makes that thread feel inevitable.",
  },
  {
    q: "How long does it take?",
    a: "The Edit: 3 to 5 business days. The Rewrite: 7 to 10 business days from our strategy session. The New Chapter: 3 to 4 weeks depending on scope.",
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
            Career &middot; Positioning &middot; Professional Story
          </p>
          <div className="mt-6">
            <H1>
              Rewrite Your{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Career
              </span>
            </H1>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Your LinkedIn was probably written during a different job search for a different version of your career. The work has moved. The words have not. That gap is visible to everyone evaluating you.
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
              Your career is not the{" "}
              <span className="text-petal">problem.</span>
            </H2>
            <H3Script>How people are reading it is.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>A strong professional with a weak LinkedIn is still being passed over. The work is there. The copy is not showing it. Those are not the same problem, and only one of them can be fixed in a week.</p>
            <p>
              The people hiring, promoting, and deciding whether to introduce you are forming opinions from 220 characters and the first three lines before "see more." That content is doing the work of a full conversation. Most of the time it is not written well enough to win that conversation.
            </p>
            <p>Career copy is not a summary. It is positioning. I write it the way I would write any high-stakes campaign, because that is exactly what it is.</p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={0} />

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Career services</Eyebrow>
        <H2>
          Choose your{" "}
          <span className="text-petal">scope.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-3">
          <ServiceCard
            tag="Quick Fix"
            title="The Edit"
            price="From $100"
            desc="One piece of career copy rewritten sharply. LinkedIn headline and about, executive bio, or positioning blurb. Fast, precise, done."
            perks={[
              "LinkedIn headline and about section",
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
            price="From $1,500"
            desc="Full career story overhaul. LinkedIn from top to bottom, positioning narrative, and a 30-minute strategy session to anchor the work."
            perks={[
              "Full LinkedIn overhaul",
              "Career narrative and through-line",
              "Experience and skills reframing",
              "30-minute strategy session",
            ]}
            cta="Start The Rewrite"
            href={STRIPE_REWRITE}
            highlight
          />
          <ServiceCard
            tag="Full Reset"
            title="The New Chapter"
            price="Custom"
            desc="For career pivots, industry transitions, and full professional reinventions. We build the story that connects where you have been to where you are going."
            perks={[
              "Career pivot narrative",
              "Full professional repositioning",
              "Resume narrative strategy",
              "Outreach and pitch copy",
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
          <span className="text-petal">represents you.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "LinkedIn Headline", desc: "The 220 characters that follow your name everywhere. Rewritten to position, not just describe." },
            { title: "About Section", desc: "The narrative core of your professional presence. Rewritten to sound like someone worth hiring." },
            { title: "Executive Bio", desc: "Third-person voice done right. For speaking engagements, press, boards, and credibility." },
            { title: "Career Narrative", desc: "The invisible connective tissue between your roles, reframed as an intentional arc." },
            { title: "Positioning Statement", desc: "One or two sentences that capture what you do, who it is for, and why you are the one to do it." },
            { title: "Outreach Copy", desc: "Cold emails and DMs that do not feel cold. Warm, precise, and written to open conversations." },
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
            <span className="text-petal">rewrite?</span>
          </H2>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Start with The Edit if you want something sharp and fast. Start with a call if you are not sure where the story broke.
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
