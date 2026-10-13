import React from 'react';

const BIG = 'M0 0 C9 -10 11 -30 0 -46 C-11 -30 -9 -10 0 0Z';
const SMALL = 'M0 0 C6 -7 7 -20 0 -31 C-7 -20 -6 -7 0 0Z';
const OUTER = Array.from({ length: 8 }, (_, i) => i * 45);
const INNER = Array.from({ length: 8 }, (_, i) => 22.5 + i * 45);

/** The lotus-flower "Video invite" button that sits on the arch's bottom-right corner. */
export default function Seal({ open, onClick }) {
  return (
    <button type="button" className={`seal${open ? ' open' : ''}`} aria-label="Video invite" onClick={onClick}>
      <span aria-hidden="true" className="ping" />
      <svg
        aria-hidden="true" viewBox="-52 -52 104 104" width="104" height="104"
        style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
      >
        <g className="fl-in" style={{ '--d': '4.9s' }}>
          <g className="fl-idle">
            <g className="fl-t fl-t1" style={{ fill: 'var(--ground)' }} stroke="#C9A66B" strokeWidth="1" strokeLinejoin="round">
              {OUTER.map((r) => (
                <path key={r} d={BIG} transform={`rotate(${r})`} />
              ))}
            </g>
          </g>
        </g>
        <g className="fl-in" style={{ '--d': '5.1s' }}>
          <g className="fl-idle2">
            <g className="fl-t fl-t2" fill="rgba(201,166,107,0.24)" stroke="#C9A66B" strokeWidth="1" strokeLinejoin="round">
              {INNER.map((r) => (
                <path key={r} d={SMALL} transform={`rotate(${r})`} />
              ))}
            </g>
          </g>
        </g>
        <g className="fl-in" style={{ '--d': '5.3s' }}>
          <g className="core">
            <circle className="coredot" cx="0" cy="0" r="17" />
            <path d="M-4.5 -6.5 L7 0 L-4.5 6.5Z" style={{ fill: 'var(--ground)' }} />
          </g>
        </g>
      </svg>
      <span aria-hidden="true" className="seal-label rise" style={{ '--d': '5.5s' }}>
        Video invite
      </span>
    </button>
  );
}
