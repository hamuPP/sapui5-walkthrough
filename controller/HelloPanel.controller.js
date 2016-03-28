/**
 * Created by ty on 16/3/17.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/hcm/AddressController"
],function(Controller,MessageToast,Tc){
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.HelloPanel",{
        onShowHello:function(){
            //read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg",[sRecipient]);
            MessageToast.show(sMsg);
        },
        onOpenDialog:function(){
            this.getOwnerComponent().helloDialog.open(this.getView());
        },
        onShowTypedController:function(){
            console.log(Tc);
           Tc.myAlert();
        }
    });
});