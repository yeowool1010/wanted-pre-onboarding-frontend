/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        SCDream1: ["SCDream1"],
        SCDream2: ["SCDream2"],
        SCDream3: ["SCDream3"],
        SCDream4: ["SCDream4"],
        SCDream5: ["SCDream5"],
        SCDream6: ["SCDream6"],
        SCDream7: ["SCDream7"],
        SCDream8: ["SCDream8"],
        SCDream9: ["SCDream9"],
      },
      display: ["group-hover"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
