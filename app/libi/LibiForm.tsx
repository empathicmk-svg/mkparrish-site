'use client';

import { useEffect, useState } from "react";
import { MEMBER_OFFER, MK, PAGE_PATH, PRIZE, ROLES, SITE, STORES, TIMELINES, cleanRef, shareCode } from "./campaign";

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

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    // Reading the URL after mount keeps the page static; nothing renders differently on the server.
    setRef(cleanRef(p.get("ref")));
    setSrc((p.get("src") || (p.get("ref") ? "share" : "direct")).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40));
  }, []);

  const toggle = (k: string) => setStores((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const smsBody = (code: string) =>
    [
      `Hi MK! Enter me in the LIBI Mercedes weekend drawing.`,
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
      `My code: ${code}`,
    ]
      .filter(Boolean)
      .join("\n");

  const submit = async () => {
    if (!name.trim()) return setError("Add your name so I know who to call if you win.");
    if (phone.replace(/\D/g, "").length < 10) return setError("Add a 10-digit phone number. That's how I reach the winner.");
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
    const shareUrl = `${SITE}${PAGE_PATH}?ref=${done.code}`;
    const shareText = `I just entered to win a Mercedes weekend from Mercedes-Benz of Smithtown. LIBI members also get $1,500 off any new car through ${MEMBER_OFFER.expiresShort}. Enter here:`;
    const share = async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: "Win a Mercedes weekend", text: shareText, url: shareUrl });
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
            <p className="font-display text-2xl uppercase tracking-[0.04em] text-petal">One more tap to lock it in</p>
            <p className="mt-2 font-body text-sm leading-6 text-smoke">
              The signal in here is spotty. Send me your entry by text so it counts. It&apos;s already written for you.
            </p>
            <a
              href={`sms:${MK.work}?&body=${encodeURIComponent(smsBody(done.code))}`}
              className="mt-4 block bg-petal px-6 py-4 text-center font-display text-2xl uppercase tracking-[0.06em]"
              style={ON_PINK}
            >
              Text my entry to MK
            </a>
          </div>
        )}
        <div className="border border-graphite bg-obsidian p-6">
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-petal">
            {done.notified ? "You're entered" : "Almost there"}
          </p>
          <h2 className="mt-2 font-display text-5xl uppercase leading-[0.9] text-pearl">
            Good luck, {name.trim().split(/\s+/)[0]}
          </h2>
          <p className="mt-3 font-body text-sm leading-6 text-smoke">
            {`I draw the winner on ${PRIZE.drawDate} and I'll call you if it's you.`}
            {done.emailed ? " Your entry and your member offers are in your inbox." : ""}
          </p>
        </div>

        <div className="border border-graphite bg-obsidian p-6">
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Get extra entries</p>
          <p className="mt-2 font-display text-3xl uppercase leading-none text-pearl">
            Your code: <span className="text-petal">{done.code}</span>
          </p>
          <p className="mt-3 font-body text-sm leading-6 text-smoke">
            Everyone who enters with your link earns you one more entry, with no limit. Send it to your crew, your partners and your buyers.
          </p>
          <button
            type="button"
            onClick={share}
            className="mt-4 w-full bg-petal px-6 py-4 font-display text-2xl uppercase tracking-[0.06em]"
            style={ON_PINK}
          >
            {copied ? "Link copied" : "Share my link"}
          </button>
          <p className="mt-3 break-all font-body text-xs text-ash">{shareUrl}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="/libi/mk-parrish.vcf"
            className="border border-petal px-6 py-4 text-center font-display text-xl uppercase tracking-[0.06em] text-petal hover:bg-petal/10"
          >
            Save MK&apos;s contact
          </a>
          <a
            href="/test-drive"
            className="border border-graphite px-6 py-4 text-center font-display text-xl uppercase tracking-[0.06em] text-pearl hover:border-petal"
          >
            Book a test drive
          </a>
        </div>
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
      {ref && (
        <p className="border border-graphite bg-obsidian px-4 py-3 font-body text-sm text-smoke">
          A friend sent you here (code <span className="font-semibold text-petal">{ref}</span>). You both get an entry.
        </p>
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
          <input id="l-email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} type="email" inputMode="email" autoComplete="email" placeholder="For your member offers" />
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
        <p className="font-display text-2xl uppercase tracking-[0.03em] text-pearl">Who else needs a car? <span className="text-petal">+1 entry</span></p>
        <p className="mt-1 font-body text-sm leading-6 text-smoke">A partner, a foreman, a buyer who just closed. I&apos;ll take good care of them.</p>
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
          MK may call or text me about the drawing and my member offers. Reply STOP any time.
        </label>
      </div>

      {error && <p role="alert" className="font-body text-sm text-petal">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="bg-petal px-6 py-5 font-display text-3xl uppercase tracking-[0.06em] transition-opacity hover:opacity-90 disabled:opacity-60"
        style={ON_PINK}
      >
        {sending ? "Entering…" : "Enter to win"}
      </button>
      <p className="font-body text-xs leading-5 text-ash">
        No purchase necessary. Open to adults 21+ with a valid driver&apos;s license and insurance. One winner, drawn {PRIZE.drawDate}.
        Extra entries: one per person who enters with your link or whom you refer. Member offers are subject to dealer confirmation,
        residency and credit approval, and can&apos;t be combined where prohibited. See MK for details.
      </p>
    </form>
  );
}
