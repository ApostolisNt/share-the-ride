import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: "1280px",
      lg: "1024px",
      md: "768px",
      sm: "640px",
    },
    fontFamily: {
      serif: ["var(--font-mavenPro)", "serif"],
    },
    boxShadow: {
      card: "0px 1px 8px 0px hsla(0, 0%, 0%, 0.2)",
      cardHover: "0px 4px 16px 0px hsla(0, 0%, 0%, 0.2)",
    },
    transitionProperty: {
      "shadow-transform": "box-shadow, transform",
    },
  },
  plugins: [],
};
export default config;
