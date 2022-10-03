/** @type {import('tailwindcss').Config} */
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
  plugins: [],
};
