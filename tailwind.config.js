/** @type {import('tailwindcss').Config} */

const themes = {
  photography: {
    headerBGColor: "rgba(0,0,0,0.65)",
    headerTextColor: "white",
    headerBorderColor: "rgba(201, 200, 200, 0.65)",
    containerBGColor: "rgba(0,0,0,0.85)",
    containerTextColor: "white",
    containerBorderColor: "rgba(50, 50, 50, 0.85)",
    bodyBackgroundImage: "url('./night_sky.jpeg')"
  },
  music: {
    headerBGColor: "rgba(0,0,0,0.6)",
    headerTextColor: "rgba(250,239,170,0.85)",
    headerBorderColor: "rgba(135,25,203,0.8)",
    containerBGColor: "rgba(8,1,21,0.70)",
    containerTextColor: "rgba(260,223,234,1)",
    containerBorderColor: "rgba(31,7,78,1)",
    bodyBackgroundImage: "url('./night_sky.jpeg')"
  },
  food: {
    headerBGColor: "rgba(22, 55, 18, 0.9)",
    headerTextColor: "white",
    headerBorderColor: "grey",
    containerBGColor: "rgba(229, 229, 229, 0.8)",
    containerTextColor: "black",
    containerBorderColor: "lightgrey",
    bodyBackgroundColor: "white"
  },
  computer: {
    headerBGColor: "rgba(22, 24, 24, 0.8)",
    headerTextColor: "white",
    headerBorderColor: "black",
    containerBGColor: "rgba(235, 228, 239, 0.84)",
    containerTextColor: "black",
    containerBorderColor: "black",
    bodyBackgroundImage: "url('/piggy_bg.jpg')"
  },
  robotics: {
    headerBGColor: "rgba(16, 11, 30, 0.84)",
    headerTextColor: "white",
    headerBorderColor: "#212132",
    containerBGColor: "rgba(37, 33, 49, 0.84)",
    containerTextColor: "white",
    containerBorderColor: "#212132",
    bodyBackgroundImage: "url('./pcb_bg.jpg')"
  },
  travel: {
    headerBGColor: "rgba(53, 24, 37, 0.93)",
    headerTextColor: "white",
    headerBorderColor: "black",
    containerBGColor: "rgba(24, 37, 53, 0.93)",
    containerTextColor: "white",
    containerBorderColor: "black",
    bodyBackgroundImage: "url('./wald_bg.jpg')"
  },
  other: {
    headerBGColor: "rgba(8, 51, 82, 0.85)",
    headerTextColor: "rgb(212, 207, 187)",
    headerBorderColor: "rgba(201, 200, 200, 0.65)",
    containerBGColor: "rgba(250, 234, 214, 0.85)",
    containerTextColor: "black",
    containerBorderColor: "rgba(0,0,0,0.35)",
    bodyBackgroundImage: "url('./night_sky.jpeg')"
  }
};

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1280px',
      xl: '1440px',
    },
    extend: {
      colors: Object.fromEntries(
        Object.entries(themes).flatMap(([theme, colors]) =>
          Object.entries(colors).map(([key, value]) => [`${theme}-${key}`, value])
        )
      ),
      backgroundImage: {
        'nightsky': "url('/night_sky.jpeg')",
        'piggy': "url('/piggy_bg.jpg')",
        'pcb': "url('/pcb_bg.jpg')",
        'wald': "url('/wald_bg.jpeg')"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
