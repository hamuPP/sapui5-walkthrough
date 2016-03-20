/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/m/SelectList','sap/m/TabStripItem'],function(q,l,C,S,T){"use strict";var a=S.extend("sap.m.TabStripSelectList",{metadata:{library:"sap.m"}});a.CSS_CLASS_SELECTLIST='sapMSelectList';a.CSS_CLASS_TABSTRIPSELECTLIST='sapMTabStripSelectList';a.prototype.init=function(){S.prototype.init.call(this);this.addStyleClass(a.CSS_CLASS_SELECTLIST);this.addStyleClass(a.CSS_CLASS_TABSTRIPSELECTLIST);};a.prototype.onAfterRendering=function(){S.prototype.onAfterRendering.apply(this,arguments);var d=this.getDomRef();d.addEventListener("mouseenter",q.proxy(a.prototype.mouseenter,this),true);d.addEventListener("mouseleave",q.proxy(a.prototype.mouseleave,this),true);};a.prototype.mouseenter=function(e){var c=q(e.target).control(0);if(sap.ui.Device.system.desktop&&c instanceof sap.m.TabStripItem&&this.getSelectedItem()!==c){c.getAggregation('_closeButton').$().removeClass(T.CSS_CLASS_CLOSE_BUTTON_INVISIBLE);}};a.prototype.mouseleave=function(e){var c=q(e.target).control(0);if(sap.ui.Device.system.desktop&&c instanceof sap.m.TabStripItem&&q(e.target).hasClass('sapMSelectListItem')&&this.getSelectedItem()!==c){c.getAggregation('_closeButton').$().addClass(T.CSS_CLASS_CLOSE_BUTTON_INVISIBLE);}};a.prototype._activateItem=function(i){if(i instanceof sap.ui.core.Item&&i&&i.getEnabled()){this.fireItemPress({item:i});var p=this.getSelectedItem();if(p&&p!==i){if(sap.ui.Device.system.desktop){p.getAggregation('_closeButton').addStyleClass(T.CSS_CLASS_CLOSE_BUTTON_INVISIBLE);}}this.setSelection(i);this.fireSelectionChange({selectedItem:i});}};a.prototype.changeItemState=function(i,s){var $;var I=this.getItems();I.forEach(function(o){if(i===o.getId()){$=q(o.$().children('.'+T.CSS_CLASS_STATE)[0]);if(s===true){$.removeClass(T.CSS_CLASS_STATE_INVISIBLE);}else if(!$.hasClass(T.CSS_CLASS_STATE_INVISIBLE)){$.addClass(T.CSS_CLASS_STATE_INVISIBLE);}}});};return a;},true);
