/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4D3E', // Deep Green
          light: '#2C6E58',
          dark: '#113529',
          bright: '#4ADE80', // Bright Green for Dark Mode
        },
        secondary: {
          DEFAULT: '#4A5568', // Slate Gray
          light: '#718096',
          dark: '#2D3748',
        },
        accent: {
          DEFAULT: '#F6AD55', // Subtle orange/gold for highlights (optional)
        },
        background: '#F7FAFC', // Very light gray/white
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
