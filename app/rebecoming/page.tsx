import type { Metadata } from "next";
import Link from "next/link";
import { QuoteMosaic } from "@/app/components/QuoteMosaic";
import { EBOOKS, SITE_URL } from "@/app/lib/config";

const BOOK = EBOOKS.find((e) => e.slug === "rebecoming")!;
const paperback = (BOOK as { paperback?: { price: string; href: string } }).paperback;
const COVER = "/downloads/covers/rebecoming-cover.jpg";

const audience = [
  "Women rebuilding after divorce, grief, burnout, crisis, or a private before/after nobody else can see yet.",
  "Writers, founders, mothers, daughters, and operators who are tired of sounding like the safest version of themselves.",
  "Readers returning to faith, voice, work, friendship, body, creativity, or the life they abandoned to survive.",
  "Anyone standing at the bottom of the steps, wanting a sign that the room can still be for them.",
] as const;

const method = [
  {
    title: "Remember",
    text: "Name what happened without letting it become the only thing that is true about you.",
  },
  {
    title: "Release",
    text: "Put down the identities, performances, and survival habits that kept you alive but cannot take you forward.",
  },
  {
    title: "Rewrite",
    text: "Find the sentence, prayer, offer, page, ritual, or decision that makes the next version visible.",
  },
  {
    title: "Return",
    text: "Walk back into voice, work, friendship, faith, and ordinary life as the woman you are becoming again.",
  },
] as const;

export const metadata: Metadata = {
  title: "REBECOMING: From Fear to Faith — A Memoir by MK Parrish",
  description:
    "A present-tense memoir in thirteen chapters, woven through with Scripture and the saints, about fear, faith, prayer, and the courage to walk through a door you were told was not for you. Read it as an ebook or order the paperback.",
  alternates: { canonical: `${SITE_URL}/rebecoming` },
  openGraph: {
    title: "REBECOMING: From Fear to Faith — A Memoir by MK Parrish",
    description:
      "A memoir about losing your fear without losing yourself — on faith, prayer, and finding the room that was always yours.",
    url: `${SITE_URL}/rebecoming`,
    images: [{ url: COVER }],
    type: "book",
  },
};

export default function RebecomingMicrosite() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-void pb-20 pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.16),transparent_62%)]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[440px_1fr]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          {/* Cover */}
          <div className="mx-auto w-full max-w-[360px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={COVER}
              alt="REBECOMING: From Fear to Faith — book cover"
              width={1600}
              height={2560}
              className="aspect-[5/8] w-full border border-graphite/70 object-cover shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Pitch */}
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">A Memoir by MK Parrish</p>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.01em] text-white md:text-7xl">
              Rebecoming
            </h1>
            <p className="mt-3 font-display text-xl uppercase tracking-[0.18em] text-pearl/80 md:text-2xl">From Fear to Faith</p>
            <p className="mt-6 max-w-xl font-serif text-xl italic leading-9 text-petal/85 md:text-2xl" style={{ fontWeight: 500 }}>
              A memoir about losing your fear without losing yourself.
            </p>
            <p className="mt-4 max-w-xl font-display text-3xl uppercase leading-none tracking-[0.02em] text-pearl md:text-4xl">
              You are not starting over. <span className="text-petal pink-glow">You are rebecoming.</span>
            </p>
            <p className="mt-5 max-w-xl font-body text-base font-light leading-8 text-smoke">
              Thirteen present-tense chapters on fear, faith, prayer, and the eleven minutes it took to walk through a door I was sure
              was not for me. Woven through with Scripture, the saints, and the Blessed Mother, it is a book written to take apart
              one quiet lie: that faith, Bible study, and the warm rooms where people tell each other the truth are for a certain
              kind of person and not for you. They are for you.
            </p>

            {/* Buy options */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <a
                href={BOOK.href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary flex flex-col items-center justify-center px-6 py-5 text-center font-body text-void"
              >
                <span className="text-[0.8rem] font-bold uppercase tracking-[0.2em]">Get the Ebook — {BOOK.price}</span>
                <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-void/70">Instant PDF + Kindle EPUB</span>
              </a>
              {paperback && (
                <a
                  href={paperback.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center border border-graphite px-6 py-5 text-center font-body text-pearl transition-colors hover:border-petal hover:text-petal"
                >
                  <span className="text-[0.8rem] font-bold uppercase tracking-[0.2em]">Order the Paperback — {paperback.price}</span>
                  <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-iron">Ships to you · Free US shipping</span>
                </a>
              )}
            </div>
            <p className="mt-4 font-body text-xs font-medium text-petal">
              ♡ A portion of every sale is donated to my local parish.
            </p>
            <p className="mt-2 font-body text-xs font-light text-iron">
              Secure checkout by Stripe · No account required · Paperback orders collect your shipping address at checkout.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IT IS ── */}
      <section className="bg-carbon py-16 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.78fr_1.22fr]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">What Rebecoming is</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              A private editorial space for the woman after.
            </h2>
          </div>
          <div className="space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              Rebecoming is the book, the method, and the private room for women rebuilding identity, voice, work, and life after the thing
              that split the story into before and after.
            </p>
            <p>
              It is not a performance of healing. It is an editorial and transformational space for crisis, reinvention, divorce, burnout,
              grief, faith, creative recovery, and the brave, unglamorous work of coming back to yourself with receipts.
            </p>
            <p>
              The brand language is simple because the work is not: <span className="text-petal">Rewrite Your Story</span>. Not because
              the past did not happen, but because it does not get the last line.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO IT IS FOR ── */}
      <section className="bg-void py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Who it is for</p>
          <div className="mt-8 grid gap-px bg-graphite md:grid-cols-2">
            {audience.map((item) => (
              <article key={item} className="bg-obsidian p-7 md:p-8">
                <p className="font-serif text-xl italic leading-8 text-pearl">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHOD ── */}
      <section className="bg-obsidian py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="mb-10 max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">The Rebecoming Method</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Remember. Release. Rewrite. Return.
            </h2>
          </div>
          <div className="grid gap-px bg-petal/40 md:grid-cols-4">
            {method.map((step, index) => (
              <article key={step.title} className="bg-void p-7 md:p-8">
                <p className="font-display text-5xl leading-none text-petal/50">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{step.title}</h3>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY I WROTE IT ── */}
      <section className="bg-obsidian py-20">
        <div className="mx-auto w-full max-w-[760px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Why I wrote it</p>
          <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[0.01em] text-pearl md:text-4xl">
            For anyone standing at the bottom of the steps.
          </h2>
          <div className="mt-7 space-y-5 font-body text-base font-light leading-8 text-smoke">
            <p>
              I almost walked the other way. I stood on a rainy set of church steps with a QR code and eleven minutes, certain the
              room on the other side of the door was not meant for someone like me.
            </p>
            <p>
              This is the book about what happened when I walked in anyway: the friendships, the love, the hope, and the slow,
              unglamorous, profoundly human work of growing bigger than my fear. It is about prayer and novenas and the Blessed
              Mother, about my grandmother&apos;s rosary and my father&apos;s undeniable encounter with the afterlife, and about a
              roomful of women who became the great loves of my life.
            </p>
            <p>
              I wrote it to destigmatize Bible study and to spread the word that the door is open. If you have ever felt like faith
              was for other people, this one is for you.
            </p>
            <p>
              And because this book was born in a beautiful old parish church that welcomed me before I had said a word, a portion
              of every sale goes back to my local parish, so that the door stays open and the lights stay on for whoever comes
              next.
            </p>
          </div>

          <blockquote className="mt-10 border-l-2 border-petal/40 pl-6">
            <p className="font-serif text-xl italic leading-9 text-pearl" style={{ fontWeight: 600 }}>
              &ldquo;Certainty is just fear in a better coat. Faith is what you do while your hands are still shaking.&rdquo;
            </p>
            <p className="mt-4 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">— REBECOMING</p>
          </blockquote>
        </div>
      </section>

      <QuoteMosaic
        eyebrow="Field notes"
        title="A shelf of voices for the woman rebuilding."
        description="Rebecoming holds the memoir, the essays, the private notes, and the community path together: literary, practical, spiritual, and alive."
        primaryCta={{ href: "/downloads/ebooks/rebecoming-sample.pdf", label: "Read Chapter One" }}
        secondaryCta={{ href: "/shop", label: "Shop the Shelf" }}
        slugs={["mk-rebecoming", "seneca-difficulty", "nipsey-luck", "mk-first-draft"]}
      />

      {/* ── ESSAYS / FIELD NOTES / COMMUNITY ── */}
      <section id="field-notes" className="bg-carbon py-16 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.85fr_1.15fr]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Essays / field notes / community</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Enter quietly. Leave with language.
            </h2>
          </div>
          <div className="grid gap-px bg-graphite sm:grid-cols-3">
            {[
              { title: "Essays", text: "Long-form notes on identity, faith, grief, ambition, and becoming visible again.", href: "/margins" },
              { title: "Field Notes", text: "Practical dispatches for voice, work, money, writing, friendship, and rebuilding.", href: "/posts" },
              { title: "Community", text: "A private-list entry point for readers, book clubs, sponsors, workshops, and the next circle.", href: "/contact" },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="group bg-void p-7 transition hover:bg-obsidian">
                <h3 className="font-display text-3xl uppercase tracking-[0.02em] text-pearl group-hover:text-petal">{item.title}</h3>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{item.text}</p>
                <span className="mt-5 inline-flex font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-petal">
                  Enter →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="relative overflow-hidden bg-void py-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(242,175,198,0.10),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[680px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <h2 className="font-display text-4xl uppercase leading-tight tracking-[0.01em] text-white md:text-5xl">
            Walk through the door.
          </h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={BOOK.href}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Get the Ebook — {BOOK.price}
            </a>
            {paperback && (
              <a
                href={paperback.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-graphite px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-pearl transition-colors hover:border-petal hover:text-petal"
              >
                Order the Paperback — {paperback.price}
              </a>
            )}
            <Link
              href="/book"
              className="inline-flex items-center justify-center border border-petal/40 px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-petal transition-colors hover:border-petal hover:bg-petal hover:text-void"
            >
              Work with MK
            </Link>
          </div>
          <p className="mt-10 font-body text-xs font-light text-iron">
            More from MK Parrish at{" "}
            <Link href="/shop" className="text-petal transition hover:text-blush">mkparrish.com/shop</Link>
          </p>
        </div>
      </section>
    </>
  );
}
