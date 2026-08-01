'use client';

import { useEffect, useState } from 'react';
import {
  SHIFTS, SCRIPTS, SPRINTER_BRANDS, NAME_KEY,
  shiftsLeftInMonth, currentBlock, fmtTime, greeting,
  type Shift,
} from './deskPlan';
import { CADENCE, type Prospect, todayISO, daysBetween, nextDue } from './deskData';

type Props = {
  pipe: Prospect[];
  goal: number;
  onGoImport: () => void;
  onGoFollowUp: () => void;
};

export default function Today({ pipe, goal, onGoImport, onGoFollowUp }: Props) {
  const [now, setNow] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState('');
  const [openScript, setOpenScript] = useState<string | null>(null);
  const [showBrands, setShowBrands] = useState(false);

  // Set on the client only — rendering a clock during SSR causes a hydration
  // mismatch, and the server's timezone is not the user's anyway.
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    try { setName(localStorage.getItem(NAME_KEY) || ''); } catch { /* private mode */ }
    return () => clearInterval(t);
  }, []);

  if (!now) return <div className="pane"><p className="sub">Loading…</p></div>;

  const shift: Shift | null = SHIFTS[now.getDay()] ?? null;
  const iso = todayISO(now);
  const sold = pipe.filter((p) => p.status === 'sold').length;
  const left = shiftsLeftInMonth(now);
  const need = Math.max(0, goal - sold);
  const due = pipe.filter((p) => {
    if (p.status !== 'active') return false;
    const step = CADENCE[p.touches];
    return step !== undefined && daysBetween(p.first, iso) >= step;
  });
  const overdue = due.filter((p) => {
    const d = nextDue(p);
    return d ? daysBetween(d, iso) > 0 : false;
  }).length;

  const block = shift ? currentBlock(shift, now) : null;
  const isCommercialDay = now.getDay() === 4 || now.getDay() === 5;
  const hello = name ? `${greeting(now)}, ${name}` : greeting(now);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(''), 1600);
    } catch {
      setOpenScript(id); // clipboard blocked — at least reveal it to select by hand
    }
  };

  return (
    <div className="pane">
      <h1>{hello}</h1>
      <p className="sub">
        {now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
        {shift ? ` · ${shift.hours}` : ' · Day off'}
      </p>

      {/* ── pace ── */}
      <div className="card" style={{ display: 'flex', gap: 10, textAlign: 'center', padding: '13px 10px' }}>
        <div style={{ flex: 1 }}>
          <div className="big2">{sold}<span style={{ fontSize: '.9rem', color: 'var(--ink3)' }}>/{goal}</span></div>
          <div className="mini">units</div>
        </div>
        <div style={{ flex: 1, borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' }}>
          <div className="big2">{left}</div>
          <div className="mini">shifts left</div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="big2" style={{ color: need > left ? 'var(--hot)' : 'var(--good)' }}>
            {left > 0 ? (need / left).toFixed(1) : need}
          </div>
          <div className="mini">per shift</div>
        </div>
      </div>

      {/* ── day off ── */}
      {!shift && (
        <div className="card">
          <h3 className="h3">Day off. Protect it.</h3>
          <p className="body">Your follow-up cadence keeps running — nothing breaks while you rest.
            Six-day weeks only work if the seventh is real. See you Thursday at 9.</p>
        </div>
      )}

      {shift && (
        <>
          {/* ── right now ── */}
          <div className={'out' + (block?.power ? '' : '')} style={{ marginBottom: 12 }}>
            <div className="cap">{block ? `Right now · ${fmtTime(block.from)}–${fmtTime(block.to)}` : 'Not on shift yet'}</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, margin: '4px 0 2px' }}>
              {block ? block.label : shift.headline}
            </div>
            {block ? (
              <ul className="todo">{block.todo.map((t, i) => <li key={i}>{t}</li>)}</ul>
            ) : (
              <p className="body" style={{ margin: '6px 0 0' }}>Shift runs {shift.hours}. {shift.why}</p>
            )}
          </div>

          {/* ── first 3 things ── */}
          <div className="card">
            <h3 className="h3">Do these first, every shift</h3>
            <ol className="steps">
              <li>
                <b>Clear your red follow-ups.</b>{' '}
                {overdue > 0
                  ? <span style={{ color: 'var(--hot)', fontWeight: 700 }}>{overdue} overdue right now</span>
                  : due.length > 0
                    ? <span style={{ color: 'var(--good)' }}>{due.length} due today</span>
                    : <span style={{ color: 'var(--ink3)' }}>nothing waiting</span>}
                <button className="sm" style={{ marginLeft: 8 }} onClick={onGoFollowUp}>Open</button>
              </li>
              <li><b>Pull your AutoAlert lists</b> — equity, and lease maturity 90–120 days out. Paste them in below.</li>
              <li><b>Clear overdue tasks in Momentum.</b></li>
            </ol>
          </div>

          {/* ── AUTOALERT PASTE ── */}
          <div className="card accent">
            <h3 className="h3">📋 Load today&rsquo;s call list from AutoAlert</h3>
            <ol className="steps">
              <li>Open <b>AutoAlert</b> in another tab. Pick your <b>Equity</b> or <b>Lease Maturity</b> list.</li>
              <li>Select the rows and <b>copy</b> them.</li>
              <li>Come back, tap the button, <b>paste</b>, choose the source, tap Import.</li>
            </ol>
            <button className="act" style={{ marginTop: 10 }} onClick={onGoImport}>
              Paste AutoAlert list →
            </button>
            <p className="note" style={{ marginBottom: 0 }}>
              Phone numbers and emails are stripped automatically — those stay in Momentum.
              Only names and vehicles are saved here, so this stays clean if anyone picks up your phone.
            </p>
          </div>

          {/* ── the shift ── */}
          <div className="card">
            <h3 className="h3">{shift.day} — {shift.headline}</h3>
            <p className="body">{shift.why}</p>
            <div style={{ marginTop: 10 }}>
              {shift.blocks.map((b, i) => {
                const isNow = block === b;
                return (
                  <div key={i} className={'blk' + (isNow ? ' now' : '')}>
                    <div className="blkhead">
                      <span className="blktime">{fmtTime(b.from)}–{fmtTime(b.to)}</span>
                      <span className={'blklabel' + (b.power ? ' power' : '')}>{b.label}</span>
                      {isNow && <span className="badge today">NOW</span>}
                    </div>
                    <ul className="todo">{b.todo.map((t, j) => <li key={j}>{t}</li>)}</ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── SPRINTER ── */}
          {isCommercialDay && (
            <div className="card accent">
              <h3 className="h3">🚐 Sprinter hour — 9:45 to 11:00</h3>
              <p className="body">
                The one question that pays: <b>&ldquo;Who is your parent company?&rdquo;</b> If the answer is
                one of these, that business gets <b>fleet-level cash on a single van</b> —
                roughly <b>$11,000</b> instead of $8,000 on a MY25 Cargo. Almost nobody asks.
              </p>
              <button className="sm" style={{ width: '100%', marginTop: 8 }} onClick={() => setShowBrands((v) => !v)}>
                {showBrands ? 'Hide' : 'Show'} the {SPRINTER_BRANDS.length} qualifying brands
              </button>
              {showBrands && (
                <div style={{ marginTop: 10 }}>
                  {SPRINTER_BRANDS.map((b) => (
                    <div className="p" key={b.name}>
                      <div>
                        <div className="nm">{b.name}</div>
                        <div className="meta">{b.parent}</div>
                      </div>
                      <div>
                        <a className="sm" href={b.url} target="_blank" rel="noopener noreferrer">Find local</a>
                      </div>
                    </div>
                  ))}
                  <p className="note">
                    Open a locator, set it to <b>Smithtown / Suffolk County NY</b>, and call the local owner
                    or fleet manager. Loop in your Commercial/Fleet manager to process the CAN.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── scripts ── */}
          <div className="card">
            <h3 className="h3">Scripts — tap to copy</h3>
            {SCRIPTS.map((s) => (
              <div key={s.id} className="scriptrow">
                <button className="scripthead" onClick={() => setOpenScript(openScript === s.id ? null : s.id)}>
                  <span>{s.when}</span>
                  <span className="chev">{openScript === s.id ? '−' : '+'}</span>
                </button>
                {openScript === s.id && (
                  <>
                    <p className="scripttext">{s.text}</p>
                    <button className="sm" onClick={() => copy(s.id, s.text)}>
                      {copied === s.id ? '✓ Copied' : 'Copy'}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ── scoreboard ── */}
          <div className="card">
            <h3 className="h3">Before you clock out</h3>
            <ul className="todo">
              <li>Log every conversation in Momentum — same day, no exceptions.</li>
              <li>Text-confirm tomorrow&rsquo;s appointments.</li>
              <li>Tap <b>Done</b> in Follow-up for everyone you reached.</li>
            </ul>
            <p className="note">
              Daily targets: <b>40</b> touches · <b>10</b> conversations · <b>2</b> appointments set.
              The appointments number is the one that actually predicts your month.
            </p>
          </div>

          <div className="card">
            <h3 className="h3">Never skip these — they cost real money</h3>
            <ul className="todo">
              <li><b>Write every promise on the Purchase Order.</b> Your pay plan says anything not in writing and manager-approved comes out of your pocket.</li>
              <li><b>Keep your quarterly certification current</b> — letting it lapse switches off your entire bonus ladder.</li>
              <li><b>Ask your GM this week</b> what the monthly CSI and supplemental bonus criteria are. They&rsquo;re emailed monthly and most people never read them.</li>
            </ul>
          </div>
        </>
      )}

      {/* ── name ── */}
      <div className="card">
        <label htmlFor="dk-name">Your name (for the greeting)</label>
        <input id="dk-name" value={name} placeholder="MK"
          onChange={(e) => {
            setName(e.target.value);
            try { localStorage.setItem(NAME_KEY, e.target.value); } catch { /* private mode */ }
          }} />
      </div>
    </div>
  );
}
