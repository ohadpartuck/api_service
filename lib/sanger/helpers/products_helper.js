var postman                 = require('../../main/postman'),
    prefix                  = '/sanger/v1',
    legalProductsKeys       = {id: true, name: true, stores_available_in: true, tags: true, locale: true };

exports.findSangerProducts = function(req, callback){
    var sanitizedGetProductUrl = objectToUrlString(req.query, legalProductsKeys);

    if (sanitizedUrlIsOk(sanitizedGetProductUrl)){
        postman.get('products', prefix + '?' + sanitizedGetProductUrl, {}, GenericOnGetError, callback);
    }else{
        callback.json([]);
    }
};

exports.newSangerProducts = function(req, callback){
    var sanitizedNewProductParams  = objectToUrlString(req.query, legalProductsKeys);

    if (sanitizedNewProductParamsIsOk(sanitizedNewProductParams)){
        postman.put('products', prefix + '/new', sanitizedNewProductParams, GenericOnGetError, genericNewObjectCallback);
    }else{
        callback.json({error: "params are not valid " + params});
    }
};

