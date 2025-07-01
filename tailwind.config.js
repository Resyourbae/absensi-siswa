/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "modal-popup": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "modal-scale": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        "check-draw": {
          "0%": { strokeDasharray: "100", strokeDashoffset: "100" },
          "100%": { strokeDasharray: "100", strokeDashoffset: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "modal-popup": "modal-popup 0.3s ease-out",
        "modal-scale": "modal-scale 0.5s ease-out",
        "check-draw": "check-draw 0.8s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
