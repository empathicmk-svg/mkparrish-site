'use client';

import { useEffect, useState } from "react";
import BuilderPass, { savePassImage } from "./BuilderPass";
import { MK, PAGE_PATH, PASS, PERKS, PRIZE, ROLES, SITE, STORES, TIMELINES, cleanRef, leadPerk, shareCode } from "./campaign";

// Inline colour: the site's global text styles otherwise wash out dark text on pink.
const ON_PINK = { color: "#080808" };
const CHECK_LABEL = {
  display: "inline", fontSize: "0.875rem", fontWeight: 400, letterSpacing: 0,
  textTransform: "none", color: "#B0B0B0", marginBottom: 0, lineHeight: 1.5,
} as const;

const field =
  "w-full border border-graphite bg-carbon px-4 py-3 font-body text-base text-pearl placeholder:text-iron focus:border-petal focus:outline-none";
const label = "mb-2 block font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ash";
const chip = (on: boolean) =>
  `border px-3 py-2 text-left font-body text-sm transition-colors ${on ? "border-petal bg-petal font-semibold" : "border-graphite bg-carbon text-smoke hover:border-petal/60"}`;

type Done = { code: string; notified: boolean; emailed: boolean };

export default function LibiForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [stores, setStores] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [tradeIn, setTradeIn] = useState(false);
  const [referName, setReferName] = useState("");
  const [referPhone, setReferPhone] = useState("");
  const [consent, setConsent] = useState(true);
  const [website, setWebsite] = useState("");
  const [ref, setRef] = useState("");
  const [src, setSrc] = useState("direct");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    // Reading the URL after mount keeps the page static; nothing renders differently on the server.
    setRef(cleanRef(p.get("ref")));
    setSrc((p.get("src") || (p.get("ref") ? "share" : "direct")).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40));
  }, []);

  const toggle = (k: string) => setStores((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const smsBody = (code: string) =>
    [
      `Hi MK! Here's my Competition Builder Pass from LIBI.`,
      `Name: ${name}`,
      company && `Company: ${company}`,
      `Phone: ${phone}`,
      email && `Email: ${email}`,
      role && `Role: ${role}`,
      stores.length > 0 && `Interested in: ${stores.map((k) => STORES.find((s) => s.key === k)?.label).join(", ")}`,
      timeline && `Timeline: ${timeline}`,
      tradeIn && "I have a trade-in or a lease ending.",
      (referName || referPhone) && `Referral: ${referName} ${referPhone}`.trim(),
      ref && `Referred by code: ${ref}`,
      `Pass №: ${code}`,
    ]
      .filter(Boolean)
      .join("\n");

  const submit = async () => {
    if (!name.trim()) return setError("Add your name. It goes on your pass.");
    if (phone.replace(/\D/g, "").length < 10) return setError("Add a 10-digit mobile number. It's how I reach you if you win.");
    setError("");
    setSending(true);
    const fallbackCode = shareCode(name, phone);
    try {
      const res = await fetch("/api/libi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email, company, role, stores, timeline, tradeIn, referName, referPhone, consent, ref, src, website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 422) {
        setError(data.error || "Check your details and try again.");
        return;
      }
      setDone({ code: data.code || fallbackCode, notified: Boolean(data.notified), emailed: Boolean(data.emailed) });
    } catch {
      // Offline or the API is down: the entry still goes through by text on the next screen.
      setDone({ code: fallbackCode, notified: false, emailed: false });
    } finally {
      setSending(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    const first = name.trim().split(/\s+/)[0];
    const holder = name.trim().replace(/\s+/g, " ").slice(0, 28);
    const shareUrl = `${SITE}${PAGE_PATH}?ref=${done.code}`;
    const shareText = `I just got my Competition Builder Pass from MK Parrish at Mercedes-Benz of Smithtown: VIP pricing at all five Competition Automotive Group stores and a shot at a Mercedes weekend. Get yours:`;
    const share = async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: "Competition Builder Pass", text: shareText, url: shareUrl });
          return;
        } catch {
          /* fall through to copy */
        }
      }
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopied(true);
      } catch {
        window.location.href = `sms:?&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
      }
    };
    return (
      <div className="flex flex-col gap-6" aria-live="polite">
        {!done.notified && (
          <div className="border border-petal bg-petal/10 p-5">
            <div className="font-display text-2xl uppercase tracking-[0.04em] text-petal">One more tap to lock it in</div>
            <div className="mt-2 font-body text-sm leading-6 text-smoke">
              The signal in here is spotty. Text me your pass so it&apos;s on file. The message is already written.
            </div>
            <a
              href={`sms:${MK.work}?&body=${encodeURIComponent(smsBody(done.code))}`}
              className="mt-4 block bg-petal px-6 py-4 text-center font-display text-2xl uppercase tracking-[0.06em]"
              style={ON_PINK}
            >
              Text my pass to MK
            </a>
          </div>
        )}

        <div className="text-center">
          <div className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-petal">
            {revealed ? "Your pass is live" : "Your pass is ready"}
          </div>
          <h2 className="mt-2 font-display text-5xl uppercase leading-[0.9] text-pearl">
            {revealed ? <>Welcome, <span className="text-petal">{first}</span></> : <>Scratch to <span className="text-petal">reveal</span></>}
          </h2>
        </div>

        <BuilderPass holder={holder} code={done.code} scratch={!revealed} onRevealed={() => setRevealed(true)} />
        {!revealed && (
          <button type="button" onClick={() => setRevealed(true)} className="mx-auto font-body text-xs uppercase tracking-[0.2em] text-ash underline underline-offset-4">
            Can&apos;t scratch? Tap here
          </button>
        )}

        {revealed && (
          <>
            <ul className="grid gap-px bg-graphite">
              {[leadPerk(), ...PERKS.slice(1)].map((p) => (
                <li key={p.title} className="flex gap-3 bg-obsidian px-5 py-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-petal" style={{ boxShadow: "0 0 10px #FFB5D0" }} />
                  <span>
                    <span className="block font-display text-xl uppercase tracking-[0.03em] text-pearl">{p.title}</span>
                    <span className="block font-body text-sm leading-6 text-smoke">{p.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="text-center font-body text-sm leading-6 text-smoke">
              Show pass <span className="font-semibold text-petal">{done.code}</span> to me or any Competition store through {PASS.validThrough}.
              {done.emailed ? " A copy is in your inbox." : ""}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => void savePassImage(holder, done.code)}
                className="bg-petal px-6 py-4 font-display text-2xl uppercase tracking-[0.06em]"
                style={ON_PINK}
              >
                Save my pass
              </button>
              <a
                href="/libi/mk-parrish.vcf"
                className="border border-petal px-6 py-4 text-center font-display text-2xl uppercase tracking-[0.06em] text-petal hover:bg-petal/10"
              >
                Save MK&apos;s contact
              </a>
            </div>

            <div className="border border-graphite bg-obsidian p-6">
              <div className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Pass it on · extra entries</div>
              <div className="mt-2 font-display text-3xl uppercase leading-none text-pearl">
                Give your crew a <span className="text-petal">pass</span>
              </div>
              <div className="mt-3 font-body text-sm leading-6 text-smoke">
                Everyone who gets a pass through your link adds an entry for you in the Mercedes weekend drawing, with no limit. Send it to
                partners, foremen and buyers at closing.
              </div>
              <button
                type="button"
                onClick={share}
                className="mt-4 w-full border border-petal px-6 py-4 font-display text-2xl uppercase tracking-[0.06em] text-petal hover:bg-petal/10"
              >
                {copied ? "Link copied" : "Share my link"}
              </button>
              <div className="mt-3 break-all font-body text-xs text-ash">{shareUrl}</div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="flex flex-col gap-6"
      noValidate
    >
      <div className="mb-4">
        <BuilderPass />
        <div className="mt-4 text-center font-body text-xs uppercase tracking-[0.22em] text-ash">
          Fill this in · scratch your pass · valid thru {PASS.validShort}
        </div>
      </div>

      {ref && (
        <div className="border border-graphite bg-obsidian px-4 py-3 font-body text-sm text-smoke">
          A friend passed this on (pass <span className="font-semibold text-petal">{ref}</span>). You both get an entry in the drawing.
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="l-name" className={label}>Name *</label>
          <input id="l-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="First and last" />
        </div>
        <div>
          <label htmlFor="l-phone" className={label}>Mobile *</label>
          <input id="l-phone" className={field} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="(631) 555-0123" />
        </div>
        <div>
          <label htmlFor="l-email" className={label}>Email</label>
          <input id="l-email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} type="email" inputMode="email" autoComplete="email" placeholder="A copy of your pass" />
        </div>
        <div>
          <label htmlFor="l-company" className={label}>Company</label>
          <input id="l-company" className={field} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" placeholder="Your company" />
        </div>
      </div>

      <fieldset>
        <legend className={label}>What do you do?</legend>
        <div className="grid grid-cols-2 gap-2">
          {ROLES.map((r) => (
            <button key={r} type="button" onClick={() => setRole(role === r ? "" : r)} aria-pressed={role === r} className={chip(role === r)} style={role === r ? ON_PINK : undefined}>
              {r}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>What should I look into for you?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {STORES.map((s) => {
            const on = stores.includes(s.key);
            return (
              <button key={s.key} type="button" onClick={() => toggle(s.key)} aria-pressed={on} className={chip(on)} style={on ? ON_PINK : undefined}>
                <span className="block">{s.label}</span>
                <span className={`block text-xs font-normal ${on ? "" : "text-ash"}`} style={on ? ON_PINK : undefined}>{s.note}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>When are you thinking?</legend>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map((t) => (
            <button key={t} type="button" onClick={() => setTimeline(timeline === t ? "" : t)} aria-pressed={timeline === t} className={chip(timeline === t)} style={timeline === t ? ON_PINK : undefined}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex items-start gap-3">
        <input id="l-trade" type="checkbox" checked={tradeIn} onChange={(e) => setTradeIn(e.target.checked)} className="mt-0.5 shrink-0 accent-[#FFB5D0]" style={{ width: 20, height: 20, padding: 0 }} />
        <label htmlFor="l-trade" className="font-body" style={CHECK_LABEL}>
          I have a trade-in, a lease ending, or company vehicles to replace
        </label>
      </div>

      <div className="border border-graphite bg-obsidian p-5">
        <div className="font-display text-2xl uppercase tracking-[0.03em] text-pearl">Who else needs a car? <span className="text-petal">+1 entry</span></div>
        <div className="mt-1 font-body text-sm leading-6 text-smoke">A partner, a foreman, a buyer who just closed. I&apos;ll take good care of them.</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input aria-label="Their name" className={field} value={referName} onChange={(e) => setReferName(e.target.value)} placeholder="Their name" />
          <input aria-label="Their phone" className={field} value={referPhone} onChange={(e) => setReferPhone(e.target.value)} type="tel" inputMode="tel" placeholder="Their phone" />
        </div>
      </div>

      {/* Honeypot: real people never see or fill this. */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className="flex items-start gap-3">
        <input id="l-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 shrink-0 accent-[#FFB5D0]" style={{ width: 20, height: 20, padding: 0 }} />
        <label htmlFor="l-consent" className="font-body" style={CHECK_LABEL}>
          MK may call or text me about my pass and the drawing. Reply STOP any time.
        </label>
      </div>

      {error && <div role="alert" className="font-body text-sm text-petal">{error}</div>}

      <button
        type="submit"
        disabled={sending}
        className="bg-petal px-6 py-5 font-display text-3xl uppercase tracking-[0.06em] transition-opacity hover:opacity-90 disabled:opacity-60"
        style={ON_PINK}
      >
        {sending ? "Unlocking…" : "Unlock my pass"}
      </button>
      <div className="font-body text-xs leading-5 text-ash">
        No purchase necessary. Drawing open to adults 21+ with a valid driver&apos;s license and insurance; one winner, drawn {PRIZE.drawDate}.
        Extra entries: one per person who gets a pass through your link or whom you refer. Pass benefits are valid through {PASS.validThrough},
        subject to dealer confirmation, residency and credit approval, and can&apos;t be combined where prohibited. See MK for details.
      </div>
    </form>
  );
}
