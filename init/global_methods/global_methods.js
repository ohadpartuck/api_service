
var queryString         = require('querystring');
var Cookies             = require('cookies');


//TODO - all these function - extract to a helper node module
isProduction                = function() { return ENV == 'production' };

useStub                     = function(useStubSetting) { return (useStubSetting  || false) && !isProduction() };

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


    var res             = params['settings']['res'],
        req             = params['settings']['req'],
        responseBody    = params['responseBody'];

    var cookies = new Cookies(req, res);

    if (isErrorFreeResponse(responseBody)){
        var user = responseBody['user'];
        req.session.currentUser = user;
        // set a regular cookie
        //in the response to the app's client - set the session cookie
        cookies.set('SID', req.session.id, { httpOnly: false });
        res.json({error: null, msg: 'Success! you are logged in', user: user});
    }else{
        res.json({error:'Error Logging in.', msg: responseBody})
    }
};

isErrorFreeResponse = function(response){
    if (typeof(response) !== 'object') return false;
    var error   = response['error'];

    return (error === null || error === undefined);
};

require('./global_users_methods');
