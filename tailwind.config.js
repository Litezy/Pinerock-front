/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#021526",
        "sec":'#2b294d',
        "col":"#f97316",
        "col2":"#fdf8ef",
      }
    },
  },
  plugins: [],
}

