/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      title: ['Poppins', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'foundation-blue': '#2A4B9B',
        'foundation-pink': '#E74699',
        'foundation-primary': '#E74699',
        'foundation-green': '#8DAF7A',
      },
      animation: {
        marquee: 'marquee 75s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
