var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
          helpers.root('src', 'app')
        ],
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.scss$/,
        exclude: [
          /node_modules/,
          helpers.root('src', 'app')
        ],
        loader: ExtractTextPlugin.extract(
          'style', 
          'css?sourceMap' +
          '!sass?outputStyle=expanded&sourceMap'
        )
      },

      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        loader: 'raw!sass'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: helpers.root('node_modules', 'element-resize-detector/dist/element-resize-detector.min.js'),
        to: 'assets/js'
      },
          {
        from: helpers.root('public', 'images'),
        to: 'assets/img'
      }
    ]),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
