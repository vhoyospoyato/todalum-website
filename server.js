const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/contact', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).send(
      '<p class="text-red-400 text-sm mt-2">Please fill in all fields.</p>'
    );
    return;
  }

  const submission = { name, email, phone, date: new Date().toISOString() };
  const file = path.join(__dirname, 'submissions.json');

  try {
    const existing = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf8'))
      : [];
    existing.push(submission);
    fs.writeFileSync(file, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error('Error saving submission:', err.message);
  }

  console.log('New contact submission:', submission);

  res.send(
    '<p class="text-green-400 text-sm mt-2">Thank you! We will contact you soon.</p>'
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
