var express = require('express');
var router = express.Router();

module.exports = function (app, namespace, io) {
    router.get('/start', function(req, res) {
//        res.sendfile(ROOT + '/views/index1.html');
    });

    router.get('/:id', function(req, res) {
        io.clients[req.params.id].emit('msg','booga');
    });

    app.use(namespace + '/', router);
    return router;
};



