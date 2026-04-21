/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: "#D97706",
        accent: "#4F6F52",
        bg: "var(--bg)",
        card: "var(--card)",
        text: "var(--text)",
        soft: "var(--soft)",
      },
      fontFamily: {
        heading: ["Fraunces", "serif"], // Your heading font
        body: ["Outfit", "sans-serif"], // Your body font
      },
    },
  },
  plugins: [],
};
