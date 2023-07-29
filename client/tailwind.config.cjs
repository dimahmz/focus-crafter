/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "var( --primary-color)",
        darkBlue: "var(--secondary-color)",
        pink: "var(--tertiary-color)",
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
        ".absolute-fullScreen": {
          position: "absolute",
          width: "100%",
          height: "100%",
          inset: "0px",
          overflow: "hidden",
        },
      });
    }),
  ],
};
