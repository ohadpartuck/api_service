var postman                 = require('../../main/postman'),
    prefix                  = '/sanger/v1',
    queryString             = require('querystring'),
    legalProductsKeys       = {id: true, name: true, stores_available_in: true, tags: true, locale: true };

exports.findSangerProducts = function(req, callback){
    var sanitizedUrl = objectToUrlString(req.query);

    if (sanitizedUrlIsOk(sanitizedUrl)){
        postman.get('products', prefix + '?' + sanitizedUrl, {}, GenericOnGetError, callback);
    }else{
        callback.json([]);
    }
};


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