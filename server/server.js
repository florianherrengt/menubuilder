require('events').EventEmitter.prototype._maxListeners = 100;
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(8080, function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};
app.use(loopback.token({ model: loopback.getModel('AccessToken') }));
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
