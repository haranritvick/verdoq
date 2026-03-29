/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      colors: {
        background: '#070709',       /* Deep premium dark */
        surface: '#111116',          /* Elevated surface */
        border: '#1F1F27',           /* Subtle borders */
        primary: '#DDF437',          /* High contrast neon yellow/lime */
        'primary-dim': 'rgba(221, 244, 55, 0.15)',
        danger: '#FF4D4D',
        warning: '#FF9A3C',
        safe: '#4DFF91',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA', /* Zinc-400 */
      },
      fontFamily: {
        heading: ['"Outfit"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
