var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');


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
    publicPath: '/'
  },
  devtool: "source-map",
  devServer: {
       contentBase: path.resolve(__dirname, 'dist'),
       publicPath: '/',
       port:8080
  },
  module: {
    loaders: [
      { test: /\.js$/,
        include:[path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[local]'
            }
          }
        ])
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
          loader: 'url-loader',
          options: { 
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          } 
        }]
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig
  ]
}