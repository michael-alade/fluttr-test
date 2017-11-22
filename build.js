var webpack =  require('webpack');
var config = require('./webpack.config');

return webpack(config).run(function (err, stats) {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(err, 'error');
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error));
  }
  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning => console.log(warning));
  }
  console.log(`Webpack stats: ${stats}`);
  console.log('App has been compiled in production mode.');
  return 0;
})