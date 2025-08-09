/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    extend: {
        keyframes: {
            fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
            },
        },
        animation: {
            fadeIn: 'fadeIn 0.5s ease-in-out',
        },
    },
};
export const plugins = [];
