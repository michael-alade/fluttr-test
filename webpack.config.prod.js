var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/main.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    chunkFilename: 'bundle-chunk.js'
  },
  devtool: "source-map",
  devServer: {
       contentBase: path.resolve(__dirname, 'dist'),
       publicPath: '/',
       port:8080
  },
  module: {
    loaders: [
      { test: /\.js$/, include:[path.resolve(__dirname, 'src')], loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin("bundle.css")
  ]
}