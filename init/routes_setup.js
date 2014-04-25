
module.exports = function (app, io) {
    //TODO - separate by apps
    //apis
    require(GLOBAL.ROOT + '/routes/index_api')(app, '');
    require(GLOBAL.ROOT + '/routes/sanger_api')(app, '/sanger');
    require(GLOBAL.ROOT + '/routes/sockets_test_api')(app, '/sockets_test', io);
};