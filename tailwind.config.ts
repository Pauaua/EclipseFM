import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "space-black": "#08041A",
        "space-deep": "#0D0825",
        "space-purple": "#150A35",
        "space-card": "#1C1040",
        yellow: {
          DEFAULT: "#E8D44D",
          bright: "#F5E878",
        },
        purple: {
          DEFAULT: "#7C3AED",
          bright: "#A855F7",
        },
        gray: {
          DEFAULT: "#7B6FA0",
          light: "#A89EC0",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
