/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#2B58B0',
        pColorHover: '#1E4899',
        gray: '#989898'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

