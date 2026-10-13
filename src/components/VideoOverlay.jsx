import React from 'react';
import { Lamp, Lotus, Mandala, Petals, Sparkle } from '../art.jsx';

const BRASS_LINE = 'rgba(201,166,107,0.85)';
const TORAN = [
  [18.9, 18.5, 0.9], [76.1, 32.9, 1.0], [132.5, 38.5, 1.1], [188.1, 35.3, 1.2], [242.9, 23.3, 1.3],
  [270, 14, 1.4],
  [297.1, 23.3, 1.5], [351.9, 35.3, 1.6], [407.5, 38.5, 1.7], [463.9, 32.9, 1.8], [521.1, 18.5, 1.9],
];
const PETALS = [
  { l: 80, t: 15, w: -5, dx: 40, o: 0.7, f: 2.4, size: [11, 15], bg: '#C9A66B' },
  { l: 190, t: 19, w: 2, dx: -30, o: 0.55, f: 3, size: [9, 12], bg: '#F3EBDD' },
  { l: 320, t: 16, w: -9, dx: 45, o: 0.7, f: 2.6, size: [12, 16], bg: '#E9C4B4' },
  { l: 430, t: 21, w: 6, dx: -35, o: 0.55, f: 3.2, size: [9, 12], bg: '#C9A66B' },
  { l: 500, t: 18, w: -12, dx: 20, o: 0.6, f: 2.8, size: [10, 14], bg: '#F3EBDD' },
];
const CORNERS = [
  ['M14 34 V14 H34', 1.9],
  ['M506 14 H526 V34', 1.95],
  ['M526 270 V290 H506', 2.0],
  ['M34 290 H14 V270', 2.05],
];
const IRIS_OPEN = 'circle(880px at 462px 688px)';
const IRIS_SHUT = 'circle(0px at 462px 688px)';
const IRIS_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

/**
 * Full-card video page. A gold-rimmed iris grows out of the flower button,
 * the page choreographs in, and the iris closes back when the video ends.
 */
export default function VideoOverlay({ playing, videoRef, barRef, src }) {
  const clip = playing ? IRIS_OPEN : IRIS_SHUT;
  return (
    <div
      className={`ov${playing ? ' on' : ''}`}
      style={{ visibility: playing ? 'visible' : 'hidden', transition: `visibility 0s linear ${playing ? '0s' : '1.7s'}` }}
    >
      {/* gold rim that leads the iris */}
      <div
        aria-hidden="true" className="ov-layer"
        style={{ background: '#C9A66B', clipPath: clip, transition: `clip-path 1.5s ${IRIS_EASE} ${playing ? '0s' : '0.05s'}` }}
      />
      <div
        className="ov-layer"
        style={{ overflow: 'hidden', background: 'var(--ground)', clipPath: clip, transition: `clip-path 1.5s ${IRIS_EASE} ${playing ? '0.05s' : '0s'}` }}
      >
        <div
          className="ov-content"
          style={{
            transform: playing ? 'scale(1)' : 'scale(0.94)',
            opacity: playing ? 1 : 0,
            transition: `transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${playing ? '0.35s' : '0s'}, opacity 0.9s ease ${playing ? '0.35s' : '0s'}`,
          }}
        >
          <div aria-hidden="true" className="abs v-fade" style={{ '--d': '0.4s', left: 0, top: 220, width: 540, height: 520, display: 'flex', justifyContent: 'center' }}>
            <Mandala size={520} cls="v-spin" stroke="rgba(201,166,107,0.11)" sw={0.8} />
          </div>

          <div aria-hidden="true" className="fx-layer v-fade" style={{ '--d': '1.8s' }}>
            <Petals items={PETALS} wrap="v-petal" inner="fl2" />
          </div>

          {/* mango-leaf toran garland */}
          <svg
            aria-hidden="true" className="abs" viewBox="0 0 540 90" width="540" height="90" fill="none" strokeLinecap="round"
            style={{ top: 0, left: 0, overflow: 'visible' }}
          >
            <path className="v-draw" pathLength="1" style={{ '--d': '0.5s', '--dur': '1.6s' }} d="M-10 8 Q135 66 270 14" stroke={BRASS_LINE} strokeWidth="1.2" />
            <path className="v-draw" pathLength="1" style={{ '--d': '0.5s', '--dur': '1.6s' }} d="M270 14 Q405 66 550 8" stroke={BRASS_LINE} strokeWidth="1.2" />
            {TORAN.map(([x, y, d]) => (
              <g key={x} transform={`translate(${x} ${y})`}>
                <g className="v-pend" style={{ '--d': `${d}s` }}>
                  <path d="M0 0 V8" stroke={BRASS_LINE} strokeWidth="1" />
                  <path d="M0 8 C-5.5 15 -4.5 25 0 32 C4.5 25 5.5 15 0 8Z" fill="rgba(201,166,107,0.22)" stroke={BRASS_LINE} strokeWidth="1" />
                  <circle cx="0" cy="37" r="2.4" fill="#F3EBDD" />
                </g>
              </g>
            ))}
          </svg>

          <div className="abs" style={{ top: 124, left: 0, width: 540, textAlign: 'center' }}>
            <div className="caps muted v-rise" style={{ '--d': '0.8s', letterSpacing: '0.28em' }}>The wedding of</div>
            <div className="serif v-unmask" style={{ '--d': '0.95s', marginTop: 12, fontSize: 48, lineHeight: '52px', letterSpacing: '-0.01em' }}>
              Srihari &amp; Sasireka
            </div>
          </div>

          <div aria-hidden="true" className="abs v-growx" style={{ '--d': '0.85s', top: 327, left: 0, width: 540, height: 1, background: 'rgba(201,166,107,0.4)' }} />
          <div className="video-band v-reveal">
            <video ref={videoRef} src={src} playsInline preload="auto" disablePictureInPicture />
          </div>
          <svg
            aria-hidden="true" className="abs" viewBox="0 0 540 304" width="540" height="304" fill="none" stroke="#E8C98A"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ top: 328, left: 0, pointerEvents: 'none' }}
          >
            {CORNERS.map(([d, delay]) => (
              <path key={d} className="v-draw" pathLength="1" style={{ '--d': `${delay}s`, '--dur': '0.9s' }} d={d} />
            ))}
          </svg>
          <div aria-hidden="true" className="abs v-growx" style={{ '--d': '0.85s', top: 632, left: 0, width: 540, height: 1, background: 'rgba(201,166,107,0.4)' }} />

          {/* progress line (indicator only, no controls) */}
          <div aria-hidden="true" className="abs v-growx" style={{ '--d': '2s', top: 664, left: 40, width: 460, height: 2, background: 'rgba(201,166,107,0.25)' }}>
            <div ref={barRef} style={{ width: '100%', height: 2, background: '#C9A66B', transform: 'scaleX(0)', transformOrigin: '0 50%' }} />
          </div>

          <div className="abs caps brass v-rise" style={{ '--d': '1.6s', top: 716, left: 0, width: 540, textAlign: 'center', fontWeight: 500, letterSpacing: '0.28em' }}>
            Sunday &middot; 22 November 2026
          </div>
          <Lotus base={1.9} step={0.15} cls="v-draw" style={{ position: 'absolute', top: 748, left: 234 }} />
          <div className="abs serif v-rise" style={{ '--d': '2.2s', top: 800, left: 0, width: 540, textAlign: 'center', fontSize: 30, lineHeight: '34px' }}>Easwar Mahal</div>
          <div className="abs caps muted v-rise" style={{ '--d': '2.35s', top: 842, left: 0, width: 540, textAlign: 'center' }}>
            Annantha Nagar &middot; Tamil Nadu
          </div>

          <div className="abs v-rise" style={{ '--d': '2s', left: 50, top: 796 }}>
            <Lamp width={44} height={66} video glow={90} />
          </div>
          <div className="abs v-rise" style={{ '--d': '2.1s', left: 446, top: 796 }}>
            <Lamp width={44} height={66} video glow={90} flameDelay="-1.3s" />
          </div>

          <div aria-hidden="true" className="fx-layer" style={{ overflow: 'visible' }}>
            <Sparkle cls="v-twinkle" x={70} y={232} d={2.4} t={4.6} />
            <Sparkle cls="v-twinkle" x={472} y={214} d={3.1} t={5.2} />
            <Sparkle cls="v-twinkle" x={120} y={700} d={3.6} t={4.4} />
            <Sparkle cls="v-twinkle" x={428} y={706} d={2.9} t={5.6} />
          </div>
        </div>
      </div>
    </div>
  );
}
