import type { Metadata } from "next";
import FlowLines from "./FlowLines";
import LibiForm from "./LibiForm";
import { EVENT, MK, PASS, PERKS, PRIZE, STORES, leadPerk } from "./campaign";

// The site's global .font-serif is bold; this page uses regular Playfair italic.
const SERIF = { fontWeight: 400 } as const;

export const metadata: Metadata = {
  title: "Competition Builder Pass for LIBI Members",
  description: `For ${EVENT.name} guests: unlock your Competition Builder Pass from MK Parrish. VIP pricing at all five Competition Automotive Group stores, +$500 on Sprinter vans for NAHB members, and a shot at a Mercedes weekend.`,
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
    <div className="min-h-screen bg-void">
      <section className="relative overflow-hidden">
        <FlowLines className="absolute inset-0 h-full w-full" focusY={0.8} count={30} alpha={0.5} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(242,175,198,0.16),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-3 border border-graphite md:inset-5" />
        <div className="relative mx-auto max-w-2xl px-6 pb-14 pt-9 md:px-4">
          <div className="flex items-center justify-between gap-4">
            <span className="font-display text-xl uppercase tracking-[0.12em] text-pearl">MK Parrish</span>
            <span className="text-right font-body text-[0.6rem] font-semibold uppercase leading-4 tracking-[0.22em] text-petal">
              × Competition
              <br />
              Automotive Group
            </span>
          </div>
          <div className="mt-16 font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-smoke">
            LIBI members · {EVENT.dateShort}
          </div>
          <h1 className="mt-3 font-display uppercase text-pearl" style={{ fontSize: "clamp(3.6rem, 16vw, 7rem)", lineHeight: 0.86 }}>
            Unlock your{" "}
            <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.45)" }}>
              Builder Pass
            </span>
          </h1>
          <div className="mt-5 max-w-xl font-serif text-lg italic leading-8 text-petal md:text-xl" style={SERIF}>
            {leadPerk().title} at all five Competition Automotive Group stores, +$500 on Sprinter vans, and a shot at a Mercedes weekend.
          </div>
          <div className="mt-6 h-[2px] w-16 bg-petal" />
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-6 pt-10">
        <LibiForm />
      </section>

      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-4 font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">What your pass unlocks</div>
        <div className="grid gap-px bg-graphite sm:grid-cols-2">
          {[leadPerk(), ...PERKS.slice(1)].map((p) => (
            <div key={p.title} className="bg-obsidian p-6">
              <h2 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{p.title}</h2>
              <div className="mt-2 font-body text-sm font-light leading-6 text-smoke">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-10">
        <div className="relative overflow-hidden border border-graphite bg-obsidian p-6">
          <div className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-petal">One pass · five stores</div>
          <h2 className="mt-2 font-display text-4xl uppercase leading-none text-pearl">Competition Automotive Group</h2>
          <div className="mt-3 font-body text-sm leading-6 text-smoke">
            A Long Island family business for more than 65 years. Whatever you drive, or your spouse, your kids or your crew, your pass
            works at every store and I make the introduction myself.
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {groupStores.map((s) => (
              <li key={s.key} className="border-l-2 border-petal pl-3 font-body text-sm text-pearl">
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mx-auto max-w-2xl px-4 pb-16 pt-4 text-center">
        <div className="font-display text-3xl uppercase tracking-[0.08em] text-pearl">MK Parrish</div>
        <div className="mt-1 font-serif text-base italic text-petal" style={SERIF}>{MK.name}</div>
        <div className="mt-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ash">
          {MK.title} · {MK.store}
        </div>
        <div className="mt-4 font-body text-sm leading-7 text-smoke">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mercedes-Benz+of+Smithtown+630+Middle+Country+Rd+St+James+NY+11780"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-petal"
          >
            {MK.address}
          </a>
          <br />
          Work <a href={`tel:${MK.work}`} className="text-pearl hover:text-petal">{MK.workDisplay}</a> · Cell{" "}
          <a href={`tel:${MK.cell}`} className="text-pearl hover:text-petal">{MK.cellDisplay}</a> ·{" "}
          <a href="/libi/mk-parrish.vcf" className="text-petal">Save contact</a>
        </div>
      </footer>
    </div>
  );
}
