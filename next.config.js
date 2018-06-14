const withCss = require('@zeit/next-css')

module.exports = withCss({
  serverRuntimeConfig: { // Only available on server side

  },
  publicRuntimeConfig: { // Available on both server and client
    FILE_STACK_API_KEY: process.env.FILE_STACK_API_KEY,
    GRAPHQL_URI: process.env.GRAPHQL_URI,
    GRAPHQL_API_KEY: process.env.GRAPHQL_API_KEY,
    COMMUNITY_ID: process.env.COMMUNITY_ID,
    NAVBAR_ENDPOINT: process.env.NAVBAR_ENDPOINT,
  },

  webpack (config) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    })

    config.module.rules.push({
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude(modulePath) {
        return /node_modules/.test(modulePath) &&
          !/node_modules\/@natgeo\/modules-global-nav/.test(modulePath)
      },
      options: Object.assign({}, this.babelOptions),
    })

    config.node = {
      fs: 'empty',
    }

    return config
  },
})
