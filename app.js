GLOBAL.ROOT = __dirname;

var express         = require('express'),
    app             = express(),
    server          = require('http').createServer(app),
    io              = require('socket.io').listen(server);

server.listen(9000);

require(GLOBAL.ROOT + '/init/app_setup')(app);
require(GLOBAL.ROOT + '/init/routes_setup')(app, io);
require(GLOBAL.ROOT + '/init/sockets/sockets_setup')(io);

module.exports = app;
