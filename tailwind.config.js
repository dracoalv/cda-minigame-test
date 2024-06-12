/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#FFC046',
      'error': '#D03A3E',
      'success': '#3AD05B',
      'background': '#11131D'
    },
    extend: {
      keyframes: {
        shrink: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        shrink: 'shrink var(--total-time) linear forwards',
      },
    },
  },
  plugins: [],
}

