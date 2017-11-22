var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

var config = {
  entry: './src/main.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  target: 'web',
  devtool: "source-map",
  devServer: {
       contentBase: '/src',
       publicPath: '/',
       port:8080,
       historyApiFallback: true,
       host: "0.0.0.0",
       allowedHosts: [
         'localhost:8080'
       ],
       headers: {
        'Access-Control-Allow-Origin': 'http://localhost:4000'
       }
  },
  resolve: {
    extensions: ['*', '.js', '.css'],
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

if (process.env.NODE_ENV === 'production') {
  config.devtool = "cheap-module-source-map"
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1,
      moveToParents: true
    })
  )
}

module.exports = config
