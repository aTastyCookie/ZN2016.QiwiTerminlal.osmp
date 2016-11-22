"use strict";System.register(["jsx!elements/button","jsx!elements/maskedText","statistics"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var Button,MaskedText,Statistics,_createClass,_React,Component,Textfield;return{setters:[function(_jsxElementsButton){Button=_jsxElementsButton["default"]},function(_jsxElementsMaskedText){MaskedText=_jsxElementsMaskedText["default"]},function(_statistics){Statistics=_statistics["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_React=React,Component=_React.Component,Textfield=function(_Component){function Textfield(){var _Object$getPrototypeO,_temp,_this,_ret;_classCallCheck(this,Textfield);for(var _len=arguments.length,args=Array(_len),_key=0;_len>_key;_key++)args[_key]=arguments[_key];return _temp=_this=_possibleConstructorReturn(this,(_Object$getPrototypeO=Object.getPrototypeOf(Textfield)).call.apply(_Object$getPrototypeO,[this].concat(args))),_this.maxZoom=2,_this.state={zoom:0},_ret=_temp,_possibleConstructorReturn(_this,_ret)}return _inherits(Textfield,_Component),_createClass(Textfield,[{key:"componentDidMount",value:function(){this.componentDidUpdate()}},{key:"fontSizeByZoom",value:function(zoom){var innerField=this.refs.innerField;if(innerField){var previous=innerField.style.fontSize;innerField.style.fontSize=null;var renderedSize=Number(window.getComputedStyle(innerField).fontSize.replace("px",""));return innerField.style.fontSize=previous,renderedSize-5*zoom+"px"}}},{key:"componentDidUpdate",value:function(){var _refs=this.refs,innerField=_refs.innerField,outerField=_refs.outerField,_state=this.state,zoom=_state.zoom,height=_state.height;if(innerField&&innerField.scrollHeight!==height){var currentZoom=zoom,currentDeficient=innerField.scrollHeight-outerField.clientHeight;if(currentDeficient>0)for(;currentZoom<this.maxZoom&&currentDeficient>0;)currentZoom+=1,innerField.style.fontSize=this.fontSizeByZoom(currentZoom),currentDeficient=innerField.scrollHeight-outerField.clientHeight;else if(0>currentDeficient){for(;currentZoom>=0&&0>currentDeficient;)currentZoom-=1,innerField.style.fontSize=this.fontSizeByZoom(currentZoom),currentDeficient=innerField.scrollHeight-outerField.clientHeight;currentZoom+=1,innerField.style.fontSize=this.fontSizeByZoom(currentZoom),currentDeficient=innerField.scrollHeight-outerField.clientHeight}this.setState({zoom:Math.max(0,Math.min(this.maxZoom,currentZoom)),translation:Math.max(currentDeficient,0),height:innerField.scrollHeight})}}},{key:"render",value:function(){var textElement=void 0,suggestsElement=void 0,titleElement=void 0,shimElement=void 0,_props=this.props,_props$text=_props.text,text=void 0===_props$text?"":_props$text,placeholder=_props.placeholder,mask=_props.mask,suggests=_props.suggests,title=_props.title,shim=_props.shim,className=_props.className,width=_props.width,isInactive=_props.isInactive,eraseText=_props.eraseText,eraseWidth=_props.eraseWidth,eraseBigText=_props.eraseBigText,onClick=_props.onClick,onEraseClick=_props.onEraseClick,refs=_props.refs,_state2=this.state,translation=_state2.translation,zoom=_state2.zoom,style={fontSize:0===zoom?null:this.fontSizeByZoom(zoom),transform:"translate(0, -"+translation+"px)"};refs({}),textElement=placeholder&&!text?React.createElement("div",{className:"text",ref:"innerField",style:style},placeholder):mask&&mask.inner.length===mask.shown.length?React.createElement(MaskedText,{mask:mask,style:style},text):React.createElement("div",{className:"text",ref:"innerField",style:style},text),suggests&&!function(){var array=suggests.array,_suggests$limit=suggests.limit,limit=void 0===_suggests$limit?2:_suggests$limit,onClick=suggests.onClick;suggestsElement=React.createElement("div",{className:"suggests "+(title?"with-title":"")},array.filter(function(suggest,id){return limit>id}).map(function(suggest){return React.createElement(Button,{onClick:onClick,text:suggest.replace(new RegExp("("+text+")","gi"),"*$1*").split("*").filter(function(a){return a}).reduce(function(memo,substring){return memo.concat(new RegExp(text,"i").test(substring)?React.createElement("span",{className:"highlight"},substring):substring)},[]),data:suggest,disableDefaultClass:!0})}))}(),title&&(titleElement=React.createElement("div",{className:"title "+(shim&&shim.hideTitle&&"inactive"||"")+" "+(suggests?"with-suggests":""),style:{width:Number(width)-20}},title)),shimElement=React.createElement("div",{className:"shim "+(shim?"active "+(shim.color||"grey"):"")},React.createElement("div",null,shim&&shim.template.replace("#{_}",title)||""));var containerMargin=Math.floor(Number(eraseWidth)+70*.336);return React.createElement("div",{className:"textfield "+(className||""),style:{width:width},onClick:onClick},React.createElement("div",{className:"field "+(isInactive?"inactive":""),ref:"outerField"},suggestsElement,React.createElement("div",{className:"text-container",style:{minWidth:"calc(100% - "+2*containerMargin+"px)",margin:"0 "+containerMargin+"px"}},textElement)),titleElement,shimElement,React.createElement(Button,{className:"erase option-button "+(isInactive?"hidden":"")+" "+(eraseBigText?"big-text":""),onClick:function(){Statistics.click({button:"backspace"}),onEraseClick()},text:eraseText||qiwi.i18n("buttons.erase"),width:eraseWidth}))}}]),Textfield}(Component),Textfield.propTypes={text:React.PropTypes.string,suggests:React.PropTypes.shape({array:React.PropTypes.array.isRequired,onClick:React.PropTypes.func.isRequired,limit:React.PropTypes.number}),placeholder:React.PropTypes.string,mask:React.PropTypes.shape({shown:React.PropTypes.string.isRequired,inner:React.PropTypes.string.isRequired}),shim:React.PropTypes.shape({template:React.PropTypes.string.isRequired,color:React.PropTypes.string,hideTitle:React.PropTypes.bool}),isInactive:React.PropTypes.bool,eraseText:React.PropTypes.string,eraseWidth:React.PropTypes.string,eraseBigText:React.PropTypes.bool,onEraseClick:React.PropTypes.func,onClick:React.PropTypes.func,className:React.PropTypes.string,width:React.PropTypes.string},Textfield.defaultProps={text:"",refs:function(){},onClick:function(){},onEraseClick:function(){},eraseBigText:!1,eraseWidth:133,width:600},_export("default",Textfield)}}});