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
import { PATREON_URL, CONTACT } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "About — MK Parrish",
  description:
    "MK Parrish is a writer and strategist obsessed with the space between who people really are and how the world reads them.",
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
            Writer and strategist.
          </p>
          <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Obsessed with the space between who people really are and how the world reads them.
          </p>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>The story</Eyebrow>
            <H2>
              I started as a{" "}
              <span className="text-petal">writer.</span>
            </H2>
            <H3Script>That never changed. What changed is what I built around it.</H3Script>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Copywriting",
                "Ghostwriting",
                "Brand Voice",
                "Career Positioning",
                "Thought Leadership",
                "Reinvention Strategy",
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
              I grew up in New York. I have been writing since before I knew writing was something you could do as a job. What started as a compulsion became a craft, and the craft became a career that has crossed industries, functions, and identities more than once.
            </p>
            <p>
              I spent a decade inside marketing and growth. Fortune 50 companies, scrappy startups, and everything in between. I influenced over $40M in pipeline, led campaigns across B2B and consumer, and built demand gen systems for teams who needed results, not just activity reports. Along the way, I noticed that the gap between companies that convert and companies that just look busy almost always came down to the words.
            </p>
            <p>
              I reinvented myself more than once. Not as a pivot, but as a sharpening. I know what it is to lose certainty about who you are professionally and come out the other side with more precision, more conviction, and a story that finally holds. That experience lives in every engagement. I do not write generic. I do not build noise. I write the story that was always there, but never quite said right.
            </p>
            <p>
              My clients are founders who need a voice, professionals in transition who need new language for a new chapter, executives who need someone to hold both the strategy and the sentence, and anyone who has ever felt sharper than the copy representing them online. I work ghost or credited, retained or project-based. If the words are not doing their job, that is where I come in.
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
              title: "No AI in the work",
              desc: "I write everything. Every sentence is thought about, not generated. If you wanted machine output, you would not need me.",
            },
            {
              title: "Honesty over flattery",
              desc: "I will tell you when the old story is not working. I will tell you what it is actually saying. That is part of the service.",
            },
            {
              title: "The real thing, finally said right",
              desc: "Reinvention is not about inventing a new identity. It is about finally presenting the real one with precision, nerve, and taste.",
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
              { label: "The Margins", value: "patreon.com/mkparrish", href: PATREON_URL },
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
              { label: "Rewrite Your Career", href: "/career" },
              { label: "Rewrite Your Brand", href: "/brand" },
              { label: "Rewrite Your Presence", href: "/presence" },
              { label: "Rewrite Your Next Chapter", href: "/next-chapter" },
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
