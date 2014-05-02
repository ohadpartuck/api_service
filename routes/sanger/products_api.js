module.exports = function (router, namespace) {
    router.get(namespace + '/ab', function(req, res) {
        res.json({'users_products': 123});
    });

    return router;
};