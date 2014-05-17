var global_constants         = require('global_constants'),
    extend                   = require('util')._extend,
    bodyParser               = require('body-parser'),
    cookieParser             = require('cookie-parser'),
    session                  = require('express-session');

module.exports = function (app) {

    MAIN_CONFIG          = require('../configuration/main/' + ENV + '.json');
    POSTMAN_CONFIG       = require('../configuration/main/postman')[ENV];

    SANGER_CONFIG        = require_settings('sanger');
    SANGER_CONSTATNTS    = global_constants['sanger']['sanger_constants'];

    //to get params in req.body
    app.use(bodyParser());
    app.use(cookieParser());
    //TODO - if I don't want the session to expire every time I restart, I have to use redis connect/ mongo connect
    app.use(session({secret: '1234567890QWERTY'}));

};

//TODO - add localization

function require_settings(namespace){
    var defaults                = require('../configuration/' + namespace + '/defaults.json'),
        by_env                  = require('../configuration/' + namespace + '/' + ENV + '.json');
    return extend(defaults, by_env);
}