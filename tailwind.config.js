/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
        serif: ["Young Serif", "serif"],
      },
      colors: {
        purpleBrand: "#632677",
        yellowBrand: "#ECCA44",
        lightYellowBrand: "#FFE787",
        lightPurpleBrand: "#FBEEFF",
        greyBrand: "#8D8E80",
        blackBrand: "#121400",
        white: "#FFFFFF",
        errorDark: "#772640",
      },
      screens: {
        xs: "330px",
        sm: "480px",
        md: "768px",
        lg: "1240px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
