GLOBAL.ROOT = __dirname;

var express         = require('express'),
    app             = express(),
    server          = require('http').createServer(app),
    io              = require('socket.io').listen(server);

server.listen(9000);

require('./init/app_setup')(app);
require('./init/routes_setup')(app, io);
require('./init/sockets/sockets_setup')(io);

module.exports = app;
