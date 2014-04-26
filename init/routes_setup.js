
module.exports = function (app, io) {
    require('../routes/main/index_api')(app, '');
    require('../routes/sanger/sanger_api')(app, '/sanger');
    require('../routes/sockets/sockets_test_api')(app, '/sockets_test', io);
};

