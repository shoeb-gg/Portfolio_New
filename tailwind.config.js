/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
    important: true,
    content: ["./src/**/*.{html,ts}"],
    theme: {
        colors: {
            ...colors,
            container: {
                black: "#0F0F0F",
            },
            card: {
                background: "#1D1A1D",
                green: "#00C39A",
                yellow: "#FFBF3C",
            },
        },
        extend: {},
    },
    plugins: [],
};
