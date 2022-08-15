'use strict';

var server = require('server');


server.get('Show', function(req, res, next){
    var ProductMgr = require('dw/catalog/ProductMgr');
    var product = ProductMgr.getProduct('P0048M');
    res.render("product/productFound", {product: product});
    return next();
});

server.get('RenderTemplate', function(req, res, next) {
    res.render("product/dummy1");
    return next();
})

server.get('TestRemoteInclude', function(req, res, next) {
    res.render("product/dummy2");
    return next();
})

server.get('TestDecorator', function(req, res, next) {
    res.render("product/testDecorator");
    return next();
})
module.exports = server.exports();