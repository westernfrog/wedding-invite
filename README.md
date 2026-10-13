# Srihari weds Sasireka: wedding invitation (React)

An animated, mobile-first wedding invitation built with Vite + React.
It has a lotus "Video invite" button that opens a full-card video page (no controls) and returns to the invitation when the video ends.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build in dist/
npm run preview    # preview the production build
```

Node 18 or newer is required.

## Customise

| What | Where |
| --- | --- |
| Names, date, venue, Tamil and English lines | `DETAILS` at the top of `src/App.jsx` |
| Background colour | open the site with `?theme=green` or `?theme=navy` (default is oxblood). Edit `THEMES` in `src/App.jsx` |
| The video | replace `public/story.mp4` (keep the name, or change `src` in `src/App.jsx`) |
| Colours, fonts, animation timing | `src/styles.css` |
| Illustrations (lamp, lotus, vines, toran, mandala) | `src/art.jsx` and `src/components/` |

## Notes

- The design is a fixed 540 x 960 card that scales to fit any screen (`useFitScale` in `src/hooks.js`).
- Video playback is in `useStory` (`src/hooks.js`). It plays with sound after the guest taps; if the browser blocks sound it falls back to muted. The video is H.264 / AAC, so it plays on iPhone and Android.
- Motion is switched off for visitors who have "reduce motion" enabled.
- Fonts (Instrument Serif, Hanken Grotesk, Noto Serif Tamil) load from Google Fonts. Download and self-host them if the site must work offline.

## Deploy

`npm run build`, then upload the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). `base: './'` is already set in `vite.config.js`.
