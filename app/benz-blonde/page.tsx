import Link from "next/link";
import { BENZ, FAQ_ITEMS, LANES, MODELS, PROMISES, SOCIAL_LIVE } from "./data";
import { Accordion, Card, Kicker, Lede, Pull, Section, SectionTitle } from "./parts";
import LeadForm from "./LeadForm";

export default function BenzBlondeHome() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-void" style={{ padding: "clamp(4rem, 9vw, 7.5rem) 0 clamp(3rem, 6vw, 5rem)" }}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,181,208,0.13),transparent_62%)]" />
        <div className="relative mx-auto max-w-[1300px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-petal">
            {BENZ.store} · {BENZ.area}
          </p>
          <h1
            className="mt-6 font-display uppercase tracking-[0.02em] text-white"
            style={{ fontSize: "clamp(3rem, 11vw, 9rem)", lineHeight: 0.86 }}
          >
            Buy a Benz
            <br />
            <span className="text-petal">from a human.</span>
          </h1>
          <p className="mt-8 max-w-[58ch] font-body text-lg font-light leading-8 text-smoke md:text-xl">
            I am MK. I sell Mercedes-Benz on Long Island, and I do it the way I would want it done to me: the real
            number first, your trade appraised honestly, the car pulled up front before you arrive, and the same
            person answering your texts three years from now.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/benz-blonde/book"
              className="btn-primary inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Book a Drive →
            </Link>
            <Link
              href="/benz-blonde/trade"
              className="btn-ghost inline-flex items-center justify-center px-8 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]"
            >
              What&rsquo;s My Car Worth?
            </Link>
            <a
              href={BENZ.smsHref}
              className="inline-flex items-center justify-center px-2 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-ash transition-colors hover:text-petal"
            >
              Or text {BENZ.phone}
            </a>
          </div>

          <div className="mt-14 grid gap-px border border-graphite bg-graphite sm:grid-cols-3">
            {[
              { k: "One number", v: "Out-the-door, before you drive anywhere." },
              { k: "One person", v: "Deal, delivery, first service, next car." },
              { k: "One honest no", v: "If you should keep your car, I say keep it." },
            ].map((item) => (
              <div key={item.k} className="bg-obsidian p-6">
                <p className="font-display text-2xl uppercase tracking-[0.02em] text-petal">{item.k}</p>
                <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Four lanes ───────────────────────────────────────────────────── */}
      <Section bg="obsidian">
        <Kicker>Pick your lane</Kicker>
        <SectionTitle>
          Why people<br />text me.
        </SectionTitle>
        <Lede>
          Four conversations make up almost all of my business. Find yours, tell me the truth about where you are, and
          I will tell you the truth about what it costs.
        </Lede>

        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-2">
          {LANES.map((lane) => (
            <Link key={lane.slug} href={lane.href} className="group block bg-obsidian p-7 transition-colors hover:bg-carbon md:p-9">
              <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-iron">{lane.kicker}</p>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl transition-colors group-hover:text-petal md:text-4xl">
                {lane.title}
              </h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{lane.body}</p>
              <p className="mt-6 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-petal">
                {lane.cta}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── The promise ──────────────────────────────────────────────────── */}
      <Section bg="void">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker>How I work</Kicker>
            <SectionTitle>
              Nobody likes<br />buying a car.
            </SectionTitle>
            <Lede>
              Not the waiting. Not the four-square. Not the part where the number changes on the way to the desk. I
              cannot fix the whole industry from one desk in Smithtown, but I can run my half of it like an adult.
            </Lede>
            <div className="mt-9">
              <Pull by="MK Parrish · The Benz Blonde">
                I would rather lose a deal today than have you tell someone I was slick. This job is referrals or it is
                nothing.
              </Pull>
            </div>
          </div>

          <div className="grid gap-px bg-graphite sm:grid-cols-2">
            {PROMISES.map((p) => (
              <div key={p.num} className="bg-obsidian p-7">
                <p className="font-mono text-xs tracking-[0.2em] text-iron">{p.num}</p>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Lineup teaser ────────────────────────────────────────────────── */}
      <Section bg="obsidian">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>The lineup</Kicker>
            <SectionTitle>Eleven ways in.</SectionTitle>
          </div>
          <Link
            href="/benz-blonde/shop"
            className="font-body text-[0.78rem] font-bold uppercase tracking-[0.2em] text-petal transition-colors hover:text-blush"
          >
            See all →
          </Link>
        </div>
        <Lede>
          Most people know two models and assume the rest are out of reach. Half the time the car they actually want is
          cheaper than the one they walked in asking about.
        </Lede>

        <div className="mt-11 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
          {MODELS.slice(0, 6).map((m) => (
            <Link key={m.slug} href={`/benz-blonde/shop#${m.slug}`} className="group bg-obsidian p-6 transition-colors hover:bg-carbon">
              <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.22em] text-iron">{m.body}</p>
              <p className="mt-2 font-display text-4xl uppercase tracking-[0.02em] text-white transition-colors group-hover:text-petal">
                {m.name}
              </p>
              <p className="mt-3 font-serif text-base italic leading-6 text-smoke">{m.headline}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Social ───────────────────────────────────────────────────────── */}
      {SOCIAL_LIVE.length > 0 && (
        <Section bg="carbon" tight>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <Kicker>Watch first, buy later</Kicker>
              <SectionTitle>
                I show you<br />the math.
              </SectionTitle>
              <Lede>
                Money factor, residual, acquisition fee, what &ldquo;$500 over book&rdquo; actually means. I explain the
                parts of this business that only stay confusing because confusion is profitable.
              </Lede>
              <Link
                href="/benz-blonde/watch"
                className="btn-ghost mt-8 inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]"
              >
                See the Series →
              </Link>
            </div>
            <div className="grid gap-px bg-graphite sm:grid-cols-2">
              {SOCIAL_LIVE.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="group bg-obsidian p-6 transition-colors hover:bg-void">
                  <p className="font-display text-2xl uppercase tracking-[0.03em] text-pearl transition-colors group-hover:text-petal">
                    {s.name}
                  </p>
                  <p className="mt-1 font-mono text-[0.68rem] tracking-[0.1em] text-iron">{s.handle}</p>
                  <p className="mt-3 font-body text-xs font-light leading-6 text-smoke">{s.blurb}</p>
                </a>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section bg="obsidian" id="faq">
        <Kicker>Straight answers</Kicker>
        <SectionTitle>
          The questions<br />people whisper.
        </SectionTitle>
        <Lede>
          None of these are embarrassing. The only bad move is not asking and guessing wrong for the next thirty-six
          months.
        </Lede>
        <div className="mt-11">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Section>

      {/* ── Close ────────────────────────────────────────────────────────── */}
      <Section bg="void">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <Kicker>Start the conversation</Kicker>
            <SectionTitle>
              Tell me where<br />you actually are.
            </SectionTitle>
            <Lede>
              Not &ldquo;just looking.&rdquo; Tell me the real thing — the lease that ends in April, the payment you are
              tired of, the car your spouse keeps sending you. I will tell you whether it is worth moving now or
              whether you should wait, and I will mean it.
            </Lede>
            <div className="mt-9 grid gap-px bg-graphite sm:grid-cols-2">
              <div className="bg-obsidian p-6">
                <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-iron">Fastest</p>
                <a href={BENZ.smsHref} className="mt-2 block font-display text-3xl uppercase tracking-[0.03em] text-petal transition-colors hover:text-blush">
                  Text {BENZ.phone}
                </a>
              </div>
              <div className="bg-obsidian p-6">
                <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-iron">On the floor</p>
                <ul className="mt-3 space-y-1">
                  {BENZ.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4 font-body text-xs font-light text-smoke">
                      <span>{h.day}</span>
                      <span className="text-ash">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Card glow>
            <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">No pressure line</p>
            <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-white">Ask me anything</h3>
            <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
              Even if it is &ldquo;should I just keep my car?&rdquo; Especially if it is that.
            </p>
            <div className="mt-6">
              <LeadForm
                intent="general"
                source="benz-home"
                fields={["name", "phone", "email", "vehicle", "message"]}
                vehiclePlaceholder="What you drive now, or what you're eyeing"
                messagePlaceholder="What's the actual situation?"
                submitLabel="Send It →"
              />
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
