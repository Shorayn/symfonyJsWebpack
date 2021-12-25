// NOTE: USE node ./node_modules/webpack/bin/webpack.js web/assets/js/RepLogApp.js web/build/rep_log.js since Windows is bah (LONG VERSION)
// SHORT: node ./node_modules/webpack/bin/webpack.js (configuration in webpack.config.js file)

// Also can you the dev server: node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

const styleLoader  = {
    loader: 'style-loader',
    options: {}
};

const cssLoader  = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
};

const sassLoader  = {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
};

const resolveUrlLoader  = {
    loader: 'resolve-url-loader',
    options: {
        sourceMap: true
    }
};


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
                  styleLoader,
                  cssLoader
              ]
          },
          {
              test: /\.scss$/,
              use: [
                  styleLoader,
                  cssLoader,
                  resolveUrlLoader,
                  sassLoader
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
         'window.jQuery': 'jquery',
     }),
      new CopyPlugin([
          // copies to {output}/static
      {from: './assets/static', to: 'static'}
      ]),
      new webpack.optimize.CommonsChunkPlugin({

          name: [
              // "layout" is an entry file
              // anything included in layout, is not included in other output files
              'layout',
              // dumps the manifest in a separate file
              'manifest'
          ],
          minChunks: Infinity
      })
  ],

  devtool: 'inline-source-map',
  devServer: {
      contentBase: './web'
  }
};