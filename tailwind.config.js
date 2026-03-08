/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "spotify-green": "#1ed760",
        "spotify-green-dark": "#1db954",
        "spotify-black": "#121212",
        "spotify-dark": "#181818",
        "spotify-card": "#282828",
        "spotify-card-hover": "#3e3e3e",
        "spotify-player": "#181818",
        "spotify-sidebar": "#000000",
        "spotify-text": "#b3b3b3",
        "spotify-white": "#ffffff",
      },
      fontFamily: {
        spotify: [
          '"Circular"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      spacing: {
        sidebar: "240px",
        player: "90px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-green": "pulseGreen 1.5s ease-in-out infinite",
        skeleton: "skeleton 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        pulseGreen: { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0.5 } },
        skeleton: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
