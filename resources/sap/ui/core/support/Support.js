/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','./Plugin','sap/ui/Device','jquery.sap.dom','jquery.sap.encoder','jquery.sap.script'],function(q,E,P,D){"use strict";var S=E.extend("sap.ui.core.support.Support",{constructor:function(T){if(!_){throw Error();}E.apply(this);var e=this;this._sType=T;this._sLocalOrigin=window.location.protocol+"//"+window.location.host;var h=q.proxy(this._receiveEvent,this);if(window.addEventListener){window.addEventListener("message",h,false);}else{window.attachEvent("onmessage",h);}switch(T){case t.APPLICATION:this._isOpen=false;this.attachEvent(m.TEAR_DOWN,function(f){e._isOpen=false;if(!!D.browser.internet_explorer){q.sap.byId(I+"-frame").remove();}else{c(e._oRemoteWindow);}e._oRemoteWindow=null;d(e,false);});this.attachEvent(m.SETUP,function(f){e._isOpen=true;b(e,false);});break;case t.IFRAME:this._oRemoteWindow=window.parent;this._sRemoteOrigin=q.sap.getUriParameters().get("sap-ui-xx-support-origin");this.openSupportTool();q(window).bind("unload",function(f){c(e._oOpenedWindow);});break;case t.TOOL:this._oRemoteWindow=window.opener;this._sRemoteOrigin=q.sap.getUriParameters().get("sap-ui-xx-support-origin");q(window).bind("unload",function(f){e.sendEvent(m.TEAR_DOWN);d(e,true);});q(function(){b(e,true);e.sendEvent(m.SETUP);});break;}}});var t={APPLICATION:"APPLICATION",IFRAME:"IFRAME",TOOL:"TOOL"};var m={SETUP:"sapUiSupportSetup",TEAR_DOWN:"sapUiSupportTeardown"};S.StubType=t;S.EventType=m;S.TOOL_SIDE_PLUGINS=["sap.ui.core.support.plugins.TechInfo","sap.ui.core.support.plugins.ControlTree","sap.ui.core.support.plugins.Debugging","sap.ui.core.support.plugins.Trace","sap.ui.core.support.plugins.Performance","sap.ui.core.support.plugins.MessageTest","sap.ui.core.support.plugins.Interaction"];S.APP_SIDE_PLUGINS=["sap.ui.core.support.plugins.TechInfo","sap.ui.core.support.plugins.ControlTree","sap.ui.core.support.plugins.Trace","sap.ui.core.support.plugins.Performance","sap.ui.core.support.plugins.Selector","sap.ui.core.support.plugins.Breakpoint","sap.ui.core.support.plugins.LocalStorage","sap.ui.core.support.plugins.Interaction"];S.getStub=function(T){if(a){return a;}if(T!=t.APPLICATION&&T!=t.IFRAME&&T!=t.TOOL){T=t.APPLICATION;}_=true;a=new S(T);_=false;return a;};S.prototype.getType=function(){return this._sType;};S.prototype._receiveEvent=function(e){var s=e.data;if(typeof s==="string"&&s.indexOf("SAPUI5SupportTool*")===0){s=s.substr(18);}else{return;}if(q("html").attr("data-sap-ui-browser")!="ie8"){if(e.source!=this._oRemoteWindow){return;}}this._oRemoteOrigin=e.origin;if(this._sType===t.IFRAME){var f=this;setTimeout(function(){f._oOpenedWindow.sap.ui.core.support.Support.getStub(t.TOOL)._receiveEvent({source:window,data:e.data,origin:f._sLocalOrigin});},0);}else{var h=window.JSON.parse(s);var i=h.eventId;var p=h.params;this.fireEvent(i,p);}};S.prototype.sendEvent=function(e,p){if(!this._oRemoteWindow){return;}p=p?p:{};if(!!D.browser.internet_explorer&&this._sType===t.TOOL){this._oRemoteWindow.sap.ui.core.support.Support.getStub(t.IFRAME).sendEvent(e,p);}else{var f=p;if(!!D.browser.internet_explorer){f={};q.extend(true,f,p);}var h={"eventId":e,"params":f};var s="SAPUI5SupportTool*"+window.JSON.stringify(h);this._oRemoteWindow.postMessage(s,this._sRemoteOrigin);}};S.prototype.openSupportTool=function(){var T=q.sap.getModulePath("sap.ui.core.support","/support.html");var p="?sap-ui-xx-support-origin="+q.sap.encodeURL(this._sLocalOrigin);var B;if(this._sType===t.APPLICATION){var e=q.sap.domById("sap-ui-bootstrap");if(e){var r=q.sap.getModulePath('./');var s=e.getAttribute('src');if(typeof s==='string'&&s.indexOf(r)===0){B=s.substr(r.length);}}}else if(this._sType===t.IFRAME){B=q.sap.getUriParameters().get("sap-ui-xx-support-bootstrap");}if(B&&B!=='sap-ui-core.js'&&B.indexOf('/')===-1){p+="&sap-ui-xx-support-bootstrap="+q.sap.encodeURL(B);}function f(u){return(u.indexOf(".")==0||u.indexOf("/")==0||u.indexOf("://")<0);}if(this._sType===t.APPLICATION){if(!this._isOpen){if(!!D.browser.internet_explorer){var i=q.sap.getModulePath("sap.ui.core.support","/msiebridge.html");g().html("").append("<iframe id=\""+I+"-frame\" src=\""+i+p+"\" onload=\"sap.ui.core.support.Support._onSupportIFrameLoaded();\"></iframe>");this._sRemoteOrigin=f(i)?this._sLocalOrigin:i;}else{this._oRemoteWindow=o(T+p);this._sRemoteOrigin=f(T)?this._sLocalOrigin:T;}}}else if(this._sType===t.IFRAME){this._oOpenedWindow=o(T+p);}};S._onSupportIFrameLoaded=function(){a._oRemoteWindow=q.sap.byId(I+"-frame")[0].contentWindow;};S.prototype.toString=function(){return"sap.ui.core.support.Support";};var _=false;var a;var I="sap-ui-support";function g(){var $=q.sap.byId(I);if($.length===0){$=q("<DIV/>",{id:I}).addClass("sapUiHidden").appendTo(document.body);}return $;}function o(u){return window.open(u,"sapUiSupportTool","width=800,height=700,status=no,toolbar=no,menubar=no,resizable=yes,location=no,directories=no,scrollbars=yes");}function c(W){if(!W){return;}try{W.close();}catch(e){}}function b(s,T){var p=T?S.TOOL_SIDE_PLUGINS:S.APP_SIDE_PLUGINS;for(var i=0;i<p.length;i++){if(typeof(p[i])==="string"){q.sap.require(p[i]);var f=q.sap.getObject(p[i]);p[i]=new f(s);if(s.getType()===t.TOOL){w(p[i]);}p[i].init(s);}else if(p[i]instanceof P){p[i].init(s);}}if(T){S.TOOL_SIDE_PLUGINS=p;}else{S.APP_SIDE_PLUGINS=p;}}function d(s,T){var p=T?S.TOOL_SIDE_PLUGINS:S.APP_SIDE_PLUGINS;for(var i=0;i<p.length;i++){if(p[i]instanceof P){p[i].exit(s,T);}}}function w(p){p.$().replaceWith("<div  id='"+p.getId()+"-Panel' class='sapUiSupportPnl'><h2 id='"+p.getId()+"-PanelHeader' class='sapUiSupportPnlHdr'>"+p.getTitle()+"<div id='"+p.getId()+"-PanelHandle' class='sapUiSupportPnlHdrHdl sapUiSupportPnlHdrHdlClosed'></div></h2><div id='"+p.getId()+"-PanelContent' class='sapUiSupportPnlCntnt sapUiSupportHidden'><div id='"+p.getId()+"' class='sapUiSupportPlugin'></div></div></div>");p.$("PanelHeader").click(function(){var h=p.$("PanelHandle");if(h.hasClass("sapUiSupportPnlHdrHdlClosed")){h.removeClass("sapUiSupportPnlHdrHdlClosed");p.$("PanelContent").removeClass("sapUiSupportHidden");}else{h.addClass("sapUiSupportPnlHdrHdlClosed");p.$("PanelContent").addClass("sapUiSupportHidden");}});}return S;});
