/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'm-skye-blue': 'var(--m-skye-blue)',
        'm-skye-blue-light': 'var(--m-skye-blue-light)',
        'm-skye-blue-darker': 'var(--m-skye-blue-darker)',
        'm-old-rose': 'var(--m-old-rose)', 
        'm-old-rose-50': 'var(--m-old-rose-50)',
        'm-old-rose-80': 'var(--m-old-rose-80)',
        'm-fairy-tale': 'var(--m-fairy-tale)',
        'm-fairy-tale-light': 'var(--m-fairy-tale-light)',
        'm-fairy-tale-darker': 'var(--m-fairy-tale-darker)',
        'm-baby-powder': 'var(--m-baby-powder)',
        'm-navajo-white': 'var(--m-navajo-white)',
        'm-xanthous': 'var(--m-xanthous)',
        'm-cambridge-blue': 'var(--m-cambridge-blue)',
        'm-cambridge-blue-30': 'var(--m-cambridge-blue-30)',
        'm-cambridge-blue-50': 'var(--m-cambridge-blue-50)',
        'm-cambridge-blue-80': 'var(--m-cambridge-blue-80)',
        'm-blue-green': 'var(--m-blue-green)',
        'm-silver': 'var(--m-silver)',
      },
      animation: {
        glow: 'glow 1.5s infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #4da7db' },
          '40%': { boxShadow: '0 0 10px m-xanthous' },
          '75%': { boxShadow: '0 0 10px #88db7f' },   
         
        },
      },
    },
  plugins: [],
},
};
