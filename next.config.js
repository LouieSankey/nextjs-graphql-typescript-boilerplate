const path = require('path')

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
      'styled-components-alias': 'styled-components'
    }),
      (config.resolve.symlinks = false)
    config.resolve.alias['shared'] = path.resolve(__dirname, 'shared')

    return config
  }
}
