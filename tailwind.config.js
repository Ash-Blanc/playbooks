/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Domine', 'Georgia', 'Times New Roman', 'serif'],
        'serif': ['Domine', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'base': '16px',
      },
      lineHeight: {
        'base': '1.6',
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
    },
  },
  plugins: [],
};