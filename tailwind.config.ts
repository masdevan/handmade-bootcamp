import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,tsx}",
    "./app/**/*.{js,jsx,tsx}",
    "./components/**/*.{js,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        script: ["var(--font-meow-script)", "cursive"],
      },
    },
  },
};

export default config;
