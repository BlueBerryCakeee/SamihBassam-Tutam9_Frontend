/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': {
          50: '#e6f0ff',
          100: '#bfdbfe',
          200: '#93c5fd',
          300: '#a6c1ee',
          400: '#95b5e8',
          500: '#7da2d9',
        }
      },
    },
  },
  plugins: [],
}