'use client';

import { useEffect, useState } from "react";
import BuilderPass, { Certificate, savePassImage } from "./BuilderPass";
import { CERT, GOLD, MK, PAGE_PATH, PASS, PERKS, ROLES, SITE, STORES, TIMELINES, cleanRef, leadPerk, levelLabel, shareCode, type Level } from "./campaign";

// Inline colour: the site's global text styles otherwise wash out dark text on white buttons.
const ON_LIGHT = { color: "#06142E" };
const CHECK_LABEL = {
  display: "inline", fontSize: "0.875rem", fontWeight: 400, letterSpacing: 0,
  textTransform: "none", color: "#DCE6F5", marginBottom: 0, lineHeight: 1.5,
} as const;

const field =
  "w-full rounded-md border border-cag-line bg-cag-ink px-4 py-3 font-cag text-base text-white placeholder:text-cag-fog focus:border-white focus:outline-none";
const label = "mb-2 block font-cag text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cag-fog";
const chip = (on: boolean) =>
  `rounded-md border px-3 py-2 text-left font-cag text-sm transition-colors ${on ? "border-white bg-white font-semibold" : "border-cag-line bg-cag-ink text-cag-mist hover:border-white/60"}`;

type Done = { code: string; level: Level; notified: boolean; emailed: boolean };

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
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [ref, setRef] = useState("");
  const [src, setSrc] = useState("direct");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // After submitting, bring the scratch card itself into view, not the top of the page.
  useEffect(() => {
    if (done) document.getElementById("libi-scratch")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

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
      `Certificate: ${levelLabel(ref && ref !== code ? "gold" : "silver")}`,
    ]
      .filter(Boolean)
      .join("\n");

  const submit = async () => {
    if (!name.trim()) return setError("Add your name. It goes on your pass.");
    if (phone.replace(/\D/g, "").length < 10) return setError("Add a 10-digit mobile number. It's how I book your drive.");
    setError("");
    setSending(true);
    const fallbackCode = shareCode(name, phone);
    const fallbackLevel: Level = ref && ref !== fallbackCode ? "gold" : "silver";
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
      setDone({
        code: data.code || fallbackCode,
        level: data.level === "gold" || data.level === "silver" ? data.level : fallbackLevel,
        notified: Boolean(data.notified),
        emailed: Boolean(data.emailed),
      });
    } catch {
      // Offline or the API is down: the entry still goes through by text on the next screen.
      setDone({ code: fallbackCode, level: fallbackLevel, notified: false, emailed: false });
    } finally {
      setSending(false);
    }
  };

  if (done) {
    const first = name.trim().split(/\s+/)[0];
    const holder = name.trim().replace(/\s+/g, " ").slice(0, 28);
    const shareUrl = `${SITE}${PAGE_PATH}?ref=${done.code}`;
    const shareText = `I just got my Competition Builder Pass at the LIBI dinner: VIP pricing at all five Competition Automotive Group stores, plus a ${CERT.short} for the Mercedes you choose. Use my link and yours starts at ${GOLD.label}:`;
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
        <div id="libi-scratch" className="scroll-mt-6 text-center">
          <div className="font-cag text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-cag-accent">
            {revealed ? "Your pass is live" : "Your pass is ready"}
          </div>
          <h2 className="mt-2 font-cag text-2xl font-light uppercase leading-tight tracking-[0.08em] text-white">
            {revealed ? <>Welcome, <span className="text-cag-accent">{first}</span></> : <>Swipe to <span className="text-cag-accent">reveal</span></>}
          </h2>
        </div>

        <BuilderPass holder={holder} code={done.code} level={done.level} scratch={!revealed} onRevealed={() => setRevealed(true)} />
        {!revealed && (
          <button type="button" onClick={() => setRevealed(true)} className="mx-auto font-cag text-xs uppercase tracking-[0.2em] text-cag-fog underline underline-offset-4">
            Or tap here to reveal
          </button>
        )}

        {!done.notified && (
          <div className="rounded-xl border border-white/70 bg-white/5 p-5">
            <div className="font-cag text-base font-semibold uppercase tracking-[0.12em] text-cag-accent">One more tap to lock it in</div>
            <div className="mt-2 font-cag text-sm leading-6 text-cag-mist">
              The signal in here is spotty. Text me your pass so it&apos;s on file. The message is already written.
            </div>
            <a
              href={`sms:${MK.cell}?&body=${encodeURIComponent(smsBody(done.code))}`}
              className="mt-4 block rounded-md bg-white px-6 py-4 text-center font-cag text-sm font-semibold uppercase tracking-[0.16em]"
              style={ON_LIGHT}
            >
              Text my pass to MK
            </a>
          </div>
        )}

        {revealed && (
          <>
            <div>
              <div className="mb-3 text-center font-cag text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-cag-accent">
                Your certificate · {levelLabel(done.level)}
              </div>
              <Certificate code={done.code} level={done.level} />
            </div>
            <ul className="grid gap-px overflow-hidden rounded-xl bg-cag-line">
              {[leadPerk(), ...PERKS.slice(1)].map((p) => (
                <li key={p.title} className="flex gap-3 bg-cag-panel px-5 py-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cag-accent" />
                  <span>
                    <span className="block font-cag text-sm font-semibold uppercase tracking-[0.1em] text-white">{p.title}</span>
                    <span className="block font-cag text-sm leading-6 text-cag-mist">{p.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="text-center font-cag text-sm leading-6 text-cag-mist">
              Show pass <span className="font-semibold text-cag-accent">{done.code}</span> to me or any Competition store through {PASS.validThrough}.
              {done.emailed ? " A copy is in your inbox." : ""}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => void savePassImage(holder, done.code, done.level)}
                className="rounded-md bg-white px-6 py-4 font-cag text-sm font-semibold uppercase tracking-[0.16em]"
                style={ON_LIGHT}
              >
                Save my pass
              </button>
              <a
                href="/libi/mk-parrish.vcf"
                className="rounded-md border border-white/70 px-6 py-4 text-center font-cag text-sm font-semibold uppercase tracking-[0.16em] text-cag-accent hover:bg-white/5"
              >
                Save MK&apos;s contact
              </a>
            </div>

            <div className="rounded-xl border-2 border-white bg-cag-panel p-6">
              <div className="font-cag text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-cag-accent">
                {done.level === "gold" ? "Pass it on" : `Share your code · go ${GOLD.label}`}
              </div>
              <div className="mt-2 font-cag text-xl font-semibold uppercase leading-tight tracking-[0.08em] text-white">
                {done.level === "gold" ? (
                  <>Give your crew a <span style={{ color: "#F2C14E" }}>{GOLD.label}</span> start</>
                ) : (
                  <>Share it. You both go <span style={{ color: "#F2C14E" }}>{GOLD.label}</span></>
                )}
              </div>
              <div className="mt-3 font-cag text-sm leading-6 text-cag-mist">
                {done.level === "gold"
                  ? `Your certificate is already ${GOLD.label}. Anyone who activates a pass with your code starts at ${GOLD.label} too. Send it to partners, foremen and buyers at closing.`
                  : `When a colleague activates a pass with your code, both certificates upgrade to ${GOLD.label}: ${GOLD.reward.toLowerCase()} when you come in for your drive. I'll text you when your upgrade lands.`}
              </div>
              <button
                type="button"
                onClick={share}
                className="mt-4 w-full rounded-md bg-white px-6 py-4 font-cag text-sm font-semibold uppercase tracking-[0.16em] hover:opacity-90"
                style={ON_LIGHT}
              >
                {copied ? "Link copied" : `Share my code · ${done.code}`}
              </button>
              <div className="mt-3 break-all font-cag text-xs text-cag-fog">{shareUrl}</div>
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
        <div className="mt-4 text-center font-cag text-xs uppercase tracking-[0.22em] text-cag-fog">
          Fill this in · swipe to reveal your pass · get your certificate
        </div>
      </div>

      {ref && (
        <div className="rounded-md border border-cag-line bg-cag-panel px-4 py-3 font-cag text-sm text-cag-mist">
          A friend passed this on (code <span className="font-semibold text-white">{ref}</span>). Your certificate starts at{" "}
          <span className="font-semibold" style={{ color: "#F2C14E" }}>{GOLD.label}</span>: {GOLD.reward.toLowerCase()} when you come in.
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
            <button key={r} type="button" onClick={() => setRole(role === r ? "" : r)} aria-pressed={role === r} className={chip(role === r)} style={role === r ? ON_LIGHT : undefined}>
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
              <button key={s.key} type="button" onClick={() => toggle(s.key)} aria-pressed={on} className={chip(on)} style={on ? ON_LIGHT : undefined}>
                <span className="block">{s.label}</span>
                <span className={`block text-xs font-normal ${on ? "" : "text-cag-fog"}`} style={on ? ON_LIGHT : undefined}>{s.note}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>When are you thinking?</legend>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map((t) => (
            <button key={t} type="button" onClick={() => setTimeline(timeline === t ? "" : t)} aria-pressed={timeline === t} className={chip(timeline === t)} style={timeline === t ? ON_LIGHT : undefined}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex items-start gap-3">
        <input id="l-trade" type="checkbox" checked={tradeIn} onChange={(e) => setTradeIn(e.target.checked)} className="mt-0.5 shrink-0 accent-[#5EB0FF]" style={{ width: 20, height: 20, padding: 0 }} />
        <label htmlFor="l-trade" className="font-cag" style={CHECK_LABEL}>
          I have a trade-in, a lease ending, or company vehicles to replace
        </label>
      </div>

      <div className="rounded-xl border border-cag-line bg-cag-panel p-5">
        <div className="font-cag text-base font-semibold uppercase tracking-[0.1em] text-white">Who else needs a car? <span style={{ color: "#F2C14E" }}>Go {GOLD.label}</span></div>
        <div className="mt-1 font-cag text-sm leading-6 text-cag-mist">A partner, a foreman, a buyer who just closed. I&apos;ll send them their own pass, and you both go {GOLD.label} when they activate it.</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input aria-label="Their name" className={field} value={referName} onChange={(e) => setReferName(e.target.value)} placeholder="Their name" />
          <input aria-label="Their phone" className={field} value={referPhone} onChange={(e) => setReferPhone(e.target.value)} type="tel" inputMode="tel" placeholder="Their phone" />
        </div>
      </div>

      {/* Honeypot: real people never see or fill this. */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className="flex items-start gap-3">
        <input id="l-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 shrink-0 accent-[#5EB0FF]" style={{ width: 20, height: 20, padding: 0 }} />
        <label htmlFor="l-consent" className="font-cag" style={CHECK_LABEL}>
          Optional: Mary Kate Parrish and Competition Automotive Group may call or text me at this number about my pass, certificate and vehicle offers. Consent is not a condition of any purchase. Msg &amp; data rates may apply. Reply STOP to opt out.
        </label>
      </div>

      {error && <div role="alert" className="font-cag text-sm text-cag-accent">{error}</div>}

      <button
        type="submit"
        disabled={sending}
        className="rounded-md bg-white px-6 py-5 font-cag text-base font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-90 disabled:opacity-60"
        style={ON_LIGHT}
      >
        {sending ? "Unlocking…" : "Unlock my pass"}
      </button>
      <div className="font-cag text-xs leading-5 text-cag-fog">
        No purchase necessary. One {CERT.short} per person, redeemed in the showroom by appointment through {PASS.validThrough}; no cash
        value, not transferable. Test drives need a valid driver&apos;s license and are subject to vehicle availability. {GOLD.label} upgrade
        ({GOLD.reward.toLowerCase()}): one per person, when someone activates a pass with your code or you activate with theirs. Pass benefits
        are subject to dealer confirmation, residency and credit approval, and can&apos;t be combined where prohibited. See MK for details.
      </div>
    </form>
  );
}
