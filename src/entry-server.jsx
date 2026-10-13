import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/** Used at build time only (plugins/prerender.js) to put the invitation's HTML into index.html. */
export const render = () => renderToString(<App />);
