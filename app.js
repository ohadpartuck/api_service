ROOT = __dirname;
ENV  = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

var express         = require('express'),
    app             = express(),
    server          = require('http').createServer(app),
    io              = require('socket.io').listen(server);

require('./init/app_setup')(app);
require('./init/global_methods/global_methods');
require('./init/routes_setup')(app, io);
require('./init/sockets/sockets_setup')(io);

app.listen(9000, function(){ console.log("live and kicking on port 9000")});


module.exports = app;