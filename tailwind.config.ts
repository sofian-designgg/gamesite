import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sayuri: {
          pink: '#ffb7c5',
          rose: '#ffc0cb',
          dark: '#e8a0b0',
          light: '#ffe4ec',
        },
      },
      fontFamily: {
        manga: ['var(--font-manga)', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        float: 'float 4s ease-in-out infinite',
        pulse-soft: 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
