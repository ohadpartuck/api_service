var prefix = '/init/sockets';

module.exports = function (io) {
    io.clients = {};
    setup_sockets_callbacks(io);
    setup_sockets_listeners(io);
};


function setup_sockets_callbacks(io){
    require(GLOBAL.ROOT + prefix + '/callbacks/test_socket_callbacks')(io);
    require(GLOBAL.ROOT + prefix + '/callbacks/sanger_socket_callbacks')(io);
}

function setup_sockets_listeners(io){
    require(GLOBAL.ROOT + prefix + '/listeners/test_socket_listeners')(io);
    require(GLOBAL.ROOT + prefix + '/listeners/sanger_socket_listeners')(io);
}