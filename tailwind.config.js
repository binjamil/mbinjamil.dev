/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      title: ["Libre Baskerville", "serif"],
    },
  },
  plugins: [],
};
