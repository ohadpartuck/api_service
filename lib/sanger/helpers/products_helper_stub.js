
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
    return [{'id': 1, name: 'tisho', price: 5},
        {'id': 2, name: 'condoms', price: 3.9},
        {'id': 3, name: 'super farm shampoo', price: 3},
        {'id': 'asdf', name: 'shampoo', price: 8},
        {'id': 'asdf234', name: 'gum', price: 7},
        {'id': '234234', name: 'chap stick', price: 6},
        {'id': 'asdf324', name: 'toilet paper', price: 5},
        {'id': '234234dasdh', name: '9 inch nails', price:3.5}]
}
