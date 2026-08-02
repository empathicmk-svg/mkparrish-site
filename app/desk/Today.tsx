'use client';

import { useEffect, useState } from 'react';
import {
  SHIFTS, SCRIPTS, SPRINTER_BRANDS, NAME_KEY, PULLS, STANDING_LISTS,
  shiftsLeftInMonth, currentBlock, fmtTime, greeting,
  type Shift,
} from './deskPlan';
import { CADENCE, type Prospect, todayISO, daysBetween, nextDue } from './deskData';
import CallQueue from './CallQueue';
import {
  COUNTERS, TARGETS, type Activity, type CounterKey,
  loadActivity, saveActivity, dayOf, touchesOf, dayScore, hitTargets, streak, recentDays,
} from './deskActivity';

function Bar({ label, value, target, emphasise }: {
  label: string; value: number; target: number; emphasise?: boolean;
}) {
  const pct = Math.min(100, (value / target) * 100);
  const hit = value >= target;
  return (
    <div className="barrow">
      <div className="barlab">
        <span>{label}</span>
        <b style={{ color: hit ? 'var(--good)' : emphasise ? 'var(--acc)' : 'var(--ink)' }}>
          {value}<span style={{ color: 'var(--ink3)', fontWeight: 400 }}>/{target}</span>
        </b>
      </div>
      <div className="bartrack">
        <div className="barfill" style={{ width: `${pct}%`, background: hit ? 'var(--good)' : 'var(--acc)' }} />
      </div>
    </div>
  );
}

type Props = {
  pipe: Prospect[];
  goal: number;
  savePipe: (p: Prospect[]) => void;
  onGoImport: (source?: string) => void;
  onGoFollowUp: () => void;
};

export default function Today({ pipe, goal, savePipe, onGoImport, onGoFollowUp }: Props) {
  const [now, setNow] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState('');
  const [openScript, setOpenScript] = useState<string | null>(null);
  const [showBrands, setShowBrands] = useState(false);
  const [act, setAct] = useState<Activity>({});
  const [skipped, setSkipped] = useState<number[]>([]);
  const [showPlan, setShowPlan] = useState(false);
  const [showLists, setShowLists] = useState(false);

  // Set on the client only — rendering a clock during SSR causes a hydration
  // mismatch, and the server's timezone is not the user's anyway.
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    try { setName(localStorage.getItem(NAME_KEY) || ''); } catch { /* private mode */ }
    setAct(loadActivity());
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

  const log = dayOf(act, iso);
  const isWorkDay = (d: Date) => !!SHIFTS[d.getDay()];
  const run = streak(act, iso, isWorkDay);
  const week = recentDays(act, iso, isWorkDay);
  const score = dayScore(log);

  /**
   * Apply every counter change in one update. Calling a single-key bump three
   * times in a row read the same stale `log` each time, so only the last one
   * survived — logging an appointment silently dropped the call and the
   * conversation.
   */
  const bumpMany = (deltas: Partial<Record<CounterKey, number>>) => {
    setAct((prev) => {
      const cur = dayOf(prev, iso);
      const day = { ...cur };
      for (const [k, d] of Object.entries(deltas)) {
        const key = k as CounterKey;
        day[key] = Math.max(0, day[key] + (d ?? 0));
      }
      const next: Activity = { ...prev, [iso]: day };
      saveActivity(next);
      return next;
    });
  };
  const bump = (key: CounterKey, delta: number) => bumpMany({ [key]: delta });
  const toggleDone = (id: string) => {
    const done = log.done.includes(id) ? log.done.filter((x) => x !== id) : [...log.done, id];
    const next: Activity = { ...act, [iso]: { ...log, done } };
    setAct(next); saveActivity(next);
  };
  const totalTodos = shift ? shift.blocks.reduce((n, b) => n + b.todo.length, 0) : 0;
  const doneCount = log.done.length;

  /* ── the call queue: who to work, most overdue first ── */
  const queue = pipe
    // Anyone already worked today drops off — the cadence brings them back
    // tomorrow. Without this, calling someone left them at the top of the list.
    .filter((p) => p.status === 'active' && !skipped.includes(p.id) && p.lastTouch !== iso)
    .map((p) => ({ p, due: nextDue(p) }))
    .filter((x): x is { p: Prospect; due: string } => !!x.due && x.due <= iso)
    .sort((a, b) => a.due.localeCompare(b.due));

  const touch = (p: Prospect) =>
    savePipe(pipe.map((x) => (x.id === p.id ? { ...x, touches: x.touches + 1, lastTouch: iso } : x)));

  const onCalled = (p: Prospect) => { touch(p); bumpMany({ calls: 1 }); };
  const onAppt = (p: Prospect) => { touch(p); bumpMany({ calls: 1, convos: 1, appts: 1 }); };
  const onSkip = (p: Prospect) => setSkipped((s) => [...s, p.id]);

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

      {/* ── THE CALL QUEUE — the reason this screen exists ── */}
      <CallQueue
        queue={queue}
        today={iso}
        onCalled={onCalled}
        onAppt={onAppt}
        onSkip={onSkip}
        onGoImport={onGoImport}
        onGoSprinter={() => { setShowBrands(true); setShowPlan(true); }}
      />

      {/* ── pace ── */}
      <div className="card" style={{ display: 'flex', gap: 10, textAlign: 'center', padding: '11px 10px' }}>
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

      {/* ── TODAY'S ACTIVITY — the part you actually control ── */}
      {shift && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <h3 className="h3" style={{ margin: 0 }}>Today&rsquo;s work</h3>
            {run > 0 && <span className="badge today">🔥 {run}-shift streak</span>}
          </div>
          <p className="body" style={{ fontSize: '.8rem', marginBottom: 10 }}>
            Tap as you go. These are the numbers you control — units follow them.
          </p>

          <div className="ctr-grid">
            {COUNTERS.map((c) => (
              <div className="ctr" key={c.key}>
                <button className="ctr-btn" onClick={() => bump(c.key, 1)} aria-label={`Add one ${c.label}`}>
                  <span className="ctr-ic">{c.icon}</span>
                  <span className="ctr-n">{log[c.key]}</span>
                </button>
                <div className="ctr-lbl">{c.label}</div>
                <button className="ctr-minus" onClick={() => bump(c.key, -1)} aria-label={`Remove one ${c.label}`}>−</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            <Bar label="Touches" value={touchesOf(log)} target={TARGETS.touches} />
            <Bar label="Conversations" value={log.convos} target={TARGETS.convos} />
            <Bar label="Appointments set" value={log.appts} target={TARGETS.appts} emphasise />
          </div>

          {hitTargets(log) ? (
            <p className="note" style={{ color: 'var(--good)', fontWeight: 700 }}>
              ✓ All three targets hit. That is a day that produces units.
            </p>
          ) : (
            <p className="note">
              {TARGETS.appts - log.appts > 0
                ? `${TARGETS.appts - log.appts} more appointment${TARGETS.appts - log.appts === 1 ? '' : 's'} to hit today's number.`
                : `Appointments done. ${Math.max(0, TARGETS.touches - touchesOf(log))} touches to go.`}
            </p>
          )}

          {/* week strip */}
          <div className="week">
            {week.map((d) => {
              const h = d.off ? 0 : Math.round(dayScore(d.log) * 100);
              return (
                <div className="wk" key={d.iso} title={d.iso}>
                  <div className="wk-bar">
                    <div className="wk-fill" style={{
                      height: `${d.off ? 0 : Math.max(4, h)}%`,
                      background: hitTargets(d.log) ? 'var(--good)' : 'var(--acc)',
                    }} />
                  </div>
                  <div className={'wk-d' + (d.iso === iso ? ' on' : '')}>{d.off ? '·' : d.label}</div>
                </div>
              );
            })}
          </div>
          <p className="note" style={{ marginTop: 4 }}>Last 7 days · green = all targets hit</p>
        </div>
      )}

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

          {/* ── WHICH LISTS TO PULL TODAY ── */}
          <div className="card accent">
            <h3 className="h3">📋 Pull these from AutoAlert today</h3>
            <p className="body" style={{ fontSize: '.83rem', marginBottom: 10 }}>
              Built for a {shift.day.toLowerCase()} shift. Open AutoAlert, filter as shown, copy the
              rows, then tap <b>Paste</b> — the source is set for you.
            </p>

            {(PULLS[shift.mode] || []).map((pull) => (
              <div className="pull" key={pull.id}>
                <div className="pullhead">
                  <span className="pullname">{pull.list}</span>
                  <span className="pulltarget">{pull.target}</span>
                </div>
                <div className="pullfilter"><b>Filter:</b> {pull.filter}</div>
                <div className="pullwhy">→ {pull.produces}</div>
                <button className="sm" style={{ width: '100%', marginTop: 7 }}
                  onClick={() => onGoImport(pull.source)}>
                  Paste this list →
                </button>
              </div>
            ))}

            <p className="note">
              Phone numbers and emails are stripped on import — those stay in Momentum. Only names
              and vehicles are saved here.
            </p>

            <button className="sm" style={{ width: '100%', marginTop: 4 }} onClick={() => setShowLists((v) => !v)}>
              {showLists ? 'Hide' : 'Show'} the {STANDING_LISTS.length} lists to build once in AutoAlert
            </button>
            {showLists && (
              <div style={{ marginTop: 10 }}>
                <p className="note" style={{ marginTop: 0 }}>
                  Build and save these once. Alert names differ between stores — ask your AutoAlert
                  admin to match them up, then you reuse them every shift.
                </p>
                {STANDING_LISTS.map((l) => (
                  <div className="pull" key={l.name}>
                    <div className="pullname">{l.name}</div>
                    <div className="pullfilter"><b>How:</b> {l.how}</div>
                    <div className="pullwhy">{l.why}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── the shift ── */}
          <button className="sm" style={{ width: '100%', marginBottom: 12 }} onClick={() => setShowPlan((v) => !v)}>
            {showPlan ? 'Hide' : 'Show'} the {shift.day} plan, scripts &amp; Sprinter list
          </button>

          {showPlan && (<>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <h3 className="h3">{shift.day} — {shift.headline}</h3>
              <span className="mini" style={{ whiteSpace: 'nowrap' }}>{doneCount}/{totalTodos} done</span>
            </div>
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
                    <ul className="checks">
                      {b.todo.map((t, j) => {
                        const id = `${i}-${j}`;
                        const isDone = log.done.includes(id);
                        return (
                          <li key={j}>
                            <button className={'chk' + (isDone ? ' on' : '')} onClick={() => toggleDone(id)}>
                              <span className="box">{isDone ? '✓' : ''}</span>
                              <span className="txt">{t}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
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
          </>)}
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
