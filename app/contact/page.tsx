import type { Metadata } from "next";
import {
  RevealSection,
  Eyebrow,
  H1,
  H2,
  BtnPrimary,
  ArrowLink,
} from "@/app/components/ui";
import { CALENDLY_URL, PATREON_URL, CONTACT, STRIPE_EDIT, STRIPE_REWRITE } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Contact — MK Parrish",
  description:
    "Tell me what needs rewriting. Book a call, send an email, or start with a service directly.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.12),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Contact
          </p>
          <div className="mt-6">
            <H1>
              Tell me what{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                needs rewriting.
              </span>
            </H1>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
            No intake forms. No agency layers. You talk to me directly, and I tell you exactly what I think.
          </p>
        </div>
      </section>

      {/* ── CONTACT OPTIONS ──────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-px bg-graphite md:grid-cols-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="group bg-obsidian p-10 transition-colors hover:bg-carbon"
          >
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-iron">Best option</p>
            <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-pearl transition-colors group-hover:text-white">
              Book a Call
            </h3>
            <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
              30 minutes. No pitch. We figure out what needs fixing, whether I am the right person for it, and what makes sense as a starting point.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors group-hover:text-blush">
              Schedule on Calendly
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </span>
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="group bg-obsidian p-10 transition-colors hover:bg-carbon"
          >
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-iron">Direct line</p>
            <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-pearl transition-colors group-hover:text-white">
              Send an Email
            </h3>
            <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
              Tell me what you are working on and what is not working. I read everything and respond to the ones that are a good fit.
            </p>
            <span className="mt-6 inline-block font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors group-hover:text-blush">
              {CONTACT.email}
            </span>
          </a>

          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group bg-obsidian p-10 transition-colors hover:bg-carbon"
          >
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-iron">LinkedIn</p>
            <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-pearl transition-colors group-hover:text-white">
              Connect
            </h3>
            <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">
              Follow along, send a note, or start a conversation in the DMs. I am active here and respond to people who are thoughtful about their outreach.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors group-hover:text-blush">
              /in/mkparrish
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </span>
          </a>
        </div>
      </RevealSection>

      {/* ── SERVICES QUICK LINKS ─────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>Not sure where to start?</Eyebrow>
        <H2>
          Start with one of{" "}
          <span className="text-petal">these.</span>
        </H2>
        <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke">
          If you already know what you need, you can skip the call and go directly to the work.
        </p>

        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Quick Fix",
              title: "The Edit",
              price: "From $100",
              desc: "One piece of copy rewritten sharply. LinkedIn bio, about page, or positioning blurb.",
              href: STRIPE_EDIT,
            },
            {
              label: "Full Repositioning",
              title: "The Rewrite",
              price: "From $1,500",
              desc: "Your professional story or brand copy overhauled. Plus a strategy session.",
              href: STRIPE_REWRITE,
            },
            {
              label: "Full Build",
              title: "The New Chapter",
              price: "Custom",
              desc: "Brand, website, and messaging built for a new era. For pivots and reinventions.",
              href: CALENDLY_URL,
            },
            {
              label: "Ongoing",
              title: "The Byline",
              price: "From $1,500/mo",
              desc: "Monthly ghostwriting retainer. Your name, your voice, sharper than you have time to make it.",
              href: CALENDLY_URL,
            },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="group bg-void p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">{item.label}</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
              <p className="mt-1 font-body text-lg font-bold text-petal">{item.price}</p>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors group-hover:text-blush">
                Get started
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
            </a>
          ))}
        </div>
      </RevealSection>

      {/* ── PATREON LINK ─────────────────────────────────────────── */}
      <section className="bg-obsidian" style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div style={{ maxWidth: "52ch" }}>
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Not ready for a project?</p>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-pearl md:text-4xl">
                Enter The Margins.
              </h3>
              <p className="mt-4 font-body text-base font-light leading-8 text-smoke">
                The editorial membership. Essays, strategy notes, and the thinking behind the work. From $5 a month.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-4">
              <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
              <ArrowLink href="/margins">Learn more</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
