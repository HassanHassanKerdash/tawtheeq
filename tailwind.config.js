/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'ar': ['Cairo', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'en': ['Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xs': ['14px', { lineHeight: '1.6', fontWeight: '500' }],
        'sm': ['16px', { lineHeight: '1.6', fontWeight: '500' }],
        'base': ['18px', { lineHeight: '1.7', fontWeight: '500' }],
        'lg': ['20px', { lineHeight: '1.7', fontWeight: '600' }],
        'xl': ['22px', { lineHeight: '1.6', fontWeight: '600' }],
        '2xl': ['26px', { lineHeight: '1.5', fontWeight: '700' }],
        '3xl': ['32px', { lineHeight: '1.4', fontWeight: '700' }],
        '4xl': ['38px', { lineHeight: '1.3', fontWeight: '800' }],
        '5xl': ['46px', { lineHeight: '1.2', fontWeight: '800' }],
        '6xl': ['56px', { lineHeight: '1.1', fontWeight: '900' }],
      },
      screens: {
        'rtl': { 'raw': '[dir="rtl"]' },
        'ltr': { 'raw': '[dir="ltr"]' },
      },
      spacing: {
        'rtl-safe': 'env(safe-area-inset-right)',
        'ltr-safe': 'env(safe-area-inset-left)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [
    // Typography plugin
    require('@tailwindcss/typography'),
    
    // RTL support plugin
    function({ addUtilities, addVariant }) {
      addVariant('rtl', '[dir="rtl"] &');
      addVariant('ltr', '[dir="ltr"] &');
      
      addUtilities({
        '.text-start': {
          'text-align': 'start',
        },
        '.text-end': {
          'text-align': 'end',
        },
        '.float-start': {
          'float': 'inline-start',
        },
        '.float-end': {
          'float': 'inline-end',
        },
        '.border-start': {
          'border-inline-start-width': '1px',
        },
        '.border-end': {
          'border-inline-end-width': '1px',
        },
        '.border-start-2': {
          'border-inline-start-width': '2px',
        },
        '.border-end-2': {
          'border-inline-end-width': '2px',
        },
        '.ps-4': {
          'padding-inline-start': '1rem',
        },
        '.pe-4': {
          'padding-inline-end': '1rem',
        },
        '.ms-4': {
          'margin-inline-start': '1rem',
        },
        '.me-4': {
          'margin-inline-end': '1rem',
        },
        '.start-0': {
          'inset-inline-start': '0',
        },
        '.end-0': {
          'inset-inline-end': '0',
        },
        '.start-3': {
          'inset-inline-start': '0.75rem',
        },
        '.end-3': {
          'inset-inline-end': '0.75rem',
        },
      });
    },
  ],
}