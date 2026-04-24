# AGENTS.md

## Project

ARMOCARSA/TODALUM website — aluminum foundry, Venezuela. Static HTML + Tailwind CDN + HTMX, served by Express.

## Commands

- `npm install` — install dependencies (express only)
- `npm start` or `node server.js` — start dev server on port 3000

## Structure

- `index.html` — single-page site (hero, about, clients, contact form, footer)
- `server.js` — Express server: serves static files + handles `POST /contact`
- `package.json` — minimal, express dependency only
- `public/images/` — static assets (logo, background, video)
- `submissions.json` — auto-created on first form submission, stores leads

## Key notes

- Tailwind loaded via CDN play script — no build step needed
- HTMX loaded via CDN — form uses `hx-post="/contact"` with `hx-target="#form-response"`
- Form submissions saved to `submissions.json` (JSON array, append-only)
- No `.gitignore` — consider adding `node_modules/` and `submissions.json`
- Referenced paths `styles/style.css` and `scripts/main.js` from old version no longer used
