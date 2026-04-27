# AGENTS.md

## Project

ARMOCARSA/TODALUM website — aluminum foundry, Venezuela. Static HTML + Tailwind + HTMX, served by Express.

## Commands

- `npm install` — install dependencies
- `npm run build` — generate production CSS with Tailwind CLI
- `npm run watch` — watch and rebuild CSS during development
- `npm start` or `node server.js` — start dev server on port 3000

## Structure

- `index.html` — single-page site (hero, about, clients, contact form, footer)
- `server.js` — Express server: serves static files + handles `POST /contact`
- `tailwind.config.js` — Tailwind theme extension (colors, fonts)
- `src/input.css` — Tailwind source file (`@tailwind` directives)
- `public/styles.css` — **generated build artifact** (do not edit directly)
- `package.json` — dependencies: express, helmet, compression, express-rate-limit; devDependency: tailwindcss
- `public/images/` — static assets (logo, background, video)
- `submissions.json` — auto-created on first form submission, stores leads

## Key notes

- Tailwind is built via CLI (`npm run build`) and output to `public/styles.css`. The Play CDN is no longer used.
- HTMX loaded via CDN — form uses `hx-post="/contact"` with `hx-target="#form-response"`. Standard `action`/`method` fallbacks are present for graceful degradation.
- Form submissions saved to `submissions.json` (JSON array, append-only).
- `.gitignore` ignores `node_modules/`, `submissions.json`, and `public/styles.css`.
- Security middleware: Helmet (CSP, HSTS), express-rate-limit (5 requests per 15 min on `/contact`), compression (gzip/brotli).
- No `styles/style.css` or `scripts/main.js` from old version are used.
