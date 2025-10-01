/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enable dark mode via a class
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@tailwindcss/line-clamp')],
};
