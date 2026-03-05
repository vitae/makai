/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          deepest: '#01060E',
          deep: '#020B18',
          mid: '#0A1628',
          light: '#1B3A5C',
          bright: '#2E6B9E',
        },
        sunset: {
          gold: '#FFB347',
          amber: '#F7931E',
          orange: '#FF6B35',
          coral: '#FF5F7E',
          magenta: '#E84393',
          purple: '#6B21A8',
          lavender: '#9B5DE5',
        },
        sand: {
          light: '#FFF9F0',
          warm: '#F5E6D3',
        },
      },
      fontFamily: {
        heading: ['Chivo', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'sunset-gradient': 'linear-gradient(180deg, #1a0533 0%, #4a1942 20%, #c94b4b 45%, #e8813a 65%, #f5c87a 80%, #1a365d 100%)',
        'glass-shine': 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,179,71,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(255,179,71,0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
