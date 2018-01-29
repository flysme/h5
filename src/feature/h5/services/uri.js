import APPCONFIG from "@h5/static/app_config.js"

import UtilsService from "@h5/services/utils"
import { pageStore } from "@h5/store/index"

const services = {
	/**
	* 拿到拼接好的uri链接
	* @param  {string}
	*				  {string} url 参数字符串，eg: {{dingdone://module?module_id=xxxx&pageid=xxxxx}}
	* @return {Object} 返回参数值，eg: {{{key:dingdone://module,originparams:'id=xxx&page=xxx',params:{id:xxx,page:xxx}}}}
	*/
	parse(url){
		url = decodeURIComponent(url);
		if (url.indexOf("dingdone://")< 0) return;
		//分割链接拼接参数
		let currentKey,
				currentParamsObj={},
				currentLinkParams;
		if (url.indexOf('?') >= 0 && url.indexOf('&') >= 0) {
			let urlArr = url.split('?');
					currentKey = urlArr[0];
			let paramsArr = urlArr[1].split("&");
					currentLinkParams = urlArr[1];
			paramsArr.forEach(function (item, index) {
				let dataArr = item.split('=');
				let key = dataArr[0], value = dataArr[1];
				currentParamsObj[key] = value;
			});
		} else if (url.indexOf('?') >= 0){
				let urlArr = url.split('?');
						currentKey = urlArr[0];
				let dataArr = urlArr[1].split('=');
				let key = dataArr[0], value = dataArr[1];
						currentParamsObj[key] = value;
		}else{
				currentKey = url;
		}
		let result = {
				key: currentKey,
				params: currentParamsObj,
				originparams: currentLinkParams
		};
		return result;
	},
	/**
	* uri对象 转为 uri字符串
	* @param  {object}
	*				  {object} url 参数字符串，eg: eg: {{{key:dingdone://module,params:{module_id:xxx,pageid=xxx}}}}
	* @return {string} 返回参数值，eg: {{dingdone://module?module_id=xxxx&pageid=xxxxx}}
	*/
  stringifyUrl(parseObj){
	    let params = parseObj.params,
	        paramsCache = [];
	    for( let paramKey in params ){
	        let paramValue = params[paramKey];
	        paramsCache.push( paramKey + '=' + ( paramValue instanceof Object ? JSON.stringify( paramValue ) : paramValue ) );
	    }
	    return paramsCache.length>0 ? ( parseObj.key + '?' + paramsCache.join('&') ) : parseObj.key;
	},
	/*
	* 接收（uri字符串，页面参数，当前详情数据，点击的某一条列表数据），匹配字符串中的参数，
	* @param  uri  {string}
	* @param  pageOption  {object} pageOption  当前页面的参数
	* @param  currentDetailData  {object} 详情页数据
	* @param  targetData  {object} 当前组件数据
	* @return {string} uri 返回匹配后的uri
	*/
	UriDynamicParameter(uri, pageOption, currentDetailData, targetData) {
		if( !uri ){
			return ''
		}

		let parseResult = this.parse(uri),
			copy = JSON.parse(JSON.stringify(parseResult.params));
		for (let paramKey in copy) {
			let dynamicParameter = copy[paramKey],
				paramStr = UtilsService.destructionForamt(dynamicParameter).paramStr,
				paramStrReplace = paramStr.replace('{{', '').replace('}}', ''),
				paramValue = '';
			if (paramStr === paramStrReplace ){	//是固定值
				paramValue = copy[paramKey];
			}else{		//是参数
				//判断currentDetailData是否是空对象
				let isEmptyDetailData=UtilsService.isEmptyObj(currentDetailData);

				paramValue = UtilsService.getDynamicParameterValue({
					paramStr: paramStr,
					pageOption: pageOption,
					targetData: targetData,
					detailData: currentDetailData,
					userinfo: {}
				});
			}
			let formatResult = UtilsService.formatDataField(paramValue, dynamicParameter );
			copy[paramKey] = formatResult;
		}
		let newUri = this.stringifyUrl({
			key: parseResult.key,
			params: copy
		});
		return newUri;
	},
	/*判断组件控件权限*/
	dealDynamicUrlParams(dataset, default_uri, pageData,pageOption){
		if(!default_uri)return;
		let _this=this,
				url= '';
		// let allResId = Client.getStorage('currentresidarr');

		//拿取列表内容ID
		// if (dataset.componentViewId && dataset.componentData && allResId.indexOf(dataset.componentViewId)!=-1) {
		// 	let tempArr = [{ 'res_id': dataset.componentViewId, 'record_id': dataset.componentData.id || '' }]
		// 	PromiseService.getComponentPermisson({ 'resource_infos': tempArr }, pageData, function (newurl) {
		// 		default_uri=newurl;
		// 		_this.dealDynamicParams(dataset, default_uri);
		// 	});
		// }else{
		// 	_this.dealDynamicParams(dataset, default_uri);
		// }
		// 处理动态参数
		url = _this.dealDynamicParams(dataset,default_uri,pageOption);
		return url;
	},
	/*
	*处理动态参数  将处理好的uri返回
	* @params {object}  dataset
	* @params {string} default_uri   uri
  * @params {object} pageOption   页面参数
	* @return newuri  处理好的uri
	*/
	dealDynamicParams(dataset,default_uri,pageOption){
			let copy = JSON.parse(JSON.stringify(this.parse(default_uri).params)),
					uri = '';
			 for( let paramKey in copy ){
					 let paramValue = copy[ paramKey ];  //参数值
					 if( paramValue == paramValue.replace('{{','') ){
						 copy[ paramKey ] = paramValue
					 }else{
						 copy[ paramKey ] = UtilsService.getDynamicParameterValue({
							 paramStr: paramValue,
							 pageOption: pageOption,
							 targetData: dataset.componentData,
							 detailData: dataset.componentData,
							 userinfo: {}
						 });
					 }
			 }
				 uri = this.stringifyUrl({
						 key : this.parse(default_uri).key,
						 params : copy
				 })

				 uri = uri.indexOf('?') == -1 ? uri+'?content_id={{id}}' : uri;
				 uri = uri.indexOf('content_id={{id}}') == -1 ? uri : uri+ '&content_id={{id}}';
			return uri;
	},
	 /*
	 *处理组件uri
	 * 将参数传入，将处理好的uri返回
	 *  @param  {object}
	 *					{object}  eg: {{{data:{拿到页面数据data,view},option:{module_id:xxx,page.GuF9gh"xxx}}}}
	 *  @return {string}  url 参数字符串，  {{dingdone://module?module_id=xxxx&pageid=xxxxx}}
	 */
	getUri(params,flog){
		let dataset = params.data;
		if(!dataset)return;
		let pageOption =pageStore.state.pageOption || {},
		  	default_uri = dataset && dataset.componentView && dataset.componentView.__meta__ && dataset.componentView.__meta__.__event__ && dataset.componentView.__meta__.__event__.default_uri,
				//处理不同情况的跳转页面
				event = flog ?  this.dealListUri(dataset,default_uri,pageOption) : this.dealWidgeturi(dataset,default_uri,pageOption);
				//处理权限
				event = this.dealDynamicUrlParams(dataset,event,pageOption)
			return event;
	},
	/*
	 *处理组件uri
	 * @params   {object} dataset  当前组件的data数据
	 * @params  {string} default_uri _meta_绑定的uri
	 * @params  {object} pageOption  uri自带的参数
	 * @return  {string} uri     处理好的uri
	*/
	dealListUri(dataset,default_uri,pageOption){
		// 默认处理导航器跳转uri
		let uri = dataset.url || '',
				events = dataset.componentData&&dataset.componentData.event ? dataset.componentData.event :'';
		if(!uri){
			// 走默认详情和event
			uri = this.dealDefaultUri(dataset,default_uri);
			// 走指定了跳转页
			if(default_uri && this.parse(default_uri).key != 'dingdone://detail/default' &&  ((!events) )){
					uri= this.dealDynamicParams(dataset,default_uri,pageOption);
					console.log('走指定了跳转页----uri',uri)

			}
		}

		return uri;
	},


	/*
	*处理控件uri
	* 将参数传入，将处理好的uri返回
	*  @param  {object}    eg: {{{data:{拿到页面数据data,view},option:{module_id:xxx,page.GuF9gh"xxx}}}}
	*  @param  {string}  default_uri    _meta_绑定的uri
	* @params  {object} pageOption  uri自带的参数
 	*  @return {string}  url 参数字符串，  {{dingdone://module?module_id=xxxx&pageid=xxxxx}}
	*/
	dealWidgeturi(dataset,default_uri,pageOption){
		let	widgetUrl = dataset.uri || '',
				events = dataset.componentData&&dataset.componentData.event? dataset.componentData.event :'';
			  //控件固定跳转uri
			  if(dataset.url){
					 widgetUrl = dataset.url;
				}
				if (!widgetUrl&&events != "dingdone://detail" && events != "dingdone://detail/default"){
								widgetUrl = events;
				}
				// 此时走控件_meta_或者默认详情
				if(!widgetUrl)widgetUrl=default_uri;
				if(!widgetUrl){
					    let isDetailComponent = dataset.componentView && dataset.componentView.__meta__ && dataset.componentView.__meta__.__is_detail_component__;
							if ( isDetailComponent === false ){ //是列表组件（ 不是详情组件，也不是控件，控件该值为undefined）
											 widgetUrl = 'dingdone://detail/default';
							 }else{
								 if (dataset.componentData && dataset.componentData.event) {
										   widgetUrl = dataset.componentData.event;
									}
							}
				}
				if( !widgetUrl ){
				 return;
		    }
				let parseResult = this.parse(widgetUrl);
				 if (parseResult.key == 'dingdone://detail/default'){
						widgetUrl = this.dealDefaultUri( dataset,widgetUrl);  //页面跳转
				 }
				//  this.currentDetailData xxx
				widgetUrl = this.UriDynamicParameter( widgetUrl, pageOption,dataset.currentDetail, dataset.componentData);
				console.log('pageOption',pageOption)
				// currentPageId
				let currentPageId = pageOption.module_id || '';
				widgetUrl = widgetUrl + ( widgetUrl.indexOf("?") > -1 ? "&pageid=" : "?pageid=" ) + currentPageId ;

		return widgetUrl;
	},

	/*
	 * 处理默认详情和event---uri情况并返回uri
	 * @params  {object}  dataset   eg: {{{data:{拿到页面数据data,view},option:{module_id:xxx,page.GuF9gh"xxx}}}}
	 * @params  {string}  default_uri  _meta_绑定的uri
	 * @return  {string}  url 参数字符串，  {{dingdone://module?module_id=xxxx&pageid=xxxxx}}
 	*/
	dealDefaultUri(dataset,default_uri){
			let uri = '',
			    events = dataset.componentData&&dataset.componentData.event,
					defaultDetails  =events && events != "dingdone://detail" && events != "dingdone://detail/default";


			// 跳转到event
			// 判断不是dingdone://detail和dingdone://detail/default
			if (defaultDetails){
							if(!events)return;
							uri = events.replace('{{id}}', dataset.componentData.id);
							console.log('dealDefaultUri---xxxx-----跳转到event',uri)
			}

			// 跳转到默认详情页 (用户配置dingdone://detail/default 或者未设置的情况下--为空的状态)
			if(!default_uri || (default_uri && this.parse(default_uri).key == 'dingdone://detail/default') || !defaultDetails){
					uri = this.dealDefaultDeatils(dataset);
					console.log('dealDefaultUri---1-----跳转到默认详情页',uri)
			}
			console.log('dealDefaultUri---3-----结束判断有木有走dealDefaultUri-',uri)
			return uri;
	},
	/*
	 * 拼接默认详情uri
	 * @params  {object} dataset
	 * @return {string} 拼接好的uri
	*/
	dealDefaultDeatils(dataset){
		//兼容下为空的状态
		 let model = dataset.componentData && dataset.componentData.model,
				 pages = APPCONFIG.pages.pages,
				 defaultDetail = null,
				 uri='';
		 for( let pageId in pages ){
				 let page = pages[ pageId ];
				 if( page.model == model && page.default_detail ){
						 defaultDetail = page;
						 break;
				 }
		 }
		 if( defaultDetail ){  //找到默认详情页
				 uri = 'dingdone://module?module_id='+ defaultDetail.id +'&content_id={{id}}';
		 }
		 return uri;
	}
}
export default services;
