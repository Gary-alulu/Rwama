import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#123524',
          50: '#1a4a32',
          100: '#123524',
        },
        coffee: {
          DEFAULT: '#4E342E',
          50: '#6d4c41',
          100: '#4E342E',
        },
        cream: {
          DEFAULT: '#F6F1E9',
          50: '#faf8f4',
          100: '#F6F1E9',
        },
        gold: {
          DEFAULT: '#C8A96B',
          50: '#d4bc8b',
          100: '#C8A96B',
          200: '#b89a5c',
        },
        botanical: {
          DEFAULT: '#7DA27D',
          50: '#9ab89a',
          100: '#7DA27D',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'container': '28px',
        'card': '24px',
        'widget': '22px',
        'button': '999px',
      },
      boxShadow: {
        'luxury': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 16px 48px rgba(18, 53, 36, 0.14)',
        'gold': '0 0 24px rgba(200, 169, 107, 0.30)',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
}

export default config
