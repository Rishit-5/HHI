import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: {
        '50': '#f6f6f6',
        '100': '#e7e7e7',
        '200': '#d1d1d1',
        '300': '#b0b0b0',
        '400': '#888888',
        '500': '#6d6d6d',
        '600': '#5d5d5d',
        '700': '#4f4f4f',
        '800': '#454545',
        '900': '#3d3d3d',
        '950': '#1e1e1e',
      },
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
    },
    extend: {
      colors: {
        crimson: {
          '50': '#fef2f2',
          '100': '#fde6e6',
          '200': '#fbd0d2',
          '300': '#f7aaac',
          '400': '#f17b80',
          '500': '#e74c57',
          '600': '#d32b40',
          '700': '#a51c30',
          '800': '#951c31',
          '900': '#801b30',
          '950': '#470a15',
        }
      },
      fontFamily: {
        metropolis: ['Metropolis', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
