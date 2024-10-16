/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addVariant }) {
      addVariant('mobile', 'html[data-is-mobile="true"] &')
      addVariant('desktop', 'html[data-is-mobile="false"] &')
    }
  ],
  darkMode: ['selector', '[data-theme="dark"]']
}