import type { Metadata } from "next";
import { BENZ, CONTENT_RULES, SERIES, SOCIAL_LIVE } from "../data";
import { Card, Kicker, Lede, Pull, Section, SectionTitle } from "../parts";
import LeadForm from "../LeadForm";

export const metadata: Metadata = {
  title: { absolute: "Watch & Follow — The Benz Blonde" },
  description:
    "Money factor, residuals, lease vs. finance, and what dealers actually mean — explained in sixty seconds. Follow The Benz Blonde on Instagram, TikTok, and YouTube.",
};

export default function WatchPage() {
  return (
    <>
      <Section bg="void" tight>
        <Kicker>Watch &amp; follow</Kicker>
        <SectionTitle>
          The parts they<br />hope stay confusing.
        </SectionTitle>
        <Lede>
          Car buying is not complicated. It is deliberately obscured — because a confused buyer takes the payment
          they are handed. I work inside this business and I am going to keep showing you the math anyway. Follow
          along whether you ever buy from me or not.
        </Lede>

        {SOCIAL_LIVE.length > 0 && (
          <div className="mt-11 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
            {SOCIAL_LIVE.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="group bg-obsidian p-7 transition-colors hover:bg-carbon">
                <p className="font-display text-3xl uppercase tracking-[0.03em] text-pearl transition-colors group-hover:text-petal">
                  {s.name}
                </p>
                <p className="mt-1 font-mono text-[0.68rem] tracking-[0.1em] text-iron">{s.handle}</p>
                <p className="mt-4 font-body text-[0.82rem] font-light leading-6 text-smoke">{s.blurb}</p>
                <p className="mt-6 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-petal">Follow →</p>
              </a>
            ))}
          </div>
        )}
      </Section>

      <Section bg="obsidian">
        <Kicker>The series</Kicker>
        <SectionTitle>
          Six formats,<br />not six videos.
        </SectionTitle>
        <Lede>
          A one-off video gets a spike. A format people recognize gets a following. Here is what runs, how often, and
          what each one is for.
        </Lede>

        <div className="mt-11 grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-3">
          {SERIES.map((s) => (
            <article key={s.name} className="flex flex-col bg-obsidian p-7">
              <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.22em] text-iron">{s.cadence}</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-white md:text-3xl">{s.name}</h3>
              <p className="mt-2 font-serif text-base italic leading-6 text-petal">&ldquo;{s.hook}&rdquo;</p>
              <p className="mt-4 flex-1 font-body text-[0.85rem] font-light leading-7 text-smoke">{s.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section bg="carbon">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <Kicker>The rules</Kicker>
            <SectionTitle>How I make it.</SectionTitle>
            <Lede>
              Not a secret, and not complicated. If you are a salesperson reading this and wondering whether to start
              posting: start. These six lines are the entire strategy.
            </Lede>
            <ol className="mt-9 space-y-px bg-graphite">
              {CONTENT_RULES.map((r, i) => (
                <li key={r} className="flex gap-5 bg-obsidian p-6">
                  <span className="font-mono text-xs leading-6 text-petal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-body text-sm font-light leading-6 text-smoke">{r}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <Pull by="MK Parrish · The Benz Blonde">
                Nobody follows a car dealer. People follow a person who happens to sell cars. The order matters more
                than anything else on this page.
              </Pull>
            </div>
          </div>

          <Card glow>
            <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">Your question, on camera</p>
            <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-white">Ask the Blonde</h3>
            <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
              Send me the thing you are embarrassed to ask a dealer. If it is a good question I will answer it on
              camera — first name only, or fully anonymous if you say so.
            </p>
            <div className="mt-6">
              <LeadForm
                intent="general"
                source="benz-watch-question"
                fields={["name", "email", "message"]}
                messageLabel="Your question"
                messagePlaceholder="Anything. Lease math, a number a dealer gave you that felt wrong, whether you're getting played."
                submitLabel="Send My Question →"
                successTitle="Got it."
                successBody="If it makes the cut you'll see it answered on camera. Either way I'll answer you directly — good questions deserve that."
                compact
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section bg="void" tight>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[48ch] font-serif text-xl italic leading-8 text-pearl md:text-2xl">
            Done watching? The whole point of the videos is this next part.
          </p>
          <a
            href={BENZ.smsHref}
            className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            Text {BENZ.phone} →
          </a>
        </div>
      </Section>
    </>
  );
}
