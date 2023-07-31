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
                pink: "#FE6D79",
            },
            nav: {
                up: "#00f2fe",
                anchor: "#00b4eb",
                down: "#4facfe",
                hover: "#0a70c9",
                text: "#003e75",
            },
        },
        extend: {
            dropShadow: {
                card: "0 0 3px rgba(255, 255, 255, 0.2)",
                "card-hover": "0 0 5px rgba(255, 255, 255, 0.3)",
                nav: "0 0 5px rgba(0, 242, 254, 0.8)",
                "nav-hover": "0 0 8px rgba(0, 242, 254, 0.9)",
                anchor: "0 0 2px white",
            },
        },
    },
    plugins: [],
};
