/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,jsx}",],
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        orange: colors.orange,
        sky: colors.sky,
        amber: colors.amber,
        rose: colors.rose,
        indigo: colors.indigo,
        cyan: colors.cyan,
        teal: colors.teal,
        emerald: colors.emerald,
        lime: colors.lime,
        voilet: colors.voilet,
        slate: colors.slate,
      },
      fontFamily: {
        'gotham': 'Gotham Ultra',
        coconat: ["coconat", "sans-serif"],
        nezto: ["nezto", "sans-serif"],
        messapia: ["messapia", "sans-serif"],
        routerand: ["routerand"],
        biograph: ["biograph"]
      },
    },
    
  },

  plugins: [],
}
