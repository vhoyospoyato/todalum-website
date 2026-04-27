# ARMOCARSA / TODALUM Website

Static site for AluminioFundido — aluminum foundry in Venezuela. Built with HTML, Tailwind CSS, HTMX, and Express.

## Quick Start

```bash
npm install
npm run build      # Generate production CSS (required before starting)
npm start          # Start server on port 3000
```

## Development

Watch CSS changes during development:

```bash
npm run watch
```

## Tech Stack

- **Frontend**: HTML5, Tailwind CSS (built with CLI), HTMX
- **Backend**: Express.js
- **Security**: Helmet, express-rate-limit, compression
- **Fonts**: Oswald, Source Serif 4, Space Mono (Google Fonts)

## Project Structure

- `index.html` — Single-page site
- `server.js` — Express server (static files + contact form)
- `tailwind.config.js` — Tailwind theme configuration
- `src/input.css` — Tailwind source file
- `public/styles.css` — Built CSS (generated, do not edit directly)
- `public/images/` — Static assets
- `submissions.json` — Auto-created on first form submission

## Environment

Requires Node.js >= 18.
