/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peru: {
          red: '#DC143C',
          'red-dark': '#A50E2D',
          'red-light': '#FF3A5C',
        },
        civic: {
          blue: '#1D4ED8',
          'blue-light': '#3B82F6',
          'blue-dark': '#1E3A8A',
          purple: '#7C3AED',
          'purple-light': '#A78BFA',
          orange: '#EA580C',
          'orange-light': '#FB923C',
          teal: '#0D9488',
          emerald: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
