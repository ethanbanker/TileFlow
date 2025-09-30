import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{ts,tsx,js,jsx,mdx}',
    './app/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        elevate: '0 10px 30px rgba(0,0,0,0.35)',
        'elevate-lg': '0 20px 50px rgba(0,0,0,0.45)',
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.25rem',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.35, transform: 'scale(1.0)' },
          '50%': { opacity: 0.9, transform: 'scale(1.05)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
        'pulse-soft': 'pulse-soft 2.4s infinite ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
