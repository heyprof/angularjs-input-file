const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/dev-server.js'
  ],
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  devtool: 'eval',
  devServer: {
    hot: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      enforce: 'pre'
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loaders: [
        'ng-annotate-loader',
        'babel-loader'
      ]
    }, {
      test: /\.html$/,
      loaders: [
        'html-loader'
      ]
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({template: './src/dev-server.html'})
  ]
};
