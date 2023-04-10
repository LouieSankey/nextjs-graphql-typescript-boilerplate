import { Theme } from '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string
      secondary: string
      backgroundPrimary: string
      text: string
    }
  }
}
