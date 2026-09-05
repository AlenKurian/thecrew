import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0b",
        paper: "#fdfcf9",
      },
      fontFamily: {
        display: ["var(--font-anton)"],
        sans: ["var(--font-inter)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      screens: {
        xs: "390px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
