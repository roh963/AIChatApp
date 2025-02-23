/** @type {import('tailwindcss').Config} */
export default {
  content:["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "ping": "ping 3s linear infinite",
      },
    },
  },
  plugins: [],
}

