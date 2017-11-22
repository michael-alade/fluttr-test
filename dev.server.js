var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var compiler = webpack(config);

var server = new webpackDevServer(compiler, config.devServer)

server.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.log('something went wrong')
    return err;
  }
  console.log('Webpack runnin on 0.0.0.0:8080')
})

module.exports = server