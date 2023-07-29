/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  plugins: [],
};
