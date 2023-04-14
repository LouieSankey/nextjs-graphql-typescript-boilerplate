import { extendTheme, Theme } from 'native-base'

type CustomThemeType = typeof theme

declare module 'native-base' {
  interface ICustomTheme extends Exclude<CustomThemeType, 'space'> {
    colors: {
      brandPrimary: string
      brandSecondary: string
      brandAccent: string
      buttonPrimary: {
        background: string
        hover: string
        border: string
        text: string
      }
      buttonSecondary: {
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
    }
  }
}

const brandPrimary = '#6096B4'
const brandSecondary = '#93BFCF'
const brandAccent = '#438bb8'

export const theme = extendTheme({
  components: {},
  colors: {
    lightPrimary: 'white',
    lightSecondary: '#E8E8E8',
    lightBackground: '#DCDCDC',
    lightText: '#282828',
    lightAccent: '#D3D3D3',
    darkPrimary: '#282828',
    darkSecondary: '#383838',
    darkBackground: '#484848',
    darkText: '#f7f7f7',
    darkAccent: '#585858',

    darkGrey: '#555555',
    mediumGrey: '#d4d4d4',
    lightGrey: '#DDDDDD',

    brandPrimary: brandPrimary,
    brandSecondary: brandSecondary,
    brandAccent: brandAccent,

    //button styles
    buttonPrimary: {
      background: brandPrimary,
      hover: brandSecondary,
      border: brandAccent,
      text: '#F5F5F5'
    },
    buttonSecondary: {
      background: '#282828',
      hover: '#383838',
      border: '#DCDCDC',
      text: '#F5F5F5'
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
