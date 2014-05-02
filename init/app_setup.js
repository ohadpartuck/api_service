var global_constants         = require('global_constants'),
    extend                   = require('util')._extend;

module.exports = function (app) {

    MAIN_CONFIG          = require('../configuration/main/' + ENV + '.json')    ;

    SANGER_CONFIG        = require_settings('sanger');
    SANGER_CONSTATNTS    = global_constants['sanger']['sanger_constants'];

    defineGlobalFunctions();
};


function require_settings(namespace){
    var defaults                = require('../configuration/' + namespace + '/defaults.json'),
        by_env                  = require('../configuration/' + namespace + '/' + ENV + '.json');
    return extend(defaults, by_env);
}

function defineGlobalFunctions(){
    isProduction                = function() { return ENV == 'production' };
    useStub                     = function(use_stub_setting) { return use_stub_setting && !isProduction() };
    GenericOnGetError           = function(params){
        //TODO - catch all errors not here but by emitting an event
        console.log('GenericOnGetError got this ' + JSON.stringify(params))
    }
}