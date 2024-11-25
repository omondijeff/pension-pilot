/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4569AE", // Primary blue from button gradient
        secondary: "#FF7F50", // Example secondary color (can be adjusted)
        light: "#FFFFFF", // White background for the header
        dark: "#343A40", // Dark gray for text and borders
        hoverBlue: "#3F9FD7", // Lighter blue for hover effect
        primaryGradient:
          "linear-gradient(263.24deg, #4569AE 0.74%, #3F9FD7 100%)",
      },
      borderRadius: {
        custom: "6px", // Custom corner radius for buttons and other elements
        sm: "6px",
      },
      fontFamily: {
        gilroy: ['"Gilroy-Regular"', "sans-serif"],
        gilroyBold: ['"Gilroy-Bold"', "sans-serif"],
      },
      fontSize: {
        heading: "48px",
        base: "16px",
        button: "18px",
      },
    },
  },
  plugins: [],
};
