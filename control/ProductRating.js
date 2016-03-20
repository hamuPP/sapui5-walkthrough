/**
 * Created by ty on 2016/3/20.
 * custorm control
 */
sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/RatingIndicator",
    "sap/m/Label",
    "sap/m/Button"
], function (Control,RatingIndicator, Label, Button) {
    "use strict";
    return Control.extend("sap.ui.demo.wt.control.ProductRating", {
        metadata : {
            properties:{
                value:{
                    type:"float",
                    defalutValue:1
                }
            },
            aggregations:{
                _rating : {
                    type : "sap.m.RatingIndicator",
                    multiple: false,
                    visibility : "hidden"
                },
                _label : {
                    type : "sap.m.Label",
                    multiple: false,
                    visibility : "hidden"
                },
                _button : {
                    type : "sap.m.Button",
                    multiple: false,
                    visibility : "hidden"}
            },
            events:{
                change : {
                    parameters : {
                        value : {type : "int"}
                    }
                }
            }

        },
        init : function () {
            this.setAggregation("_rating", new RatingIndicator({
                value: this.getValue(),
                iconSize: "2rem",
                visualMode: "Half",
                maxValue:7,
                liveChange: this._onRate.bind(this)
            }));
            console.log("52:this.getValue() "+this.getValue());
            this.setAggregation("_label", new Label({
                text: "{i18n>productRatingLabelInitial}"
            }).addStyleClass("sapUiTinyMargin"));
            this.setAggregation("_button", new Button({
                text: "{i18n>productRatingButton}",
                press: this._onSubmit.bind(this)
            }));
        },
        /*set value是讲value绑定到整个控件上（大概），与打分的星星的点几颗亮几颗无关（这个大概是RatingIndicator控件自带的），以使得按下rate按钮会显示你选了几颗星*/
        setValue: function (iValue) {
            console.log("setValue");
            this.setProperty("value", iValue, true);
            this.getAggregation("_rating").setValue(iValue);
        },

        _onRate : function (oEvent) {
            console.log("_onRate");
            var oRessourceBundle = this.getModel("i18n").getResourceBundle();
            var fValue = oEvent.getParameter("value");
            console.log(oEvent.getParameters());//Object {value: 2, id: "__indicator0"}
            this.setValue(fValue);

            this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
            this.getAggregation("_label").setDesign("Bold");
        },

        _onSubmit : function (oEvent) {
            console.log("_onSubmit");
            var oResourceBundle = this.getModel("i18n").getResourceBundle();

            this.getAggregation("_rating").setEnabled(false);
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
            this.getAggregation("_button").setEnabled(false);
            this.fireEvent("change", {
                value: this.getValue()
            });
        },
        renderer : function (oRM, oControl) {
            oRM.write("<div");
            oRM.writeControlData(oControl);
            oRM.addClass("myAppDemoWTProductRating");
            oRM.writeClasses();
            oRM.write(">");
            oRM.renderControl(oControl.getAggregation("_rating"));
            oRM.renderControl(oControl.getAggregation("_label"));
            oRM.renderControl(oControl.getAggregation("_button"));
            oRM.write("</div>");
        }
    });
});