/**
 * Created by ty on 16/3/21.
 */
// define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.ui.commons.Button");
jQuery.sap.declare("samples.components.button.Component");

// new Component
sap.ui.core.UIComponent.extend("sap.ui.demo.wt.button.Component", {

    metadata : {
        properties : {
            text: "string"
        }
    }
});


sap.ui.demo.wt.button.Component.prototype.createContent = function(){
    this.oButton = new sap.ui.commons.Button("btn");
    return this.oButton;
};

/*
 * Overrides setText method of the component to set this text in the button
 */
sap.ui.demo.wt.button.Component.prototype.setText = function(sText) {
    this.oButton.setText(sText);
    this.setProperty("text", sText);
    return this;
};
