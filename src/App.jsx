import React, { useEffect, useMemo } from 'react';
import { Lamp, Lotus, Mandala, Petals, Sparkle } from './art.jsx';
import Vine from './components/Vine.jsx';
import Seal from './components/Seal.jsx';
import VideoOverlay from './components/VideoOverlay.jsx';
import { useFitScale, useStory } from './hooks.js';

/** Change the wording, date or venue here. */
const DETAILS = {
  groom: 'Srihari',
  bride: 'Sasireka',
  weekday: 'Sunday',
  month: 'November',
  day: '22',
  year: '2026',
  venue: 'Easwar Mahal',
  place: 'Annantha Nagar · Tamil Nadu',
  tamilTitle: 'திருமண அழைப்பிதழ்',
  tamilLine: 'மகிழ்ச்சியுடன் கொண்டாட உங்களை அழைக்கிறோம்',
  englishLine: 'With joy, we invite you to celebrate',
};

/** Open the site with ?theme=green or ?theme=navy to switch the background. */
const THEMES = { oxblood: '#4A0F1A', green: '#12332B', navy: '#1B2540' };

const PETALS = [
  { l: 70, t: 15, w: -6, dx: 40, o: 0.85, f: 2.4, size: [12, 16], bg: '#C9A66B' },
  { l: 180, t: 20, w: 3, dx: -30, o: 0.6, f: 3, size: [9, 12], bg: '#F3EBDD' },
  { l: 270, t: 14, w: -2, dx: 50, o: 0.85, f: 2.2, size: [13, 17], bg: '#E9C4B4' },
  { l: 355, t: 18, w: 7, dx: -45, o: 0.6, f: 2.8, size: [9, 13], bg: '#C9A66B' },
  { l: 455, t: 22, w: -11, dx: 25, o: 0.8, f: 2.6, size: [11, 15], bg: '#F3EBDD' },
  { l: 120, t: 27, w: 9, dx: 35, o: 0.4, f: 3.4, size: [6, 8], bg: '#E9C4B4', blur: 1 },
  { l: 400, t: 26, w: -14, dx: -35, o: 0.4, f: 3.2, size: [6, 8], bg: '#C9A66B', blur: 1 },
  { l: 220, t: 24, w: 12, dx: 20, o: 0.45, f: 3.6, size: [7, 9], bg: '#F3EBDD', blur: 0.6 },
];
const SPARKLES = [
  [120, 175, 3.4, 4.6], [335, 120, 4.2, 5.2], [412, 330, 5, 4.2],
  [52, 385, 3.8, 5.6], [398, 520, 4.6, 4.8], [70, 548, 5.4, 5],
];

export default function App() {
  const scale = useFitScale();
  const { playing, start, videoRef, barRef } = useStory();

  const ground = useMemo(() => {
    const t = new URLSearchParams(window.location.search).get('theme');
    return THEMES[t] || THEMES.oxblood;
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty('--ground', ground);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', ground);
  }, [ground]);

  const d = DETAILS;
  return (
    <div className="stage">
      <div className="frame" style={{ width: 540 * scale, height: 960 * scale }}>
        <main className="card" style={{ transform: `scale(${scale})` }}>
          <Vine side="left" />
          <Vine side="right" />

          <section className="arch" aria-label="Wedding invitation">
            <svg aria-hidden="true" className="arch-lines" viewBox="0 0 460 632" width="460" height="632" fill="none">
              <path className="draw" pathLength="1" style={{ '--d': '0s', '--dur': '2.8s' }} d="M0.5 631.5 V230 A229.5 229.5 0 0 1 459.5 230 V631.5 Z" stroke="rgba(201,166,107,0.7)" strokeWidth="1" />
              <path className="draw" pathLength="1" style={{ '--d': '0.4s', '--dur': '2.8s' }} d="M10 622 V230 A220 220 0 0 1 450 230 V622 Z" stroke="rgba(201,166,107,0.28)" strokeWidth="1" />
            </svg>

            <div aria-hidden="true" className="arch-dot-wrap">
              <div className="dot" />
            </div>

            <div aria-hidden="true" className="arch-mandala fadein" style={{ '--d': '1.4s' }}>
              <Mandala cls="spin" />
            </div>

            <div aria-hidden="true" className="abs" style={{ position: 'absolute', left: 0, top: 0, width: 460, height: 632, pointerEvents: 'none' }}>
              {SPARKLES.map(([x, y, dl, t]) => (
                <Sparkle key={`${x}-${y}`} x={x} y={y} d={dl} t={t} />
              ))}
            </div>

            <div className="arch-top">
              <div className="rise" style={{ '--d': '0.7s' }}>
                <Lamp label="A traditional brass lamp" />
              </div>
              <div className="rise tamil brass" lang="ta" style={{ '--d': '1.1s', fontSize: 16, lineHeight: '24px' }}>{d.tamilTitle}</div>
              <div className="rise caps muted" style={{ '--d': '1.25s', letterSpacing: '0.28em' }}>The wedding of</div>
            </div>

            <div className="arch-names">
              <h1 className="name unmask" style={{ '--d': '1.5s', margin: 0, fontWeight: 400 }}>{d.groom}</h1>
              <div className="weds-row">
                <div aria-hidden="true" className="hair growx" style={{ '--d': '2.3s' }} />
                <div className="weds rise" style={{ '--d': '2.2s' }}>weds</div>
                <div aria-hidden="true" className="hair growx" style={{ '--d': '2.3s' }} />
              </div>
              <h1 className="name unmask" style={{ '--d': '2.5s', margin: 0, fontWeight: 400 }}>{d.bride}</h1>
            </div>

            <div className="arch-bottom">
              <div className="tamil-line tamil rise" lang="ta" style={{ '--d': '3.1s' }}>{d.tamilLine}</div>
              <div className="en-line rise" style={{ '--d': '3.3s' }}>{d.englishLine}</div>
              <Lotus base={3.2} step={0.2} />
            </div>
          </section>

          <section className="date">
            <div className="day-name rise" style={{ '--d': '3.5s' }}>{d.weekday}</div>
            <div className="date-row">
              <div className="date-side l rise" style={{ '--d': '3.7s' }}>{d.month}</div>
              <div aria-hidden="true" className="vline growy" style={{ '--d': '3.8s' }} />
              <div className="day-num unmaskup" style={{ '--d': '3.9s' }}>{d.day}</div>
              <div aria-hidden="true" className="vline growy" style={{ '--d': '3.8s' }} />
              <div className="date-side r rise" style={{ '--d': '3.7s' }}>{d.year}</div>
            </div>
          </section>

          <section className="venue">
            <div className="venue-name rise" style={{ '--d': '4.4s' }}>{d.venue}</div>
            <div className="caps muted rise" style={{ '--d': '4.6s' }}>{d.place}</div>
          </section>

          <Seal open={playing} onClick={start} />

          <div aria-hidden="true" className="fx-layer fadein" style={{ '--d': '3s' }}>
            <Petals items={PETALS} />
          </div>

          <VideoOverlay playing={playing} videoRef={videoRef} barRef={barRef} src={`${import.meta.env.BASE_URL}story.mp4`} />
        </main>
      </div>
    </div>
  );
}
