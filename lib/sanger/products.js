var stub_products_service           = MAIN_CONFIG['stub_products_service'] || false;
var sanger_helper                   = useStub(stub_products_service) ?
                                        require('./helpers/products_helper_stub') :
                                        require('./helpers/products_helper');

exports.get = function(req, callback){
    sanger_helper.findSangerProducts(req, callback);
};

exports.new = function(req){
    sanger_helper.newSangerProducts(req);
};
