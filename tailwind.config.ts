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
          dark: "#B8A020",
          soft: "rgba(232,212,77,0.1)",
          border: "rgba(232,212,77,0.22)",
          glow: "rgba(232,212,77,0.35)",
        },
        purple: {
          DEFAULT: "#7C3AED",
          bright: "#A855F7",
          indigo: "#4F46E5",
          border: "rgba(124,58,237,0.2)",
        },
        gray: {
          DEFAULT: "#7B6FA0",
          light: "#A89EC0",
          soft: "#A89EC0",
          mid: "#7B6FA0",
          dark: "#3D3557",
        },
        eclipse: {
          purple: "#7C3AED",
          bright: "#A855F7",
          indigo: "#4F46E5",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)",
        yellow: "0 0 20px rgba(232,212,77,0.25), 0 4px 16px rgba(0,0,0,0.4)",
        purple: "0 0 30px rgba(124,58,237,0.20)",
        glow: "0 0 60px rgba(124,58,237,0.15)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "on-air-ping": "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "wave": "wave 1.2s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
