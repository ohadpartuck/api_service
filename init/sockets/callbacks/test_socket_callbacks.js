module.exports = function(io){
    io.handleSocketMsg = function(data){
        console.log('got: ' + data.toString());
    };
    io.handleFinishedIndexing = function(data){
        io.clients[data['id']].emit('news', { finished: true });
    };
};
