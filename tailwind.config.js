const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: theme => ({
                'racing': "url('./src/assets/img/background.jpg')",
            })
        },
        fontSize: {
            'xs': '.55rem',
            'sm': '.65rem',
            'ms': '.75rem',
            'xl': '1.50rem'
        },
        fontFamily: {
            sans: [
                'Formula1',
                ...defaultTheme.fontFamily.sans,
            ]
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
