/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'blood': '#B22222',
        'blood-dark': '#8B0000',
        'blood-light': '#CD5C5C',
        'graphite': {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#d1d1d1',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        'sans': ['Outfit', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
