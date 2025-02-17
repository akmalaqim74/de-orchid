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
          DEFAULT: '#ffffff',
          hover: '#FFB74D'  // Darker shade for hover states
        },
        secondary: {
          DEFAULT: '#000000',
          hover: '#FFB74D'  // Lighter shade for hover states
        }
      },
      fontFamily: {
        script: ['Great Vibes', 'cursive'],
        // or
        dancingscript: ['Dancing Script', 'cursive']
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
}