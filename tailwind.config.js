/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5349c3",
        backAuth: "#efecf6",
        backDash: "#f6f8fa",
        search: "#f8f8f9",
        searchDark: "#1E2A47",
        navy: "#4B6A9B",
        gray: "#878f9c",
        black: "#010100",
        bgDark: "#222731",
        backgroundDark: "#141D2F",
        completed: { text: "#2e9b77", bg: "#edf8f4" },
        todo: { text: "#ca772d", bg: "#f6f1e8" },
        inProgress: { text: "#2f94dc", bg: "#ecf5f9" },
      },
    },
  },
  plugins: [],
};
