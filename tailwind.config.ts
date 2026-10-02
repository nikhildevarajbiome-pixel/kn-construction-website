import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#101D2E", 2: "#172B45" },
        gold: { DEFAULT: "#C6A66B", dark: "#8A6D2F" },
        ivory: "#F7F5F0",
        grey: "#737B86",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { rise: "rise .9s cubic-bezier(.2,.7,.2,1) both" },
    },
  },
  plugins: [],
};
export default config;
