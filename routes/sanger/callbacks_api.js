module.exports = function (router, namespace) {
    router.get(namespace + '/emit', function(req, res) {
        //a callback from one of the services
        //should contain the socket_id so we'll know where to send the answer
        res.json({'callback_received': 123});
    });

    return router;
};