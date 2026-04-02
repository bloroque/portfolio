/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'theme-base' : 'var(--color-theme-base)',
        'theme-second' : 'var(--color-theme-second)',
        'theme-accent' : 'var(--color-accent)',
      },
      backgroundColor: {
        'body': 'var(--bg-body)',
        'theme-base' : 'var(--color-theme-base)',
        'theme-second' : 'var(--color-theme-second)',
        'theme-2' : 'var(--color-theme-second)',
      },
      textColor: {
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
        'heading': 'var(--text-heading)',
      },
      borderColor: {
        'theme': 'var(--border-theme)',
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
