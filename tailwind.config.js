/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        ink: {
          DEFAULT: "#18181A",
          soft: "#34363A",
          muted: "#6B6F76",
        },
        signal: {
          DEFAULT: "#FFC629",
          dim: "#E6A800",
          tint: "#FFF3CF",
        },
        velocity: {
          DEFAULT: "#FF4757",
          dim: "#E63946",
          tint: "#FFE9EB",
        },
        trust: {
          DEFAULT: "#2F6FFF",
          dim: "#1E4FD6",
          tint: "#EAF1FF",
        },
        steel: {
          50: "#F8F9FA",
          100: "#EFF1F3",
          200: "#E1E4E8",
          300: "#C7CCD3",
          400: "#9BA1AC",
          500: "#6E7480",
          600: "#4F5560",
          700: "#383D46",
          800: "#24272D",
          900: "#15171B",
        },
      },
      fontFamily: {
        display: ["'Cabinet Grotesk'", "system-ui", "sans-serif"],
        body: ["'Satoshi'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.01em",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 20px 40px -24px rgba(24,24,26,0.16)",
        friendly: "0 16px 32px -12px rgba(47,111,255,0.28)",
        pop: "0 12px 24px -8px rgba(255,198,41,0.35)",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
        bouncy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-16px) scale(1.03)" },
        },
        "pop-in": {
          "0%": { opacity: 0, transform: "scale(0.85)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 7s ease-in-out infinite",
        "float-delay": "float 7s ease-in-out infinite 1.5s",
        "pop-in": "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
      },
    },
  },
  plugins: [],
};
