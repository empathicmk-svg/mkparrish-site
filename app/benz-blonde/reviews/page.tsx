import type { Metadata } from "next";
import { BENZ, PROMISES, REFERRAL, REVIEWS } from "../data";
import { Card, Kicker, Lede, Pull, Section, SectionTitle } from "../parts";
import LeadForm from "../LeadForm";

export const metadata: Metadata = {
  title: { absolute: "Reviews & Referrals — The Benz Blonde" },
  description:
    "What buying from MK Parrish actually looks like, what past customers say, and how the referral program works.",
};

export default function ReviewsPage() {
  return (
    <>
      <Section bg="void" tight>
        <Kicker>Reviews &amp; referrals</Kicker>
        <SectionTitle>
          This job is<br />referrals or nothing.
        </SectionTitle>
        <Lede>
          I do not have a marketing budget and I do not buy leads. Almost everyone who walks up to my desk was sent
          by someone who already bought from me. That is a fragile way to make a living, and it is exactly why I will
          never sell you something you should not buy.
        </Lede>
      </Section>

      {REVIEWS.length > 0 ? (
        <Section bg="obsidian">
          <Kicker>In their words</Kicker>
          <SectionTitle>What people say.</SectionTitle>
          <div className="mt-11 grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={`${r.name}-${r.vehicle}`} className="flex flex-col bg-obsidian p-7">
                <blockquote className="flex-1 font-serif text-lg italic leading-8 text-pearl">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-graphite pt-5">
                  <p className="font-body text-sm font-semibold text-pearl">{r.name}</p>
                  <p className="mt-1 font-body text-xs font-light text-smoke">
                    {r.vehicle} · {r.location}
                  </p>
                  <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-iron">{r.source}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : (
        /* No fabricated reviews. Until real ones land, the page sells the standard
           they will be measured against — which is a stronger claim anyway. */
        <Section bg="obsidian">
          <Kicker>The standard</Kicker>
          <SectionTitle>
            Judge me<br />against this.
          </SectionTitle>
          <Lede>
            Anyone can print five-star quotes. Here is what I actually commit to, in writing, before you have given me
            a dollar. If I miss on any of it, say so publicly — I would rather eat the review than pretend it did not
            happen.
          </Lede>
          <div className="mt-11 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((p) => (
              <div key={p.num} className="bg-obsidian p-7">
                <p className="font-mono text-xs tracking-[0.2em] text-iron">{p.num}</p>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Pull by="MK Parrish · The Benz Blonde">
              Bought from me already? Send me a line about how it went — the good and the parts I could have done
              better. Both go on this page.
            </Pull>
          </div>
        </Section>
      )}

      <Section bg="carbon">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <Kicker>Referral program</Kicker>
            <SectionTitle>{REFERRAL.headline}</SectionTitle>
            <Lede>{REFERRAL.body}</Lede>
            <ol className="mt-9 space-y-px bg-graphite">
              {REFERRAL.steps.map((s, i) => (
                <li key={s} className="flex gap-5 bg-obsidian p-6">
                  <span className="font-mono text-xs leading-6 text-petal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-body text-sm font-light leading-6 text-smoke">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-px bg-graphite">
            <Card glow>
              <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">Send someone over</p>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-white">Refer a friend</h3>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                Give me their name and what they drive now. I will reach out like a person, not a call center.
              </p>
              <div className="mt-6">
                <LeadForm
                  intent="referral"
                  source="benz-referral"
                  fields={["name", "phone", "email", "message"]}
                  messageLabel="Who should I reach out to?"
                  messagePlaceholder="Their name, the best way to reach them, what they're driving now, and what they're thinking about."
                  submitLabel="Send the Referral →"
                  successTitle="Thank you."
                  successBody="I'll reach out today and mention you sent me — no pressure, no pitch. And I'll take care of you when it lands."
                  compact
                />
              </div>
            </Card>

            <div className="bg-obsidian p-7">
              <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">Already bought from me?</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl">Leave a review</h3>
              <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
                A review is the single most useful thing you can do for me, and it takes ninety seconds. Text me and I
                will send you the link for whichever platform you prefer.
              </p>
              <a
                href={`${BENZ.smsHref}?&body=${encodeURIComponent("Hi MK — send me the review link.")}`}
                className="mt-5 inline-flex w-full items-center justify-center border border-graphite py-3.5 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-pearl transition-colors hover:border-petal hover:text-petal"
              >
                Text me for the link →
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
