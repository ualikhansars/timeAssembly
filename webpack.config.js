var path = require('path');
var webpack = require('webpack');

var DIST_DIR = path.resolve(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "client");
 
module.exports = {
  entry: {
    app: SRC_DIR + '/app/app.js',
    registration: SRC_DIR + '/registration/index.js',
    login: SRC_DIR + '/login/index.js'
  },
  output: { 
      path: DIST_DIR + '/app/', 
      filename: '[name].js',
      publicPath: "/public/"
     },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ]
     }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};