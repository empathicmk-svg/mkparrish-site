import type { Metadata } from "next";
import Image from "next/image";
import LibiForm from "./LibiForm";
import { EVENT, MEMBER_OFFER, MK, PERKS, PRIZE, STORES } from "./campaign";

export const metadata: Metadata = {
  title: "LIBI Members: Win a Mercedes Weekend",
  description: `For ${EVENT.name} guests: enter to win a 48-hour Mercedes-Benz weekend and claim LIBI member pricing at Mercedes-Benz of Smithtown and Competition Automotive Group.`,
  alternates: { canonical: "/libi" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "LIBI Members: Win a Mercedes Weekend",
    description: `$1,500 off MSRP for LIBI members through ${MEMBER_OFFER.expires}. Drawing ${PRIZE.drawDate}.`,
    images: ["/mercedes/test-drive-g63.jpg"],
  },
};

const groupStores = STORES.filter((s) => !["sprinter", "amg"].includes(s.key));

export default function LibiPage() {
  return (
    <div className="min-h-screen bg-void">
      <section className="relative">
        <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden">
          <Image
            src="/mercedes/test-drive-g63.jpg"
            alt="Matte black Mercedes-AMG G 63 in the Mercedes-Benz of Smithtown showroom"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_60%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,.6)_0%,rgba(8,8,8,0)_30%,rgba(8,8,8,.25)_60%,#080808_100%)]" />
          <div className="absolute inset-x-0 top-0 mx-auto flex max-w-2xl items-center justify-between px-4 pt-5">
            <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-pearl">LIBI · {EVENT.dateShort}</span>
            <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-pearl/80">Mercedes-Benz of Smithtown</span>
          </div>
        </div>
        <div className="relative mx-auto -mt-28 max-w-2xl px-4">
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-petal">For LIBI members &amp; guests</p>
          <h1 className="mt-3 font-display uppercase text-pearl" style={{ fontSize: "clamp(3.2rem, 14vw, 6.2rem)", lineHeight: 0.88 }}>
            Win a <span className="text-petal">Mercedes</span> weekend
          </h1>
          <p className="mt-4 font-serif text-lg italic text-smoke md:text-xl">{PRIZE.detail}</p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pt-8">
        <div className="flex items-center justify-between gap-4 border border-petal/60 bg-petal/10 px-5 py-4">
          <div>
            <p className="font-display text-3xl uppercase leading-none text-petal">{MEMBER_OFFER.headline}</p>
            <p className="mt-1 font-body text-sm text-smoke">{MEMBER_OFFER.sub}</p>
          </div>
          <p className="shrink-0 text-right font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-pearl">
            Ends
            <br />
            {MEMBER_OFFER.expiresShort}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-6 pt-8">
        <LibiForm />
      </section>

      <section className="mx-auto max-w-2xl px-4 py-10">
        <p className="mb-4 font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Yours whether you win or not</p>
        <div className="grid gap-px bg-graphite sm:grid-cols-3">
          {PERKS.map((p) => (
            <div key={p.title} className="bg-obsidian p-6">
              <h2 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{p.title}</h2>
              <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-10">
        <div className="border border-graphite bg-obsidian p-6">
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-petal">One call covers the whole family</p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-none text-pearl">Competition Automotive Group</h2>
          <p className="mt-3 font-body text-sm leading-6 text-smoke">
            Family-run on Long Island for more than 65 years. Whatever you drive, or your spouse, your kids, your crew, I&apos;ll get you to
            the right store and the right person.
          </p>
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
        <p className="font-display text-3xl uppercase tracking-[0.04em] text-pearl">{MK.name}</p>
        <p className="mt-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ash">
          {MK.title} · {MK.store}
        </p>
        <p className="mt-4 font-body text-sm leading-7 text-smoke">
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
        </p>
      </footer>
    </div>
  );
}
