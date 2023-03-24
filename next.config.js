const path = require('path')

//! Also add aliases to .bablerc
//! then completely stop app and re-run npm run dev
module.exports = {
  reactStrictMode: true,

  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },

  webpack: (config, { isServer }) => {
    ;(config.resolve.alias = {
      ...config.resolve.alias,
      'react-native-alias': 'react-native-web',
      'styled-components-alias': 'styled-components',
      'use-session-alias': 'next-auth/react'
    }),
      (config.resolve.symlinks = false)
    config.resolve.alias['shared'] = path.resolve(__dirname, 'shared')

    return config
  }
}
