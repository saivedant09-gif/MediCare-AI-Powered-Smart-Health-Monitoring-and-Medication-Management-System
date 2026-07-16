/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff9f6",
          100: "#d7f0e8",
          200: "#aee1d1",
          300: "#7dccb6",
          400: "#4bb198",
          500: "#2c9680",
          600: "#1f7a68",
          700: "#1c6255",
          800: "#1a4f46",
          900: "#18423b",
        },
        warning: "#f5a623",
        critical: "#e5484d",
        normal: "#2c9680",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 2px 10px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 8px 24px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};
