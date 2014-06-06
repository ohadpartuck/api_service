var global_constants         = require('global_constants'),
    extend                   = require('util')._extend,
    bodyParser               = require('body-parser'),
    cookieParser             = require('cookie-parser'),
    session                  = require('express-session'),
    i18n                     = require('i18n');

module.exports = function (app) {

    var config           = require('../configuration/main/' + ENV);
    var globals          = require('../configuration/main/globals')[ENV];

    MAIN_CONFIG          = extend(config, globals);
    POSTMAN_CONFIG       = require('../configuration/main/postman')[ENV];

    SANGER_CONFIG        = require_settings('sanger');
    SANGER_CONSTATNTS    = global_constants['sanger']['sanger_constants'];

    //to get params in req.body
    app.use(bodyParser());
    app.use(cookieParser());
    //TODO - if I don't want the session to expire every time I restart, I have to use redis connect/ mongo connect
    app.use(session({secret: '1234567890QWERTY'}));

    i18n.configure({
        locales:['en', 'fr', 'he'],
        defaultLocale: 'he',
        cookie: 'locale',
        directory: ROOT + '/configuration/locales',
        indent: "\t"
    });

    i18n.setLocale('he');

    console.log(i18n.__('Hello'));

};

//TODO - add localization

function require_settings(namespace){
    var defaults                = require('../configuration/' + namespace + '/defaults'),
        by_env                  = require('../configuration/' + namespace + '/' + ENV);
    return extend(defaults, by_env);
}