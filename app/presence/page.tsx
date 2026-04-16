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
import { STRIPE_EDIT, STRIPE_BYLINE } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Rewrite Your Presence — MK Parrish",
  description:
    "Website copy, public bios, and ongoing thought leadership for people who want to stop being scrolled past. Ghostwriting and presence strategy.",
};

const faqItems = [
  {
    q: "What counts as presence work?",
    a: "Anything that shows up when someone searches your name or finds you online. Website copy, LinkedIn content, published articles, press bios, speaker descriptions, and any ghostwritten thought leadership you put your name on.",
  },
  {
    q: "What is The Byline?",
    a: "A monthly ghostwriting retainer. I write in your voice, under your name, on a consistent publishing schedule. LinkedIn posts, essays, newsletter editions. You review and post. It reads like you, but sharper.",
  },
  {
    q: "How do you capture someone's voice?",
    a: "I start with a voice intake session. We talk. I listen for the specific way you phrase things, what you care about, what you refuse to say, and what you overexplain. Then I write a sample you can react to. We calibrate from there.",
  },
  {
    q: "Do you write LinkedIn content?",
    a: "Yes. LinkedIn ghostwriting is the most common engagement under The Byline. I write posts, thought leadership essays, and occasional newsletters. You review, adjust if needed, and publish.",
  },
  {
    q: "What if I already have a website? Can you just fix the copy?",
    a: "Yes. The Edit or The Rewrite can cover individual pages or sections. You do not need to rebuild the whole site to fix what the words are doing.",
  },
];

export default function PresencePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Website Copy &middot; Ghostwriting &middot; Thought Leadership
          </p>
          <div className="mt-6">
            <H1>
              Rewrite Your{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Presence
              </span>
            </H1>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Your website, LinkedIn, bio, and byline. Every surface that exists before you speak. Right now each one is either earning trust or losing it. I write the copy that makes people stop.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={STRIPE_BYLINE}>Start The Byline</BtnPrimary>
            <BtnGhost href="/book">Book a Call First</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>The reality</Eyebrow>
            <H2>
              They decide in{" "}
              <span className="text-petal">seconds.</span>
            </H2>
            <H3Script>Before the meeting. Before the pitch. Before the call.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              The person deciding whether to hire you, partner with you, or follow you has already looked you up. What they found formed an opinion. That opinion is either working in your favor or costing you quietly.
            </p>
            <p>
              Presence is not the same as activity. Posting more is not the answer. Publishing sharper, positioning smarter, and showing up with a point of view that is unmistakably yours is the answer.
            </p>
            <p>
              I write the copy that makes someone stop and say: this is exactly who I have been looking for.
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Presence services</Eyebrow>
        <H2>
          Build a presence that{" "}
          <span className="text-petal">precedes you.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-3">
          <ServiceCard
            tag="Quick Fix"
            title="The Edit"
            price="From $100"
            desc="One piece of presence copy rewritten. Bio, about page, or homepage headline. Delivered sharp and fast."
            perks={[
              "Website bio or about section",
              "Speaker or press bio",
              "Homepage headline and subtext",
              "3 to 5 business day turnaround",
            ]}
            cta="Buy The Edit"
            href={STRIPE_EDIT}
          />
          <ServiceCard
            tag="Ongoing Visibility"
            title="The Byline"
            price="From $1,500/mo"
            desc="Monthly ghostwriting under your name. LinkedIn posts, essays, and newsletter editions written in your voice on a consistent schedule."
            perks={[
              "4 to 8 pieces per month",
              "LinkedIn posts and thought leadership",
              "Long-form essays or newsletters",
              "Strategic editorial direction",
            ]}
            cta="Start The Byline"
            href={STRIPE_BYLINE}
            highlight
          />
          <ServiceCard
            tag="Full Website"
            title="The New Chapter"
            price="Custom"
            desc="Full website copy written from strategy to final draft. Homepage, about, services, and any additional pages your site needs."
            perks={[
              "Complete website copy",
              "Homepage, about, and services",
              "SEO-informed page strategy",
              "Voice and messaging alignment",
            ]}
            cta="Let's Talk"
            href="/book"
          />
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── WHAT GETS WRITTEN ────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <Eyebrow>Surfaces</Eyebrow>
        <H2>
          Every place your{" "}
          <span className="text-petal">name appears.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Website Copy", desc: "From homepage to about page. Every section written to move someone from curious to convinced." },
            { title: "LinkedIn Content", desc: "Thought leadership posts written in your voice, on a schedule that builds presence without burning you out." },
            { title: "Long-Form Essays", desc: "Published under your name on your platform or elsewhere. The kind of writing that builds reputation over time." },
            { title: "Speaker and Press Bio", desc: "The version of your story that reads well in a conference program, a podcast intro, or a media mention." },
            { title: "Newsletter Copy", desc: "A consistent editorial voice for your subscribers. Smart, specific, and worth opening." },
            { title: "Pitch and Outreach Copy", desc: "The words you send before the conversation starts. Written to open doors, not beg for them." },
          ].map((item) => (
            <div key={item.title} className="bg-obsidian p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={9} />

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
            Stop being{" "}
            <span className="text-petal">scrolled past.</span>
          </H2>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            One conversation is enough to figure out where the copy is failing and what to do about it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href="/book">Book a Call</BtnPrimary>
            <BtnGhost href={STRIPE_EDIT}>Start with The Edit</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
