import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#f7f7f5',
          tertiary: '#f0efec',
          dark: '#0d0d0d',
          'dark-secondary': '#161616',
          'dark-tertiary': '#1e1e1e',
        },
      },
      borderColor: {
        DEFAULT: '#e0e0e0',
      },
    },
  },
  plugins: [],
} satisfies Config
