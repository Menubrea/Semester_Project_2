/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.js', './**/*.html', './src/**/*.css'],
  theme: {
    container: {
      center: true,
    },
    colors: {
      primary: '#515661',
      contrast: '#C5BB9B',
      dark: '#2E2E2E',
      white: '#FCFFFE',
      secondary: '#515661',
      accent: '#A3A6AD',
    },
    fontFamily: {
      lust: ['modesto-condensed', 'serif'],
      creative: ['sisters-four', 'sans-serif'],
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
