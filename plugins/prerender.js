import path from 'node:path';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const EMPTY_ROOT = '<div id="root"></div>';

/**
 * After the normal build, renders <App /> to HTML and puts it inside #root in dist/index.html.
 * The invitation then paints (and its CSS animations start) as soon as the HTML and CSS arrive,
 * without waiting for the JavaScript; main.jsx hydrates that markup instead of rebuilding it.
 */
export default function prerender() {
  let config;
  return {
    name: 'prerender',
    apply: 'build',
    configResolved(resolved) {
      config = resolved;
    },
    async closeBundle() {
      const tmp = path.resolve(config.root, 'node_modules/.prerender');
      await build({
        configFile: false,
        root: config.root,
        base: config.base,
        logLevel: 'error',
        plugins: [react()],
        build: {
          ssr: 'src/entry-server.jsx',
          outDir: tmp,
          emptyOutDir: true,
          rollupOptions: {
            output: { entryFileNames: 'entry-server.mjs' },
            // The classic JSX transform leaves `import React` unused in the server bundle; that is expected.
            onwarn: (warning, warn) => warning.code !== 'UNUSED_EXTERNAL_IMPORT' && warn(warning),
          },
        },
      });
      const { render } = await import(`${pathToFileURL(path.join(tmp, 'entry-server.mjs')).href}?t=${Date.now()}`);
      const file = path.resolve(config.root, config.build.outDir, 'index.html');
      const html = await readFile(file, 'utf8');
      if (!html.includes(EMPTY_ROOT)) throw new Error(`prerender: ${EMPTY_ROOT} not found in ${file}`);
      await writeFile(file, html.replace(EMPTY_ROOT, () => `<div id="root">${render()}</div>`));
      await rm(tmp, { recursive: true, force: true });
    },
  };
}
