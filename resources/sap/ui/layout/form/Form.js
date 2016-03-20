/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control', 'sap/ui/layout/library'], function (q, C, l) {
    "use strict";
    var F = C.extend("sap.ui.layout.form.Form", {
        metadata: {
            library: "sap.ui.layout",
            properties: {
                width: {type: "sap.ui.core.CSSSize", group: "Dimension", defaultValue: null},
                editable: {type: "boolean", group: "Misc", defaultValue: false}
            },
            defaultAggregation: "formContainers",
            aggregations: {
                formContainers: {
                    type: "sap.ui.layout.form.FormContainer",
                    multiple: true,
                    singularName: "formContainer"
                },
                title: {type: "sap.ui.core.Title", altTypes: ["string"], multiple: false},
                layout: {type: "sap.ui.layout.form.FormLayout", multiple: false}
            },
            associations: {
                ariaLabelledBy: {
                    type: "sap.ui.core.Control",
                    multiple: true,
                    singularName: "ariaLabelledBy"
                }
            },
            designTime: true
        }
    });
    (function () {
        F.prototype.toggleContainerExpanded = function (c) {
            var L = this.getLayout();
            if (L) {
                L.toggleContainerExpanded(c);
            }
        };
        F.prototype.contentOnAfterRendering = function (f, c) {
            var L = this.getLayout();
            if (L && L.contentOnAfterRendering) {
                L.contentOnAfterRendering(f, c);
            }
        };
        F.prototype.onLayoutDataChange = function (e) {
            var L = this.getLayout();
            if (L && L.onLayoutDataChange) {
                L.onLayoutDataChange(e);
            }
        };
        F.prototype.onBeforeFastNavigationFocus = function (e) {
            var L = this.getLayout();
            if (L && L.onBeforeFastNavigationFocus) {
                L.onBeforeFastNavigationFocus(e);
            }
        };
        F.prototype.setEditable = function (e) {
            var o = this.getEditable();
            this.setProperty("editable", e, true);
            if (e != o && this.getDomRef()) {
                if (e) {
                    this.$().addClass("sapUiFormEdit").addClass("sapUiFormEdit-CTX");
                    this.$().removeAttr("aria-readonly");
                } else {
                    this.$().removeClass("sapUiFormEdit").removeClass("sapUiFormEdit-CTX");
                    this.$().attr("aria-readonly", "true");
                }
            }
            return this;
        };
        F.prototype.invalidate = function (o) {
            if (!this._bNoInvalidate) {
                C.prototype.invalidate.apply(this, arguments);
            }
        };
        F.prototype.getContainerRenderedDomRef = function (c) {
            var L = this.getLayout();
            if (L && L.getContainerRenderedDomRef) {
                return L.getContainerRenderedDomRef(c);
            } else {
                return null;
            }
        };
        F.prototype.getElementRenderedDomRef = function (e) {
            var L = this.getLayout();
            if (L && L.getElementRenderedDomRef) {
                return L.getElementRenderedDomRef(e);
            } else {
                return null;
            }
        };
    }());
    return F;
}, true);