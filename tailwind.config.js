/** @type {import('tailwindcss').Config} */

/** Extended colors/fonts conforming to https://www.hsph.harvard.edu/communications-guide/ */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: '#A51C30',
      },
      fontFamily: {
        merriweather: ['Merriweather', 'sans-serif'],
        'proxima-nova': ['proxima-nova', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
