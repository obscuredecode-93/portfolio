/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A0A1A',
        'dark-purple': '#1A0A2E',
        cyan: '#00D4FF',
        blue: '#0066FF',
      },
      fontFamily: {
        space: ['var(--font-space)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0A0A1A 0%, #1A0A2E 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        blink: 'blink 1s step-end infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,212,255,0.6)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0,212,255,0.4)',
        'glow-blue': '0 0 20px rgba(0,102,255,0.4)',
        'glow-card': '0 0 30px rgba(0,212,255,0.15)',
      },
    },
  },
  plugins: [],
};
