/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        solar: {
          red: '#DC2626',
          'red-dark': '#B91C1C',
          'red-deep': '#991B1B',
          'red-light': '#EF4444',
          'red-soft': '#FEF2F2',
          'red-border': '#FECACA',
          dark: '#0F172A',
          'dark-surface': '#1E293B',
          cream: '#FFF5F5',
          'cream-card': '#FFFFFF',
          'cream-muted': '#F8FAFC',
          'cream-border': '#E2E8F0',
          'text-dark': '#0F172A',
          'text-muted': '#64748B',
          'text-light': '#F8FAFC',
          amber: '#DC2626',
          'amber-light': '#EF4444',
          'amber-dark': '#B91C1C',
          navy: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        editorial: ['"Outfit"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
      },
      boxShadow: {
        'glow-red': '0 0 35px -5px rgba(220, 38, 38, 0.35)',
        'card-soft': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card-elevated': '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
