/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
      }
    }
  },
  plugins: [],
  darkMode: ['selector', '[data-theme="dark"]'],
};