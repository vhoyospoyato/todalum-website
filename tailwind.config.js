/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        'forge-dark': '#0d0f12',
        'forge-charcoal': '#1a1d23',
        'forge-slate': '#2d3139',
        'forge-steel': '#4a5568',
        'forge-silver': '#a0aec0',
        'forge-light': '#e2e8f0',
        molten: '#e85d04',
        'molten-dark': '#c44b00',
        aluminum: '#c0c5ce',
        blueprint: '#1e3a5f',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Source Serif 4', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
