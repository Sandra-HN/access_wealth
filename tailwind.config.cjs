/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    content: [
      "./packages/material-tailwind-react/src/components/**/*.{js,ts,jsx,tsx}",
      "./packages/material-tailwind-react/src/theme/components/**/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./redux/**/*.{js,ts,jsx,tsx}",
      "./public/material-tailwind-html-v2.js",
      "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    ],
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herombg.png')",
      },
    },
  },
  plugins: [],
});
