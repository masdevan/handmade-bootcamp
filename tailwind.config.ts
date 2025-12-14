import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,tsx}",
    "./app/**/*.{js,jsx,tsx}",
    "./components/**/*.{js,jsx,tsx}",
  ],
  // Tailwind 4: Most configuration is now in CSS using @theme directive in style.css
  // Theme configuration has been moved to styles/style.css
};

export default config;
