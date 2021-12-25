// NOTE: USE node ./node_modules/webpack/bin/webpack.js web/assets/js/RepLogApp.js web/build/rep_log.js since Windows is bah (LONG VERSION)
// SHORT: node ./node_modules/webpack/bin/webpack.js (configuration in webpack.config.js file)

// Also can you the dev server: node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js

// Use this node module to set environment for webpack
// node ./node_modules/cross-env/src/bin/cross-env.js NODE_ENV=production node ./node_modules/webpack/bin/webpack.js --watch

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const useDevServer = false;
const useVersioning = true;
const publicPath = useDevServer ? 'http://localhost:8080/build/' : '/build/';
const isProduction = process.env.NODE_ENV === 'production';
const useSourceMaps = !isProduction;

const styleLoader  = {
    loader: 'style-loader',
    options: {}
};

const cssLoader  = {
    loader: 'css-loader',
    options: {
        sourceMap: useSourceMaps,
        minimize: isProduction
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
        sourceMap: useSourceMaps
    }
};



const webpackConfig = {
  entry: {
      rep_log: './assets/js/rep_log.js',
      login: './assets/js/login.js',
      layout: './assets/js/layout.js',
  },
  output:{
      path: path.resolve(__dirname, 'web','build'),
      filename: useVersioning ? '[name].[hash:6].js' : '[name].js',
      publicPath: publicPath,
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
              use: ExtractTextPlugin.extract({
                  use: [
                       cssLoader
                  ],
                  // use this if CSS isn't extracted
                  fallback: styleLoader
              })
          },
          {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                  use: [
                      cssLoader,
                      resolveUrlLoader,
                      sassLoader
                  ],
                  fallback: styleLoader
              })
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
      }),

      new ExtractTextPlugin(
          useVersioning ? '[name].[contenthash:6].css' : '[name].css',
      ),

      new ManifestPlugin({
          writeToFileEmit: true,
          basePath: 'build/'
      })
  ],

  devtool: useSourceMaps ? 'inline-source-map' : false,
  devServer: {
      contentBase: './web',
      headers: { 'Access-Control-Allow-Origin': '*' },
  }
};

if (isProduction){
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );

    webpackConfig.plugins.push(
        // passes these options to all loaders
        // but we should really pass these ourselves
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    );

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify('production')
        })
    );
}

module.exports = webpackConfig;