import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
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
