'use strict'; 

var server = require('server');
server.get("Vartest", function(req,res,next) {
    res.render("vartest/vartest");
    next();
});

module.exports = server.exports();
