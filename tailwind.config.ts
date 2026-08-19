import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        bgDeep: "var(--color-bg-deep)",
        text: "var(--color-text)",
        terracotta: "var(--color-accent-terracotta)",
        green: "var(--color-accent-green)",
        gold: "var(--color-accent-gold)",
        goldDark: "var(--color-accent-gold-dark)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
