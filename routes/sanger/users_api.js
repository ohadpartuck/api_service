var postman         = require('rest_postman')(POSTMAN_CONFIG);

module.exports = function (router, namespace) {
    router.post(namespace + '/login', function(req, res) {
        res.json({'login': true});
    });

    router.get(namespace + '/logout', function(req, res) {
        res.json({'logout': true});
    });

    router.post(namespace + '/signup', function(req, res) {
        res.json({'signup': true});
    });

    router.get(namespace + '/forgot', function(req, res) {
        res.json({'forgotGet': true});
    });

    router.post(namespace + '/forgot', function(req, res) {
        res.json({'forgotPost': true});
    });

    router.get(namespace + '/reset/:token', function(req, res) {
        res.json({'reset_token_get': true});
    });

    router.post(namespace + '/reset/:token', function(req, res) {
        res.json({'reset_token_post': true});
    });

    router.get(namespace + '/auth/:providerName/callback', function(req, res) {
        postman.post('users', 'sanger/v1/users/auth/' + req.params.providerName + '/callback', req.body);
        res.json({'auth_callback': req.body});
    });

    return router;
};