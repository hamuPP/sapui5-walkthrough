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
            //var i18nModel = new ResourceModel({
            //    bundleName:"sap.ui.demo.wt.i18n.i18n"
            //});
            //this.setModel(i18nModel,"i18n");

            //set dialog
            this.helloDialog = new HelloDialog();

            // create the views based on the url/hash
            this.getRouter().initialize();
        }
        /**以下函数暂时不知道有啥作用，
         * 抄自https://sapui5.hana.ondemand.com/#docs/guide/b430345887f1419fba50320b57c1bdf9.html**/
        //createContent:function(){
        //    this.view = sap.ui.view({
        //        id:"myView",
        //        viewName:"samples.components.products.details.view.Details",
        //        type:sap.ui.core.mvc.ViewType.JS
        //    });
        //}
    });
});