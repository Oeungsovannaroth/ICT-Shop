/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
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