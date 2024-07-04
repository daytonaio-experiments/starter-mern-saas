/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'thin-border': '0 0 0 0.1px #2ECC71',
      },
      filter:{
        "bg-blur" : "blur(8px)" 
      },
    },
  },
  plugins: [
  ],
}

