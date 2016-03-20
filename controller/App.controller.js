/**
 * Created by ty on 16/3/17.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],function(Controller){
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.App",{
        onOpenDialog:function(){
            this.getOwnerComponent().helloDialog.open(this.getView());
        }
    });
});