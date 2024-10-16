/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {},
    data: {
      isMobile: 'device~="mobile"',
      isDesktop: 'device~="desktop"',
    }
  },
  plugins: [
    function({ addVariant }) {
      // addVariant('mobile', ({ modifySelectors }) => {
      //   modifySelectors(({ className }) => {
      //     return `html[data-is-mobile="true"] .${className}`;
      //   });
      // });

      // addVariant('desktop', ({ modifySelectors }) => {
      //   modifySelectors(({ className }) => {
      //     return `html[data-is-mobile="false"] .${className}`;
      //   });
      // });
      addVariant('mobile', 'html[data-is-mobile="true"] &')
      addVariant('desktop', 'html[data-is-mobile="false"] &')
    }
  ],
  darkMode: ['selector', '[data-theme="dark"]']
}

