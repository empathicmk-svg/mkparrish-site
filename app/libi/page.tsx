import type { Metadata } from "next";
import { CompetitionMark } from "./BuilderPass";
import FlowLines from "./FlowLines";
import LibiForm from "./LibiForm";
import { EVENT, MK, PASS, PERKS, PRIZE, STORES, leadPerk } from "./campaign";

export const metadata: Metadata = {
  title: "Competition Builder Pass for LIBI Members",
  description: `For ${EVENT.name} guests: unlock your Competition Builder Pass. VIP pricing at all five Competition Automotive Group stores, +$500 on Sprinter vans for NAHB members, and a shot at a Mercedes weekend.`,
  alternates: { canonical: "/libi" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Competition Builder Pass for LIBI Members",
    description: `VIP builder pricing across Competition Automotive Group, valid through ${PASS.validThrough}. Drawing ${PRIZE.drawDate}.`,
  },
};

const groupStores = STORES.filter((s) => !["sprinter", "amg"].includes(s.key));

export default function LibiPage() {
  return (
    <div className="min-h-screen bg-cag-ink font-cag text-white">
      {/* Montserrat stands in for the Competition logo type, on this page only; React hoists this into <head>. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
        precedence="default"
      />

      <section className="relative overflow-hidden bg-cag-sage">
        <FlowLines className="absolute inset-0 h-full w-full" focusY={0.82} count={30} alpha={0.42} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,255,255,0.2),transparent_55%)]" />
        <div className="relative mx-auto max-w-2xl px-6 pb-14 pt-9 md:px-4">
          <div className="flex items-start justify-between gap-4">
            <CompetitionMark size={1.05} />
            <div className="pt-1 text-right text-[0.58rem] font-semibold uppercase leading-4 tracking-[0.24em] text-white/90">
              LIBI
              <br />
              {EVENT.dateShort}
            </div>
          </div>
          <div className="mt-16 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/90">For LIBI members &amp; guests</div>
          <h1 className="mt-4 uppercase text-white" style={{ fontSize: "clamp(1.9rem, 8.4vw, 4.2rem)", lineHeight: 1.08, letterSpacing: "0.05em" }}>
            <span style={{ fontWeight: 300 }}>Unlock your</span>
            <br />
            <span style={{ fontWeight: 700 }}>Builder Pass</span>
          </h1>
          <div className="mt-5 max-w-xl text-base font-medium leading-7 text-white md:text-lg">
            {leadPerk().title} at all five Competition Automotive Group stores, +$500 on Sprinter vans, and a shot at a Mercedes
            weekend.
          </div>
          <div className="mt-6 h-px w-16 bg-white" />
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-6 pt-10">
        <LibiForm />
      </section>

      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cag-accent">What your pass unlocks</div>
        <div className="grid gap-px overflow-hidden rounded-xl bg-cag-line sm:grid-cols-2">
          {[leadPerk(), ...PERKS.slice(1)].map((p) => (
            <div key={p.title} className="bg-cag-panel p-6">
              <h2 className="font-cag text-base font-semibold uppercase tracking-[0.1em] text-white">{p.title}</h2>
              <div className="mt-2 text-sm leading-6 text-cag-mist">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-10">
        <div className="relative overflow-hidden rounded-xl bg-cag-sage p-6">
          <FlowLines className="absolute inset-0 h-full w-full" focusY={0.9} count={16} alpha={0.25} />
          <div className="relative">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/90">One pass · five stores</div>
            <div className="mt-4">
              <CompetitionMark size={1.2} />
            </div>
            <div className="mt-4 text-sm font-medium leading-6 text-white">
              A Long Island family business for more than 65 years. Whatever you drive, or your spouse, your kids or your crew, your
              pass works at every store.
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {groupStores.map((s) => (
                <li key={s.key} className="border-l-2 border-white pl-3 text-sm font-medium text-white">
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-2xl px-4 pb-16 pt-4 text-center">
        <div className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-cag-fog">Your LIBI contact</div>
        <div className="mt-2 text-xl font-semibold uppercase tracking-[0.14em] text-white">{MK.name}</div>
        <div className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-cag-accent">
          {MK.title} · {MK.store}
        </div>
        <div className="mt-4 text-sm leading-7 text-cag-mist">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mercedes-Benz+of+Smithtown+630+Middle+Country+Rd+St+James+NY+11780"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white"
          >
            {MK.address}
          </a>
          <br />
          Work <a href={`tel:${MK.work}`} className="text-white">{MK.workDisplay}</a> · Cell{" "}
          <a href={`tel:${MK.cell}`} className="text-white">{MK.cellDisplay}</a> ·{" "}
          <a href="/libi/mk-parrish.vcf" className="text-cag-accent underline underline-offset-4">Save contact</a>
        </div>
      </footer>
    </div>
  );
}
