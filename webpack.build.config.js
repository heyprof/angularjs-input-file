/* eslint-disable quote-props */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    'angularjs-input-file': './src/input-file.component.js',
    'angularjs-input-file.min': './src/input-file.component.js'
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'nosources-source-map',
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
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
