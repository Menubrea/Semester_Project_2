/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['*.html'],
  theme: {
    container: {
      center: true,
    },
    colors: {
      primary: '#943A0A',
      dark: '#363636',
      white: '#fff',
      lightGrey: '#FAFAFA',
      darkGrey: '#EBEBEB',
      accent: '#004745',
    },
    fontFamily: {
      lust: ['Lust Script', 'sans-serif'],
      ofelia: ['Ofelia Display', 'sans-serif'],
    },
    fontWeight: {
      extralight: 200,
      light: 300,
      regular: 400,
      bold: 700,
    },
  },
  plugins: [],
};
