'use client';

import { useEffect, useMemo, useState } from 'react';
import Today from './Today';
import Cars from './Cars';
import { APPROX_MSRP } from './deskProduct';
import {
  CADENCE, CFG_KEY, PIPE_KEY, SOURCES,
  type DeskConfig, type Prospect,
  todayISO, daysBetween, nextDue, money,
  leasePayment, sellPriceForPayment, dealPayout, parsePastedList,
  loadConfig, loadPipeline, loadMsrps, saveMsrp,
  encryptConfig, decryptConfig, storedState, readEnvelope,
} from './deskData';

const CSS = `
.dk{--bg:#f2f4f6;--sf:#fff;--sf2:#e9ecf0;--ink:#14181c;--ink2:#4d545c;--ink3:#7b838c;--line:#dde1e6;
 --acc:#1f5f7d;--accs:#e2eef4;--good:#2c7a4f;--goods:#e2efe8;--hot:#b04329;--hots:#f7e7e3;
 --sh:0 1px 2px rgba(0,0,0,.05),0 4px 14px rgba(0,0,0,.05);--tabh:60px;
 background:var(--bg);color:var(--ink);min-height:100vh;
 font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,system-ui,sans-serif;
 -webkit-font-smoothing:antialiased;padding-bottom:calc(var(--tabh) + env(safe-area-inset-bottom))}
@media (prefers-color-scheme:dark){.dk{--bg:#0d1013;--sf:#171b20;--sf2:#1f252b;--ink:#eef1f4;--ink2:#b0b8c1;
 --ink3:#7d858e;--line:#293038;--acc:#6bbcdd;--accs:#16303c;--good:#5fbf8a;--goods:#143024;--hot:#e08a72;--hots:#3a1f19;
 --sh:0 1px 2px rgba(0,0,0,.35),0 6px 20px rgba(0,0,0,.4)}}
.dk *,.dk *::before,.dk *::after{box-sizing:border-box}
.dk .pane{padding:14px 14px 30px;max-width:640px;margin:0 auto}
.dk h1{font-size:1.15rem;font-weight:800;letter-spacing:-.01em;margin:6px 0 2px}
.dk .sub{color:var(--ink3);font-size:.82rem;margin:0 0 14px}
.dk .card{background:var(--sf);border:1px solid var(--line);border-radius:13px;box-shadow:var(--sh);padding:14px;margin-bottom:12px;position:relative;overflow:visible;transition:none}
/* The site defines its own .card and .hero; neutralise what leaks in here. */
.dk .card::before{display:none}
.dk .card:hover{transform:none;box-shadow:var(--sh);border-color:var(--line)}
.dk label{display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:.07em;color:var(--ink3);font-weight:700;margin:0 0 5px}
.dk input,.dk select,.dk textarea{width:100%;font-size:17px;padding:11px 12px;border:1px solid var(--line);
 border-radius:9px;background:var(--sf2);color:var(--ink);font-family:inherit;font-variant-numeric:tabular-nums;-webkit-appearance:none;appearance:none}
.dk textarea{min-height:120px;font-size:14px;line-height:1.45}
.dk input:focus,.dk select:focus,.dk textarea:focus{outline:2px solid var(--acc);outline-offset:1px;border-color:var(--acc)}
.dk .row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:11px}
.dk .row.one{grid-template-columns:1fr}
.dk .chips{display:flex;gap:7px;flex-wrap:wrap}
.dk .chip{flex:1;min-width:66px;text-align:center;padding:9px 6px;border:1px solid var(--line);border-radius:9px;
 background:var(--sf2);font-size:.85rem;font-weight:650;cursor:pointer;color:var(--ink2);font-family:inherit}
.dk .chip[aria-pressed="true"]{background:var(--acc);border-color:var(--acc);color:#fff}
.dk .out{background:var(--accs);border:1px solid var(--acc);border-radius:13px;padding:15px;margin-bottom:12px}
.dk .out.warn{background:var(--hots);border-color:var(--hot)}
.dk .out .big{font-size:2.1rem;font-weight:800;letter-spacing:-.02em;color:var(--acc);font-variant-numeric:tabular-nums;line-height:1.1}
.dk .out.warn .big{color:var(--hot)}
.dk .cap{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink2);font-weight:700}
.dk .lines{margin-top:11px;padding-top:11px;border-top:1px solid var(--line)}
.dk .ln{display:flex;justify-content:space-between;gap:10px;font-size:.85rem;padding:3px 0;color:var(--ink2)}
.dk .ln b{color:var(--ink);font-variant-numeric:tabular-nums}
.dk .note{font-size:.78rem;color:var(--ink3);margin-top:9px}
.dk table{width:100%;border-collapse:collapse;font-size:.85rem}
.dk th,.dk td{text-align:left;padding:8px 9px;border-bottom:1px solid var(--line);font-variant-numeric:tabular-nums}
.dk th{font-size:.65rem;text-transform:uppercase;letter-spacing:.06em;color:var(--ink3);background:var(--sf2)}
.dk tr.cliff td{background:var(--goods);font-weight:750}
.dk tr.here td{outline:2px solid var(--acc);outline-offset:-2px}
.dk .scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
.dk button.act{width:100%;padding:13px;border:0;border-radius:10px;background:var(--acc);color:#fff;font-size:1rem;font-weight:700;font-family:inherit;cursor:pointer}
.dk button.sm{padding:7px 11px;font-size:.8rem;border-radius:8px;border:1px solid var(--line);background:var(--sf2);color:var(--ink);font-family:inherit;font-weight:650;cursor:pointer}
.dk .p{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid var(--line)}
.dk .p:last-child{border-bottom:0}
.dk .p>div:first-child{min-width:0;flex:1}
.dk .p>div:last-child{flex:none;display:flex;gap:6px;align-items:center}
.dk .nm{font-weight:680;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dk .meta{font-size:.75rem;color:var(--ink3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dk .badge{font-size:.65rem;font-weight:750;text-transform:uppercase;letter-spacing:.05em;padding:2px 7px;border-radius:5px;white-space:nowrap}
.dk .badge.late{background:var(--hots);color:var(--hot)}
.dk .badge.today{background:var(--goods);color:var(--good)}
.dk .empty{text-align:center;color:var(--ink3);font-size:.87rem;padding:22px 8px}
.dk nav{position:fixed;left:0;right:0;bottom:0;height:calc(var(--tabh) + env(safe-area-inset-bottom));
 padding-bottom:env(safe-area-inset-bottom);display:grid;grid-template-columns:repeat(6,1fr);
 background:var(--sf);border-top:1px solid var(--line);z-index:30}
.dk nav button{border:0;background:none;color:var(--ink3);font-family:inherit;font-size:.6rem;font-weight:700;
 display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;padding:0}
.dk nav button .ic{font-size:1.1rem;line-height:1}
.dk nav button[aria-selected="true"]{color:var(--acc)}

.dk .big2{font-size:1.7rem;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums;line-height:1.1}
.dk .mini{font-size:.66rem;text-transform:uppercase;letter-spacing:.07em;color:var(--ink3);font-weight:700;margin-top:2px}
.dk .h3{font-size:1rem;font-weight:750;margin:0 0 6px;color:var(--ink);background:none;-webkit-text-fill-color:currentColor}
.dk .body{font-size:.88rem;color:var(--ink2);margin:0}
.dk .card.accent{border-color:var(--acc);background:linear-gradient(180deg,var(--accs),var(--sf) 65%)}
.dk ul.todo{margin:6px 0 0;padding-left:17px;font-size:.86rem;color:var(--ink2)}
.dk ul.todo li{margin:4px 0}
.dk ol.steps{margin:6px 0 0;padding-left:19px;font-size:.88rem;color:var(--ink2)}
.dk ol.steps li{margin:6px 0}
.dk .blk{padding:9px 0;border-top:1px solid var(--line)}
.dk .blk:first-child{border-top:0}
.dk .blk.now{background:var(--accs);margin:0 -14px;padding:9px 14px;border-radius:8px}
.dk .blkhead{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.dk .blktime{font-size:.72rem;font-weight:700;color:var(--acc);font-variant-numeric:tabular-nums;white-space:nowrap}
.dk .blklabel{font-size:.88rem;font-weight:700}
.dk .blklabel.power{color:var(--acc);text-transform:uppercase;letter-spacing:.02em;font-size:.8rem}
.dk .scriptrow{border-top:1px solid var(--line);padding:2px 0}
.dk .scriptrow:first-of-type{border-top:0}
.dk .scripthead{width:100%;display:flex;justify-content:space-between;align-items:center;gap:10px;
 background:none;border:0;padding:11px 0;font-family:inherit;font-size:.88rem;font-weight:650;
 color:var(--ink);text-align:left;cursor:pointer}
.dk .chev{color:var(--ink3);font-size:1.1rem;flex:none}
.dk .scripttext{font-size:.86rem;color:var(--ink2);background:var(--sf2);padding:11px;border-radius:9px;margin:0 0 8px;line-height:1.5}
.dk a.sm{text-decoration:none;display:inline-block}
.dk .ctr-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.dk .ctr{position:relative;text-align:center}
.dk .ctr-btn{width:100%;padding:9px 2px 7px;border:1px solid var(--line);border-radius:11px;
 background:var(--sf2);font-family:inherit;cursor:pointer;display:flex;flex-direction:column;
 align-items:center;gap:1px;color:var(--ink);-webkit-tap-highlight-color:transparent}
.dk .ctr-btn:active{background:var(--acc);border-color:var(--acc);transform:scale(.96)}
.dk .ctr-btn:active .ctr-n,.dk .ctr-btn:active .ctr-ic{color:#fff}
.dk .ctr-ic{font-size:1rem;line-height:1}
.dk .ctr-n{font-size:1.25rem;font-weight:800;font-variant-numeric:tabular-nums;line-height:1.15}
.dk .ctr-lbl{font-size:.6rem;text-transform:uppercase;letter-spacing:.04em;color:var(--ink3);font-weight:700;margin-top:3px}
.dk .ctr-minus{position:absolute;top:-5px;right:-3px;width:21px;height:21px;border-radius:50%;
 border:1px solid var(--line);background:var(--sf);color:var(--ink3);font-size:.85rem;line-height:1;
 font-family:inherit;cursor:pointer;padding:0}
.dk .barrow{margin-bottom:9px}
.dk .barlab{display:flex;justify-content:space-between;font-size:.78rem;color:var(--ink2);margin-bottom:3px}
.dk .barlab b{font-variant-numeric:tabular-nums}
.dk .bartrack{height:7px;background:var(--sf2);border-radius:99px;overflow:hidden}
.dk .barfill{height:100%;border-radius:99px;transition:width .25s ease}
.dk .week{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-top:12px}
.dk .wk{text-align:center}
.dk .wk-bar{height:34px;background:var(--sf2);border-radius:5px;display:flex;align-items:flex-end;overflow:hidden}
.dk .wk-fill{width:100%;border-radius:5px;transition:height .25s ease}
.dk .wk-d{font-size:.6rem;color:var(--ink3);font-weight:700;margin-top:3px}
.dk .wk-d.on{color:var(--acc)}
.dk ul.checks{list-style:none;margin:6px 0 0;padding:0}
.dk ul.checks li{margin:0}
.dk .chk{display:flex;gap:9px;align-items:flex-start;width:100%;background:none;border:0;
 padding:7px 0;font-family:inherit;font-size:.86rem;color:var(--ink2);text-align:left;cursor:pointer}
.dk .chk .box{flex:none;width:19px;height:19px;border:2px solid var(--line-strong,var(--ink3));border-radius:5px;
 display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#fff;margin-top:1px}
.dk .chk.on .box{background:var(--good);border-color:var(--good)}
.dk .chk.on .txt{text-decoration:line-through;color:var(--ink3)}
.dk .clsHead{width:100%;display:flex;justify-content:space-between;align-items:center;gap:10px;
 background:none;border:0;padding:14px;font-family:inherit;text-align:left;cursor:pointer;color:var(--ink)}
.dk .clsName{display:block;font-size:1rem;font-weight:750}
.dk .clsBody{display:block;font-size:.74rem;color:var(--ink3);margin-top:1px}
.dk .clsPrice{font-size:.8rem;font-weight:700;color:var(--acc);font-variant-numeric:tabular-nums;white-space:nowrap}
.dk .h4{font-size:.72rem;text-transform:uppercase;letter-spacing:.07em;color:var(--ink3);
 font-weight:700;margin:14px 0 4px}
.dk .tt{background:var(--accs);border-left:3px solid var(--acc);border-radius:0 9px 9px 0;padding:10px 12px;margin-top:12px}
.dk .ttlab{font-size:.65rem;text-transform:uppercase;letter-spacing:.09em;color:var(--acc);font-weight:800;margin-bottom:3px}
.dk .tt p{margin:0;font-size:.86rem;color:var(--ink)}
.dk .xshop{font-size:.74rem;background:var(--sf2);border:1px solid var(--line);border-radius:6px;
 padding:4px 9px;color:var(--ink2)}
.dk input[type=search]{-webkit-appearance:none}
.dk .queuebar{display:flex;justify-content:space-between;align-items:center;padding:9px 14px;
 background:var(--acc);color:#fff;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.09em}
.dk .queuebar.quiet{background:var(--sf2);color:var(--ink3)}
.dk .queuebar b{font-size:.95rem;font-variant-numeric:tabular-nums}
.dk .callcard{padding:13px 14px;border-top:1px solid var(--line)}
.dk .callcard:first-of-type{border-top:0}
.dk .callcard.qhero{background:var(--accs)}
.dk .callhead{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.dk .callname{font-size:1.05rem;font-weight:780;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dk .callcard.qhero .callname{font-size:1.3rem}
.dk .callmeta{font-size:.74rem;color:var(--ink3);margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dk .callwhy{font-size:.85rem;color:var(--ink2);margin-top:7px;line-height:1.4}
.dk .opener{background:none;border:0;padding:7px 0 0;font-family:inherit;font-size:.78rem;
 font-weight:700;color:var(--acc);cursor:pointer}
.dk .openertext{font-size:.86rem;color:var(--ink);background:var(--sf);border-left:3px solid var(--acc);
 border-radius:0 8px 8px 0;padding:10px 12px;margin:7px 0 0;line-height:1.5}
.dk .callacts{display:flex;gap:7px;margin-top:11px}
.dk .callacts .act{padding:11px 8px;font-size:.9rem}
.dk .callacts .sm{padding:11px 8px}
.dk .pull{border-top:1px solid var(--line);padding:11px 0}
.dk .pull:first-of-type{border-top:0;padding-top:2px}
.dk .pullhead{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.dk .pullname{font-size:.92rem;font-weight:750;color:var(--ink)}
.dk .pulltarget{font-size:.78rem;font-weight:800;color:var(--acc);font-variant-numeric:tabular-nums;flex:none}
.dk .pullfilter{font-size:.79rem;color:var(--ink2);margin-top:4px;line-height:1.45}
.dk .pullwhy{font-size:.79rem;color:var(--acc);margin-top:3px;font-weight:600}
`;

type Tab = 'today' | 'cars' | 'quote' | 'pay' | 'pipe' | 'setup';

export default function DeskApp() {
  const [cfg, setCfg] = useState<DeskConfig | null>(null);
  const [pipe, setPipe] = useState<Prospect[]>([]);
  const [tab, setTab] = useState<Tab>('today');
  const [autoImport, setAutoImport] = useState<string | null>(null);
  const [quoteFor, setQuoteFor] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const state = storedState();
    if (state === 'locked') {
      setLocked(true);
    } else {
      const c = loadConfig();
      setCfg(c);
      if (!c) setTab('setup');
    }
    setPipe(loadPipeline());
    setReady(true);
  }, []);

  const savePipe = (next: Prospect[]) => {
    setPipe(next);
    try { window.localStorage.setItem(PIPE_KEY, JSON.stringify(next)); } catch { /* quota / private mode */ }
  };

  if (!ready) return <div className="dk"><style>{CSS}</style><div className="pane"><p className="sub">Loading…</p></div></div>;

  if (locked && !cfg) {
    return (
      <div className="dk"><style>{CSS}</style>
        <Lock onUnlock={(c) => { setCfg(c); setLocked(false); }} />
      </div>
    );
  }

  return (
    <div className="dk">
      <style>{CSS}</style>
      {tab === 'today' && (
        <Today
          pipe={pipe}
          goal={cfg?.goal ?? 15}
          savePipe={savePipe}
          onGoImport={(src) => { setAutoImport(src ?? 'equity'); setTab('pipe'); window.scrollTo(0, 0); }}
          onGoFollowUp={() => { setTab('pipe'); window.scrollTo(0, 0); }}
        />
      )}
      {tab === 'cars' && (
        <Cars cfg={cfg} onQuote={(k, price) => {
          setQuoteFor(k); setQuotePrice(price ?? null); setTab('quote'); window.scrollTo(0, 0);
        }} />
      )}
      {tab === 'quote' && <Quote cfg={cfg} preselect={quoteFor} presetPrice={quotePrice}
          clearPreselect={() => { setQuoteFor(null); setQuotePrice(null); }} />}
      {tab === 'pay' && <Pay cfg={cfg} />}
      {tab === 'pipe' && <Pipe pipe={pipe} save={savePipe} autoImport={autoImport} clearAutoImport={() => setAutoImport(null)} />}
      {tab === 'setup' && <Setup cfg={cfg} onSave={setCfg} />}
      <nav role="tablist">
        {([
          ['today', '📋', 'Today'], ['cars', '🚘', 'Cars'], ['quote', '🧮', 'Quote'],
          ['pay', '💵', 'Pays me'], ['pipe', '📞', 'Calls'], ['setup', '⚙️', 'Setup'],
        ] as [Tab, string, string][]).map(([k, ic, lbl]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => { setTab(k); window.scrollTo(0, 0); }}>
            <span className="ic">{ic}</span>{lbl}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ─────────── Lock screen ─────────── */
function Lock({ onUnlock }: { onUnlock: (c: DeskConfig) => void }) {
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const env = readEnvelope();
    if (!env) { setErr('Nothing stored on this device.'); return; }
    setBusy(true); setErr('');
    try {
      onUnlock(await decryptConfig(env, pin));
    } catch {
      setErr('Wrong PIN.');
      setPin('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pane" style={{ paddingTop: 60 }}>
      <h1>Locked</h1>
      <p className="sub">Enter your PIN to unlock this device&rsquo;s data.</p>
      <form className="card" onSubmit={submit}>
        <label htmlFor="dk-pin">PIN</label>
        <input id="dk-pin" type="password" inputMode="numeric" autoComplete="off"
          autoFocus value={pin} onChange={(e) => setPin(e.target.value)} placeholder="••••••" />
        <button className="act" style={{ marginTop: 10 }} type="submit" disabled={busy || !pin}>
          {busy ? 'Unlocking…' : 'Unlock'}
        </button>
        {err && <p className="note" style={{ color: 'var(--hot)' }}>{err}</p>}
      </form>
      <div className="card">
        <p className="note" style={{ margin: 0 }}>
          Forgot it? There is no recovery — the data is encrypted with the PIN. Clear this
          site&rsquo;s storage in your browser settings and load your config file again.
        </p>
      </div>
    </div>
  );
}

function NeedsSetup() {
  return (
    <div className="pane">
      <h1>No data loaded</h1>
      <p className="sub">This page ships empty on purpose.</p>
      <div className="card">
        <p style={{ margin: 0, fontSize: '.9rem', color: 'var(--ink2)' }}>
          Program figures and pay tiers are confidential, so they are never stored on the server or in
          the codebase. Open <b>Setup</b> and paste your data file — it stays in this browser only.
        </p>
      </div>
    </div>
  );
}

/* ─────────── Quote ─────────── */
function Quote({ cfg, preselect, presetPrice, clearPreselect }: {
  cfg: DeskConfig | null; preselect?: string | null;
  presetPrice?: number | null; clearPreselect?: () => void;
}) {
  const keys = cfg ? Object.keys(cfg.models) : [];
  const [mk, setMk] = useState('');
  const [msrp, setMsrp] = useState('');
  const [sell, setSell] = useState('');
  const [down, setDown] = useState('0');
  const [reb, setReb] = useState('');
  const [term, setTerm] = useState('');
  const [target, setTarget] = useState('');
  const [msrps, setMsrps] = useState<Record<string, number>>({});
  const [recalled, setRecalled] = useState(false);
  const [approx, setApprox] = useState(false);

  const active = mk || keys[0] || '';

  useEffect(() => { setMsrps(loadMsrps()); }, []);

  // Arriving from the Cars tab with a model chosen.
  useEffect(() => {
    if (!preselect) return;
    setMk(preselect);
    setSell(''); setTarget('');
    // A price carried in from the stock list is the real listed figure — it
    // beats both the remembered value and the approximate one.
    if (presetPrice && presetPrice > 0) {
      setMsrp(String(presetPrice)); setRecalled(true); setApprox(false);
      saveMsrp(preselect, presetPrice);
      clearPreselect?.();
      return;
    }
    const saved = loadMsrps()[preselect];
    if (saved) { setMsrp(String(saved)); setRecalled(true); setApprox(false); }
    else if (APPROX_MSRP[preselect]) { setMsrp(String(APPROX_MSRP[preselect])); setRecalled(false); setApprox(true); }
    else { setMsrp(''); setRecalled(false); setApprox(false); }
    clearPreselect?.();
  }, [preselect, presetPrice, clearPreselect]);

  /** Switching models swaps in that model's remembered MSRP. */
  const pickModel = (key: string) => {
    setMk(key);
    setSell('');
    setTarget('');
    const saved = msrps[key];
    if (saved) {
      setMsrp(String(saved)); setRecalled(true); setApprox(false);
    } else if (APPROX_MSRP[key]) {
      // Orientation figure so the tab is never blank; flagged until confirmed.
      setMsrp(String(APPROX_MSRP[key])); setRecalled(false); setApprox(true);
    } else {
      setMsrp(''); setRecalled(false); setApprox(false);
    }
  };

  const onMsrp = (v: string) => {
    setMsrp(v);
    setRecalled(false);
    setApprox(false);
    const n = parseFloat(v);
    if (n > 0 && active) {
      saveMsrp(active, n);
      setMsrps((m) => ({ ...m, [active]: n }));
    }
  };

  const model = cfg && (cfg.models[mk] ?? cfg.models[keys[0]]);
  const terms = model ? Object.keys(model.r) : [];
  const t = terms.includes(term) ? term : terms[0];

  if (!cfg || !model) return <NeedsSetup />;

  const nMsrp = parseFloat(msrp) || 0;
  const nSell = sell.trim() === '' ? nMsrp : (parseFloat(sell) || 0);
  const nDown = parseFloat(down) || 0;
  const nReb = reb.trim() === '' ? model.mib : (parseFloat(reb) || 0);
  const nTerm = parseInt(t, 10);
  const resPct = model.r[t];
  const mf = model.mf[t];
  const calc = nMsrp > 0 ? leasePayment(nMsrp, nSell, nDown, nReb, resPct, mf, nTerm) : null;

  const nTarget = parseFloat(target);
  const solve = calc && Number.isFinite(nTarget)
    ? sellPriceForPayment(nTarget, calc.residual, mf, nTerm, nDown, nReb) : null;

  return (
    <div className="pane">
      <h1>Payment quote</h1>
      <p className="sub">Your saved program data · this device only</p>
      <div className="card">
        <div className="row one"><div>
          <label htmlFor="dk-m">Model</label>
          <select id="dk-m" value={active} onChange={(e) => pickModel(e.target.value)}>
            {(() => {
              // Group the list so a full lineup stays navigable on a phone.
              const groups = new Map<string, string[]>();
              for (const k of keys) {
                const g = cfg.models[k].group || 'Models';
                if (!groups.has(g)) groups.set(g, []);
                groups.get(g)!.push(k);
              }
              return [...groups.entries()].map(([g, ks]) => (
                <optgroup key={g} label={g}>
                  {ks.map((k) => <option key={k} value={k}>{cfg.models[k].name}</option>)}
                </optgroup>
              ));
            })()}
          </select>
        </div></div>
        <div className="row">
          <div>
            <label htmlFor="dk-msrp">
              MSRP{' '}
              {recalled && <span style={{ color: 'var(--good)', fontWeight: 700 }}>· saved</span>}
              {approx && <span style={{ color: 'var(--hot)', fontWeight: 700 }}>· approx</span>}
            </label>
            <input id="dk-msrp" inputMode="numeric" placeholder="window sticker" value={msrp}
              onChange={(e) => onMsrp(e.target.value)} />
          </div>
          <div><label htmlFor="dk-sell">Selling price</label><input id="dk-sell" inputMode="numeric" placeholder="= MSRP" value={sell} onChange={(e) => setSell(e.target.value)} /></div>
        </div>
        <div className="row">
          <div><label htmlFor="dk-down">Cap reduction</label><input id="dk-down" inputMode="numeric" value={down} onChange={(e) => setDown(e.target.value)} /></div>
          <div><label htmlFor="dk-reb">Incentive</label><input id="dk-reb" inputMode="numeric" placeholder="auto" value={reb} onChange={(e) => setReb(e.target.value)} /></div>
        </div>
        <label>Term</label>
        <div className="chips">
          {terms.map((tk) => (
            <button key={tk} type="button" className="chip" aria-pressed={tk === t} onClick={() => setTerm(tk)}>{tk} mo</button>
          ))}
        </div>
      </div>

      {approx && nMsrp > 0 && (
        <div className="card" style={{ borderColor: 'var(--hot)', background: 'var(--hots)' }}>
          <p className="body" style={{ color: 'var(--ink)', margin: 0, fontSize: '.85rem' }}>
            <b>That MSRP is a rough starting price, not this car.</b> Options routinely move it
            $5,000–$20,000. Type the window-sticker figure before you say a payment out loud — it
            will be saved for {model.name} from then on.
          </p>
        </div>
      )}

      {!(nMsrp > 0) && (
        <div className="card" style={{ borderColor: 'var(--acc)' }}>
          <h3 className="h3">Enter the MSRP for this car</h3>
          <p className="body">
            Type it off the window sticker or your inventory listing. MSRP is per-VIN — the unit on
            your lot carries packages a base price would miss — so this app never guesses it.
            Whatever you type is remembered for <b>{model.name}</b> next time.
          </p>
        </div>
      )}

      <div className="out">
        <div className="cap">{nTerm}-month lease</div>
        <div className="big">{calc ? money(calc.payment) : '—'}<span style={{ fontSize: '.9rem', fontWeight: 600 }}>{calc ? '/mo' : ''}</span></div>
        {calc && (
          <div className="lines">
            <div className="ln"><span>Net cap cost</span><b>{money(calc.cap)}</b></div>
            <div className="ln"><span>Residual ({(resPct * 100).toFixed(0)}%)</span><b>{money(calc.residual)}</b></div>
            <div className="ln"><span>Money factor</span><b>{mf.toFixed(5)} · {(mf * 2400).toFixed(2)}%</b></div>
            <div className="ln"><span>Depreciation</span><b>{money(calc.depreciation)}</b></div>
            <div className="ln"><span>Rent charge</span><b>{money(calc.rent)}</b></div>
          </div>
        )}
      </div>

      <div className="card">
        <label htmlFor="dk-tgt">Target payment — what discount gets me there?</label>
        <input id="dk-tgt" inputMode="numeric" placeholder="e.g. 499" value={target} onChange={(e) => setTarget(e.target.value)} />
        {solve !== null && (
          <div style={{ marginTop: 11 }}>
            <div className="ln"><span>Sell at</span><b>{money(solve)}</b></div>
            {nSell - solve > 0
              ? <div className="ln"><span>Discount needed</span><b style={{ color: 'var(--hot)' }}>{money(nSell - solve)} · {(((nSell - solve) / nMsrp) * 100).toFixed(1)}% off</b></div>
              : <div className="ln"><span>Already there</span><b style={{ color: 'var(--good)' }}>{money(solve - nSell)} of room</b></div>}
          </div>
        )}
      </div>
      <p className="note">Estimate only — pre-tax, pre-fee. The desk and NetStar are the source of truth on every contract.</p>
    </div>
  );
}

/* ─────────── Pays me ─────────── */
function Pay({ cfg }: { cfg: DeskConfig | null }) {
  const [view, setView] = useState<'deal' | 'cliffs'>('deal');
  const [tk, setTk] = useState('');
  const [front, setFront] = useState('2200');
  const [back, setBack] = useState('900');
  const [days, setDays] = useState('0');
  const [spot, setSpot] = useState(false);

  if (!cfg) return <NeedsSetup />;
  const keys = Object.keys(cfg.dealTypes);
  const type = cfg.dealTypes[tk] ?? cfg.dealTypes[keys[0]];
  const r = dealPayout(type, parseFloat(front) || 0, parseFloat(back) || 0, parseFloat(days) || 0, spot, cfg.spotBonus);

  if (view === 'cliffs') {
    return (
      <div className="pane">
        <div className="chips" style={{ marginBottom: 12 }}>
          <button type="button" className="chip" aria-pressed={false} onClick={() => setView('deal')}>This deal</button>
          <button type="button" className="chip" aria-pressed={true}>Bonus cliffs</button>
        </div>
        <Cliffs cfg={cfg} />
      </div>
    );
  }

  return (
    <div className="pane">
      <h1>What this deal pays me</h1>
      <p className="sub">From your saved pay plan</p>
      <div className="chips" style={{ marginBottom: 12 }}>
        <button type="button" className="chip" aria-pressed={true}>This deal</button>
        <button type="button" className="chip" aria-pressed={false} onClick={() => setView('cliffs')}>Bonus cliffs</button>
      </div>
      <div className="card">
        <label>Vehicle type</label>
        <div className="chips" style={{ marginBottom: 11 }}>
          {keys.map((k) => (
            <button key={k} type="button" className="chip" aria-pressed={(tk || keys[0]) === k} onClick={() => setTk(k)}>{cfg.dealTypes[k].label}</button>
          ))}
        </div>
        <div className="row">
          <div><label htmlFor="dk-f">Front-end gross</label><input id="dk-f" inputMode="numeric" value={front} onChange={(e) => setFront(e.target.value)} /></div>
          <div><label htmlFor="dk-b">Back-end (F&amp;I)</label><input id="dk-b" inputMode="numeric" value={back} onChange={(e) => setBack(e.target.value)} /></div>
        </div>
        <div className="row">
          <div><label htmlFor="dk-d">Days in stock</label><input id="dk-d" inputMode="numeric" value={days} onChange={(e) => setDays(e.target.value)} /></div>
          <div><label>Spot delivery</label><div className="chips">
            <button type="button" className="chip" aria-pressed={spot} onClick={() => setSpot((s) => !s)}>+{money(cfg.spotBonus)}</button>
          </div></div>
        </div>
      </div>
      <div className={'out' + (r.usedMinimum ? ' warn' : '')}>
        <div className="cap">{type.label} — your commission</div>
        <div className="big">{money(r.total)}</div>
        <div className="lines">
          {r.aging > 0 && <div className="ln"><span>Aging bonus</span><b style={{ color: 'var(--good)' }}>+{money(r.aging)}</b></div>}
          <div className="ln"><span>Front {r.usedMinimum ? 'MINIMUM' : `(${(type.front * 100).toFixed(0)}%)`}</span><b>{money(r.frontPay)}</b></div>
          <div className="ln"><span>Back-end ({(type.back * 100).toFixed(0)}%)</span><b>{money(r.backPay)}</b></div>
          {r.spotPay > 0 && <div className="ln"><span>Spot delivery</span><b style={{ color: 'var(--good)' }}>+{money(r.spotPay)}</b></div>}
          {r.usedMinimum && <div className="ln"><span>Mini — anything under {money(r.breakeven)} front pays the same</span><b /></div>}
        </div>
      </div>
    </div>
  );
}

/* ─────────── Cliffs ─────────── */
function Cliffs({ cfg }: { cfg: DeskConfig | null }) {
  const [units, setUnits] = useState('0');
  const [avg, setAvg] = useState('2000');
  if (!cfg) return <NeedsSetup />;

  const cur = Math.max(0, Math.round(parseFloat(units) || 0));
  const nAvg = parseFloat(avg) || 0;
  const bonus = (u: number) => (cfg.unitsCash[String(u)] || 0) + nAvg * u * (cfg.unitsPct[String(u)] || 0);
  const rows = [];
  for (let u = 11; u <= 30; u++) rows.push({ u, cash: cfg.unitsCash[String(u)] || 0, pct: cfg.unitsPct[String(u)] || 0, b: bonus(u), j: bonus(u) - bonus(u - 1) });
  const max = Math.max(...rows.map((x) => x.j), 0);

  return (
    <>
      <h1>Bonus cliffs</h1>
      <p className="sub">Where one more car pays outsized</p>
      <div className="card"><div className="row">
        <div><label htmlFor="dk-u">Units so far</label><input id="dk-u" inputMode="numeric" value={units} onChange={(e) => setUnits(e.target.value)} /></div>
        <div><label htmlFor="dk-a">Avg front gross</label><input id="dk-a" inputMode="numeric" value={avg} onChange={(e) => setAvg(e.target.value)} /></div>
      </div></div>
      <div className="out">
        <div className="cap">Unit {cur + 1} adds this in bonus</div>
        <div className="big">{money(bonus(cur + 1) - bonus(cur))}</div>
        <div className="lines">
          <div className="ln"><span>Bonus at {cur}</span><b>{money(bonus(cur))}</b></div>
          <div className="ln"><span>Bonus at {cur + 1}</span><b>{money(bonus(cur + 1))}</b></div>
        </div>
      </div>
      <div className="card scroll" style={{ padding: 0 }}>
        <table><thead><tr><th>Units</th><th>Cash</th><th>%</th><th>Bonus</th><th>Jump</th></tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.u} className={[r.j > max * 0.45 ? 'cliff' : '', r.u === cur ? 'here' : ''].join(' ').trim()}>
              <td>{r.u}</td><td>{money(r.cash)}</td><td>{(r.pct * 100).toFixed(2)}%</td><td>{money(r.b)}</td>
              <td>{r.j > 0 ? '+' + money(r.j) : '—'}</td>
            </tr>))}</tbody></table>
      </div>
      <p className="note">Sprinters count as units. Quarterly certification is required or the whole ladder switches off.</p>
    </>
  );
}

/* ─────────── Follow-up ─────────── */
function Pipe({ pipe, save, autoImport, clearAutoImport }: {
  pipe: Prospect[]; save: (p: Prospect[]) => void;
  autoImport?: string | null; clearAutoImport?: () => void;
}) {
  const [name, setName] = useState('');
  const [src, setSrc] = useState(SOURCES[0]);
  const [veh, setVeh] = useState('');
  const [paste, setPaste] = useState('');
  const [showImport, setShowImport] = useState(false);

  // Opened from the Today tab's "Paste AutoAlert list" button.
  useEffect(() => {
    if (!autoImport) return;
    setShowImport(true);
    if (SOURCES.includes(autoImport)) setSrc(autoImport);   // preselect the list's source
    clearAutoImport?.();
  }, [autoImport, clearAutoImport]);
  const now = todayISO();

  const active = pipe.filter((p) => p.status === 'active');
  const due = useMemo(() => active
    .map((p) => ({ p, d: nextDue(p) }))
    .filter((x): x is { p: Prospect; d: string } => !!x.d && x.d <= now)
    .sort((a, b) => a.d.localeCompare(b.d)), [pipe, now]);

  const upd = (id: number, fn: (p: Prospect) => Prospect) =>
    save(pipe.map((p) => (p.id === id ? fn(p) : p)));

  const doImport = () => {
    const added = parsePastedList(paste, src);
    if (!added.length) return;
    const existing = new Set(pipe.map((p) => p.name.toLowerCase()));
    save([...pipe, ...added.filter((p) => !existing.has(p.name.toLowerCase()))]);
    setPaste(''); setShowImport(false);
  };

  return (
    <div className="pane">
      <h1>Follow-ups</h1>
      <p className="sub">Cadence: day {CADENCE.join(' · ')}</p>

      <div className="card">
        <div className="row one" style={{ marginBottom: 10 }}>
          <div><label htmlFor="dk-n">Name (no phone numbers)</label>
            <input id="dk-n" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dana R." /></div>
        </div>
        <div className="row">
          <div><label htmlFor="dk-s">Source</label>
            <select id="dk-s" value={src} onChange={(e) => setSrc(e.target.value)}>
              {SOURCES.map((s) => <option key={s}>{s}</option>)}
            </select></div>
          <div><label htmlFor="dk-v">Vehicle</label>
            <input id="dk-v" value={veh} onChange={(e) => setVeh(e.target.value)} placeholder="GLE 350" /></div>
        </div>
        <button className="act" onClick={() => {
          const n = name.trim(); if (!n) return;
          save([...pipe, { id: Date.now(), name: n, src, veh: veh.trim(), first: now, touches: 0, status: 'active' }]);
          setName(''); setVeh('');
        }}>Add prospect</button>
        <button className="sm" style={{ width: '100%', marginTop: 8 }} onClick={() => setShowImport((v) => !v)}>
          {showImport ? 'Cancel import' : 'Paste a list from AutoAlert'}
        </button>
        {showImport && (
          <div style={{ marginTop: 10 }}>
            <label htmlFor="dk-paste">One per line · name first</label>
            <textarea id="dk-paste" value={paste} onChange={(e) => setPaste(e.target.value)}
              placeholder={'Dana R.\tGLE 350\nVic T.\tSprinter 2500'} />
            <p className="note" style={{ marginBottom: 8 }}>
              Phone numbers and emails are stripped automatically — contact details stay in the CRM.
            </p>
            <button className="act" onClick={doImport}>Import {parsePastedList(paste, src).length || ''} prospects</button>
          </div>
        )}
      </div>

      <div className="card">
        <label>Due now ({due.length})</label>
        {due.length ? due.map(({ p, d }) => {
          const late = daysBetween(d, now);
          return (
            <div className="p" key={p.id}>
              <div>
                <div className="nm">{p.name}</div>
                <div className="meta">{p.src}{p.veh ? ' · ' + p.veh : ''} · touch {p.touches + 1} of {CADENCE.length}</div>
              </div>
              <div>
                <span className={'badge ' + (late > 0 ? 'late' : 'today')}>{late > 0 ? late + 'd late' : 'today'}</span>
                <button className="sm" onClick={() => upd(p.id, (x) => ({ ...x, touches: x.touches + 1, lastTouch: now }))}>Done</button>
              </div>
            </div>
          );
        }) : <div className="empty">Nothing overdue. Work your AutoAlert lists.</div>}
      </div>

      <div className="card">
        <label>Everyone active ({active.length})</label>
        {active.length ? active.map((p) => (
          <div className="p" key={p.id}>
            <div>
              <div className="nm">{p.name}</div>
              <div className="meta">{p.src} · {p.touches} touches · {nextDue(p) ? 'next ' + nextDue(p) : 'cadence done'}</div>
            </div>
            <div>
              <button className="sm" onClick={() => upd(p.id, (x) => ({ ...x, status: 'sold' }))}>Sold</button>
              <button className="sm" onClick={() => upd(p.id, (x) => ({ ...x, status: 'lost' }))}>Lost</button>
            </div>
          </div>
        )) : <div className="empty">No active prospects yet.</div>}
      </div>
      <p className="note">Saved in this browser only. Real customer records belong in Momentum.</p>
    </div>
  );
}

/* ─────────── Setup ─────────── */
function Setup({ cfg, onSave }: { cfg: DeskConfig | null; onSave: (c: DeskConfig) => void }) {
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const locked = storedState() === 'locked';

  const apply = async (raw: string) => {
    setBusy(true);
    try {
      const parsed = JSON.parse(raw);
      if (!parsed.models || !parsed.dealTypes) throw new Error('Missing "models" or "dealTypes".');
      if (pin && pin.length < 4) throw new Error('Use at least 4 digits, or leave the PIN blank.');
      const payload = pin ? await encryptConfig(parsed, pin) : parsed;
      window.localStorage.setItem(CFG_KEY, JSON.stringify(payload));
      onSave(parsed);
      setMsg(pin
        ? '✓ Loaded and encrypted. You will need this PIN next time.'
        : '✓ Loaded. Saved unencrypted in this browser.');
      setText(''); setPin('');
    } catch (e) {
      setMsg('✗ ' + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  /** Add, change, or remove the PIN on data already loaded in this session. */
  const reprotect = async (newPin: string) => {
    if (!cfg) return;
    setBusy(true);
    try {
      if (newPin && newPin.length < 4) throw new Error('Use at least 4 digits.');
      const payload = newPin ? await encryptConfig(cfg, newPin) : cfg;
      window.localStorage.setItem(CFG_KEY, JSON.stringify(payload));
      setMsg(newPin ? '✓ PIN set on this device.' : '✓ PIN removed on this device.');
      setPin('');
    } catch (e) {
      setMsg('✗ ' + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pane">
      <h1>Setup</h1>
      <p className="sub">{cfg ? 'Data loaded on this device' : 'No data loaded yet'}</p>

      <div className="card">
        <p style={{ margin: '0 0 10px', fontSize: '.88rem', color: 'var(--ink2)' }}>
          This page contains no program figures or pay tiers — they are confidential, so they never
          touch the server or the codebase. Paste your <code>desk-config.json</code> below. It is
          stored only in this browser, on this device.
        </p>
        <label htmlFor="dk-cfg">Paste desk-config.json</label>
        <textarea id="dk-cfg" value={text} onChange={(e) => setText(e.target.value)} placeholder='{ "models": { … }, "dealTypes": { … } }' />
        <label htmlFor="dk-setpin" style={{ marginTop: 12 }}>PIN (optional — encrypts the data)</label>
        <input id="dk-setpin" type="password" inputMode="numeric" autoComplete="off"
          value={pin} onChange={(e) => setPin(e.target.value)} placeholder="4+ digits, blank for none" />
        <button className="act" style={{ marginTop: 10 }} disabled={busy} onClick={() => apply(text)}>
          {busy ? 'Working…' : 'Load data'}
        </button>
        <label style={{ marginTop: 14 }}>…or choose the file</label>
        <input type="file" accept="application/json,.json" onChange={(e) => {
          const f = e.target.files?.[0]; if (!f) return;
          f.text().then(apply).catch(() => setMsg('✗ Could not read that file.'));
        }} />
        {msg && <p className="note" style={{ color: msg.startsWith('✓') ? 'var(--good)' : 'var(--hot)' }}>{msg}</p>}
      </div>

      {cfg && (
        <div className="card">
          <label>Loaded</label>
          <div className="ln"><span>Models</span><b>{Object.keys(cfg.models).length}</b></div>
          <div className="ln"><span>Deal types</span><b>{Object.keys(cfg.dealTypes).length}</b></div>
          <div className="ln"><span>Bonus tiers</span><b>{Object.keys(cfg.unitsCash || {}).length}</b></div>
          <div className="ln"><span>PIN lock</span><b>{locked ? 'On' : 'Off'}</b></div>

          <label style={{ marginTop: 14 }} htmlFor="dk-newpin">
            {locked ? 'Change PIN' : 'Set a PIN'}
          </label>
          <input id="dk-newpin" type="password" inputMode="numeric" autoComplete="off"
            value={pin} onChange={(e) => setPin(e.target.value)} placeholder="4+ digits" />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button className="sm" style={{ flex: 1 }} disabled={busy || !pin} onClick={() => reprotect(pin)}>
              {locked ? 'Change PIN' : 'Set PIN'}
            </button>
            {locked && (
              <button className="sm" style={{ flex: 1 }} disabled={busy} onClick={() => {
                if (confirm('Remove the PIN? The data will be stored unencrypted on this device.')) reprotect('');
              }}>Remove PIN</button>
            )}
          </div>

          <button className="sm" style={{ width: '100%', marginTop: 12 }} onClick={() => {
            if (!confirm('Remove your saved program and pay data from this browser?')) return;
            window.localStorage.removeItem(CFG_KEY);
            location.reload();
          }}>Wipe data from this device</button>
        </div>
      )}
      <p className="note">
        On a shared dealership computer, use a private window and wipe the data before you log off.
      </p>
    </div>
  );
}
