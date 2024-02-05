/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extends: {
      colors : {
        primary : {
          100: "#ffffff2e"
        }
      },
      fontFamily : {
        body: ['Poppins']
      }
    }
  },
  plugins: [],
})