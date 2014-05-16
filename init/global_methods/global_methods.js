var queryString     = require('querystring');
var postman         = require('rest_postman')(POSTMAN_CONFIG),

//TODO - all these function - extract to a helper node module
isProduction                = function() { return ENV == 'production' };

useStub                     = function(use_stub_setting) { return use_stub_setting && !isProduction() };

GenericOnGetError           = function(params){
    //TODO - catch all errors not here but by emitting an event
    console.log('GenericOnGetError got this ' + params);
};

genericNewObjectCallback    = function(params){
    console.log('genericNewObjectCallback got this ' + JSON.stringify(params));
};

sanitizeObject = function(queryObj, legalProductsKeys){
    var sanitizedObj = {};

    for (var key in queryObj){
        if (legalKey(key, legalProductsKeys)){
            sanitizedObj[key] = queryObj[key];
        }
    }

    return sanitizedObj;
};
objectToUrlString = function(queryObj, legalProductsKeys){
    sanitizedObj =  sanitizeObject(queryObj, legalProductsKeys);

    return queryString.stringify(sanitizedObj);
};
legalKey = function (key, legalProductsKeys){
    return legalProductsKeys.hasOwnProperty(key)
};
sanitizedUrlIsOk = function (sanitizedUrl){
    //To prevent get all query in production
    return !(sanitizedUrl == '' && isProduction());
};

sanitizedNewProductParamsIsOk = function(sanitizedNewProductParams, mustFields){
    var paramsLegal = true;
    for (var key in mustFields){
        if (!sanitizedNewProductParams.hasOwnProperty(key)){
            paramsLegal = false
        }
    }
    return paramsLegal;
};

isLoggedIn = function(req, res, next) {
    if (req.session.currentUser !== undefined) return next();
    res.json({error: 'You must be logged in to view this page.'});
};

//Same as isLoggedIn but returns True/False
loggedIn = function(req){
    return req.session.currentUser !== undefined
};


GenericOnLoginSuccess = function(params){
    var res     = params['settings']['res'],
        req     = params['settings']['req'],
        error   = params['response']['error'];
    if (error === null || error === undefined){
        req.session.currentUser = params['response']['user'];
        res.json({error: null, msg: 'Success! you are logged in'});
    }else{
        res.json({error: error, msg: 'Error Logging in.'})
    }
};

logIn = function(prefix, req, res, next){
    postman.post('users', prefix + '/users/login', req.body,
        GenericOnGetError,
        GenericOnLoginSuccess,
        {passToCallbacks:{req: req, res: res, next: next}});
};
