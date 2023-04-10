import { Theme } from '@emotion/react'
import { dayTheme } from './dayTheme'

export const nightTheme: Theme = {
  ...dayTheme,
  colors: {
    ...dayTheme.colors,
    primary: '#FFC107',
    secondary: '#2196F3',
    backgroundPrimary: '#333',
    text: '#fff'
  }
}
