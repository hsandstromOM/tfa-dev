// Bring in deps
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

// Bring in our plugins
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


// The output path for all "built" files
const outputPath = path.join(__dirname, '/www');
const nodeModulePath = path.join(__dirname, 'node_modules');

// Webpack config
module.exports = {
    entry: {
        app: './app.js',
        vendor: './vendor.js',
    },
    output: {
        path: outputPath,
        publicPath: 'www',
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader'
              })
            },
             { test: /\.js$/,
               exclude: /node_modules/,
               loader: "babel-loader"
             },
            {
                test: /\.jpe?g|\.gif$|\.png|\.svg|\.woff|\.eot|\.ttf/,
                loader: 'url-loader'
            }
        ],
    },
    resolve: {
        extensions: ['', '.js'],
        root: [ path.join(__dirname, 'components') ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './scss')],
    },
    plugins: [
        new ExtractTextPlugin('[name].[contenthash].css'),
        new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'layout/*.html')),
        }),
        new ProgressBarPlugin(),
        new WebpackErrorNotificationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          compress: {
            warnings: false,
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true
          },
          output: {
            comments: false,
          },
          exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
      new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
      new webpack.NoErrorsPlugin(),
      // new CompressionPlugin({
      //     asset: "[path].gz[query]",
      //     algorithm: "gzip",
      //     test: /\.js$|\.css$|\.html$/,
      //     threshold: 10240,
      //     minRatio: 0
      //   }),
        new ImageminPlugin({
          // disable: process.env.NODE_ENV !== 'production',
          pngquant: {
            quality: '95-100'
          }
        })
    ]
};
