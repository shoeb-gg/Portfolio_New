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
                green: "#00A884",
                yellow: "#FFBF3C",
                pink: "#FE5D6A",
                "pink-hover": "#E40114",
            },
            nav: {
                up: "#00f2fe",
                anchor: "#1AC9FF",
                down: "#4facfe",
                hover: "#0859A1",
                text: "#002E5C",
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
            animation: {
                "bounce-angular": "bounce 1s infinite",
                "bounce-tailwind": "bounce 1s infinite 0.15s",
                "bounce-ionic": "bounce 1s infinite 0.3s",
                "bounce-nest": "bounce 1s infinite 0.45s",
                "bounce-node": "bounce 1s infinite 0.6s",
                "bounce-mongo": "bounce 1s infinite 0.75s",
                "bounce-git": "bounce 1s infinite 0.9s",
            },
            cursor: {
                fancy: 'url("assets/cursor.svg") 5 5, auto',
            },
        },
    },
    plugins: [],
};
