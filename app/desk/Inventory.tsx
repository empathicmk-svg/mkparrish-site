'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  type Unit, parseInventory, loadInventory, saveInventory,
  isSprinter, isUsed, agingBonus, matchModelKey, INV_KEY,
} from './deskInventory';
import { money, type DeskConfig } from './deskData';

type Props = {
  cfg: DeskConfig | null;
  onQuote: (modelKey: string, price: number) => void;
};

type View = 'aged-used' | 'sprinter' | 'aged-new' | 'all';

export default function Inventory({ cfg, onQuote }: Props) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [paste, setPaste] = useState('');
  const [view, setView] = useState<View>('aged-used');
  const [q, setQ] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => { setUnits(loadInventory()); setReady(true); }, []);

  // Aging terms come from the operator's own pay plan, not a hardcoded rule.
  const perDay = cfg?.dealTypes?.used?.agePerDay ?? 0;
  const afterDays = cfg?.dealTypes?.used?.ageAfter ?? 45;
  const usedRate = cfg?.dealTypes?.used?.front ?? 0;

  const stats = useMemo(() => {
    const used = units.filter(isUsed);
    const agedUsed = used.filter((u) => u.days > afterDays);
    const bonusPool = agedUsed.reduce((s, u) => s + agingBonus(u, perDay, afterDays), 0);
    return {
      total: units.length,
      neu: units.filter((u) => u.type === 'New').length,
      used: used.length,
      sprinters: units.filter(isSprinter).length,
      agedUsed: agedUsed.length,
      agedNew: units.filter((u) => u.type === 'New' && u.days >= 90).length,
      bonusPool,
      yourCut: bonusPool * usedRate,
    };
  }, [units, perDay, afterDays, usedRate]);

  const shown = useMemo(() => {
    let list = units;
    if (view === 'aged-used') list = units.filter((u) => isUsed(u) && u.days > afterDays);
    else if (view === 'sprinter') list = units.filter(isSprinter);
    else if (view === 'aged-new') list = units.filter((u) => u.type === 'New' && u.days >= 90);

    const needle = q.trim().toLowerCase();
    if (needle) {
      list = list.filter((u) =>
        `${u.model} ${u.stock} ${u.year} ${u.type}`.toLowerCase().includes(needle));
    }
    return [...list].sort((a, b) => b.days - a.days);
  }, [units, view, q, afterDays]);

  const doImport = () => {
    const parsed = parseInventory(paste);
    if (!parsed.length) return;
    setUnits(parsed);
    saveInventory(parsed);
    setPaste('');
  };

  const quote = (u: Unit) => {
    if (!cfg || !u.price) return;
    const names: Record<string, string> = {};
    for (const [k, m] of Object.entries(cfg.models)) names[k] = m.name;
    const key = matchModelKey(u, Object.keys(cfg.models), names);
    if (key) onQuote(key, u.price);
  };

  if (!ready) return <p className="sub">Loading…</p>;

  if (!units.length) {
    return (
      <>
        <div className="card accent">
          <h3 className="h3">Paste your stock list</h3>
          <ol className="steps">
            <li>Open your inventory report and select all the rows.</li>
            <li><b>Copy</b>, then paste below and tap Import.</li>
          </ol>
          <textarea value={paste} onChange={(e) => setPaste(e.target.value)}
            placeholder="Stock #  Type  Year  Make  Model  …  VIN  Miles  Price  Days  Status" />
          <button className="act" style={{ marginTop: 10 }} disabled={!paste.trim()} onClick={doImport}>
            Import stock list
          </button>
          <p className="note" style={{ marginBottom: 0 }}>
            Reads whatever shape the export comes in — tabs, commas, or one run-on block from a PDF.
            Stays on this device.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="card" style={{ display: 'flex', gap: 10, textAlign: 'center', padding: '11px 8px' }}>
        <div style={{ flex: 1 }}>
          <div className="big2">{stats.total}</div>
          <div className="mini">in stock</div>
        </div>
        <div style={{ flex: 1, borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' }}>
          <div className="big2">{stats.sprinters}</div>
          <div className="mini">sprinters</div>
        </div>
        <div style={{ flex: 1.3 }}>
          <div className="big2" style={{ color: 'var(--good)' }}>{money(stats.yourCut)}</div>
          <div className="mini">aging $ to you</div>
        </div>
      </div>

      {stats.bonusPool > 0 && (
        <div className="card" style={{ borderColor: 'var(--good)' }}>
          <p className="body" style={{ fontSize: '.85rem', margin: 0 }}>
            <b>{stats.agedUsed} used units are past {afterDays} days.</b> Your plan adds{' '}
            {money(perDay)}/day to commissionable gross beyond that — <b>{money(stats.bonusPool)}</b> of
            extra gross sitting on the lot, worth about <b>{money(stats.yourCut)}</b> to you at{' '}
            {(usedRate * 100).toFixed(0)}%. Sell these before a fresh trade.
          </p>
        </div>
      )}

      <div className="card" style={{ padding: 10 }}>
        <div className="chips" style={{ marginBottom: 8 }}>
          {([
            ['aged-used', `Aged used ${stats.agedUsed}`],
            ['sprinter', `Sprinters ${stats.sprinters}`],
            ['aged-new', `Aged new ${stats.agedNew}`],
            ['all', `All ${stats.total}`],
          ] as [View, string][]).map(([v, label]) => (
            <button key={v} type="button" className="chip" aria-pressed={view === v}
              onClick={() => setView(v)} style={{ fontSize: '.75rem' }}>{label}</button>
          ))}
        </div>
        <input type="search" placeholder="Search stock # or model" value={q}
          onChange={(e) => setQ(e.target.value)} aria-label="Search inventory" />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {shown.slice(0, 60).map((u) => {
          const bonus = agingBonus(u, perDay, afterDays);
          return (
            <div className="p" key={u.vin} style={{ padding: '11px 14px' }}>
              <div>
                <div className="nm">{u.year} {u.model || u.make}</div>
                <div className="meta">
                  {u.stock} · {u.type}
                  {u.price ? ` · ${money(u.price)}` : ''}
                  {u.miles > 100 ? ` · ${u.miles.toLocaleString()} mi` : ''}
                </div>
                <div style={{ marginTop: 3, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className={'badge ' + (u.days >= 90 ? 'late' : u.days > afterDays ? 'today' : 'ok')}>
                    {u.days}d
                  </span>
                  {bonus > 0 && (
                    <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--good)' }}>
                      +{money(bonus)} gross
                    </span>
                  )}
                  {isSprinter(u) && <span className="xshop" style={{ fontSize: '.68rem' }}>Sprinter</span>}
                </div>
              </div>
              <div>
                {u.price ? <button className="sm" onClick={() => quote(u)}>Quote →</button> : null}
              </div>
            </div>
          );
        })}
        {shown.length > 60 && (
          <p className="note" style={{ padding: '0 14px 12px' }}>+{shown.length - 60} more — narrow it with search.</p>
        )}
        {!shown.length && <p className="empty">Nothing here.</p>}
      </div>

      <button className="sm" style={{ width: '100%' }} onClick={() => {
        if (!confirm('Clear the stored stock list and paste a fresh one?')) return;
        try { localStorage.removeItem(INV_KEY); } catch { /* ignore */ }
        setUnits([]);
      }}>Replace with a newer stock list</button>

      <p className="note">
        Prices here are the listed figures from your own export — the most accurate numbers in this
        app. Tapping Quote carries the real price across.
      </p>
    </>
  );
}
