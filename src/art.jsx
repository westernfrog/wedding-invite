import React from 'react';

export const BRASS = '#C9A66B';
const LEAF_FILL = 'rgba(201,166,107,0.2)';
const LEAF_STROKE = 'rgba(201,166,107,0.75)';
const LEAF_PATH = 'M0 0 C6 -8 14 -8 18 0 C14 8 6 8 0 0Z';

export function Leaf({ x, y, rot, scale = 0.9, delay }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      <path className="leaf" style={{ '--d': `${delay}s` }} d={LEAF_PATH} fill={LEAF_FILL} stroke={LEAF_STROKE} strokeWidth="1" />
    </g>
  );
}

export function Jasmine({ x, y, delay }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="bloom" style={{ '--d': `${delay}s` }}>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-3.4" rx="2.3" ry="3.6" transform={`rotate(${r})`} fill="rgba(243,235,221,0.92)" />
        ))}
        <circle cx="0" cy="0" r="1.3" fill={BRASS} />
      </g>
    </g>
  );
}

/** Brass lamp (kuthuvilakku). `video` switches to the classes that only animate on the video page. */
export function Lamp({ width = 52, height = 78, video = false, flameDelay, glow = 110, label }) {
  const flame = video ? 'v-flame' : 'flame';
  const halo = video ? 'v-halo' : 'halo';
  const fd = flameDelay ? { animationDelay: flameDelay } : undefined;
  return (
    <div className="lamp" style={{ width, height }}>
      <div
        aria-hidden="true"
        className={`lamp-glow ${halo}`}
        style={{ top: 16, width: glow, height: glow, margin: `${-glow / 2}px 0 0 ${-glow / 2}px`, filter: `blur(${Math.round(glow / 4.5)}px)`, ...fd }}
      />
      <svg
        {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
        viewBox="0 0 56 84" width={width} height={height} fill="none" stroke={BRASS}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      >
        {!video && <circle className="halo" cx="28" cy="15" r="13" fill="rgba(232,201,138,0.2)" stroke="none" />}
        <path className={flame} style={fd} d="M28 3 C33.5 10 34.5 16 28 22 C21.5 16 22.5 10 28 3 Z" fill="#E8C98A" stroke="none" />
        <path className={flame} style={fd} d="M28 11 C30.4 14.2 30.5 17.2 28 19.8 C25.5 17.2 25.6 14.2 28 11 Z" fill="#FFF1CC" stroke="none" />
        <path d="M28 22 V27" />
        <path d="M11 27 H45 Q43 38 28 38 Q13 38 11 27 Z" />
        {!video && <path d="M17 31 Q28 34 39 31" strokeOpacity="0.5" />}
        <path d="M28 38 V43" />
        <ellipse cx="28" cy="47" rx="5.5" ry="4" />
        <path d="M28 51 V57" />
        <ellipse cx="28" cy="60" rx="4" ry="3" />
        <path d="M28 63 V67" />
        <path d="M15 80 Q16 69 28 67 Q40 69 41 80 Z" />
        {!video && <path d="M28 67 V80" strokeOpacity="0.45" />}
        <path d="M11 80 H45" />
      </svg>
    </div>
  );
}

const LOTUS = [
  'M36 4 C42 11 42 20 36 26 C30 20 30 11 36 4Z',
  'M36 26 C28 24 20 18 18 10 C26 11 32 17 36 26Z',
  'M36 26 C44 24 52 18 54 10 C46 11 40 17 36 26Z',
  'M36 26 C24 27 12 24 6 17 C16 15 28 18 36 26Z',
  'M36 26 C48 27 60 24 66 17 C56 15 44 18 36 26Z',
];
const LOTUS_OFFSETS = [0, 1, 1, 2, 2];

export function Lotus({ base, step, cls = 'draw', style }) {
  return (
    <svg
      aria-hidden="true" viewBox="0 0 72 30" width="72" height="30" fill="rgba(201,166,107,0.12)"
      stroke="rgba(201,166,107,0.85)" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" style={style}
    >
      {LOTUS.map((d, i) => (
        <path key={i} className={cls} pathLength="1" style={{ '--d': `${(base + LOTUS_OFFSETS[i] * step).toFixed(2)}s`, '--dur': '1.2s' }} d={d} />
      ))}
    </svg>
  );
}

const PETAL_ANGLES = Array.from({ length: 12 }, (_, i) => i * 30);

export function Mandala({ size = 340, cls, stroke = 'rgba(201,166,107,0.16)', sw = 1 }) {
  return (
    <svg className={cls} viewBox="0 0 340 340" width={size} height={size} fill="none" stroke={stroke} strokeWidth={sw} aria-hidden="true">
      <circle cx="170" cy="170" r="160" />
      <circle cx="170" cy="170" r="128" />
      <circle cx="170" cy="170" r="52" />
      <g transform="translate(170 170)">
        {PETAL_ANGLES.map((a) => (
          <ellipse key={a} cx="0" cy="-92" rx="15" ry="38" transform={`rotate(${a})`} />
        ))}
      </g>
    </svg>
  );
}

export function Sparkle({ x, y, d, t, cls = 'twinkle' }) {
  return (
    <div className={cls} style={{ left: x, top: y, margin: '-6px 0 0 -6px', '--d': `${d}s`, '--t': `${t}s` }}>
      <svg viewBox="-6 -6 12 12" width="12" height="12" aria-hidden="true">
        <path d="M0 -6 Q0.8 -0.8 6 0 Q0.8 0.8 0 6 Q-0.8 0.8 -6 0 Q-0.8 -0.8 0 -6Z" fill="#E8C98A" />
      </svg>
    </div>
  );
}

/** Falling petals. Each item: l (left px), t (fall seconds), w (delay), dx (drift), o (opacity), f (flutter s), size [w,h], bg, blur */
export function Petals({ items, wrap = 'petal', inner = 'flutter' }) {
  return items.map((p, i) => (
    <div key={i} className={wrap} style={{ '--l': `${p.l}px`, '--t': `${p.t}s`, '--w': `${p.w}s`, '--dx': `${p.dx}px`, '--o': p.o }}>
      <div
        className={inner}
        style={{ '--f': `${p.f}s`, width: p.size[0], height: p.size[1], background: p.bg, filter: p.blur ? `blur(${p.blur}px)` : undefined }}
      />
    </div>
  ));
}
