import type { Metadata } from "next";
import { BENZ } from "../data";
import { Card, Kicker, Lede, Pull, Section, SectionTitle } from "../parts";
import LeadForm from "../LeadForm";

export const metadata: Metadata = {
  title: { absolute: "What's My Car Worth? — The Benz Blonde" },
  description:
    "A real appraisal on your actual VIN, not an online estimate range. MK Parrish tells you what your car is worth to us, what it is worth privately, and whether you have equity you did not know about.",
};

const STEPS = [
  { n: "01", t: "Send me the details", b: "Year, model, rough mileage, and your VIN if you have it handy. Photos help but are not required." },
  { n: "02", t: "I run it for real", b: "Auction data, our own retail history, and what the car is actually doing in this market right now — not a national average." },
  { n: "03", t: "You get two numbers", b: "What we will give you, and what I think you would get selling it yourself. Those are different, and you deserve both." },
  { n: "04", t: "You decide, not me", b: "If the honest answer is keep the car, I will say keep the car. I would rather be right than busy." },
];

const MYTHS = [
  {
    q: "\"Online estimators already told me.\"",
    a: "They gave you a range built on a national average and a guess at your condition. A real appraisal is your VIN, your options, your mileage, and this week's market. The gap between those two numbers is frequently thousands of dollars — in both directions.",
  },
  {
    q: "\"I still owe on it, so there's no point.\"",
    a: "Owing money is not the same as being upside down, and being upside down is not the same as being stuck. Send me the payoff. Worst case I tell you to wait six months, and now you know when to move instead of wondering.",
  },
  {
    q: "\"I'm not ready to buy anything.\"",
    a: "Good. Knowing what you are sitting on is useful whether you trade it, sell it, or keep driving it. I would rather be the person you already trust when you are ready than the person cold-calling you then.",
  },
];

export default function TradePage() {
  return (
    <>
      <Section bg="void" tight>
        <Kicker>Trade &amp; equity check</Kicker>
        <SectionTitle>
          You might be<br />sitting on money.
        </SectionTitle>
        <Lede>
          Used car values still have not gone back to normal. I run this check constantly and I am still surprised
          — people with two years left on a loan finding out they have real equity, lease returns worth well over
          the buyout. You will not find that out from an online estimator. You find it out from a VIN.
        </Lede>
      </Section>

      <Section bg="obsidian">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:items-start">
          <div>
            <Kicker>How it works</Kicker>
            <SectionTitle>No obligation,<br />no games.</SectionTitle>
            <div className="mt-9 grid gap-px bg-graphite sm:grid-cols-2">
              {STEPS.map((s) => (
                <div key={s.n} className="bg-obsidian p-6">
                  <p className="font-mono text-xs tracking-[0.2em] text-iron">{s.n}</p>
                  <h3 className="mt-3 font-display text-xl uppercase tracking-[0.02em] text-pearl">{s.t}</h3>
                  <p className="mt-2 font-body text-[0.82rem] font-light leading-6 text-smoke">{s.b}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Pull by="MK Parrish · The Benz Blonde">
                An appraisal is not a commitment. It is information. You are allowed to have information about your own
                car.
              </Pull>
            </div>
          </div>

          <Card glow>
            <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">Free · Same-day answer</p>
            <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-white">Get my number</h3>
            <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
              Any make, any model. It does not have to be a Mercedes and you do not have to buy anything.
            </p>
            <div className="mt-6">
              <LeadForm
                intent="trade"
                source="benz-trade"
                fields={["name", "phone", "email", "vehicle", "message"]}
                vehicleLabel="Your current vehicle"
                vehiclePlaceholder="2022 BMW X5, 41,000 miles"
                messageLabel="Payoff, VIN, condition"
                messagePlaceholder="VIN if you have it, rough payoff, anything I should know — accidents, aftermarket wheels, a dent you keep meaning to fix."
                submitLabel="Appraise My Car →"
                successTitle="Running it now."
                successBody="You will get two numbers from me today: what we will give you, and what I think you would get selling it yourself. Text me if you want it faster."
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section bg="carbon">
        <Kicker>The three things people say</Kicker>
        <SectionTitle>Before you<br />talk yourself out of it.</SectionTitle>
        <div className="mt-11 grid gap-px bg-graphite md:grid-cols-3">
          {MYTHS.map((m) => (
            <div key={m.q} className="bg-obsidian p-7">
              <p className="font-serif text-lg italic leading-7 text-petal">{m.q}</p>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{m.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="void" tight>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[48ch] font-serif text-xl italic leading-8 text-pearl md:text-2xl">
            Faster than a form: send me the year, model, and miles in a text.
          </p>
          <a
            href={`${BENZ.smsHref}?&body=${encodeURIComponent("Hi MK — what's my car worth? It's a ")}`}
            className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            Text {BENZ.phone} →
          </a>
        </div>
      </Section>
    </>
  );
}
