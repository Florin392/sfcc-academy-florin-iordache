'use strict';

var server = require('server');

server.get('Basket', function (req, res, next) {
    var BasketMgr = require("dw/order/BasketMgr");

    var currentBasket = BasketMgr.getCurrentBasket();

    // Use ISML to display Basket object
    // The rendered ISML should be showBasket.isml (Use the quickcard section "Giving control to ISML" for help)
    res.render("training/showBasket", {currentBasket:currentBasket});
    return next();
});



module.exports = server.exports();