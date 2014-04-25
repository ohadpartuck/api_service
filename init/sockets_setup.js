module.exports = function (io) {
    setup_sockets_callbacks(io);
    setup_sockets_listeners(io);
};


function setup_sockets_callbacks(io){
    io.handleSocketMsg = function(data){
        console.log('got: ' + data.toString());
    };
    io.handleFinishedIndexing = function(data){
        io.clients[data['id']].emit('news', { finished: true });
    };
}

function setup_sockets_listeners(io){
    io.clients = {};
    io.sockets.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });

        socket.on('register',function(data){
            var id = data['id']; //obviously insecure. Should pass authentication.
            io.clients[id] = io.clients[id] || socket; //register him if not registered
            console.log('registered '+ id);
        });

        socket.on('msg', function(data){
            io.handleSocketMsg(data);
            io.handleFinishedIndexing(data);
            socket.emit('msg','ACK');
        });
    });
}