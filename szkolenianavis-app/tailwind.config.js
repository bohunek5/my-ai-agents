/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'navis-navy': '#0B1C3E',
                'navis-gold': '#C5A059',
                'navis-light': '#F8F9FA',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'hero-pattern': "url('/src/assets/image3.jpg')", // Dynamic assignment later, but setup key
            }
        },
    },
    plugins: [],
}
