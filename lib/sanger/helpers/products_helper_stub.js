
exports.findSangerProducts = function(req, callback){
    callback.json([{'id': 1, name: 'tisho'}]);
};

exports.newSangerProducts = function(req, callback){
    callback({'result': 'sent to be created. we\'ll let you know (stubbed data)'});
};
