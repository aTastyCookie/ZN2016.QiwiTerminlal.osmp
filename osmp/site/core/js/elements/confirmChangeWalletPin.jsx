"use strict";System.register(["jsx!elements/field","jsx!elements/numpad"],function(_export,_context){var Textfield,Numpad;return{setters:[function(_jsxElementsField){Textfield=_jsxElementsField["default"]},function(_jsxElementsNumpad){Numpad=_jsxElementsNumpad["default"]}],execute:function(){_export("default",React.createClass({render:function(){return React.createElement("div",{id:"support-element"},React.createElement("div",{className:"header"},React.createElement("div",{className:"header"},qiwi.i18n("loginPage.title"))),React.createElement(Textfield,{onEraseClick:function(){return page.updateField(null)},text:this.props.phone,width:"870",mask:{inner:"+7(***)***-**-**",shown:"+7(XXX)XXX-XX-XX"},eraseWidth:"133"}),React.createElement(Numpad,{onClick:function(code){return page.updateField(code)}}))}}))}}});