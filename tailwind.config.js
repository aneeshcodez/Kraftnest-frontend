/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                terracotta: '#E2725B',
                beige: '#F5F5DC',
                sandy: '#F4A460',
                sienna: '#A0522D'
            },
            borderRadius: {
                xl: '1rem'
            }
        }
    },
    plugins: [],
}
