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
| Names, date, venue, Tamil and English lines | `DETAILS` in `src/details.js`. The page, the video page and the link-preview tags all read from it |
| Background colour | open the site with `?theme=green` or `?theme=navy` (default is oxblood). Edit `themes` in the script in `index.html`, and `--ground` in `src/styles.css` for the default |
| The video | replace `public/story.mp4` (keep the name, or change `src` in `src/App.jsx`) |
| Colours, fonts, animation timing | `src/styles.css`. `--pace` at the top sets how quickly the opening sequence plays (1 is the slowest) |
| Site address | `SITE_URL` in `vite.config.js`, or the `SITE_URL` environment variable. Link previews need it |
| Link-preview picture | `public/og-image.jpg` (1200 x 630). The names, date and venue are drawn into it, so replace it if they change |
| Browser-tab and home-screen icon | `public/favicon.svg`, plus the `.ico` / `.png` copies next to it and `public/site.webmanifest` |
| Illustrations (lamp, lotus, vines, toran, mandala) | `src/art.jsx` and `src/components/` |

## Notes

- The design is a fixed 540 x 960 card that scales to fit any screen. A small script in `index.html` sets `--scale` before the first paint.
- `npm run build` writes the finished invitation into `dist/index.html` (`plugins/prerender.js`), so it appears before the JavaScript has loaded. The title, description, WhatsApp / social preview tags and the event data for search engines are added by `plugins/seo.js`.
- Video playback is in `useStory` (`src/hooks.js`). The video starts downloading only after the invitation has loaded. It plays with sound after the guest taps; if the browser blocks sound it falls back to muted. The video is H.264 / AAC, so it plays on iPhone and Android.
- Motion is switched off for visitors who have "reduce motion" enabled.
- Fonts (Instrument Serif, Hanken Grotesk, Noto Serif Tamil) are served from `public/fonts`, so the site makes no third-party requests.

## Deploy

`npm run build`, then upload the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). `base: './'` is already set in `vite.config.js`.
