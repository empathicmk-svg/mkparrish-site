'use client';

import { useState } from 'react';
import { type Prospect, nextDue, daysBetween } from './deskData';

/** Why you are calling, and the first line out of your mouth, by source. */
export const REASONS: Record<string, { why: string; opener: string }> = {
  equity: {
    why: 'Sitting in positive equity — worth more than they owe',
    opener: 'Good news, not a problem — your [model] is worth more than most people expect right now, and a lot of our owners are moving into a newer one for close to what they pay today.',
  },
  'lease-end': {
    why: 'Lease maturing — beat the other store to them',
    opener: 'Because you leased with us, Financial Services will waive up to your first 3 payments if we move now — 6 if you are in a GLE, GLS, or S-Class.',
  },
  conquest: {
    why: 'Drives another brand — $1,500 Upgrade Certificate applies',
    opener: 'Since you are currently in a [brand], you qualify for our $1,500 Upgrade Certificate on top of this month\'s incentives.',
  },
  floor: {
    why: 'Came in and left without buying',
    opener: 'I have been thinking about what you said on the [model] — I ran a couple of structures and I think there is a version of this that works for you.',
  },
  internet: {
    why: 'Inquired online — speed wins these',
    opener: 'You asked about the [model] — it is still available and I can hold it for you. Do you want a quick walk-around video?',
  },
  service: {
    why: 'In for service — they are already on the property',
    opener: 'While your [model] is in — did you know it is worth more than most people expect right now? Give me ten minutes.',
  },
  referral: {
    why: 'Referred to you — warmest call you will make today',
    opener: '[Referrer] thought highly enough of you to send me your way, so I want to take good care of you.',
  },
  sprinter: {
    why: 'Business — ask who their parent company is',
    opener: 'Quick reason I am calling: if you franchise under a national brand, you qualify for fleet pricing on a single Sprinter — thousands more than retail. Section 179 may also apply before year-end.',
  },
};

type Props = {
  queue: { p: Prospect; due: string }[];
  today: string;
  onCalled: (p: Prospect) => void;
  onAppt: (p: Prospect) => void;
  onSkip: (p: Prospect) => void;
  onGoImport: () => void;
  onGoSprinter: () => void;
};

export default function CallQueue({ queue, today, onCalled, onAppt, onSkip, onGoImport, onGoSprinter }: Props) {
  const [openScript, setOpenScript] = useState<number | null>(null);

  if (!queue.length) {
    return (
      <div className="card accent">
        <h3 className="h3">Queue is empty — go get more</h3>
        <p className="body">
          Nothing is due right now. That is not a break, it is a signal to reload the pipeline.
        </p>
        <button className="act" style={{ marginTop: 10 }} onClick={onGoImport}>
          Paste an AutoAlert list →
        </button>
        <button className="sm" style={{ width: '100%', marginTop: 8 }} onClick={onGoSprinter}>
          Or work the Sprinter franchise list →
        </button>
      </div>
    );
  }

  const first = queue[0];
  const rest = queue.slice(1);

  const card = (item: { p: Prospect; due: string }, i: number, hero: boolean) => {
    const { p, due } = item;
    const late = daysBetween(due, today);
    const r = REASONS[p.src] || { why: p.src, opener: '' };
    const open = openScript === i;

    return (
      <div className={'callcard' + (hero ? ' qhero' : '')} key={p.id}>
        <div className="callhead">
          <div style={{ minWidth: 0 }}>
            <div className="callname">{p.name}</div>
            <div className="callmeta">
              {p.veh ? p.veh + ' · ' : ''}touch {p.touches + 1}
            </div>
          </div>
          <span className={'badge ' + (late > 0 ? 'late' : 'today')}>
            {late > 0 ? `${late}d late` : 'today'}
          </span>
        </div>

        <div className="callwhy">{r.why}</div>

        {r.opener && (
          <>
            <button className="opener" onClick={() => setOpenScript(open ? null : i)}>
              {open ? '− Hide opener' : '+ What to say'}
            </button>
            {open && <p className="openertext">&ldquo;{r.opener}&rdquo;</p>}
          </>
        )}

        <div className="callacts">
          <button className="act" style={{ flex: 2 }} onClick={() => onCalled(p)}>Called</button>
          <button className="sm" style={{ flex: 1.3 }} onClick={() => onAppt(p)}>Appt set</button>
          <button className="sm" style={{ flex: 1 }} onClick={() => onSkip(p)}>Skip</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="card" style={{ padding: 0, overflow: 'hidden', borderColor: 'var(--acc)' }}>
        <div className="queuebar">
          <span>Call these now</span>
          <b>{queue.length}</b>
        </div>
        {card(first, 0, true)}
      </div>

      {rest.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="queuebar quiet"><span>Next up</span><b>{rest.length}</b></div>
          {rest.slice(0, 6).map((item, i) => card(item, i + 1, false))}
          {rest.length > 6 && (
            <p className="note" style={{ padding: '0 14px 12px' }}>
              +{rest.length - 6} more after these.
            </p>
          )}
        </div>
      )}
    </>
  );
}
