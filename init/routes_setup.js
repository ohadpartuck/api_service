
module.exports = function (app, io) {
    //TODO - separate by apps
    //apis
    require(GLOBAL.ROOT + '/routes/index')(app, '');
    require(GLOBAL.ROOT + '/routes/sanger_api')(app, '/sanger');
    require(GLOBAL.ROOT + '/routes/sockets_test')(app, '/sockets_test', io);
};