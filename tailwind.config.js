/** @type {import('tailwindcss').Config} */
// Se fija la 3.4.17 a propósito: es exactamente la versión que servía
// cdn.tailwindcss.com, así que el CSS compilado es equivalente al que el
// navegador generaba en runtime. NO migrar a la v4 sin revisar el diseño:
// la v4 cambia el color por defecto de `border` (gray-200 -> currentColor)
// y este sitio usa `border` pelado en varios lugares.
module.exports = {
  content: ["./index.html", "./404.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
