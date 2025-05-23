/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      width: "80%",
      padding: {
        DEFAULT: "1rem", // for mobile/small screens
        sm: "2rem",
        md: "3rem",
        lg: "5rem",
        xl: "10rem", // only large screens get 10rem
      },
    },
  },
  plugins: [],
};
