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
         'brand-base': '#f8f0e9',      // Soft beige background
        'brand-text': '#5d5047',     // Darker stone for text
        'brand-primary': '#aa8155',  // Muted gold accent
        'brand-secondary': '#8c6b4f',// Darker gold/brown for headings
        'brand-accent': '#c09060',   // Brighter gold for interactive elements
        'brand-light-accent': '#d4bca9', // Very light accent for 
        'brand': { // Main brand color, your golden ochre
          DEFAULT: '#B08D57',
          light: '#c8ae8a', // A lighter tint
          dark: '#8c6d42',  // A darker shade
        },
        'brown': { // For text and subtle elements
          DEFAULT: '#795548', // Base text
          light: '#A1887F',   // Lighter, for subtitles or muted text
          medium: '#6D4C41',  // For general headings
          dark: '#4E342E',    // Rich, dark brown for main titles
        },
        'offwhite': {
          DEFAULT: '#f9f6f2', // Base for gradient end
          light: '#fdfaf6',   // Base for gradient start
          card: '#ffffff',    // Cards will be white for better contrast
        },
        'subtle-border': '#E0D8D0',
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
        dancingscript: ['Dancing Script', 'cursive'],
        serif: ['Playfair Display', 'serif'],
        sans: ['Lato', 'sans-serif'],
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
}