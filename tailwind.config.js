/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./index.html", // Wurzeldatei
      "./src/**/*.{js,ts,jsx,tsx}", // Alle JS/TS/React-Dateien in src
   ],
   theme: {
      extend: {
         fontFamily: {
            serif: ["Playfair", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"]
         },
         colors: {
            primary: "#2441ff",
            secondary: "#05176e",
            accent: "#55FF00",
            background: "#f0f0f0"
            //font: text-gray-900
         },
         transitionDuration: {
            DEFAULT: '220ms'
         },
         screens: {
            '356px': '356px',
         },
      }
   },
   plugins: [],
};
