var postman                 = require('../../main/postman'),
    prefix                  = '/sanger/v1',
    queryString             = require('querystring'),
    legalProductsKeys       = {id: true, name: true, stores_available_in: true, tags: true, locale: true };

exports.findSangerProducts = function(req, callback){
    var sanitizedGetProductUrl = objectToUrlString(req.query);

    if (sanitizedUrlIsOk(sanitizedUrl)){
        postman.get('products', prefix + '?' + sanitizedGetProductUrl, {}, GenericOnGetError, callback);
    }else{
        callback.json([]);
    }
};

exports.newSangerProducts = function(req, callback){
    var sanitizedNewProductParams  = objectToUrlString(req.query);

    if (sanitizedUrlIsOk(sanitizedUrl)){
        postman.put('products', prefix + '/new', sanitizedNewProductParams, GenericOnGetError, genericNewObjectCallback);
    }else{
        callback.json({error: "params are not valid " + params});
    }
};



//PRIVATE METHODS

function objectToUrlString(queryObj){
    var sanitizedObj = {};

    for (var key in queryObj){
       if (legalKey(key)){
           sanitizedObj[key] = queryObj[key];
       }
    }
    return queryString.stringify(sanitizedObj);
}

function legalKey(key){
    return legalProductsKeys.hasOwnProperty(key)
}

function sanitizedUrlIsOk(sanitizedUrl){
    //To prevent get all query in production
   return (sanitizedUrl == '' && isProduction())
}