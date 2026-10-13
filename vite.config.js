import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { DETAILS } from './src/details.js';
import seo from './plugins/seo.js';
import prerender from './plugins/prerender.js';

// The public address of the invitation. Link previews (WhatsApp, iMessage, ...) need it to find the preview image.
const SITE_URL = process.env.SITE_URL || 'https://srihari-weds-sasireka.vercel.app';

// base './' lets the built site work from any folder or static host.
export default defineConfig({
  base: './',
  plugins: [react(), seo({ details: DETAILS, siteUrl: SITE_URL }), prerender()],
});
