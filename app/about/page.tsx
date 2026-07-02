import type { Metadata } from "next";
import Link from "next/link";
import AuthorGlow from "@/app/components/AuthorGlow";
import { RevealSection, Eyebrow, H1, H2, BtnPrimary, BtnGhost } from "@/app/components/ui";
import { CONTACT } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "About — MK Parrish",
  description:
    "MK Parrish is a senior growth operator focused on positioning, conversion websites, outbound systems, and B2B growth strategy.",
};

const services = [
  "Positioning and messaging",
  "Conversion websites",
  "Outbound systems",
  "Demand generation",
  "Executive content",
  "Growth consulting",
];

const principles = [
  {
    title: "Specific before clever",
    desc: "A buyer should understand the offer before they admire the copy.",
  },
  {
    title: "Strategy before output",
    desc: "Positioning, proof, and intent come first. Then the page, campaign, or content gets built.",
  },
  {
    title: "One accountable owner",
    desc: "No junior handoffs or hidden layers. The person setting the strategy is the person shipping the work.",
  },
  {
    title: "Revenue over activity",
    desc: "The work should support clearer conversion, stronger sales conversations, and business growth.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[70vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.14),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-8">
            <div className="min-w-0 max-w-3xl">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">About</p>
              <div className="mt-6">
                <H1>
                  MK{" "}
                  <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                    Parrish
                  </span>
                </H1>
              </div>
            </div>
            <AuthorGlow size={132} ring={4} priority className="md:ml-auto" />
          </div>

          <p className="mt-7 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Senior growth operator. Positioning, websites, outbound, and messaging.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
            I help B2B companies clarify how they show up, sharpen what they say, and build assets that support qualified opportunities.
          </p>
        </div>
      </section>

      <RevealSection bg="carbon" num="01">
        <Eyebrow>What I do</Eyebrow>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <H2>
              Clearer messaging for{" "}
              <span className="text-petal">better growth.</span>
            </H2>
          </div>
          <div className="space-y-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "66ch" }}>
            <p>
              My work sits at the intersection of positioning, copy, website strategy, outbound, and demand generation.
            </p>
            <p>
              I can define the strategy, write the message, shape the page, build the campaign, and connect the work back to business goals.
            </p>
            <p>
              I work best with founders, lean teams, agencies, and B2B companies that have strong products but unclear messaging or growth motions that need more structure.
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection bg="obsidian" num="02">
        <Eyebrow>Core services</Eyebrow>
        <div className="mt-8 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="bg-void p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{service}</h3>
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection bg="void" num="03">
        <Eyebrow>How I work</Eyebrow>
        <H2>
          Senior thinking, practical execution, and{" "}
          <span className="text-petal">clear ownership.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => (
            <div key={item.title} className="bg-void p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection bg="obsidian" num="04">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Let&apos;s talk</Eyebrow>
            <H2>
              Start with a{" "}
              <span className="text-petal">clear conversation.</span>
            </H2>
            <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              Book a call or send a note with the business problem, the current bottleneck, and what you want the work to change.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/book">Book a Call</BtnPrimary>
              <BtnGhost href={`mailto:${CONTACT.email}`}>Send an Email</BtnGhost>
            </div>
          </div>

          <div className="grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-1">
            {[
              { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { label: "LinkedIn", value: "/in/mkparrish", href: CONTACT.linkedin },
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

      <section className="bg-void" style={{ padding: "clamp(4rem, 8vw, 8rem) 0" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Where to start</p>
          <div className="mt-8 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Design & Build Your Site", href: "/studio" },
              { label: "Fill Your Pipeline", href: "/growth" },
              { label: "Rewrite Your Messaging", href: "/brand" },
              { label: "Book a Call", href: "/book" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="group flex items-center justify-between bg-void px-6 py-5 transition-colors hover:bg-carbon">
                <span className="font-body text-sm font-light text-smoke transition-colors group-hover:text-pearl">{link.label}</span>
                <span className="text-iron transition-transform duration-300 group-hover:translate-x-1 group-hover:text-petal">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
