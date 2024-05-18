/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mobile-light': "url('/src/assets/images/pattern-background-mobile-light.svg')",
        'mobile-dark': "url('/src/assets/images/pattern-background-mobile-dark.svg')",
        'tablet-light': "url('/src/assets/images/pattern-background-tablet-light.svg')",
        'tablet-dark': "url('/src/assets/images/pattern-background-tablet-dark.svg')",
        'desktop-light': "url('/src/assets/images/pattern-background-desktop-light.svg')",
        'desktop-dark': "url('/src/assets/images/pattern-background-desktop-dark.svg')",
      },
      colors: {
        lightbg: "#F4F6FA",
        darkbg: "#313E51"
      }
    },
  },
  plugins: [],
}

