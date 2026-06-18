/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-hover': '#4338CA',
        secondary: '#F59E0B',
        'secondary-hover': '#D97706',
        'bg-color': '#0F172A',
        surface: '#1E293B',
        'surface-light': '#334155',
        'text-main': '#F8FAFC',
        'text-muted': '#94A3B8',
        accent: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
