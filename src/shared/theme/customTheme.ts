import { extendTheme } from 'native-base'

type CustomThemeType = typeof theme
declare module 'native-base' {
  interface ICustomTheme extends Exclude<CustomThemeType, 'space'> {
    colors: {
      //body colors
      lightBackground: string
      lightBackgroundAccent: string
      darkBackground: string
      darkBackgroundAccent: string

      brandPrimary: {
        background: string
        hover: string
        border: string
        text: string
      }
      brandSecondary: {
        background: string
        hover: string
        border: string
        text: string
      }
      buttonGoogle: {
        background: string
        hover: string
        border: string
        text: string
      }
      utility: {
        error: string
        link: string
        grey: {
          light: string
          medium: string
          dark: string
        }
      }
    }
  }
}

const primary = {
  50: '#E3F2F9',
  100: '#C5E4F3',
  200: '#A2D4EC',
  300: '#7AC1E4',
  400: '#47A9DA',
  500: '#0088CC',
  600: '#007AB8', // this is the theme default
  700: '#006BA1',
  800: '#005885',
  900: '#003F5E'
}

export const Constants = {
  colors: {
    body: {
      lightBackground: 'white',
      lightBackgroundAccent: '#DCDCDC',
      darkBackground: '#282828',
      darkBackgroundAccent: '#484848'
    },
    brandPrimary: {
      background: primary[600],
      hover: primary[700],
      border: 'transparent',
      text: 'white'
    },
    brandSecondary: {
      background: '#282828',
      hover: '#383838',
      border: '#DCDCDC',
      text: 'white'
    },
    utility: {
      error: 'red',
      link: 'blue',
      grey: {
        light: 'lightGrey',
        medium: 'grey',
        dark: 'darkGrey'
      }
    }
  },
  fontSizes: {
    sm: '12px',
    md: '16px',
    lg: '20px'
  }
}

export const theme = extendTheme({
  components: {},

  colors: {
    primary: primary,
    ...Constants.colors.body,

    brandPrimary: {
      ...Constants.colors.brandPrimary
    },
    brandSecondary: {
      ...Constants.colors.brandSecondary
    },
    utility: {
      ...Constants.colors.utility
    },

    buttonGoogle: {
      background: 'transparent',
      hover: '#DCDCDC',
      border: '#DCDCDC',
      text: '#F5F5F5'
    }
  },

  config: {}
})
