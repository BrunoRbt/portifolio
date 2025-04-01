// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Habilita o modo escuro baseado em classes
  theme: {
    extend: {
      colors: {
        'primary': '#f05252',
        'secondary': '#1a1a1a',
        'background': {
          DEFAULT: '#f5f5f5',
          dark: '#121212',
        },
        'card': {
          DEFAULT: '#ffffff',
          dark: '#1e1e1e',
        },
        'text': {
          DEFAULT: '#1a1a1a',
          dark: '#f5f5f5',
        },
        'border': {
          DEFAULT: '#e5e5e5',
          dark: '#333333',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}