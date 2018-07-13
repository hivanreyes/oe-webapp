const withSass = require('@zeit/next-sass')
const webpack = require('webpack') // eslint-disable-line import/no-extraneous-dependencies

module.exports = withSass({
  cssModules: true,

  serverRuntimeConfig: { // Only available on server side

  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|woff2|ttf|woff)$/,
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

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    })

    config.node = {
      fs: 'empty',
    }

    return config
  },
})
