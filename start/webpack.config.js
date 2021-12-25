const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
      rep_log: './assets/js/rep_log.js',
      login: './assets/js/login.js',
      layout: './assets/js/layout.js',
  },
  output:{
      path: path.resolve(__dirname, 'web','build'),
      filename: '[name].js',
      publicPath: '/build/'
  },

  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: '/node/modules/',
              use: {
                  loader: 'babel-loader',
                  options: {
                      cacheDirectory: true
                  }
              }
          },
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {
              test: /\.scss$/,
              use: [
                  'style-loader',
                  'css-loader',
                  'resolve-url-loader',
                  'sass-loader?sourceMap'
              ]
          },
          {
              test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
              use: [
                      {
                      loader: 'file-loader',
                      options: {
                          name: '[name]-[hash:6].[ext]'
                      },
                  }
              ]
          },
          {
              test:  /\.(woff|woff2|eot|ttf|otf)$/i,
              use: [
                  {
                      loader: 'file-loader',
                      options: {
                          name: '[name]-[hash:6].[ext]'
                      },
                  }
              ]
          }

      ]
  },

  plugins: [
     new webpack.ProvidePlugin({
         jQuery: 'jquery',
         $: 'jquery',
     }),
      new CopyPlugin([
          // copies to {output}/static
      {from: './assets/static', to: 'static'}
      ]),
  ]
};