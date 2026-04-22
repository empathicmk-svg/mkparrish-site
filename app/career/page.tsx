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
    a: "Executives stepping into new roles, professionals switching industries, and people whose work has outpaced the story they are still telling about themselves. If you would be embarrassed to send someone to your LinkedIn right now, that is the starting point.",
  },
  {
    q: "What does The Edit cover?",
    a: "One piece of career copy: LinkedIn headline and about section, executive bio, speaker profile, or a short positioning statement. Delivered within 3 to 5 business days. It is scoped, specific, and does not require a strategy session to get started.",
  },
  {
    q: "What does The Rewrite cover?",
    a: "A full career narrative overhaul. LinkedIn headline, about section, and experience framing, plus a positioning statement and 30-minute strategy session. For people who need the whole story to change, not just one section of it.",
  },
  {
    q: "Do you work with people changing industries?",
    a: "Yes. Industry pivots are some of the most interesting work I do. The challenge is never inventing a new story. It is finding the real thread between what you have done and where you are going, and writing it in a way that makes the transition feel intentional instead of improvised.",
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
            Your LinkedIn was written during a different job search for a different version of your career. The work has moved. The words have not. That gap is visible to every recruiter, hiring manager, and potential partner who looks you up and moves on.
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
            <p>A strong professional with weak copy is still losing the consideration set. The work is there. The words are not earning it. Those are not the same problem, and only one of them takes a week to fix.</p>
            <p>
              The people hiring, promoting, and deciding whether to introduce you are forming opinions from 220 characters and whatever shows up before &quot;see more.&quot; That content is standing in for a full conversation. It needs to be written like one.
            </p>
            <p>Career copy is not a summary. It is positioning. I approach it the way I would approach any high-stakes campaign, because that is exactly what it is. Your career has generated $40M+ in value for someone. The words should reflect that.</p>
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
            desc="One piece of career copy rewritten with precision. LinkedIn headline and about, executive bio, or positioning blurb. You know what is broken. This fixes it, fast."
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
            desc="Full career story overhaul. LinkedIn rebuilt from scratch, positioning narrative written to reflect where you actually are now, and a 30-minute strategy session to anchor all of it."
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
            desc="For industry pivots, full professional reinventions, and transitions where a sharpened LinkedIn is not enough. We build the narrative thread from where you have been to where you are going, and write it so the arc feels earned."
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
            { title: "LinkedIn Headline", desc: "The 220 characters that trail your name everywhere online. Most are job titles with a pipe symbol. Yours becomes a positioning statement." },
            { title: "About Section", desc: "The first real thing people read when they decide to take you seriously. Rewritten to reflect the career you have, not the one you were pitching five years ago." },
            { title: "Executive Bio", desc: "Third-person that does not read like it was written by a committee. Built for speaking engagements, press features, board profiles, and anywhere credibility needs to land fast." },
            { title: "Career Narrative", desc: "The connective tissue between your roles, surfaced and reframed as a deliberate arc. Not a list of jobs. A story with a point." },
            { title: "Positioning Statement", desc: "One or two sentences that name what you do, who it is for, and why you are the specific person to do it. The thing you say when someone asks what you do and actually means it." },
            { title: "Outreach Copy", desc: "Cold emails and LinkedIn messages that do not read as cold. Specific, human, and written to start real conversations with people worth having them with." },
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
            Start with The Edit if you know exactly what is broken and want it fixed fast. Start with a call if you need to figure out where the story went sideways.
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
