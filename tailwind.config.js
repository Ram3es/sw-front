import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        almostBlack: 'rgb(20, 20, 21)',
        skinwallerGray: 'rgb(164, 164, 164)',
        darkGrey: '#202023',
        darkSecondary: '#0D0D0D',
        sidebarGrey: '#202023',
        linkUnderline: '#6842FF',
        graySecondary: "#A4A4A4",
        skinwalletPink: '#CFBBFE',
        
      },
      fontSize:{
        21:'1.3125rem'
      },
      screens: {
        'sm-viewport': '50em'
      },
      gridTemplateColumns: {
        cards: "repeat(auto-fill,minmax(190px,1fr))"
      }
    },
  },
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }),
        },
        { values: theme('translate'), supportsNegativeValues: true }
      )
    })
  ],
}

