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
        'fluid': 'clamp(0.75rem, 0.5rem + 0.8vw, 1.5rem)',
        'fluid-btn-x': 'clamp(0.75rem, 0.6rem + 0.5vw, 1.75rem)',
        'fluid-btn-y': 'clamp(0.375rem, 0.3rem + 0.2vw, 0.75rem)',
      },
      fontSize : {
          '.8rem' : '.8rem',
          '.7rem' : '.7rem',
          'fluid-xs': ['clamp(0.625rem, 0.55rem + 0.2vw, 0.75rem)', { lineHeight: '1.5' }],
          'fluid-sm': ['clamp(0.75rem, 0.65rem + 0.3vw, 0.875rem)', { lineHeight: '1.6' }],
          'fluid-base': ['clamp(0.75rem, 0.625rem + 0.35vw, 1rem)', { lineHeight: '1.65' }],
          'fluid-lg': ['clamp(1rem, 0.85rem + 0.45vw, 1.25rem)', { lineHeight: '1.5' }],
          'fluid-xl': ['clamp(1.125rem, 0.95rem + 0.55vw, 1.5rem)', { lineHeight: '1.4' }],
          'fluid-2xl': ['clamp(1.25rem, 1rem + 0.8vw, 2rem)', { lineHeight: '1.3' }],
          'fluid-3xl': ['clamp(1.5rem, 1.1rem + 1.2vw, 3rem)', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [],
}
