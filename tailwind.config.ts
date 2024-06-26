import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        almostBlack: 'rgb(20, 20, 21)',
        skinwallerGray: 'rgb(164, 164, 164)',
        darkGrey: '#202023',
        darkSecondary: '#0D0D0D',
        'dark-14': '#141415',
        graySecondary: "#A4A4A4",
        darkBlue: '#2b475e',
        'blue-5d': '#5D4DFF',
        skinwalletPink: '#CFBBFE',
        swViolet: '#6842FF',
        swLime: '#18E86B',
        swOrange: '#FF8F27',
        swLightOrange: '#FFD7BC',
        swLightYellow: '#FFE8AE',
        swRed: '#ed2424',
        'yellow-1e': '#FFC01E',
        'gray-29': '#29292C',
        'gray-40': '#404043',
        'gray-42': '#424242',
      },
      fontSize: {
        11: '0.6875rem',
        13: '0.8125rem',
        17: '1.0625rem',
        18: '1.125rem',
        21: '1.3125rem',
        22: '1.1375rem',
        23: '1.4375rem',
        24: '1.5rem',

      },
      screens: {
        'sm-viewport': '50em',
        ssm: "350px",
        ssl: "450px",
        sm: "550px",
        md: "700px",
        lg: "900px",
        llg: "1100px",
        xl: "1300px",
        xll: "1600px",
        xxl: "1750px",
        fourk: "2500px",
      },
      fontFamily: {
        Barlow: ['Barlow']
      },
      gridTemplateColumns: {
        cards: "repeat(auto-fill,minmax(190px,1fr))",
        categories: "repeat(auto-fill,minmax(150px, 1fr))",
        footer: 'repeat(auto-fill,minmax(150px, 1fr))',
        methods: 'repeat(auto-fill,328px)'
      },
      boxShadow: {
        'checkedCard': '0px 0px 20px 0px rgba(0, 0, 0, 0.50)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
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
export default config
