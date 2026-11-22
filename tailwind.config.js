/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#101B3A', 50: '#EEF1F8', 100: '#D9DFEE', 700: '#18244A', 800: '#141F42', 900: '#0B1329' },
        burgundy: { DEFAULT: '#850D2B', 600: '#9B1636', 50: '#FBEFF2' },
        teal: { DEFAULT: '#187E89', 600: '#136A74', 50: '#E8F4F5' },
        gold: { DEFAULT: '#C5A46D', 600: '#8A6B33', 50: '#FAF5EC' },
        offwhite: '#FAFAF7',
        mist: '#F2F5F8',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,27,58,.04), 0 8px 24px -8px rgba(16,27,58,.10)',
        lift: '0 2px 4px rgba(16,27,58,.05), 0 20px 40px -12px rgba(16,27,58,.20)',
      },
      maxWidth: { site: '76rem' },
    },
  },
  plugins: [forms],
};
