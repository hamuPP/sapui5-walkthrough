/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/dt/Overlay','sap/ui/dt/DOMUtil','sap/ui/dt/ElementUtil','sap/ui/dt/OverlayUtil'],function(q,O,D,E,a){"use strict";var A=O.extend("sap.ui.dt.AggregationOverlay",{metadata:{library:"sap.ui.dt",properties:{aggregationName:{type:"string"},targetZone:{type:"boolean",defaultValue:false}},aggregations:{children:{type:"sap.ui.dt.Overlay",multiple:true},designTimeMetadata:{type:"sap.ui.dt.AggregationDesignTimeMetadata",multiple:false}},events:{targetZoneChange:{parameters:{targetZone:{type:"boolean"}}}}}});A.prototype.getAssociatedDomRef=function(){var e=this.getElementInstance();var s=this.getAggregationName();var o=E.getDomRef(e);if(o){var d=this.getDesignTimeMetadata();var v=d.getDomRef();if(typeof v==="function"){return v.call(e,s);}else if(typeof v==="string"){return D.getDomRefForCSSSelector(o,v);}}};A.prototype.setTargetZone=function(t){if(this.getTargetZone()!==t){this.setProperty("targetZone",t);this.toggleStyleClass("sapUiDtOverlayTargetZone",t);this.fireTargetZoneChange({targetZone:t});}return this;};A.prototype.isTargetZone=function(){return this.getTargetZone();};A.prototype.getChildren=function(){return this.getAggregation("children")||[];};return A;},true);
