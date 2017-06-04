var path = require('path');
var webpack = require('webpack');

var DIST_DIR = path.resolve(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "client");
 
module.exports = {
  entry: SRC_DIR + '/app.js',
  output: { 
      path: DIST_DIR + '/app/', 
      filename: 'bundle.js',
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
      }
    ]
  },
};