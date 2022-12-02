/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.js', './**/*.html', './src/**/*.css'],
  theme: {
    container: {
      center: true,
    },
    colors: {
      primary: '#943A0A',
      dark: '#363636',
      white: '#fefcfc',
      lightGrey: '#FAFAFA',
      darkGrey: '#EBEBEB',
      secondary: '#144A67',
      accent: '#E9DBD5',
    },
    fontFamily: {
      lust: ['Lust Script', 'sans-serif'],
      ofelia: ['Ofelia Display', 'sans-serif'],
    },
    fontWeight: {
      extraLight: 200,
      light: 300,
      regular: 400,
      bold: 700,
      extraBold: 800,
    },
  },
  plugins: [],
};
