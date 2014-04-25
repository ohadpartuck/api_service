module.exports = function(io){
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
};