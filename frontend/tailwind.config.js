

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FEFBEB",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
};
