/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        ios: {
          bg: '#F2F2F7',
          card: '#FFFFFF',
          blue: '#007AFF',
          gray: '#8E8E93',
          separator: '#C6C6C8',
          green: '#34C759',
          red: '#FF3B30',
          orange: '#FF9500',
          search: '#E3E3E8'
        },
        brand: {
          dark: '#000000',
          primary: '#007AFF',
          primaryHover: '#0062cc',
        }
      },
      boxShadow: {
        'ios': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'ios-lg': '0 8px 24px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
