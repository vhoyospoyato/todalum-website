const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://cdn.tailwindcss.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      mediaSrc: ["'self'"],
    },
  },
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: '<p class="text-red-400 text-sm mt-2">Demasiados intentos. Por favor, inténtelo más tarde.</p>',
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/contact', contactLimiter, async (req, res) => {
  const { name, email, phone, website } = req.body;

  if (website) {
    res.status(400).send(
      '<p class="text-red-400 text-sm mt-2">Error de validación.</p>'
    );
    return;
  }

  if (!name || !email || !phone) {
    res.status(400).send(
      '<p class="text-red-400 text-sm mt-2">Por favor, complete todos los campos.</p>'
    );
    return;
  }

  const submission = { name, email, phone, date: new Date().toISOString() };
  const file = path.join(__dirname, 'submissions.json');

  try {
    let existing = [];
    try {
      const data = await fs.readFile(file, 'utf8');
      existing = JSON.parse(data);
      if (!Array.isArray(existing)) existing = [];
    } catch (readErr) {
      if (readErr.code !== 'ENOENT') {
        console.error('Error reading submissions file:', readErr.message);
      }
    }
    existing.push(submission);
    await fs.writeFile(file, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error('Error saving submission:', err.message);
  }

  console.log('New contact submission:', submission);

  res.send(
    '<p class="text-green-400 text-sm mt-2">¡Gracias! Nos pondremos en contacto con usted pronto.</p>'
  );
});

app.use((_req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="utf-8"><title>No encontrado</title></head>
    <body style="font-family:system-ui,sans-serif;text-align:center;padding:4rem;color:#333;">
      <h1>404 — Página no encontrada</h1>
      <p><a href="/">Volver al inicio</a></p>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
