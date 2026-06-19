/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: '#810B38',
        cream: '#F1E2D1',
        sand: '#DCC3AA',
        maroon: '#541A1A',

        primary: '#810B38',
        'primary-hover': '#541A1A',
        secondary: '#DCC3AA',
        'bg-color': '#F1E2D1',
        surface: '#DCC3AA',
        'surface-light': '#F1E2D1',
        'text-main': '#541A1A',
        'text-muted': '#810B38',
        accent: '#810B38',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
