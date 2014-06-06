var    prefix          = 'sanger/v1/';

module.exports = function (router, namespace) {
    router.post(namespace + '/login', function(req, res, next) {
         logIn(prefix, req, res, next);
    });

    router.get(namespace + '/logout', function(req, res, next) {
        logOut(req, res, next);
    });

    router.post(namespace + '/signup', function(req, res, next) {
        signUp(prefix, req, res, next);
    });

    router.get(namespace + '/auth/:providerName/callback', function(req, res, next) {
        socialSignUp(prefix, req.params.providerName , req.query, {req: req, res: res, next: next});
    });

//    router.get(namespace + '/forgot', function(req, res, next) {
//        res.json({'forgotGet': true});
//    });
//
//    router.post(namespace + '/forgot', function(req, res, next) {
//        res.json({'forgotPost': true});
//    });
//
//    router.get(namespace + '/reset/:token', function(req, res, next) {
//        res.json({'reset_token_get': true});
//    });
//
//    router.post(namespace + '/reset/:token', function(req, res, next) {
//        res.json({'reset_token_post': true});
//    });

    return router;
};