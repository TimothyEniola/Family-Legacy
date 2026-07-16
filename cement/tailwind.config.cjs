/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          card: '#1E293B',
          border: '#334155',
          muted: '#94A3B8',
          text: '#F8FAFC',
        },
        brand: {
          orange: '#F97316',
          lightOrange: '#FB923C',
          softOrange: '#FED7AA',
          darkOrange: '#C2410C',
          white: '#FFFFFF',
          lightGray: '#F8FAFC',
          darkBg: '#0F172A',
          darkText: '#1E293B',
        }
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Archivo', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, #0F172A 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 10px -2px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
