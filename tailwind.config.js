/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Цей рядок каже: "дивись у всі папки всередині src"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
