/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        materialBlue: "#24446B",
        secondary: "#FF7D65",
        redRose: "#FF1744",
      },
      backgroundImage: {
        heroBg: "url('assets/images/hero-bg.png')",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
