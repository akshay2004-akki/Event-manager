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
        fontFamily:{
          poppins : ['Poppins', 'sans-serif']
        },
      },
    },
    plugins: [],
  };