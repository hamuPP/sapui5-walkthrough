/**
 * Created by ty on 16/3/17.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],function(Controller,JSONModel){
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.App",{
        onOpenDialog:function(){
            this.getOwnerComponent().helloDialog.open(this.getView());
        },
        onInit:function(){
            var nameModel = new JSONModel({
                firstName:"姓",
                lastName:"名",
                enabled:true
            });
            nameModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
            this.getView().setModel(nameModel,'nameModel');
        }
    });
});