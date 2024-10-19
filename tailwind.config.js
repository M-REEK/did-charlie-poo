/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#7bab9a',
        darkBlue:'#7b8cab',
        sand: '#d1b68e',
        darkSand: '#d1b68e',
        dark: '#40404b',
        green: '#789868',
        red:'#ca5959',
        pink: '#f1c0fc'
      }
    },
  },
  plugins: [],
}
