import React from 'react'
import { NativeBaseProvider, extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    lightPrimary: '#F5F5F5',
    lightSecondary: '#E8E8E8',
    lightBackground: '#DCDCDC',
    lightText: '#282828',
    lightAccent: '#D3D3D3',
    darkPrimary: '#282828',
    darkSecondary: '#383838',
    darkBackground: '#484848',
    darkText: '#f7f7f7',
    darkAccent: '#585858'
  },
  components: {},
  config: {}
})
