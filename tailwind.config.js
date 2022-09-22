/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#1A202C"
      },
    },
    fontFamily: {
      sans: ["IBM Plex Sans", "sans-serif"],
      title: ["IBM Plex Serif", "serif"],
    },
  },
  plugins: [],
  darkMode: 'class',
};
