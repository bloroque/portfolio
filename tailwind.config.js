/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'theme-base' : 'rgba(36,69,166,1)',
        'theme-second' : 'rgba(9,44,144,.58)',
      },
      backgroundColor: {
        'body': '#2445A6',
        'theme-base' : 'rgba(36,69,166,1)',
        'theme-second' : 'rgba(9,44,144,.58)',
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
