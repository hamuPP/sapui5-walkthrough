/**
 * Created by ty on 16/3/22.
 */

/* boilerplate code for typed Controller */

// declaring a special type of module
jQuery.sap.declare({modName: "sap.hcm.AddressController", type: "controller"});
// the constructor
sap.hcm.AddressController = function () {
    sap.ui.core.mvc.Controller.apply(this, arguments);
};
// this is currently required, as the Controller is not loaded by default
jQuery.sap.require("sap.ui.core.mvc.Controller");
// chain the prototypes
sap.hcm.AddressController.prototype = jQuery.sap.newObject(sap.ui.core.mvc.Controller.prototype);

/* end of boilerplate code for typed Controller */


// to avoid the above we could in the future offer it behind a simple call to:
// sap.ui.defineController("sap.hcm.Address");


sap.hcm.AddressController.prototype.onInit = function () {
    // modify control tree - this is the regular lifecycle hook

};


// implement an event handler in the Controller
sap.hcm.AddressController.prototype.doSomething = function () {
    alert("This is typed controller");
};

sap.hcm.AddressController.myAlert = function () {
    alert("This is myAlert in typed controller");
};