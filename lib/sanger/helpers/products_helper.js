var postman                 = require('rest_postman')(POSTMAN_CONFIG),
    prefix                  = '/sanger/v1',
    legalProductsKeys       = {id: true, name: true, stores_available_in: true, tags: true, locale: true },
    mustFields              = {name: true};

exports.findSangerProducts = function(req, callback){
    var sanitizedGetProductUrl = objectToUrlString(req.query, legalProductsKeys);

    if (sanitizedUrlIsOk(sanitizedGetProductUrl)){
        postman.get('products', prefix + '?' + sanitizedGetProductUrl, {}, GenericOnGetError, callback);
    }else{
        callback.json([]);
    }
};

exports.newSangerProducts = function(req){
    var sanitizedNewProductParams  = sanitizeObject(req.body, legalProductsKeys),
        payload = {};

    if (sanitizedNewProductParamsIsOk(sanitizedNewProductParams, mustFields)){
        payload[SANGER_CONSTATNTS['product_data']] = sanitizedNewProductParams;
        postman.put('products', prefix + '/', payload, GenericOnGetError, genericNewObjectCallback);
    }else{
        GenericOnGetError({error: "params are not valid " + req.query});
    }
};

