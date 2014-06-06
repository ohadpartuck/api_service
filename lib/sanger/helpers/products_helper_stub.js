
exports.findSangerProducts = function(req, callback){
    if (req.query['type'] == 'all'){
        callback.writeHead(200, {'Content-Type': 'application/javascript'});
        callback.end(req.query.callbackMethod + "(" + JSON.stringify(allProductsStub()) + ");");
//        callback.json(allProductsStub());
    }else{
        callback.json([{'id': 1, name: 'tisho'}]);
    }
};

exports.newSangerProducts = function(req, callback){
    callback({'result': 'sent to be created. we\'ll let you know (stubbed data)'});
};


function allProductsStub(){
    return [{'id': 1, name: 'tisho'},
        {'id': 2, name: 'condoms'},
        {'id': 3, name: 'super farm shampoo'},
        {'id': 'asdf', name: 'shampoo'},
        {'id': 'asdf234', name: 'gum'},
        {'id': '234234', name: 'chap stick'},
        {'id': 'asdf324', name: 'toilet paper'},
        {'id': '234234dasdh', name: '9 inch nails'}]
}
