/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'logopink': '#fb5383',
        'altlogopink': '#741a63',
      },
    },
  },
  plugins: [],
}