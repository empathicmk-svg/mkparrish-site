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

      <RevealSection bg="obsidian" num="03">
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
