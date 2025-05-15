/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['Gilroy-Bold', 'sans-serif'], 
      },
      colors: {
        primary: {
          DEFAULT: '#4F1650',
          light: '#8B268D',
        },
        secondary: {
          dark: '#D157D3',
          DEFAULT: '#DD86DF',
        },
        nude: {
          dark: '#EDC0EE',
          neutral: '#F4D6F5',
          light: '#F9EBFA',
        },
        black: '#1F1B20',
        gray: {
          darkest: '#342E34',
          dark: '#6D626D',
          DEFAULT: '#8E848E',
          light: '#B8B3B8',
          lighter: '#D3D1D3',
          lightest: '#E8E7E8',
        },
        white: {
          dark: '#F5F4F5',
          DEFAULT: '#FCFBFC',
        },
        red: {
          DEFAULT: '#EF7679'
        }
      },
    },
  },
  plugins: [],
}