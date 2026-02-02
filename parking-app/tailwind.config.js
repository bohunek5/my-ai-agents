/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#0056B3", // Updated to exact requested hex
                "tech-navy": "#102A43", // Updated to exact requested hex
                "neutral-gray": "#F0F4F8", // Updated to exact requested hex
                "action-green": "#22C55E", // Updated to exact requested hex
                "success-green": "#22C55E",
                "background-light": "#F0F4F8",
                "background-dark": "#0f1923",
            },
            fontFamily: {
                "sans": ["Inter", "sans-serif"],
                "display": ["Montserrat", "sans-serif"],
                "body": ["Inter", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            keyframes: {
                "spin-pause": {
                    "0%": { transform: "rotate(0deg)" },
                    "15%": { transform: "rotate(360deg)" },
                    "100%": { transform: "rotate(360deg)" },
                }
            },
            animation: {
                "spin-pause": "spin-pause 5s ease-in-out infinite",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
