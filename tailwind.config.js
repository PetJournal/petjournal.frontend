/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      fredoka: 'var(--font-fredoka)',
    },
    extend: {
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        custom: {
          blue: '#8093F1',
          cyan: '#46D4DB',
          pink: '#FF61D2',
          purple: '#9A0963',
          'purple-hover': '#6E0046',
        },
        studio: {
          50: '#f9f7fc',
          100: '#f3eef9',
          200: '#e5dcf2',
          300: '#d1c0e7',
          400: '#b79bd7',
          500: '#9772c3',
          600: '#7c54a7',
          700: '#664388',
          800: '#553870',
          900: '#49325d',
          950: '#2a173b',
        },
      },
      boxShadow: {
        'custom-select': '0px 0px 4px 0px #8733FF33',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};
