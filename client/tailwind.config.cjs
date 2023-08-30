/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        tertiary: "hsl(var(--color-tertiary) / <alpha-value>)",
        quaternary: "hsl(var(--color-quaternary) / <alpha-value>)",
        modal: "rgba(var(--color-modal-bg) , 0.45)",
        blue: "#00738C",
        darkBlue: "#81B0B2",
        pink: "#D6EAD4",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-center-between": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ".flex-column": {
          display: "flex",
          flexDirection: "column",
        },

        ".absolute-full-screen": {
          position: "fixed",
          inset: "0px",
          zIndex: "100",
          width: "100vw",
          height: "100vh",
        },
      });
    }),
  ],
};
