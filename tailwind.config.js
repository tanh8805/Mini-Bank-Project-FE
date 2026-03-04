/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                ink: '#0f172a',
                slate: '#475569',
                mist: '#e2e8f0',
                mint: '#22c55e',
                ocean: '#0ea5e9',
            },
            boxShadow: {
                glow: '0 20px 50px -30px rgba(14, 165, 233, 0.55)',
            },
        },
    },
    plugins: [],
}
