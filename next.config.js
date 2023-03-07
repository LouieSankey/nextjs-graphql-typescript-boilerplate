const path = require('path')

module.exports = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    ;(config.resolve.alias = {
      ...config.resolve.alias,
      'react-native-alias': 'react-native-web'
    }),
      (config.resolve.symlinks = false)
    config.resolve.alias['shared'] = path.resolve(__dirname, 'shared')

    return config
  }
}
