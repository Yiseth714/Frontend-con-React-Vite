/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B3C5D',
        secondary: '#4FA3D1',
        accent: '#F2C94C',
      },
    },
  },
  plugins: [],
}