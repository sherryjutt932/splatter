/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        spin: "spin 20s ease infinite",
        spinSlow: "spin 120s ease infinite",
        floatSlow: "float 8s ease-in-out infinite",
        floatFast: "float 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        scale: "scale 10s ease-in-out infinite",
      },
      colors: {
        sec: {
          400: "#EC6E94",
        },
        splatter: {
          100: "rgb(245, 235, 255)",
          125: "rgb(225, 214, 255)",
          150: "rgb(217, 197, 255)",
          200: "rgb(199, 174, 255)",
          250: "rgb(184, 153, 255)",
          300: "rgb(170, 131, 255)",
          350: "rgb(158, 112, 253)",
          400: "rgb(144, 96, 253)",
          450: "rgb(143, 96, 253)",
          500: "rgb(121, 64, 244)",
          550: "rgb(104, 47, 236)",
          600: "rgb(91, 31, 225)",
          650: "rgb(77, 20, 208)",
          700: "rgb(67, 11, 190)",
          750: "rgb(56, 7, 166)",
          800: "rgb(44, 4, 136)",
          850: "rgb(31, 2, 100)",
          875: "rgb(26, 2, 82)",
          900: "rgb(20, 1, 61)",
          925: "rgb(15, 2, 46)",
          950: "rgb(13, 1, 38)",
          975: "rgb(10, 1, 30)",
          985: "rgb(8, 1, 24)",
          990: "rgb(7, 1, 18)",
          995: "rgb(4, 0, 12)",
        },
      },
    },
  },
  plugins: [],
};
