/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    safelist: ["opacity-100", "translate-y-0"],
    theme: {
        extend: {
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-33.33%)' },
                },
            },
            animation: {
                marquee: 'marquee 20s linear infinite',
            },
            rotate: {
                14: "14.03624deg",
                45: "45deg",
                135: "135deg",
            },
            skew: {
                4: "4.398705355deg",
                "-4": "-4.398705355deg",
            },
            boxShadow: {
                insetCustom: "inset 0px 0px 0px 7vw #FCF8F4",
            },
        },
    },
    plugins: [],
};