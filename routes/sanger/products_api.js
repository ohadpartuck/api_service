var products                     = require('../../lib/sanger/products');

module.exports = function (router, namespace) {
    router.get(namespace, isLoggedIn, function(req, res) {
        products.get(req, res);
    });

    router.put(namespace + '/', isLoggedIn, function(req, res) {
        products.new(req);
        res.json({result: 'sent to be created and indexed'});
    });

    router.post(namespace + '/:id', function(req, res) {
        products.new(req);
        res.json({result: 'sent to be updated and indexed'});
    });

    router.delete(namespace + '/:id', function(req, res) {
        products.new(req);
        res.json({result: 'sent to be deleted and indexed'});
    });

    return router;
};