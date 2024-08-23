/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FEFBEB",
        darkGreen: "#1D462F",
        lightGreen: "#519F69",
        bgGreen: "#F7FCEF",
        normalBlue: "#5279E0",
      },
    },
  },
  plugins: [],
};
