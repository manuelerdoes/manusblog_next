/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
      },
      backgroundImage: {
        'nightsky': "url('/night_sky.jpeg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
