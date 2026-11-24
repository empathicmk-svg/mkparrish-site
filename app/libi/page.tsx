import type { Metadata } from "next";
import { CAG, Certificate, CompetitionMark } from "./BuilderPass";
import FlowLines from "./FlowLines";
import LibiForm from "./LibiForm";
import { CERT, EVENT, GOLD, MK, PASS, PERKS, STORES, leadPerk } from "./campaign";

// Competition-branded metadata: overrides the site's "— MK Parrish" title template, name and share image,
// so a texted or shared link previews as Competition Automotive Group.
const TITLE = "Competition Builder Pass · LIBI Members";
const DESCRIPTION = `VIP builder pricing at all five Competition Automotive Group stores, +$500 on Sprinter vans for NAHB members, and a ${CERT.name} for the Mercedes you choose. Valid through ${PASS.validThrough}.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  applicationName: "Competition Automotive Group",
  alternates: { canonical: "/libi" },
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/libi",
    siteName: "Competition Automotive Group",
    type: "website",
    images: [{ url: "/libi/og.png", width: 1200, height: 630, alt: "Competition Automotive Group: Unlock your Builder Pass" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/libi/og.png"] },
  appleWebApp: { title: "Competition Builder Pass", statusBarStyle: "black-translucent" },
};

const groupStores = STORES.filter((s) => !["sprinter", "amg"].includes(s.key));

export default function LibiPage() {
  return (
    <div className="libi-root min-h-screen bg-cag-ink font-cag text-white">
      {/* Montserrat stands in for the Competition logo type, on this page only; React hoists this into <head>. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
        precedence="default"
      />

      <section className="relative overflow-hidden border-b border-cag-line bg-cag-ink">
        <FlowLines className="absolute inset-0 h-full w-full" focusY={0.82} count={30} alpha={0.42} rgb={CAG.silverRgb} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(94,176,255,0.38),transparent_60%)]" />
        <div className="relative mx-auto max-w-2xl px-6 pb-14 pt-9 md:px-4">
          <div className="flex items-start justify-between gap-4">
            <CompetitionMark size={1.05} />
            <div className="pt-1 text-right text-[0.58rem] font-semibold uppercase leading-4 tracking-[0.24em] text-cag-accent">
              LIBI
              <br />
              {EVENT.dateShort}
            </div>
          </div>
          <div className="mt-16 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cag-accent">For LIBI members &amp; guests</div>
          <h1 className="mt-4 uppercase text-white" style={{ fontSize: "clamp(1.9rem, 8.4vw, 4.2rem)", lineHeight: 1.08, letterSpacing: "0.05em" }}>
            <span style={{ fontWeight: 300, color: "#DCE6F5" }}>Unlock your</span>
            <br />
            <span style={{ fontWeight: 700 }}>Builder Pass</span>
          </h1>
          <div className="mt-5 max-w-xl text-base font-medium leading-7 text-cag-mist md:text-lg">
            {leadPerk().title} at all five Competition Automotive Group stores, +$500 on Sprinter vans, and a {CERT.short} for the
            Mercedes you choose. Share your code and it goes <span className="font-semibold" style={{ color: CAG.gold }}>{GOLD.label}</span>.
          </div>
          <div className="mt-6 h-[3px] w-16 bg-white" />
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
              <h2 className="font-cag text-base font-bold uppercase tracking-[0.1em] text-white">{p.title}</h2>
              <div className="mt-2 text-sm leading-6 text-cag-mist">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* A preview of the certificate; hidden once the guest has their own (see .libi-root in globals.css). */}
      <section id="libi-cert-preview" className="mx-auto max-w-2xl px-4 pb-10">
        <div className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cag-accent">Your certificate · share it to go {GOLD.label}</div>
        <Certificate />
        <div className="mx-auto mt-4 max-w-[440px] text-center text-sm font-medium leading-6 text-cag-mist">
          Every pass has its own code. When a colleague activates a pass with yours, you both go{" "}
          <span className="font-semibold" style={{ color: CAG.gold }}>{GOLD.label}</span>: {GOLD.reward.toLowerCase()} when you come in for your drive.
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-10">
        <div className="relative overflow-hidden rounded-xl border border-cag-line bg-cag-panel p-6">
          <FlowLines className="absolute inset-0 h-full w-full" focusY={0.9} count={16} alpha={0.22} rgb={CAG.silverRgb} />
          <div className="relative">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cag-accent">One pass · five stores</div>
            <div className="mt-4">
              <CompetitionMark size={1.2} />
            </div>
            <div className="mt-4 text-sm font-medium leading-6 text-cag-mist">
              A Long Island family business for more than 65 years. Whatever you drive, or your spouse, your kids or your crew, your
              pass works at every store.
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {groupStores.map((s) => (
                <li key={s.key} className="border-l-2 border-cag-accent pl-3 text-sm font-medium text-white">
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
          Call or text <a href={`tel:${MK.cell}`} className="text-white">{MK.cellDisplay}</a> ·{" "}
          <a href="/libi/mk-parrish.vcf" className="text-cag-accent underline underline-offset-4">Save contact</a>
        </div>
      </footer>
    </div>
  );
}
