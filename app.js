var express         = require('express'),
    path                = require('path'),
    favicon             = require('static-favicon'),
    logger              = require('morgan'),
    cookieParser        = require('cookie-parser'),
    bodyParser          = require('body-parser');

GLOBAL.ROOT = __dirname;

var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(1999);

var routes  = require('./routes/index'),
    users       = require('./routes/users');

// view engine setup - todo remove, this is a json api service only
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
router.get('/b', function(req, res) {
    res.sendfile(GLOBAL.ROOT + '/views/index1.html');
});

router.get('/:id', function(req, res) {
    io.clients[req.params.id].emit('msg','booga');
});



app.use('/', routes);
app.use('/users', users);
app.use('/aaa', router);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    var error = (app.get('env') === 'development') ? err : {} ;
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: error
    });
});

app.set('port', process.env.PORT || 1999);

//var server = app.listen(app.get('port'), function() {
//    console.log('Express server listening on port ' + server.address().port);
//});

io.clients = {};
io.handleSocketMsg = function(data){
    consolg.log("got: "+data.toString());
};
io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });

    socket.on('register',function(data){
        var id = data['id']; //obviously insecure. Should pass authentication.
        console.log(data);
        console.log(io.clients);
        io.clients[id] = io.clients[id] || socket; //register him if not registered
        console.log('registered '+id);
    });

    socket.on('msg', function(data){
        io.handleSocketMsg(data);
        socket.emit('msg','ACK');
    });
});
//module.exports = app;


//io.handleSocketMsg = function(data){
//    log("got: "+data.toString());
//}
//io.sockets.on('connection', function (socket) {
//    socket.emit('msg','got your connection');
//    socket.on('register',function(data){
//        var id = data.id; //obviously insecure. Should pass authentication.
//        io.clients[id] = io.clients[id] || socket; //register him if not registered
//        log('registered '+id);
//    });
//    socket.on('msg', function(data){
//        io.handleSocketMsg(data);
//        socket.emit('msg','ACK');
//    });
//});

