/**
 * Created by ty on 16/3/17.
 */
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/demo/wt/controller/HelloDialog"
],function(UIComponent,JSONModel,ResourceModel,HelloDialog){
    "use strict";
    return UIComponent.extend("sap.ui.demo.wt.Component",{
        metadata:{
            manifest:"json"
            //rootView:"sap.ui.demo.wt.view.App"
        },
        init:function(){
            //call the init function of the parent
            UIComponent.prototype.init.apply(this,arguments);
            //set data model
            var oData = {
                recipient:{
                    name:"World"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            //set i18n model
            var i18nModel = new ResourceModel({
                bundleName:"sap.ui.demo.wt.i18n.i18n"
            });
            this.setModel(i18nModel,"i18n");

            //set dialog
            this.helloDialog = new HelloDialog();

            // create the views based on the url/hash
            this.getRouter().initialize();
            //console.log(this);
        }
    });
});