/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/dt/Plugin','sap/ui/dt/DOMUtil','sap/ui/dt/OverlayUtil','sap/ui/dt/ElementUtil'],function(P,D,O,E){"use strict";var a=P.extend("sap.ui.dt.plugin.DragDrop",{metadata:{"abstract":true,library:"sap.ui.dt",properties:{},associations:{},events:{}}});a.prototype.init=function(){P.prototype.init.apply(this,arguments);this._mElementOverlayDelegate={"onAfterRendering":this._checkMovable};this._mAggregationOverlayDelegate={"onAfterRendering":this._attachDragScrollHandler,"onBeforeRendering":this._removeDragScrollHandler};this._dragScrollHandler=this._dragScroll.bind(this);this._dragLeaveHandler=this._dragLeave.bind(this);this._mScrollIntervals={};};a.prototype.exit=function(){P.prototype.exit.apply(this,arguments);delete this._mElementOverlayDelegate;delete this._mAggregationOverlayDelegate;delete this._dragScrollHandler;};a.prototype.registerElementOverlay=function(o){o.addEventDelegate(this._mElementOverlayDelegate,this);o.attachEvent("movableChange",this._onMovableChange,this);if(o.isMovable()){this._attachDragEvents(o);}o.attachBrowserEvent("dragover",this._onDragOver,this);o.attachBrowserEvent("dragenter",this._onDragEnter,this);};a.prototype.registerAggregationOverlay=function(A){A.attachTargetZoneChange(this._onAggregationTargetZoneChange,this);if(!sap.ui.Device.browser.webkit){this._attachDragScrollHandler(A);A.addEventDelegate(this._mAggregationOverlayDelegate,this);}};a.prototype.deregisterElementOverlay=function(o){o.removeEventDelegate(this._mElementOverlayDelegate,this);o.detachEvent("movableChange",this._onMovableChange,this);this._detachDragEvents(o);o.detachBrowserEvent("dragover",this._onDragOver,this);o.detachBrowserEvent("dragenter",this._onDragEnter,this);};a.prototype.deregisterAggregationOverlay=function(A){A.detachTargetZoneChange(this._onAggregationTargetZoneChange,this);if(!sap.ui.Device.browser.webkit){A.removeEventDelegate(this._mAggregationOverlayDelegate,this);this._removeDragScrollHandler(A);this._clearScrollIntervalFor(A.$().attr("id"));}};a.prototype._attachDragEvents=function(o){o.attachBrowserEvent("dragstart",this._onDragStart,this);o.attachBrowserEvent("drag",this._onDrag,this);o.attachBrowserEvent("dragend",this._onDragEnd,this);};a.prototype._detachDragEvents=function(o){o.detachBrowserEvent("dragstart",this._onDragStart,this);o.detachBrowserEvent("dragend",this._onDragEnd,this);o.detachBrowserEvent("drag",this._onDrag,this);};a.prototype.onMovableChange=function(e){};a.prototype.onDragStart=function(d,e){};a.prototype.onDragEnd=function(d,e){};a.prototype.onDrag=function(d,e){};a.prototype.onDragEnter=function(o,e){};a.prototype.onDragOver=function(o,e){};a.prototype.onAggregationDragEnter=function(A,e){};a.prototype.onAggregationDragOver=function(A,e){};a.prototype.onAggregationDragLeave=function(A,e){};a.prototype.onAggregationDrop=function(A,e){};a.prototype._checkMovable=function(e){var o=e.srcControl;if(o.isMovable()){D.setDraggable(o.$(),true);}};a.prototype._onMovableChange=function(e){var o=e.getSource();if(o.isMovable()){this._attachDragEvents(o);}else{this._detachDragEvents(o);}this.onMovableChange(o,e);};a.prototype._onDragStart=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);e.stopPropagation();if(sap.ui.Device.browser.firefox&&e&&e.originalEvent&&e.originalEvent.dataTransfer&&e.originalEvent.dataTransfer.setData){e.originalEvent.dataTransfer.setData('text/plain','');}this.showGhost(o,e);this.onDragStart(o,e);};a.prototype.showGhost=function(o,e){var t=this;if(e&&e.originalEvent&&e.originalEvent.dataTransfer&&e.originalEvent.dataTransfer.setDragImage){this._$ghost=this.createGhost(o,e);this._$ghost.appendTo("body");setTimeout(function(){t._removeGhost();},0);e.originalEvent.dataTransfer.setDragImage(this._$ghost.get(0),e.originalEvent.pageX-o.$().offset().left,e.originalEvent.pageY-o.$().offset().top);}};a.prototype._removeGhost=function(){this.removeGhost();delete this._$ghost;};a.prototype.removeGhost=function(){var $=this.getGhost();if($){$.remove();}};a.prototype.createGhost=function(o){var g=o.getAssociatedDomRef();var $;if(!g){g=this._getAssociatedDomCopy(o);$=jQuery(g);}else{$=jQuery("<div></div>");D.cloneDOMAndStyles(g,$);}var d=jQuery("<div></div>").addClass("sapUiDtDragGhostWrapper");return d.append($.addClass("sapUiDtDragGhost"));};a.prototype._getAssociatedDomCopy=function(o){var t=this;var d=jQuery("<div></div>");o.getAggregationOverlays().forEach(function(A){A.getChildren().forEach(function(C){var e=C.getAssociatedDomRef();if(e){D.cloneDOMAndStyles(e,d);}else{D.cloneDOMAndStyles(t._getAssociatedDomCopy(C),d);}});});return d.get(0);};a.prototype.getGhost=function(){return this._$ghost;};a.prototype._onDragEnd=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);this._removeGhost();this._clearAllScrollIntervals();this.onDragEnd(o,e);e.stopPropagation();};a.prototype._onDrag=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);this.onDrag(o,e);e.stopPropagation();};a.prototype._onDragEnter=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);if(O.isInTargetZoneAggregation(o)){if(!this.onDragEnter(o,e)){e.stopPropagation();}}e.preventDefault();};a.prototype._onDragOver=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);if(O.isInTargetZoneAggregation(o)){if(!this.onDragOver(o,e)){e.stopPropagation();}}e.preventDefault();};a.prototype._onAggregationTargetZoneChange=function(e){var A=e.getSource();var t=e.getParameter("targetZone");if(t){this._attachAggregationOverlayEvents(A);}else{this._detachAggregationOverlayEvents(A);}};a.prototype._attachAggregationOverlayEvents=function(A){A.attachBrowserEvent("dragenter",this._onAggregationDragEnter,this);A.attachBrowserEvent("dragover",this._onAggregationDragOver,this);A.attachBrowserEvent("dragleave",this._onAggregationDragLeave,this);A.attachBrowserEvent("drop",this._onAggregationDrop,this);};a.prototype._detachAggregationOverlayEvents=function(A){A.detachBrowserEvent("dragenter",this._onAggregationDragEnter,this);A.detachBrowserEvent("dragover",this._onAggregationDragOver,this);A.detachBrowserEvent("dragleave",this._onAggregationDragLeave,this);A.detachBrowserEvent("drop",this._onAggregationDrop,this);};a.prototype._onAggregationDragEnter=function(e){var A=sap.ui.getCore().byId(e.currentTarget.id);this.onAggregationDragEnter(A,e);e.preventDefault();e.stopPropagation();};a.prototype._onAggregationDragOver=function(e){var A=sap.ui.getCore().byId(e.currentTarget.id);this.onAggregationDragOver(A,e);e.preventDefault();e.stopPropagation();};a.prototype._onAggregationDragLeave=function(e){var A=sap.ui.getCore().byId(e.currentTarget.id);this.onAggregationDragLeave(A,e);e.preventDefault();e.stopPropagation();};a.prototype._onAggregationDrop=function(e){var A=sap.ui.getCore().byId(e.currentTarget.id);this.onAggregationDrop(A,e);e.stopPropagation();};var I=100;var b=20;var c=50;a.prototype._clearScrollInterval=function(e,d){if(this._mScrollIntervals[e]){window.clearInterval(this._mScrollIntervals[e][d]);delete this._mScrollIntervals[e][d];}};a.prototype._clearScrollIntervalFor=function(e){var t=this;if(this._mScrollIntervals[e]){Object.keys(this._mScrollIntervals[e]).forEach(function(d){t._clearScrollInterval(e,d);});}};a.prototype._clearAllScrollIntervals=function(){Object.keys(this._mScrollIntervals).forEach(this._clearScrollIntervalFor.bind(this));};a.prototype._checkScroll=function($,d,e){var s;var S;var i=1;if(d==="top"||d==="bottom"){s=$.height();S=$.scrollTop.bind($);}else{s=$.width();S=$.scrollLeft.bind($);}if(d==="top"||d==="left"){i=-1;}var f=Math.floor(s/4);var t=I;if(f<I){t=f;}if(e<t){this._mScrollIntervals[$.attr("id")]=this._mScrollIntervals[$.attr("id")]||{};if(!this._mScrollIntervals[$.attr("id")][d]){this._mScrollIntervals[$.attr("id")][d]=window.setInterval(function(){var g=S();S(g+i*b);},c);}}else{this._clearScrollInterval($.attr("id"),d);}};a.prototype._dragLeave=function(e){var A=sap.ui.getCore().byId(e.currentTarget.id);this._clearScrollIntervalFor(A.$().attr("id"));};a.prototype._dragScroll=function(e){var A=sap.ui.getCore().byId(e.currentTarget.id);var $=A.$();var d=e.clientX;var i=e.clientY;var o=$.offset();var h=$.height();var w=$.width();var t=o.top;var l=o.left;var B=t+h;var r=l+w;this._checkScroll($,"bottom",B-i);this._checkScroll($,"top",i-t);this._checkScroll($,"right",r-d);this._checkScroll($,"left",d-l);};a.prototype._attachDragScrollHandler=function(e){var A;if(E.isInstanceOf(e,"sap.ui.dt.AggregationOverlay")){A=e;}else{A=e.srcControl;}if(D.hasScrollBar(A.$())){A.getDomRef().addEventListener("dragover",this._dragScrollHandler,true);A.getDomRef().addEventListener("dragleave",this._dragLeaveHandler,true);}};a.prototype._removeDragScrollHandler=function(e){var A;if(E.isInstanceOf(e,"sap.ui.dt.AggregationOverlay")){A=e;}else{A=e.srcControl;}var d=A.getDomRef();if(d){d.removeEventListener("dragover",this._dragScrollHandler,true);}};return a;},true);
