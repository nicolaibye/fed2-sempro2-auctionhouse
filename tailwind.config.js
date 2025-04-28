/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Work Sans", "sans-serif"],
      serif: ["Young Serif", "serif"],
    },
    colors: {
      purpleBrand: "#632677",
      yellowBrand: "#ECCA44",
      lightYellowBrand: "#FFE787",
      greyBrand: "#8D8E80",
      blackBrand: "#121400",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};

