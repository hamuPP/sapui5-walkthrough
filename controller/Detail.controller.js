/**
 * Created by ty on 2016/3/20.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (Controller,History,MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Detail", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
            console.log(123);
        },
        _onObjectMatched: function (oEvent) {
            var _oPath = oEvent.getParameter("arguments").invoicePath.replace(/\./g,'/');
            console.log("detail.controool.js: "+_oPath);
            this.getView().bindElement({
                path: _oPath,
                model: "invoice"
            });
        },
        onNavBack:function(){
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("overview", true);
            }
        },
        onRatingChange : function (oEvent) {
            var fValue = oEvent.getParameter("value");
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
        }
    });
});