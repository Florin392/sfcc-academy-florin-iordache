"use strict";
var server = require("server");
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
server.get("Show", consentTracking.consent, server.middleware.https, csrfProtection.generateToken, function(
    req,
    res,
    next
) {
    var URLUtils = require("dw/web/URLUtils");
    var Resource = require("dw/web/Resource");
    var profileForm = server.forms.getForm("mytraining");
    profileForm.clear();
    res.render("mytrainingform", {
        title: Resource.msg("mytraining.form.title.submit", "forms", null),
        profileForm: profileForm,
        actionUrl: URLUtils.url("MyForm-Submit").toString()
    });
    next();
});
server.post(
    "Submit",
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function(req, res, next) {
        var Resource = require("dw/web/Resource");
        var URLUtils = require("dw/web/URLUtils");
        var profileForm = server.forms.getForm("mytraining");
        //These imports are needed for you to use the CustomObjectMgr and Transaction classes
        var CustomObjectMgr = require("dw/object/CustomObjectMgr");
        var Transaction = require("dw/system/Transaction");
        var id = "email";
        // Replace "<ID of your Object>" as for example NewsLetterSubscription or the ID you gave
        // your custom object
        var object = CustomObjectMgr.getCustomObject("NewsletterSubscription", id);
        // If the return from getCustomObject call is not null, then there is already an instance
        // of the object with this ID and we can't use to create our instance
        // If the return is null, it means the ID we are trying to use can be used to create our
        // object instance
        if (!object) {
            // Remember, object creation, modification and deletion must be done inside transactions
            Transaction.wrap(function () {
                object = CustomObjectMgr.createCustomObject("NewsletterSubscription", id);
                object.custom.email = profileForm.customer.email.value;
                object.custom.firstName = profileForm.customer.firstname.value;
                object.custom.lastName = profileForm.customer.lastname.value;
            });
        } else {Transaction.wrap(function () {
            CustomObjectMgr.remove(object);
        });
        res.render("myformresponse", {
            title: Resource.msg("mytraining.form.title.edit", "forms", null),
            profileForm: profileForm,
            actionUrl: URLUtils.url("MyForm-Submit").toString()
        });
        return next();
    }
});
module.exports = server.exports();