/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom scrollbar styling
      scrollbar: {
        thin: 'thin',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
} 