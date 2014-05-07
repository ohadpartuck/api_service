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

    return router;
};