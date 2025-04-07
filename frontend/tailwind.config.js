/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          beige: "#faf7f0",
          maroon: "#a74b41",
          gold: "#d4af37",
        },
        animation: {
          fadeIn: 'fadeIn 0.3s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0, transform: 'scale(0.95)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
        },
        fontFamily:{
          poppins : ['Poppins', 'sans-serif']
        },
      },
    },
    plugins: [],
  };