'use strict';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.resolve(__dirname, './src/app.js'),
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode:"production",
  target: 'async-node',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), 
  ],
};
