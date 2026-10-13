import React from 'react';
import { Jasmine, Leaf } from '../art.jsx';

// [x, y, rotation, scale, delay]
const LEAVES = [
  [21, 383, -30, 0.9, 0.9],
  [21, 330, -150, 0.9, 1.1],
  [22, 277, -35, 0.9, 1.3],
  [14, 220, -145, 0.9, 1.5],
  [10, 175, -30, 0.9, 1.7],
  [12, 126, -150, 0.9, 1.9],
  [15, 72, -40, 0.9, 2.1],
  [12, 10, -90, 1, 2.3],
];
// [x, y, delay]
const BLOOMS = [
  [21, 356, 2.4],
  [21, 303, 2.55],
  [18, 248, 2.7],
  [11, 198, 2.85],
  [11, 150, 3.0],
  [13, 100, 3.15],
  [14, 42, 3.3],
];

/** Leafy vine with jasmine blooms that climbs one side of the arch. The right side is the left one mirrored. */
export default function Vine({ side }) {
  const right = side === 'right';
  const shift = right ? 0.2 : 0;
  return (
    <div aria-hidden="true" className={`vine-wrap ${side}`}>
      <svg
        className="vine" viewBox="0 0 40 440" width="40" height="440" fill="none" strokeLinecap="round"
        style={{ overflow: 'visible', animationDelay: right ? '-4s' : undefined }}
      >
        <path
          className="draw" pathLength="1" style={{ '--d': `${0.3 + shift}s`, '--dur': '2.6s' }}
          d="M30 440 C8 360 34 300 14 220 C2 160 22 100 12 10" stroke="rgba(201,166,107,0.8)" strokeWidth="1.2"
        />
        {LEAVES.map(([x, y, rot, scale, d]) => (
          <Leaf key={`${x}-${y}`} x={x} y={y} rot={rot} scale={scale} delay={d + shift} />
        ))}
        {BLOOMS.map(([x, y, d]) => (
          <Jasmine key={`${x}-${y}`} x={x} y={y} delay={d + shift} />
        ))}
      </svg>
    </div>
  );
}
