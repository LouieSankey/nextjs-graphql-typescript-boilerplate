const { withNativebase } = require('@native-base/next-adapter')
const path = require('path')

module.exports = withNativebase({
  dependencies: ['@native-base/icons', 'react-native-web-linear-gradient'],
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  externals: {
    'expo-constants$': '_'
  },
  nextConfig: {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.ttf$/,
        loader: 'url-loader', // or directly file-loader
        include: path.resolve(__dirname, 'node_modules/@native-base/icons')
      })
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'react-native$': 'react-native-web',
        'react-native-linear-gradient': 'react-native-web-linear-gradient',
        'use-session-alias': 'next-auth/react'
      }
      config.resolve.extensions = [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        ...config.resolve.extensions
      ]

      return config
    }
  }
})
