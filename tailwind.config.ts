import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        "inter-regular": ['var(--font-inter-regular)'],
        "inter-bold": ['var(--font-inter-bold)'],
        "nexa-extralight": ['var(--font-nexa-extralight)'],
        "nexa-heavy": ['var(--font-nexa-heavy)'],
        "chintzy-regular": ['var(--font-chintzy-regular)'],
        "chintzy-semibold": ['var(--font-chintzy-semibold)'],
        "terminal": ['var(--font-terminal)'],
        "khojki": ['var(--font-noto-serif-khojki)']
      },
      colors: {
        "dark-purple": "#0D0221",
        "federal-blue": "#0F084B",
        "martian-blue": "#26408B",
        "light-blue": "#A6CFD5",
        "mint-green": "#C2E7D9",
        /* TV Girl */ 
        "tv-dark-pink": "#74125F",
        "tv-light-pink": "#D618BC",
        "tv-dark-blue": "#0F1371",
        "tv-light-blue": "#1B24D2",
        "tv-black": "#040303",
        /* ping */
        "ping-black": "#1A1A1A",
        "ping-blacker": "#0D0D0D",
        "ping-white": "#E7E8E9",
        "ping-gray": "#CFD1D4",
        "ping-red": "#E24747",
        "ping-yellow": "#E8BD61",
        /* Memento Mori */
        "mori-cream": "#EBE7B8",
        "mori-beige": "#FFFDC8",
        /* ------- */
        "": "#",
        /* ------- */
        "": "#",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config