/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'body': '#2445A6',
      },
      fontFamily: {
        //'sans':['Helvetica', 'Arial', 'sans-serif','Georgia',''],
      }
    },
  },
  plugins: [],
}
