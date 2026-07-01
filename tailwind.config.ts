import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        paper: "#F7F8FA",
        amber: "#D9A441",
        rust: "#B3452C",
        steel: "#5B6472",
      },
      fontFamily: {
        display: ["var(--font-tajawal)", "sans-serif"],
        sans: ["var(--font-big-shoulders)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
