/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./config/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        jet: 'hsl(0, 0%, 22%)',
        onyx: 'hsl(240, 1%, 17%)',
        'eerie-black-1': 'hsl(240, 2%, 13%)',
        'eerie-black-2': 'hsl(240, 2%, 12%)',
        'smoky-black': 'hsl(0, 0%, 7%)',
        'orange-yellow': 'hsl(45, 100%, 72%)',
        'vegas-gold': 'hsl(45, 54%, 58%)',
        'light-gray': 'hsl(0, 0%, 84%)',
        'light-gray-70': 'hsla(0, 0%, 84%, 0.7)',
        /* Light mode surface/text */
        'surface': 'hsl(0, 0%, 98%)',
        'surface-card': 'hsl(0, 0%, 100%)',
        'surface-muted': 'hsl(0, 0%, 96%)',
        'text-primary': 'hsl(0, 0%, 9%)',
        'text-muted': 'hsl(0, 0%, 35%)',
        'border-light': 'hsl(0, 0%, 90%)',
      },
      boxShadow: {
        'vcard-1': '-4px 8px 24px hsla(0, 0%, 0%, 0.25)',
        'vcard-2': '0 16px 30px hsla(0, 0%, 0%, 0.25)',
        'vcard-5': '0 24px 80px hsla(0, 0%, 0%, 0.25)',
      },
      backgroundImage: {
        'gradient-yellow': 'linear-gradient(to right, hsl(45, 100%, 72%), hsl(35, 100%, 68%))',
      },
    },
  },
  plugins: [],
}
