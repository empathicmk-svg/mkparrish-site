import type { Metadata } from "next";
import { BENZ } from "../data";
import { Card, Kicker, Lede, Pull, Section, SectionTitle } from "../parts";
import LeadForm from "../LeadForm";

export const metadata: Metadata = {
  title: { absolute: "Book a Drive — The Benz Blonde" },
  description:
    "Twenty minutes, car pulled up front, no desk, no four-square. Book a Mercedes-Benz test drive with MK Parrish at Mercedes-Benz of Smithtown.",
};

const WHAT_HAPPENS = [
  { n: "01", t: "You pick a time", b: "Evenings and Saturdays fill up first. Tell me two that work and I will confirm one by text." },
  { n: "02", t: "The car is ready", b: "Pulled up front, clean, fueled, plated. Your appointment starts with a drive, not forty minutes at a desk." },
  { n: "03", t: "You actually drive it", b: "Real roads, not a loop around the lot. Bring your car seat if that is the question. Bring whoever else is deciding." },
  { n: "04", t: "Numbers, or not", b: "If you love it we run the real figure. If you do not, you go home — and I will still answer your texts in six months." },
];

export default function BookPage() {
  return (
    <>
      <Section bg="void" tight>
        <Kicker>Book a drive</Kicker>
        <SectionTitle>
          Twenty minutes.<br />No desk.
        </SectionTitle>
        <Lede>
          You should not have to lose a Saturday to find out whether you like a car. Pick a time, tell me which one,
          and it will be out front and warm when you get here. If you decide it is not for you, that is a completely
          acceptable outcome and I will not make it weird.
        </Lede>
      </Section>

      <Section bg="obsidian">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div>
            <Kicker>What actually happens</Kicker>
            <SectionTitle>No surprises.</SectionTitle>
            <div className="mt-9 grid gap-px bg-graphite sm:grid-cols-2">
              {WHAT_HAPPENS.map((s) => (
                <div key={s.n} className="bg-obsidian p-6">
                  <p className="font-mono text-xs tracking-[0.2em] text-iron">{s.n}</p>
                  <h3 className="mt-3 font-display text-xl uppercase tracking-[0.02em] text-pearl">{s.t}</h3>
                  <p className="mt-2 font-body text-[0.82rem] font-light leading-6 text-smoke">{s.b}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-graphite bg-carbon p-7">
              <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">On the floor</p>
              <ul className="mt-5 space-y-2">
                {BENZ.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 border-b border-graphite/50 pb-2 font-body text-sm font-light text-smoke last:border-0">
                    <span>{h.day}</span>
                    <span className="text-ash">{h.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-body text-xs font-light leading-6 text-iron">
                Outside those hours? Ask anyway. I have come in on a Wednesday for a good reason more than once.
              </p>
            </div>

            <div className="mt-10">
              <Pull by="MK Parrish · The Benz Blonde">
                If you leave without buying, I have still done my job. The one thing I will not do is waste your
                afternoon.
              </Pull>
            </div>
          </div>

          <Card glow>
            <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">Confirmed by text, same day</p>
            <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-white">Pick your time</h3>
            <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
              Tell me the car and two times that work. I will confirm one and have it ready.
            </p>
            <div className="mt-6">
              <LeadForm
                intent="test-drive"
                source="benz-book"
                fields={["name", "phone", "email", "vehicle", "timeframe", "message"]}
                vehicleLabel="Which car?"
                vehiclePlaceholder="GLE, C-Class, EQE, or 'not sure yet'"
                messageLabel="Two times that work"
                messagePlaceholder="e.g. Thursday after 5, or Saturday morning. Anything else I should have ready?"
                submitLabel="Book My Drive →"
                successTitle="Booked."
                successBody="I'll text you to lock the time and the car will be out front and ready when you get here. Need to change something? Just text me."
              />
            </div>

            <div className="mt-7 border-t border-graphite pt-6">
              <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-iron">Faster</p>
              <a
                href={`${BENZ.smsHref}?&body=${encodeURIComponent("Hi MK — I'd like to drive a ")}`}
                className="mt-2 block font-display text-3xl uppercase tracking-[0.03em] text-petal transition-colors hover:text-blush"
              >
                Text {BENZ.phone}
              </a>
              <a href={BENZ.phoneHref} className="mt-2 block font-body text-sm text-smoke transition-colors hover:text-petal">
                Or call, if you are a caller
              </a>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
