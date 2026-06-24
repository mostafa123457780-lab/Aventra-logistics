import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1B2B",
        ink2: "#10202F",
        paper: "#EEEDE7",
        amber: "#FF7A1A",
        steel: "#5B6B7A",
        rust: "#C23B22",
      },
      fontFamily: {
        sans: ["var(--font-tajawal)", "sans-serif"],
        display: ["var(--font-bigshoulders)", "var(--font-tajawal)", "sans-serif"],
        mono: ["var(--font-plexmono)", "monospace"],
      },
      keyframes: {
        dash: { to: { strokeDashoffset: "-260" } },
      },
      animation: {
        dash: "dash 18s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
