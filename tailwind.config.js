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
        graySecondary: "#A4A4A4",
        skinwalletPink: '#CFBBFE',
        swViolet: '#6842FF',
        swLime: '#18E86B',
        'gray-42':'#424242'
      },
      fontSize:{
        21:'1.3125rem',
        18: '1.125rem',
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
      fontFamily:{
        Barlow: ['Barlow']
      },
      gridTemplateColumns: {
        cards: "repeat(auto-fill,minmax(190px,1fr))"
      },
      boxShadow: {
        'checkedCard': '0px 0px 20px 0px rgba(0, 0, 0, 0.50)',
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

