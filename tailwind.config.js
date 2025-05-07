/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                orangeLight: '#fb923c',
                orangeDark: '#f97316',
                orangeAccent: '#ea580c',
            },
        },
    },
    plugins: [],
};
