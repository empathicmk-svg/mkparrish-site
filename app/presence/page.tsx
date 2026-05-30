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
  title: "Company Presence & Thought Leadership — MK Parrish",
  description:
    "Website copy, founder thought leadership, and ongoing content strategy for B2B companies. Every surface that forms an opinion before your first meeting.",
};

const faqItems = [
  {
    q: "What counts as presence work?",
    a: "Anything that shapes an opinion before your first conversation. Company website, founder and executive LinkedIn content, published articles, thought leadership essays, press bios, and ghostwritten pieces under your team's names. If it has your company's name on it and it lives online, it is presence work.",
  },
  {
    q: "What is The Byline?",
    a: "A monthly ghostwriting retainer for founder and executive thought leadership. I write in their voice, under their name, on a consistent publishing schedule. LinkedIn posts, long-form essays, newsletter editions. They review, adjust if needed, and publish. It reads like them — just sharper and more consistent than they have time to make it.",
  },
  {
    q: "How do you capture a founder's or executive's voice?",
    a: "Voice intake session first. We talk for an hour. I listen for the specific way they phrase things, what they genuinely care about, what they refuse to say, and where they overexplain. Then I write a calibration draft they react to. Usually takes one round to get right.",
  },
  {
    q: "Do you write LinkedIn content for company founders?",
    a: "Yes. Founder and executive LinkedIn ghostwriting is the most common engagement under The Byline. Thought leadership posts, long-form essays, and occasional newsletters — published under their name, built to position the company and the person running it.",
  },
  {
    q: "What if we already have a website? Can you just fix the copy?",
    a: "Yes. The Edit covers a single surface. The Rewrite covers one or two pages. You do not need to rebuild the whole site to fix the homepage. If the homepage is the problem, we fix the homepage.",
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
            Website Copy &middot; Thought Leadership &middot; Content Strategy
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
            Your website, your founders' LinkedIn, your published thinking. Every surface that forms an opinion before the first meeting. Right now, each one is either building credibility or bleeding it. I write the copy that makes the right buyer stop and read to the end.
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
            <H3Script>Before the meeting. Before the demo. Before the call.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              The buyer deciding whether to request a demo, the partner deciding whether to make an introduction, the investor deciding whether to take the meeting — they have already visited your website and scanned your founders' profiles. What they found formed an opinion in about eight seconds. That opinion is either working in your favor or costing you the shot.
            </p>
            <p>
              Presence is not the same as activity. Publishing three LinkedIn posts a week is not a strategy if none of it positions the company. The answer is not more content. It is sharper content — written with a specific point of view that makes the right person feel found.
            </p>
            <p>
              I write the copy that makes the right buyer stop scrolling and think: this is exactly what we have been looking for.
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
          <span className="text-petal">precedes the pitch.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-3">
          <ServiceCard
            tag="Quick Fix"
            title="The Edit"
            price="From $250"
            desc="One piece of company presence copy rewritten. Homepage headline, about section, or founder bio. The thing that is clearly not working. Fixed and delivered in days."
            perks={[
              "Homepage headline or about section",
              "Company or founder bio",
              "Speaker or press bio",
              "3 to 5 business day turnaround",
            ]}
            cta="Buy The Edit"
            href={STRIPE_EDIT}
          />
          <ServiceCard
            tag="Ongoing Thought Leadership"
            title="The Byline"
            price="From $2,500/mo"
            desc="Monthly ghostwriting under your founders' and executives' names. LinkedIn posts, essays, and newsletter editions written in their actual voice on a consistent publishing schedule — sharp enough to open doors, consistent enough to build a reputation."
            perks={[
              "4 to 8 pieces per month",
              "Founder and exec LinkedIn content",
              "Long-form essays and thought leadership",
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
            desc="Full company website copy written from positioning strategy to final draft. Every page built to reflect what your business actually does — and to make the right buyer move without requiring a phone call first."
            perks={[
              "Complete website copy",
              "Homepage, about, and product pages",
              "SEO-informed page strategy",
              "Brand voice and messaging alignment",
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
          <span className="text-petal">company appears.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Website Copy", desc: "From homepage to product pages. Every section written with a specific job to do: move a qualified buyer from curious to convinced without requiring a sales call to get there." },
            { title: "Founder LinkedIn Content", desc: "Thought leadership published under your founders' names on a consistent schedule. Built to position the company and the person running it — the kind of content that makes people reach out instead of waiting to be found." },
            { title: "Long-Form Essays", desc: "Published under your team's name on your platform or elsewhere. Writing that does not disappear in 48 hours. It builds authority over months and signals category expertise to the buyers who matter." },
            { title: "Company Newsletter", desc: "A consistent editorial voice for the customers and prospects who have already said yes. Smart, specific, and written in a way that keeps your company in the room between touchpoints." },
            { title: "Press and Speaker Bios", desc: "The version of your company's story that lands in a conference program, a podcast intro, or a media feature. Written to make the right people want to know more." },
            { title: "Pitch and Outreach Copy", desc: "The words that go out before the conversation starts. Specific enough to feel personal. Credible enough to open the right doors without the send-and-hope approach." },
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
            <span className="text-petal">overlooked before the meeting.</span>
          </H2>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            One conversation is enough to figure out where the company's presence is failing and what to do about it.
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
