/**
 * Created by ty on 16/3/18.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/demo/wt/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel,formatter,Filter,FilterOperator) {
    "use strict";

    return Controller.extend("sap.ui.demo.wt.controller.InvoiceList", {
        formatter:formatter,
        onInit : function () {
            var oViewModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view");
        },
        onFilterInvoices:function(oEvent){
            //build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }

            //filter binding
            var oList = this.getView().byId("invoiceList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        onPress:function(oEvent){
            var oItem = oEvent.getSource();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var getPath = oItem.getBindingContext("invoice").getPath().replace(/\//g,'.');
            console.log(oItem.getBindingContext("invoice"));
            console.log("InvoiceList.controller.js 40line: "+getPath);
            oRouter.navTo("detail",{
                invoicePath: getPath
            });
        }

    });
});