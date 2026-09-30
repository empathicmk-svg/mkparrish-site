import type { Metadata } from "next";
import { BENZ } from "../data";
import { Card, Kicker, Lede, Pull, Section, SectionTitle } from "../parts";
import LeadForm from "../LeadForm";

export const metadata: Metadata = {
  title: { absolute: "Lease Ending? — The Benz Blonde" },
  description:
    "Your options at Mercedes-Benz lease end, explained honestly: pull-ahead, buyout, return, or trade. MK Parrish runs your exact numbers six months out, when you still have leverage.",
};

const OPTIONS = [
  {
    t: "Pull ahead early",
    b: "Mercedes-Benz Financial Services regularly waives remaining payments to move loyal lessees into something newer. The number of payments waived changes by month and by model — it is often deepest on GLE, GLS, and S-Class.",
    best: "Best if you want a new car and your current one is in good shape.",
  },
  {
    t: "Buy it out",
    b: "Your buyout was set three years ago against a guess at today's market. Sometimes that guess was low and the car is worth far more than the number on your contract. That gap is yours, not the bank's.",
    best: "Best if you love the car and the residual came in under market.",
  },
  {
    t: "Trade the equity",
    b: "If the car is worth more than the buyout, that difference can go straight into the next deal as a down payment. A lot of people hand that back to the bank without ever knowing it existed.",
    best: "Best if you have equity and want it working for you.",
  },
  {
    t: "Just return it",
    b: "Sometimes that is the right answer. I will walk you through wear-and-tear standards before the inspection so you are not surprised by a bill, and tell you what is worth fixing first.",
    best: "Best if the market is soft on your model and you are ready for a break.",
  },
];

const TIMELINE = [
  { when: "6 months out", what: "The sweet spot. Every option is open and pull-ahead programs have the most room. This is when to call.", tone: "good" },
  { when: "3 months out", what: "Still workable, but you are now negotiating against a deadline and the other side knows it.", tone: "ok" },
  { when: "30 days out", what: "You take what is available. Inspections are scheduled, options are narrow, leverage is gone.", tone: "bad" },
];

export default function LeaseEndPage() {
  return (
    <>
      <Section bg="void" tight>
        <Kicker>Lease end</Kicker>
        <SectionTitle>
          Do not wait for<br />the last payment.
        </SectionTitle>
        <Lede>
          The single most expensive mistake in leasing is waiting until the end. Six months out you have four real
          options and the programs are at their deepest. Thirty days out you have one option and a deadline. Nothing
          about the car changed — only your leverage did.
        </Lede>
      </Section>

      <Section bg="obsidian">
        <Kicker>Timing is the whole game</Kicker>
        <SectionTitle>When you call<br />decides what it costs.</SectionTitle>
        <div className="mt-11 grid gap-px bg-graphite md:grid-cols-3">
          {TIMELINE.map((t) => (
            <div key={t.when} className="relative bg-obsidian p-7">
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: t.tone === "good" ? "#FFB5D0" : t.tone === "ok" ? "#4A4A4A" : "#2C2C2C" }}
              />
              <p
                className="font-display text-3xl uppercase tracking-[0.02em]"
                style={{ color: t.tone === "good" ? "#FFB5D0" : t.tone === "ok" ? "#B0B0B0" : "#7A7A7A" }}
              >
                {t.when}
              </p>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{t.what}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="carbon">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <Kicker>Your four options</Kicker>
            <SectionTitle>All of them<br />on the table.</SectionTitle>
            <Lede>
              A dealership makes the most money when you only know about one of these. Here are all four, including the
              two that do not involve buying anything from me.
            </Lede>
            <div className="mt-9 grid gap-px bg-graphite sm:grid-cols-2">
              {OPTIONS.map((o) => (
                <div key={o.t} className="bg-obsidian p-6">
                  <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{o.t}</h3>
                  <p className="mt-3 font-body text-[0.82rem] font-light leading-6 text-smoke">{o.b}</p>
                  <p className="mt-4 font-body text-[0.68rem] font-bold uppercase leading-5 tracking-[0.14em] text-petal">
                    {o.best}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Pull by="MK Parrish · The Benz Blonde">
                Your buyout was set three years ago by someone guessing at today. Sometimes they guessed badly and that
                money belongs to you.
              </Pull>
            </div>
          </div>

          <Card glow>
            <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">Free · Your exact contract</p>
            <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-white">Run my lease</h3>
            <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
              Any brand, not just Mercedes. I will show you all four options side by side with real numbers, and tell
              you which one I would take if it were mine.
            </p>
            <div className="mt-6">
              <LeadForm
                intent="lease-end"
                source="benz-lease-end"
                fields={["name", "phone", "email", "vehicle", "timeframe", "message"]}
                vehicleLabel="Leased vehicle"
                vehiclePlaceholder="2023 GLC 300, 28,000 miles"
                messageLabel="Lease details"
                messagePlaceholder="Lease-end date, buyout amount, monthly payment, miles allowed vs. miles driven."
                submitLabel="Show Me All Four →"
                successTitle="Pulling it now."
                successBody="You will get all four options with real numbers, plus which one I would take. If the answer is 'ride it out,' I will tell you that too."
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section bg="void" tight>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[48ch] font-serif text-xl italic leading-8 text-pearl md:text-2xl">
            Not sure when your lease is up? Text me the car and I will look it up.
          </p>
          <a
            href={`${BENZ.smsHref}?&body=${encodeURIComponent("Hi MK — my lease is ending. Can you run my options?")}`}
            className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
          >
            Text {BENZ.phone} →
          </a>
        </div>
      </Section>
    </>
  );
}
