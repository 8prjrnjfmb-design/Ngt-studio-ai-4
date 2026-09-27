/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ngt: {
          dark: "#05050f",
          blue: "#2b6dfa",
          cyan: "#22c1f0",
          purple: "#8b2bfa",
          magenta: "#e026c9",
        },
      },
      backgroundImage: {
        "ngt-gradient": "linear-gradient(135deg, #22c1f0 0%, #2b6dfa 35%, #8b2bfa 70%, #e026c9 100%)",
      },
    },
  },
  plugins: [],
};
