"use strict";System.register(["actions/appUpdate"],function(_export,_context){var UPDATE_PAGE,initialState;return{setters:[function(_actionsAppUpdate){UPDATE_PAGE=_actionsAppUpdate.UPDATE_PAGE}],execute:function(){initialState={header:null,preloader:{title:"Загрузка"},popup:null,logo:null,pageData:null,navigation:null,reactClass:null,pageRef:null,modal:null},_export("default",function(){var state=arguments.length<=0||void 0===arguments[0]?initialState:arguments[0],_ref=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],type=_ref.type,_ref$data=_ref.data;_ref$data=void 0===_ref$data?{}:_ref$data;var pageData=_ref$data.pageData,header=_ref$data.header,preloader=_ref$data.preloader,popup=_ref$data.popup,logo=_ref$data.logo,navigation=_ref$data.navigation,reactClass=_ref$data.reactClass,pageRef=_ref$data.pageRef,modal=_ref$data.modal;switch(type){case UPDATE_PAGE:return Object.assign({},state,{pageData:pageData,header:header,preloader:preloader,popup:popup,logo:logo,navigation:navigation,reactClass:reactClass,pageRef:pageRef,modal:modal});default:return state}})}}});