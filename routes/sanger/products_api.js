var products                     = require('../../lib/sanger/products');


module.exports = function (router, namespace) {
    router.get(namespace, function(req, res) {
        products.get(req, res);
    });

    return router;
};