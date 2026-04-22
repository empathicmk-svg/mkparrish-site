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
} from "@/app/components/ui";
import { SHOP_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "The Shelf | MK Parrish",
  description:
    "Templates, prompts, starter packs, and digital downloads from MK Parrish.",
};

const shelfItems = [
  {
    title: "Templates",
    desc: "Clean starting points for the pages, profiles, pitches, and small pieces of copy that should not take three weeks to begin.",
  },
  {
    title: "Starter Packs",
    desc: "Focused bundles for when you know the problem, but need a sharper way into the draft.",
  },
  {
    title: "Mini Guides",
    desc: "Short, useful reads on voice, positioning, reinvention, and the work of sounding more like yourself on purpose.",
  },
];

const browseItems = [
  {
    title: "Profiles and Bios",
    desc: "For LinkedIn, about pages, speaker blurbs, and the small introductions that carry more weight than they should.",
  },
  {
    title: "Pages and Pitches",
    desc: "For offers, services, websites, project notes, and the moments when the idea is real but the language is still soft.",
  },
  {
    title: "Writing Practice",
    desc: "Prompts and exercises for people who want their voice back without turning the process into homework.",
  },
];

const monetizationPrompts = [
  {
    label: "Option 1",
    title: "Comprehensive Strategy",
    badge: "Recommended",
    intro: "This prompt provides context and asks for a detailed plan.",
    prompt:
      "I am Mary Kate Parrish, a professional in Journalism and Marketing based in Smithtown, NY, with a personal website (www.mkparrish.com) hosted on GitHub Pages. Since GitHub Pages only supports static sites, what are the best strategies to monetize my site? Please include:",
    asks: [
      "Affiliate marketing, including relevant programs.",
      "Digital products, such as eBooks and templates.",
      "Freelance and consulting leads, including calls-to-action and landing pages.",
      "Newsletter or community building, such as Substack integration.",
      "A 6-month phased plan with specific milestones.",
    ],
  },
  {
    label: "Option 2",
    title: "Technical Focus",
    badge: "Implementation",
    intro: "Use this when you want lightweight static-site solutions.",
    prompt:
      "My portfolio site (www.mkparrish.com) is on GitHub Pages. I need simple, static-site compatible monetization methods. Suggest:",
    asks: [
      "3 to 5 actionable strategies, such as affiliate links or Buy Me a Coffee.",
      "Basic HTML and JavaScript examples for implementation.",
      "Tools and services that integrate with static sites.",
    ],
  },
  {
    label: "Option 3",
    title: "Growth-Oriented",
    badge: "Long-Term",
    intro: "Use this for scalable recurring revenue ideas.",
    prompt:
      "I am building my personal brand through my site (www.mkparrish.com). How can I turn my writing and expertise into a recurring revenue stream? Focus on:",
    asks: [
      "Audience building, including newsletter and Substack strategy.",
      "Digital products, such as courses and guides.",
      "Partnerships, sponsored content, and collaborations.",
    ],
  },
];

const proTips = [
  {
    title: "Leverage Your Expertise",
    desc: "As a journalism and marketing pro, consulting and copywriting services are likely the highest-ticket opportunities.",
  },
  {
    title: "Use Static-Site Tools",
    desc: "Static sites work best with third-party platforms for products, tips, subscriptions, and checkout.",
  },
  {
    title: "Focus the SEO",
    desc: "Optimize around local search, niche topics, and the writing problems your best clients are already trying to solve.",
  },
];

export default function ShelfPage() {
  return (
    <>
      <section className="relative flex min-h-[75vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.12),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            Templates &middot; Prompts &middot; Digital Downloads
          </p>
          <div className="mt-6">
            <H1>
              The{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                Shelf
              </span>
            </H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            A small shop for the useful pieces.
          </p>
          <p className="mt-4 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Templates, prompts, and digital downloads for the sentence, offer, profile, or page that needs a cleaner spine. Built for the blank doc moment, the almost-there draft, and the part where you are tired of sounding like everyone else.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={SHOP_URL}>Shop The Shelf</BtnPrimary>
            <BtnGhost href="/book">Request Something Custom</BtnGhost>
          </div>
        </div>
      </section>

      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>What lives here</Eyebrow>
            <H2>
              Tools for the{" "}
              <span className="text-petal">blank doc moment.</span>
            </H2>
            <H3Script>Less staring. More sentence.</H3Script>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              The Shelf is where the smaller, useful pieces live. Not full client work. Not a membership. Just the things you can pick up, download, and use when the words need a little more backbone.
            </p>
            <p>
              Some pieces help you start. Some help you fix what is already there. Some are for the strange little business of describing yourself without disappearing into corporate fog.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {shelfItems.map((item) => (
            <div key={item.title} className="bg-obsidian p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={6} />

      <RevealSection bg="void" num="02">
        <Eyebrow>Browse by need</Eyebrow>
        <H2>
          Start where{" "}
          <span className="text-petal">the words are stuck.</span>
        </H2>

        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-3">
          {browseItems.map((item) => (
            <div key={item.title} className="bg-void p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-carbon">
              <p className="font-mono text-xs tracking-[0.2em] text-iron">Shelf Note</p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ArrowLink href={SHOP_URL}>Browse the shop</ArrowLink>
        </div>
      </RevealSection>

      <QuoteDivider index={7} />

      <RevealSection bg="carbon" num="03">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>Prompt pack</Eyebrow>
            <H2>
              Monetizing your{" "}
              <span className="text-petal">site.</span>
            </H2>
            <H3Script>Three prompts for turning the site into revenue.</H3Script>
            <p className="mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "54ch" }}>
              Built for static-site constraints, third-party tools, digital products, consulting leads, and recurring audience work.
            </p>
          </div>

          <div className="space-y-px bg-graphite">
            {monetizationPrompts.map((item) => (
              <article key={item.title} className="bg-carbon p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-xs tracking-[0.2em] text-iron">{item.label}</p>
                  <span className="border border-petal/30 bg-petal/[0.06] px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-petal">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{item.intro}</p>
                <div className="mt-5 border-l border-petal/40 pl-5">
                  <p className="font-body text-sm font-light leading-7 text-pearl">{item.prompt}</p>
                  <ol className="mt-4 space-y-2">
                    {item.asks.map((ask, index) => (
                      <li key={ask} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
                        <span className="font-mono text-xs tracking-[0.15em] text-petal">{index + 1}</span>
                        <span>{ask}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-3">
          {proTips.map((tip) => (
            <div key={tip.title} className="bg-carbon p-7">
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-petal">{tip.title}</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{tip.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={8} />

      <RevealSection bg="obsidian" num="04">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <H2>
              This site holds the door.{" "}
              <span className="text-petal">Ko-fi handles the shop.</span>
            </H2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              The Shelf keeps the shop in the same world as the rest of the site. Ko-fi handles payment, checkout, and downloads on the other side.
            </p>
            <p>
              If you need something more specific than a download, book a call. The custom work still happens directly with me.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <BtnPrimary href={SHOP_URL}>Shop on Ko-fi</BtnPrimary>
              <BtnGhost href="/book">Book a Call</BtnGhost>
            </div>
          </div>
        </div>
      </RevealSection>

      <section className="relative bg-void" style={{ padding: "clamp(5rem, 10vw, 9rem) 0" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.07),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] text-center" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">
            The useful pieces
          </p>
          <div className="mt-6">
            <H2>
              Pull something{" "}
              <span className="text-petal">off the shelf.</span>
            </H2>
          </div>
          <p className="mx-auto mt-6 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
            Start small. Fix the sentence in front of you. Come back when the next one starts making noise.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BtnPrimary href={SHOP_URL}>Shop The Shelf</BtnPrimary>
            <BtnGhost href="/margins">Read The Margins</BtnGhost>
          </div>
        </div>
      </section>
    </>
  );
}
