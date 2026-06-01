import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealSection,
  QuoteDivider,
  Eyebrow,
  H1,
  H2,
  H3Script,
  BtnPrimary,
  BtnGhost,
} from "@/app/components/ui";
import { SUBSTACK_URL, CONTACT } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "About — MK Parrish",
  description:
    "MK Parrish is a senior growth operator and writer: two decades inside Fortune 50s and startups, $40M+ in pipeline influenced. Websites, outbound, messaging, and growth — one operator, no agency layers.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            About
          </p>
          <div className="mt-6">
            <H1>
              MK{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Parrish
              </span>
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Senior growth operator. Writer. One pair of hands.
          </p>
          <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            Two decades inside Fortune 50s and startups, $40M+ in pipeline influenced. I build the websites, run the outbound, and write the messaging that turn how a company is seen into revenue it can show a board.
          </p>

          {/* Proof band */}
          <div className="mt-12 grid grid-cols-2 gap-px border-t border-graphite bg-graphite sm:grid-cols-4">
            {[
              { num: "$40M+", label: "Pipeline influenced" },
              { num: "2 Decades", label: "Growth + marketing" },
              { num: "32%", label: "Cold reply rates" },
              { num: "1", label: "Operator, no layers" },
            ].map((s) => (
              <div key={s.label} className="bg-void px-5 py-6">
                <p className="font-display text-3xl tracking-[0.02em] text-petal md:text-4xl">{s.num}</p>
                <p className="mt-2 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>The story</Eyebrow>
            <H2>
              I started as a writer.{" "}
              <span className="text-petal">Then I learned to move revenue.</span>
            </H2>
            <H3Script>Most people who can write can&apos;t build. Most who can build can&apos;t write. I do both.</H3Script>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Website Design",
                "Outbound & Appointment Setting",
                "Growth Marketing",
                "Brand Messaging",
                "Executive Ghostwriting",
                "Fractional Growth",
              ].map((tag) => (
                <span
                  key={tag}
                  className="border border-petal/25 bg-petal/[0.06] px-4 py-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-petal"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "66ch" }}>
            <p>
              I spent two decades inside marketing and growth — Fortune 50 companies, funded startups, and everything between. I influenced over $40M in pipeline, ran demand across B2B and consumer, and built the systems that put qualified buyers in front of sales teams. Not activity reports. Revenue.
            </p>
            <p>
              Most agencies sell you a senior name on the pitch and junior work on the deliverable. I am the opposite: one operator who does the thinking and the shipping. I design and build the website, write the cold outreach, run the campaigns, and read the numbers. No account managers, no hand-offs, no telephone game between a strategist, a designer, and a writer who never speak.
            </p>
            <p>
              The reason that works is the rare combination. I write — really write, every sentence — and I can build the funnel underneath it. So the positioning, the copy, the site, and the pipeline all say the same thing and pull in the same direction. That is where most companies leak: the words say one thing, the machine does another.
            </p>
            <p>
              I work with B2B SaaS teams, agencies, and growth-stage companies that need a senior partner who ships — on retainer, by project, or fractional, with rev-share available for the right outbound engagement. If how your company is seen does not match what it has become, that gap is exactly the work.
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={0} />

      {/* ── WHAT I BELIEVE ───────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>How I work</Eyebrow>
        <H2>
          The things I will{" "}
          <span className="text-petal">not compromise on.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Specificity over safety",
              desc: "Generic copy is safe. It is also invisible. The copy that works names the problem with precision and says something that sounds like a real person thought it.",
            },
            {
              title: "Voice before volume",
              desc: "More content is not the answer. A stronger point of view is. I would rather write one piece that earns attention than twenty that disappear.",
            },
            {
              title: "Strategy before execution",
              desc: "The writing has to come from somewhere. Positioning, narrative, and intent come first. Then the words.",
            },
            {
              title: "Pipeline is the proof",
              desc: "Marketing should move money, not look busy. I measure the work against booked calls and revenue — not impressions, not slide decks.",
            },
            {
              title: "AI-native, taste-led",
              desc: "I use an agent stack to ship a team's output as one operator — but judgment, voice, and the actual writing are mine. Leverage on the production, taste on the part that matters.",
            },
            {
              title: "One operator, one accountable name",
              desc: "No account managers, no junior hand-offs. The person who sets the strategy is the person who ships the work and owns the outcome.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-void p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={8} />

      {/* ── CONNECT ──────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="03">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Let&apos;s talk</Eyebrow>
            <H2>
              Where to{" "}
              <span className="text-petal">find me.</span>
            </H2>
            <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              The best way to start is a conversation. Book a call, send an email, or find me on LinkedIn. I read everything.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/book">Book a Call</BtnPrimary>
              <BtnGhost href={`mailto:${CONTACT.email}`}>Send an Email</BtnGhost>
            </div>
          </div>

          <div className="grid gap-px bg-graphite sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { label: "LinkedIn", value: "/in/mkparrish", href: CONTACT.linkedin },
              { label: "The Margins", value: "mkparrishthemargins.substack.com", href: SUBSTACK_URL },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="bg-obsidian p-6 transition-colors hover:bg-carbon"
              >
                <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">{c.label}</p>
                <p className="mt-2 font-body text-sm text-pearl">{c.value}</p>
              </a>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── QUICK LINKS ──────────────────────────────────────────── */}
      <section className="bg-void" style={{ padding: "clamp(4rem, 8vw, 8rem) 0" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Where to start
          </p>
          <div className="mt-8 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Design & Build Your Site", href: "/studio" },
              { label: "Fill Your Pipeline", href: "/growth" },
              { label: "Rewrite Your Messaging", href: "/brand" },
              { label: "Book a Call", href: "/book" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between bg-void px-6 py-5 transition-colors hover:bg-carbon"
              >
                <span className="font-body text-sm font-light text-smoke transition-colors group-hover:text-pearl">
                  {link.label}
                </span>
                <span className="text-iron transition-transform duration-300 group-hover:translate-x-1 group-hover:text-petal">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
