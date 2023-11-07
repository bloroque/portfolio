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
      padding: {
        '.8rem': '.8rem',
      },
      fontSize : {
          '.8rem' : '.8rem',
          '.7rem' : '.7rem',
      },
    },
  },
  plugins: [],
}
