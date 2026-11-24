'use client';

import { useState } from 'react';
import { CLASSES, APPROX_MSRP, MB_ALL_VEHICLES } from './deskProduct';
import { money, type DeskConfig } from './deskData';
import Inventory from './Inventory';

type Props = {
  cfg: DeskConfig | null;
  onQuote: (modelKey: string, price?: number) => void;
};

export default function Cars({ cfg, onQuote }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<'lot' | 'product'>('lot');

  if (!cfg) {
    return (
      <div className="pane">
        <h1>Product</h1>
        <p className="sub">Load your data in Setup first.</p>
      </div>
    );
  }

  // group the configured models by their class
  const byClass = new Map<string, string[]>();
  for (const [key, m] of Object.entries(cfg.models)) {
    const g = m.group || 'Other';
    if (!byClass.has(g)) byClass.set(g, []);
    byClass.get(g)!.push(key);
  }

  const needle = q.trim().toLowerCase();
  const matches = (key: string) =>
    !needle ||
    cfg.models[key].name.toLowerCase().includes(needle) ||
    (cfg.models[key].group || '').toLowerCase().includes(needle);

  const groups = [...byClass.entries()]
    .map(([g, keys]) => [g, keys.filter(matches)] as [string, string[]])
    .filter(([g, keys]) => keys.length > 0 || (needle && g.toLowerCase().includes(needle)));

  const toggle = (
    <div className="chips" style={{ marginBottom: 12 }}>
      <button type="button" className="chip" aria-pressed={tab === 'lot'} onClick={() => setTab('lot')}>
        On the lot
      </button>
      <button type="button" className="chip" aria-pressed={tab === 'product'} onClick={() => setTab('product')}>
        Product info
      </button>
    </div>
  );

  if (tab === 'lot') {
    return (
      <div className="pane">
        <h1>On the lot</h1>
        <p className="sub">Your actual stock, ranked by what it pays you</p>
        {toggle}
        <Inventory cfg={cfg} onQuote={onQuote} />
      </div>
    );
  }

  return (
    <div className="pane">
      <h1>Know the product</h1>
      <p className="sub">Every model you can sell · tap a class to open it</p>
      {toggle}

      <div className="card" style={{ padding: 10 }}>
        <input
          type="search" inputMode="search" placeholder="Search — GLE, Sprinter, coupe…"
          value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search models"
        />
      </div>

      <div className="card" style={{ borderColor: 'var(--acc)' }}>
        <p className="body" style={{ fontSize: '.82rem' }}>
          <b>Prices below are approximate starting points</b> — enough to know if you are in a $50k
          or $150k conversation. Options move them a lot. Use the window sticker before you quote a
          customer, and the app will remember that number.
        </p>
      </div>

      {groups.map(([g, keys]) => {
        const info = CLASSES[g];
        const isOpen = open === g;
        const prices = keys.map((k) => APPROX_MSRP[k]).filter((n): n is number => !!n);
        const lo = prices.length ? Math.min(...prices) : 0;
        const hi = prices.length ? Math.max(...prices) : 0;

        return (
          <div className="card" key={g} style={{ padding: 0, overflow: 'hidden' }}>
            <button className="clsHead" onClick={() => setOpen(isOpen ? null : g)}>
              <span style={{ minWidth: 0 }}>
                <span className="clsName">{info?.name || g}</span>
                <span className="clsBody">{info?.body || `${keys.length} models`}</span>
              </span>
              <span style={{ textAlign: 'right', flex: 'none' }}>
                {lo > 0 && (
                  <span className="clsPrice">
                    {lo === hi ? `~${money(lo)}` : `~${money(lo)}–${money(hi)}`}
                  </span>
                )}
                <span className="chev" style={{ marginLeft: 8 }}>{isOpen ? '−' : '+'}</span>
              </span>
            </button>

            {isOpen && (
              <div style={{ padding: '0 14px 14px' }}>
                {info && (
                  <>
                    <p className="body" style={{ fontWeight: 650, color: 'var(--ink)' }}>{info.positioning}</p>
                    <p className="note" style={{ marginTop: 6 }}><b>Who buys it:</b> {info.who}</p>

                    <h4 className="h4">Selling points</h4>
                    <ul className="todo">{info.features.map((f, i) => <li key={i}>{f}</li>)}</ul>

                    <div className="tt">
                      <div className="ttlab">How to sell it</div>
                      <p>{info.talkTrack}</p>
                    </div>

                    <h4 className="h4">They&rsquo;re also looking at</h4>
                    <div className="chips" style={{ gap: 5 }}>
                      {info.crossShop.map((c) => <span className="xshop" key={c}>{c}</span>)}
                    </div>

                    <a className="act" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: 12 }}
                      href={info.url} target="_blank" rel="noopener noreferrer">
                      Official page, specs &amp; photos ↗
                    </a>
                  </>
                )}

                <h4 className="h4">Models &amp; approximate starting price</h4>
                {keys.map((k) => (
                  <div className="p" key={k}>
                    <div>
                      <div className="nm">{cfg.models[k].name.replace(/^MY2\d\s/, '')}</div>
                      <div className="meta">
                        {APPROX_MSRP[k] ? `from ~${money(APPROX_MSRP[k])}` : 'price varies'}
                        {cfg.models[k].mib > 0 && ` · ${money(cfg.models[k].mib)} cash`}
                      </div>
                    </div>
                    <div>
                      <button className="sm" onClick={() => onQuote(k)}>Quote →</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {!groups.length && (
        <div className="card"><p className="empty">Nothing matches &ldquo;{q}&rdquo;.</p></div>
      )}

      <p className="note">
        Photos and full specs live on <a href={MB_ALL_VEHICLES} target="_blank" rel="noopener noreferrer">mbusa.com</a> —
        always current, and the right link to text a customer. Nothing is cached here, so you never
        show last year&rsquo;s car.
      </p>
    </div>
  );
}
