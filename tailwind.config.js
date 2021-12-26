const colors = require('tailwindcss/colors')

module.exports = {
    content: ["./public/**/*.html", "./src/**/*.vue"],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'sans': ['"Work Sans"', 'sans']
            },
            colors: {
                current: 'currentColor',
                gray: colors.slate,
                teal: colors.teal,
                red: colors.red,
                green: colors.green,
                orange: colors.orange
            },
            boxShadow: {
                'wrapper-shadow' : '0 0 30px 20px rgba(10, 10, 10, 0.15)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
