'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.example = "One string"
   
     var BasketMgr = require('dw/order/BasketMgr');
     var Basket = BasketMgr.getCurrentBasket();
    res.setViewData(viewData);
    res.render("cart/cart", {Basket: Basket});
    return next();

    

});

module.exports = server.exports();