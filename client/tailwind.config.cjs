/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend:{
        screens:{
          'xs':'400px'
        },
      colors: {
        'app': {
          primary: "hsl(var(--color-app-primary) / <alpha-value>)",
          secondary: "hsl(var(--color-app-secondary) / <alpha-value>)",
          tertiary: "hsl(var(--color-app-tertiary) / <alpha-value>)",
          quaternary: "hsl(var(--color-app-quaternary) / <alpha-value>)",
          modal: "rgba(var(--color-modal-bg) , 0.45)",
          title: "#000",
          parag:"#3B4857"
        },
      },
      fontFamily: {
        primary: "Inter, sans-serif",
        secondary: "Poppins, sans-serif",
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
