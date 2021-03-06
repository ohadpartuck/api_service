var express     = require('express');
var router      = express.Router();


module.exports = function (app, namespace) {
    router.get('/', function(req, res) {
        res.json({'main_sanger': true});
    });

    router = require('./users_api')(router, '/users');
    router = require('./products_api')(router, '/products');
    router = require('./callbacks_api')(router, '/callbacks');

    app.use(namespace + '/v1', router);
};




