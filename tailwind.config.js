/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Esto asegura que Tailwind escanee los archivos JS, TS, JSX y TSX
    './pages/**/*.{js,ts,jsx,tsx}', // Si tienes un directorio "pages"
    './components/**/*.{js,ts,jsx,tsx}', // Si tienes un directorio "components"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
