const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const NPM_CYCLE = process.env.npm_lifecycle_event;
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development' && NPM_CYCLE === 'start';
const isBuild = NPM_CYCLE === 'build';
const isProd = NODE_ENV === 'production';
const isTest = NPM_CYCLE === 'test' || NPM_CYCLE === 'test-watch';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: isDev ? './src/dev-server.js' : './src/input-file.component.js',
  output: isTest ? {} : {
    path: path.join(__dirname, '/dist'),
    filename: 'angularjs-input-file.js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            '@babel/preset-env'
          ],
          plugins: [
            require('babel-plugin-angularjs-annotate')
          ]
        }
      }]
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }].concat(isTest ?
      [{
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /\.spec\.js$/,
          /dev-server\.js/
        ],
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        }
      }] : []
    )
  },

  externals: isBuild ? [
    'angular'
  ] : [],

  plugins: isDev ? [
    new HtmlWebpackPlugin({template: './src/dev-server.html'}) // Only for dev
  ] : []
};
