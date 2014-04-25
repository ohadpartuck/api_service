var express         = require('express');
GLOBAL.ROOT = __dirname;

var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(9000);

require(GLOBAL.ROOT + '/init/app_setup')(app);
require(GLOBAL.ROOT + '/init/routes_setup')(app, io);
require(GLOBAL.ROOT + '/init/sockets_setup')(io);


module.exports = app;
