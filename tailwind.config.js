/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.js', './**/*.html', './src/**/*.css'],
  theme: {
    container: {
      center: true,
    },
    colors: {
      primary: '#515661',
      dark: '#363636',
      white: '#FCFFFE',
      secondary: '#4A5954',
      accent: '#e8e1db',
    },
    fontFamily: {
      lust: ['lust-script-display', 'sans-serif'],
      ofelia: ['ofelia-display', 'sans-serif'],
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
