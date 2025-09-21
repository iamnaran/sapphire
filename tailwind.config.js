/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF5733",
        secondary: "#33C1FF",
        accent: "#FF33A8",
        light: {
          100: "#f0f0f0",
          200: "#d9d9d9",
          300: "#bfbfbf",

        },
        dark: {
          100: "#1a1a1a",
          200: "#333333",
          300: "#4d4d4d",

        }
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Courier New", "monospace"],
      },
    },
  },
  plugins: [],
}