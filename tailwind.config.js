/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '', // This ensures no prefix is added to classes
  important: true, // This makes Tailwind classes take precedence
  mode: 'jit',
  content: [
    './src/**/*.{html,ts,scss,css}',
    './src/**/*.component.{html,ts,scss,css}'
  ],
  theme:{
    extend: {
      colors: {
        primary: {
          DEFAULT: '#BC9161',
          hover: '#A67B4F'  // Darker shade for hover states
        }
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
}