import type { Metadata } from "next";
import Link from "next/link";
import { BENZ, MODELS } from "../data";
import { Card, Kicker, Lede, Section, SectionTitle } from "../parts";
import LeadForm from "../LeadForm";

export const metadata: Metadata = {
  title: { absolute: "The Lineup — The Benz Blonde" },
  description:
    "Every way into a Mercedes-Benz, explained in plain English: which model fits which driveway, which one is actually cheapest to lease, and which one you are probably overlooking.",
};

const NARROW = [
  {
    q: "Where does it park?",
    a: "A tight city garage rules out more cars than a budget does. Tell me the space and half the lineup sorts itself.",
  },
  {
    q: "How many miles a year?",
    a: "Under 12,000 and leasing usually wins. Over 18,000 and we should be talking about financing or CPO instead.",
  },
  {
    q: "Who else rides in it?",
    a: "Car seats, a third row, a dog, clients. The right answer for a family of five is not the right answer for a commuter.",
  },
  {
    q: "Is it a business vehicle?",
    a: "If yes, the conversation changes completely — over 6,000 lbs GVWR opens up a Section 179 angle worth real money.",
  },
];

export default function ShopPage() {
  return (
    <>
      <Section bg="void" tight>
        <Kicker>The lineup</Kicker>
        <SectionTitle>
          Eleven ways<br />into this brand.
        </SectionTitle>
        <Lede>
          Most people walk in asking about one car and leave in a different one — usually a better fit and often less
          money. Here is the honest version of who each one is actually for. No payments listed, because payments move
          every single month and a number printed here would be a lie by the time you read it. Text me and I will give
          you today&rsquo;s.
        </Lede>
      </Section>

      <Section bg="obsidian">
        <div className="grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-3">
          {MODELS.map((m) => (
            <article key={m.slug} id={m.slug} className="flex flex-col bg-obsidian p-7" style={{ scrollMarginTop: "6rem" }}>
              <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.22em] text-iron">{m.body}</p>
              <h2 className="mt-2 font-display text-5xl uppercase tracking-[0.02em] text-white">{m.name}</h2>
              <p className="mt-3 font-serif text-lg italic leading-7 text-petal">{m.headline}</p>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{m.who}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {m.notes.map((n) => (
                  <li key={n} className="flex gap-3 font-body text-[0.82rem] font-light leading-6 text-smoke">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
                    {n}
                  </li>
                ))}
              </ul>
              <a
                href={`${BENZ.smsHref}?&body=${encodeURIComponent(`Hi MK — what's the current number on a ${m.name}?`)}`}
                className="mt-7 flex w-full items-center justify-center border border-graphite py-3.5 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-pearl transition-colors hover:border-petal hover:text-petal"
              >
                Text me about the {m.name} →
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section bg="carbon">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <Kicker>Still not sure</Kicker>
            <SectionTitle>
              Four questions<br />and I can narrow it<br />to two cars.
            </SectionTitle>
            <Lede>
              This is the same short list I run on the floor. You do not need to know trim levels. You need to know how
              you actually live.
            </Lede>
            <div className="mt-9 grid gap-px bg-graphite sm:grid-cols-2">
              {NARROW.map((n, i) => (
                <div key={n.q} className="bg-obsidian p-6">
                  <p className="font-mono text-xs tracking-[0.2em] text-iron">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-xl uppercase tracking-[0.02em] text-pearl">{n.q}</h3>
                  <p className="mt-2 font-body text-[0.82rem] font-light leading-6 text-smoke">{n.a}</p>
                </div>
              ))}
            </div>
          </div>

          <Card glow>
            <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">Free, thirty seconds</p>
            <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-white">Find my Benz</h3>
            <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
              Tell me how you live and what you are comfortable spending a month. I will come back with two cars and
              the real numbers on both — and I will say so if the answer is &ldquo;none of them yet.&rdquo;
            </p>
            <div className="mt-6">
              <LeadForm
                intent="fit"
                source="benz-shop"
                fields={["name", "phone", "email", "vehicle", "timeframe", "message"]}
                vehiclePlaceholder="What you drive now"
                messagePlaceholder="Miles per year, who rides with you, monthly comfort zone, where it parks."
                submitLabel="Narrow It Down →"
                successTitle="On it."
                successBody="I will come back with two cars, today's numbers on both, and my honest opinion on which one you should actually take."
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section bg="void" tight>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[48ch] font-serif text-xl italic leading-8 text-pearl md:text-2xl">
            Know the one you want? Skip all of this and go drive it.
          </p>
          <Link
            href="/benz-blonde/book"
            className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            Book a Drive →
          </Link>
        </div>
      </Section>
    </>
  );
}
