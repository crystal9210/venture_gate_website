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
            fontFamily: {
                noto: ['"Noto Sans JP"', 'sans-serif'],
            },
            dropShadow: {
                '2xl': '4px 4px 6px rgba(0,0,0,0.5)',
            },
        },
    },
    // theme: {
    //     screens: {
    //         sm: '640px',
    //         md: '1800px',  // ← ここがmdの基準（今回の切り替えポイント）
    //         lg: '1024px',
    //         xl: '1280px',
    //         '2xl': '1536px',
    //     },
    // },
    plugins: [],
};
