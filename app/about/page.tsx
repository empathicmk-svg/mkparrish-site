import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AuthorGlow from "@/app/components/AuthorGlow";
import { QuoteMosaic } from "@/app/components/QuoteMosaic";
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
import { CONTACT, SOCIALS } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "About — MK Parrish",
  description:
    "MK Parrish is a senior growth operator, writer, and author of Rebecoming. She builds positioning, websites, outbound systems, and story-driven growth assets.",
};

const phoneHref = `tel:+1${CONTACT.phone.replace(/\D/g, "")}`;

const proof = [
  { num: "$40M+", label: "Pipeline influenced" },
  { num: "2 decades", label: "Growth + marketing" },
  { num: "32%", label: "Cold reply rates" },
  { num: "1", label: "Operator, no layers" },
] as const;

const principles = [
  {
    title: "Specificity over safety",
    desc: "Generic copy is safe. It is also invisible. The copy that works names the problem with precision and says something a real person had to risk thinking.",
  },
  {
    title: "Taste before volume",
    desc: "More content is not the answer. Better judgment is. One piece with a real point of view beats twenty that only prove you can fill a calendar.",
  },
  {
    title: "Argument before aesthetic",
    desc: "Pretty is not a strategy. Positioning, narrative, offer, and intent come first. Then the design has something real to amplify.",
  },
  {
    title: "Pipeline is the proof",
    desc: "Marketing should move money, not look busy. I measure the work against booked calls, trust, and revenue, not slide decks.",
  },
  {
    title: "AI-native, taste-led",
    desc: "I use an agent stack to ship more than one operator should be able to ship, but judgment, voice, and the final call stay human.",
  },
  {
    title: "One accountable name",
    desc: "No account managers, no junior handoffs. The person setting the strategy is the person shipping the work and owning the outcome.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[62vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.20),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-8">
            <div className="min-w-0 max-w-4xl">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
                About
              </p>
              <div className="mt-6">
                <H1>
                  MK{" "}
                  <span className="text-petal pink-glow">
                    Parrish
                  </span>
                </H1>
              </div>
            </div>
            <AuthorGlow size={132} ring={4} priority className="md:ml-auto" />
          </div>

          <p className="mt-7 font-serif text-xl italic text-petal/85 md:text-2xl" style={{ fontWeight: 500 }}>
            Writer. Senior growth operator. One pair of hands for the sentence, the site, and the system underneath it.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "66ch" }}>
            Two decades inside Fortune 50s, startups, media, consulting, and technology taught me the same lesson the expensive way:
            the best work still gets ignored when the story is smaller than the thing itself. I help people and companies rewrite
            the story, then build the assets that make the new version visible.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 bg-petal px-4 py-2 font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-void transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-105"
              >
                {social.label}
                <span className="font-body text-[0.66rem] font-medium normal-case tracking-normal text-void/70">
                  {social.handle}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px border-t border-graphite bg-graphite sm:grid-cols-4">
            {proof.map((item) => (
              <div key={item.label} className="bg-void px-5 py-6">
                <p className="font-display text-3xl tracking-[0.02em] text-petal md:text-4xl">{item.num}</p>
                <p className="mt-2 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RevealSection bg="carbon" num="01">
        <Eyebrow>About the author</Eyebrow>
        <div className="mt-2 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <div className="pink-frame relative aspect-[4/5] w-full overflow-hidden border border-petal/30 bg-void">
              <Image
                src="/author/mk-parrish-photo.jpg"
                alt="MK Parrish"
                fill
                sizes="(max-width: 1024px) 22rem, 26rem"
                className="object-cover object-[center_25%]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/45 via-transparent to-transparent" />
            </div>
            <p className="mt-3 text-center font-body text-[0.62rem] uppercase tracking-[0.25em] text-iron lg:text-left">
              Brooklyn - by way of the library
            </p>
          </div>

          <div>
            <p className="font-serif text-2xl italic leading-snug text-pearl md:text-[1.75rem]" style={{ fontWeight: 500 }}>
              MK Parrish is a writer, marketer, operator, and lifelong{" "}
              <span className="text-petal">editor of the part everyone tried to make quieter.</span>
            </p>

            <div className="mt-7 space-y-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "62ch" }}>
              <p>She got her library card at three.</p>
              <p>
                By the time she could spell her own name, she was already rewriting fairy tales. Better conflict. Sharper heroines.
                Some children accept happily ever after. <span className="text-pearl">MK had notes.</span>
              </p>
              <p>
                Born in Brooklyn. Raised on library stacks, contradiction, ambition, grief jokes, and the kind of women who could survive
                anything but still wanted better curtains.
              </p>
              <p>
                She learned early that being articulate is not the same thing as being understood. That became the work: translating what
                people can feel but cannot yet say into the sentence, offer, page, and system that finally makes it obvious.
              </p>
              <p>
                Her work lives where grief, ambition, humor, money, taste, and survival keep interrupting each other. The writing has a
                pulse because the strategy has a spine.
              </p>
              <p>
                She writes for people and companies who have lived something real, built something useful, and are tired of sounding like
                the safest version of themselves.
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-petal/50 pl-5">
              <p className="font-serif text-lg italic leading-relaxed text-petal/90 md:text-xl">
                &ldquo;Difficulties strengthen the mind, as labor does the body.&rdquo;
              </p>
              <cite className="mt-2 block font-body text-[0.66rem] not-italic uppercase tracking-[0.2em] text-ash">
                - Seneca
              </cite>
            </blockquote>
          </div>
        </div>
      </RevealSection>

      <QuoteMosaic
        eyebrow="Perseverance, in public"
        title="The line changes. The lesson keeps repeating."
        description="The site now carries the voices that match the work: philosophers, artists, founders, rappers, and the original Rewrite Your Story language."
        highlighted
        slugs={["marcus-mind", "biggie-timid", "estee-worked", "mk-rebecoming"]}
      />

      <RevealSection bg="obsidian" num="02">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>The work</Eyebrow>
            <H2>
              I started with language.{" "}
              <span className="text-petal">Then I learned where language makes money.</span>
            </H2>
            <H3Script>The sentence matters. So does the system underneath it.</H3Script>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Website Design", "Outbound", "Growth Marketing", "Brand Messaging", "Executive Ghostwriting", "Rebecoming"].map((tag) => (
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
              I came up through marketing and growth the unglamorous way: sales pressure, launch pressure, pipeline numbers,
              inbox replies, executive revisions, and the quiet humiliation of a beautiful campaign that did not move a single useful person.
            </p>
            <p>
              I have influenced more than $40M in pipeline across Fortune 50s, startups, SaaS, media, consulting, and technology.
              I have written the positioning, built the funnel, managed the outbound, read the numbers, and watched good companies lose
              trust because the story in market was smaller than the thing they had become.
            </p>
            <p>
              Most agencies sell you a senior name on the pitch and junior work on the deliverable. I am the opposite: one operator who
              does the thinking and the shipping. I write the message, design the page, build the site, wire the lead path, run the campaign,
              and stay close enough to the data to know when the sentence is not earning its keep.
            </p>
            <p>
              I am not interested in making a brand sound expensive if the argument underneath it is weak. I am interested in the harder
              thing: finding the true sentence, building the page around it, and making the market answer.
            </p>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={10} />

      <RevealSection bg="void" num="03">
        <Eyebrow>How I work</Eyebrow>
        <H2>
          The things I will{" "}
          <span className="text-petal">not compromise on.</span>
        </H2>
        <div className="mt-12 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
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
              Where to{" "}
              <span className="text-petal">find me.</span>
            </H2>
            <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              Book a call, send an email, text the number, or start with the shop if you want the self-guided version of the work.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href="/book">Book a Call</BtnPrimary>
              <BtnGhost href="/shop">Shop the Shelf</BtnGhost>
            </div>
          </div>

          <div className="grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-1">
            {[
              { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { label: "Phone", value: CONTACT.phone, href: phoneHref },
              { label: "LinkedIn", value: "/in/mkparrish", href: CONTACT.linkedin },
            ].map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                className="bg-obsidian p-6 transition-colors hover:bg-carbon"
              >
                <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-iron">{contact.label}</p>
                <p className="mt-2 font-body text-sm text-pearl">{contact.value}</p>
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
              { label: "Enter Rebecoming", href: "/rebecoming" },
              { label: "Design & Build Your Site", href: "/studio" },
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
