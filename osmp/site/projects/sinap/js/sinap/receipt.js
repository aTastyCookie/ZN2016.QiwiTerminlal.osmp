"use strict";System.register(["constants/currency","../sinap","model/formatters","stores/payment","stores/provider","stores/terminal","stores/transaction"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var Currency,Sinap,SecureFormatter,Payment,Provider,Terminal,Transaction,_createClass,Element,Item,Receipt;return{setters:[function(_constantsCurrency){Currency=_constantsCurrency["default"]},function(_sinap){Sinap=_sinap["default"]},function(_modelFormatters){SecureFormatter=_modelFormatters.SecureFormatter},function(_storesPayment){Payment=_storesPayment["default"]},function(_storesProvider){Provider=_storesProvider["default"]},function(_storesTerminal){Terminal=_storesTerminal["default"]},function(_storesTransaction){Transaction=_storesTransaction["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Element=function(){function Element(config){_classCallCheck(this,Element),this.resolve=this.parse(config)||function(){return config.value||null}}return _createClass(Element,[{key:"parse",value:function(_ref){var type=_ref.type,value=_ref.value,field=_ref.field,items=_ref.items;switch(type){case"StaticSource":return function(){return value};case"NewLineSource":return function(){return"<br>"};case"FieldValueSource":return function(){var Field=Sinap.fieldNamed(field);return Field?Field.sensitive?Field.widget.toDisplay((new SecureFormatter).format(Field.innerValue)):Field.displayValue||Field.value:""};case"FieldTitleSource":return function(){var Field=Sinap.fieldNamed(field);return Field?Field.title:""};case"PaymentDateSource":return function(){return(new Date).toLocaleFormat("%d.%m.%Y %H:%M:%S")};case"GrossSumSource":return function(){return qiwi.utils.toSum(Transaction.pay)+" "+Currency.getCurrency(Provider.currency)};case"NetSumSource":return function(){return qiwi.utils.toSum(Payment.commissions.reverseSum(Transaction.pay))+" "+Currency.getCurrency(Provider.currency)};case"CommissionSumSource":return function(){return qiwi.utils.toSum(Payment.commissions.reverse(Transaction.pay))+" "+Currency.getCurrency(Provider.currency)};case"DeviceIdSource":return function(){return Terminal.id};case"ServiceNameSource":return function(){return Provider.shortName};case"CompoundSource":var elements=items.map(function(item){return new Element(item)});return function(){return elements.map(function(elements){return elements.resolve()||""}).join("")}}}}]),Element}(),Item=function(){function Item(_ref2){var type=_ref2.type,title=_ref2.title,value=_ref2.value;if(_classCallCheck(this,Item),!title||!value)throw new Error("Не указаны требуемые свойства элемента чека (title: "+title+", value: "+value+")");switch(type){case"TitleValueItem":this.title=new Element(title),this.value=new Element(value);break;default:throw new Error("Некорректный тип элемента в чеке: "+type)}}return _createClass(Item,[{key:"resolve",value:function(){return{title:this.title.resolve(),value:this.value.resolve()}}}]),Item}(),Receipt=function(){function Receipt(_ref3){var _ref3$items=_ref3.items,items=void 0===_ref3$items?[]:_ref3$items;_classCallCheck(this,Receipt),this.items=items.map(function(item){return new Item(item)})}return _createClass(Receipt,[{key:"data",get:function(){return this.items.map(function(item){return item.resolve()}).filter(function(item){return item.title&&item.value})}},{key:"printed",get:function(){return this.data.map(function(_ref4){var title=_ref4.title,value=_ref4.value;return{name:title.replace(/\s/g,"+"),value:value.replace(/\s/g,"+")}})}},{key:"virtual",get:function(){var receipt=this.data;if(!receipt||!receipt.length)return null;var hr="*".repeat(40);return(hr+"\n"+receipt.map(function(item){return item.title+": "+item.value}).join("\n"+hr+"\n")+"\n"+hr).replace(/<br>/g,"\n")}}]),Receipt}(),_export("default",function(config){return new Receipt(config)})}}});