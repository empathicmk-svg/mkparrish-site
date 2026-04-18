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
    a: "Anything that shows up when someone searches your name or finds you online before a conversation. Website copy, LinkedIn content, published articles, press bios, speaker descriptions, ghostwritten essays. If it has your name on it and it lives on the internet, it is presence work.",
  },
  {
    q: "What is The Byline?",
    a: "A monthly ghostwriting retainer. I write in your voice, under your name, on a consistent publishing schedule. LinkedIn posts, long-form essays, newsletter editions. You review, adjust if needed, and publish. It reads like you. Just sharper and more consistent than you have time to make it.",
  },
  {
    q: "How do you capture someone's voice?",
    a: "Voice intake session first. We talk for an hour. I listen for the specific way you phrase things, what you genuinely care about, what you refuse to say, and where you overexplain because you are not sure how much context to give. Then I write a calibration draft you react to. Usually takes one round.",
  },
  {
    q: "Do you write LinkedIn content?",
    a: "Yes. LinkedIn ghostwriting is the most common engagement under The Byline. Posts, thought leadership essays, occasional newsletters. You review, adjust if anything feels off, and publish. Clients have grown audiences from hundreds to tens of thousands doing this.",
  },
  {
    q: "What if I already have a website? Can you just fix the copy?",
    a: "Yes. The Edit covers a single surface. The Rewrite covers one or two pages. You do not need to rebuild the whole site. If the homepage is the problem, we fix the homepage.",
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
            Your website, LinkedIn, bio, and byline. Every surface that forms an opinion before you speak. Right now, each one is either earning trust or bleeding it. Most are doing the latter. I write the copy that makes someone stop and read to the end.
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
              The person deciding whether to hire you, follow you, or reach out has already looked you up. What they found formed an opinion in about eight seconds. That opinion is either working in your favor or costing you deals you will never know you lost.
            </p>
            <p>
              Presence is not the same as activity. Posting three times a week is not a strategy if none of it positions you. The answer is not more content. It is sharper content, written with a point of view that is specific enough to be unmistakably yours.
            </p>
            <p>
              I write the copy that makes the right person stop scrolling and think: this is exactly who I have been looking for.
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
            desc="One piece of presence copy rewritten. Bio, about page, or homepage headline. The thing that has been bothering you. Fixed and delivered in days."
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
            desc="Monthly ghostwriting under your name. LinkedIn posts, essays, and newsletter editions written in your actual voice by someone who has been doing this for 10 years. Consistent enough to build an audience. Sharp enough that people save and share it."
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
            desc="Full website copy written from positioning strategy to final draft. Every page built to reflect who you actually are, not who you were when the last version launched."
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
            { title: "Website Copy", desc: "From homepage to about page. Every section written with a specific job to do: move someone from curious to convinced without requiring a phone call first." },
            { title: "LinkedIn Content", desc: "Thought leadership posts written in your voice on a publishing schedule. Built to position, not just to post. The kind of content that makes people save it and come back." },
            { title: "Long-Form Essays", desc: "Published under your name on your platform or elsewhere. The kind of writing that does not disappear in 48 hours. It builds reputation over months and years." },
            { title: "Speaker and Press Bio", desc: "The version of your story that lands in a conference program, a podcast intro, or a media feature. Written to make the right people want to know more." },
            { title: "Newsletter Copy", desc: "A consistent editorial voice for the people who have already said yes. Smart, specific, and written in a way that makes opening it feel worth it." },
            { title: "Pitch and Outreach Copy", desc: "The words you send before the conversation starts. Specific enough to feel personal. Confident enough to open the right doors." },
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
