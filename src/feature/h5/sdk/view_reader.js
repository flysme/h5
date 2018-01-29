/* 获取id等统一在此维护，之后config结构如果变动，只需修改该文件中代码即可 */
import APPCONFIG from '@h5/static/app_config.js';
import fedConfig from '@h5/static/fed_config';
import UriService from '@h5/services/uri';
import utilsService from "@h5/services/utils"

console.log('该app详情id：',APPCONFIG.components.detail.id);
console.log('---APPCONFIG---');
console.log(APPCONFIG);

/* 各种获取viewid、id之类的方法 */
const viewReaderSdk = {
	/* 获取首页uri */
	getFirstPageUri : () => { return APPCONFIG.pages.first_page },
	/* 该app取详情数据的请求参数id */
	getAppDetailId(){
		return APPCONFIG.components.detail.id;
	},
	/* 从uri中提取出pageid */
	getPageIdWithUri : url => {
		let parseResult = UriService.parse( url );
		return parseResult.params && parseResult.params.module_id || '';
	},
	/* 获取app的guid */
	getGuid(){
		return APPCONFIG.app.appInfo.guid;
	},
	/*	根据页面php_id 获取 页面view_id */
	getPageViewId( pageOriId ){
		return this.getPageInfo( pageOriId ).view_id;
	},
	/*	根据页面php_id 获取 页面信息 */
	getPageInfo( pageOriId ){
		pageOriId = pageOriId.toString();
		return APPCONFIG.pages.pages[ pageOriId ];
	},
	/*	根据页面php_id 获取页面下组件的 view_id集合
		第二个参数为组件类型标识，默认是普通组件，浮动组件标识为float */
	getComponentsViewIds( pageOriId, type ){
		let typeHash = {	//key为注释里写的组件类型标识，value为配置类型真实的key
			float : 'float_components'
		};
		let key = typeHash[ type ] || 'components';
		let pageViewId = this.getPageViewId( pageOriId ),
			arr = APPCONFIG.modules[ pageViewId ][ pageViewId ][ key ] ||[];
		return arr;
	},
	/*	根据页面php_id 获取页面下组件的 id集合 */
	getComponentsIds( pageOriId ){
		let children = APPCONFIG.components[ pageOriId ].children,
			ids = [];
		children.forEach( child => {
			ids.push( child.id );
		});
		return ids;
	},
	/*	根据页面php_id 获取页面下组件的 list */
	getComponentsList( pageOriId ){
		let children = APPCONFIG.components[ pageOriId ].children,
			needList = [];
		children.forEach( child => {
			if(child.component_type === 'list'){
				needList.push(child.id)
			}
		});
		return  needList;
	},
	//获取当前试视图下所有控件
	getwidgetIds(views){
		//当前可用的控件views
		let widgetArr = fedConfig.widgetViewKey,
		list=[];
		for (let pageId in views) {
			for (let ids in widgetArr){
				if (views[pageId]['view'] == widgetArr[ids]){
					list.push(pageId);
				}
			}
		}
		return list;
	},
	/* 根据页面view_id获取页面下所有视图 */
	getPageViews( pageViewId ){
		return APPCONFIG.modules[ pageViewId ];
	},
	/*  根据页面类型标识，取出同一类型的页面列表
				普通页(standard)
		 */
		getPagesWitType( type ){
				let allPage = APPCONFIG.pages.pages,
						list =[];
				for( let pageId in allPage ){
						let page = allPage[ pageId ];
						if( page.module_type === type ){
								list.push( page )
						}
				}
				return list;
		},
	/* 根据页面view_id获取页面下组件包含的控件列表 */
	/* key为组件视图id，value为控件view_id集合 */
	getWidgetList( pageOriId ){
		let result = {};
		let keys = ['tile_widget', 'indexpic_float_widget', 'item_float_widget','content_layout'];
		let pageViewId = this.getPageViewId( pageOriId ),
			componentsViewIds = this.getComponentsViewIds( pageOriId ).concat( this.getComponentsViewIds( pageOriId,'float' ) ),	//页面下的所有组件
			views = this.getPageViews( pageViewId );	//页面下的所有视图
		let recursive = ( view, compViewId ) => {
			if( view.subviews ){
				view.subviews.forEach(function( subviewId ){
					result[ compViewId ].push( subviewId );
					recursive( views[ subviewId ], compViewId );
				});
			}
			if( view.float_views ){
				view.float_views.forEach(function( subviewId ){
					result[ compViewId ].push( subviewId );
					recursive( views[ subviewId ], compViewId );
				});
			}
		};
		componentsViewIds.forEach(function(compViewId){
			result[ compViewId ] = [];
			let me = views[ compViewId ];
			if (me.view == 'detail_component_column' || me.view == 'detail_component_table' ){
				result[compViewId] = me.rows || [];
			}else{
				for (let key of keys) {
					let viewId = me[key];	//获得扩展的控件
					if (viewId) {
						recursive(views[viewId], compViewId);
					}
				}
			}
		});
		return result;
	},
	/*  获取请求组件列表内容数据的ids
				演示数据：
				modules : {
						<view_id> : { ori_module_id : 模块php_id，id : 模块取数据id}
				}
				components : {
						<view_id> : { ori_component_id : 组件php_id，id : 组件取数据id，dynamic_conditions：动态筛选条件 }
				}
		*/
	getDataMapping : function( pageId ){
				let componentsMapping = {},
			componentsIdMapping = {},
					pageViewId = this.getPageViewId( pageId ),  //页面的view_id
			compIdHash = {};    						//做一次缓存，key为组件的php_id，value为组件的child信息
				//--处理组件的mapping--
		let children = APPCONFIG.components[ pageId ].children,
			childrenObject = {};
				children.forEach( child => {
						let compOriId = child.ori_component_id;
						compIdHash[ child.ori_component_id ] = child;
			childrenObject[ compOriId ] = child;
				});
				let currentPageViews = APPCONFIG.modules[ pageViewId ], //当前页面下的视图
			float_component = currentPageViews[ pageViewId ].float_components || [],
						componentsViewIds = currentPageViews[ pageViewId ].components.concat( float_component ) || [];   //页面下包含的组件
		componentsViewIds.forEach( (compViewId, compIndex) =>{   //遍历每一个视图
			let compOriId = currentPageViews[ compViewId ].__meta__.ori_component_id;   //获得组件的php_id
			if(childrenObject[ compOriId ]){
				childrenObject[ compOriId ]._view_id = compViewId;
				let	currentCompIdHash = compIdHash[ compOriId ] || {},
					id = currentCompIdHash && currentCompIdHash.id || '',
					dynamic_conditions = null;
				componentsMapping[ compViewId ] = {
									ori_component_id : compOriId,
									id : id,
							};
				if( currentCompIdHash.component_ui == 'component_filter_node' ){	//使用动态分类的栏目栏
					componentsMapping[ compViewId ].filter_item_conditions = currentCompIdHash.filter_item_dynamic_conditions;
				}else{
					componentsMapping[ compViewId ].conditions = currentCompIdHash.dynamic_conditions || [];
				}
				id && (componentsIdMapping[ id ] = compViewId);
			}
				});
		//注意此处components 和 componentsIdMapping个数可能不相等，因为固化组件无id
				return {
			childrenObject : childrenObject,
						components : componentsMapping,
			componentsIdMapping : componentsIdMapping
				};
		},
	//获取控件绑定字段及配置格式化字典
	//返回字典key为字段的view_id，value为字段和配置
	getFieldBindingMapping( views ){
		let result = {},
			viewUseBinding = fedConfig.viewUseBinding;
		for( let viewId in views ){
			let me = views[ viewId ],
				viewKey = me.view;
			if ( viewUseBinding.indexOf(viewKey ) > -1 ){
				result[viewId] = me.__meta__.__binding__;
			}else{
				result[viewId] = me.__meta__.__key_mapping__;
			}
		}
		return result;
	},
	//需要展开的字段
	collectExpandingField(){
		let result = [],
			fieldKeys = [],
			viewUseBinding = fedConfig.viewUseBinding;
		for( let pageViewId in APPCONFIG.modules ){
			let views = APPCONFIG.modules[ pageViewId ];
			for( let viewId in views ){
				let me = views[ viewId ],
					viewKey = me.view;
				if ( viewUseBinding.indexOf(viewKey ) > -1 ){
					fieldKeys.push( me.__meta__ && me.__meta__.__binding__ && me.__meta__.__binding__.field_key || '' );
				}else{
					let keyMapping = me.__meta__ && me.__meta__.__key_mapping__ && me.__meta__.__key_mapping__;
					for( let m in keyMapping ){
						fieldKeys.push( keyMapping[m].field_key );
					}
				}
			}
		}
		let newSet = Array.from(new Set(fieldKeys));
		for( let setValue of newSet ){
			if( setValue && setValue.split('.').length > 2 ){
				result.push( setValue.split('.')[1] );
			}
		}
		result = Array.from(new Set(result));
		return result.join();
	},
	//获取组件下的所有控件
	getFieldConditionMapping( views ){
		let result = {};
		for( let viewId in views ){
			let me = views[ viewId ];
			if( me.__meta__ && me.__meta__.__ui_control__ ){
				result[ viewId ] = me.__meta__.__ui_control__;
			}
		}
		return result;
	},
	shareUrlList : ['dingdone://share','dingdone://sys_share','dingdone://share_app'],
	hasShareUrl(url){
		let bool = false;
		for(let val in this.shareUrlList){
			if(url.indexOf(this.shareUrlList[val]) > -1){
				bool = true;
			}
		}
		return bool;
	},
	//获取组件下的所有控件
	getHasShareMapping( views,userInfo ){
		let result = {};
		for( let viewId in views ){
			let me = views[ viewId ];
			if( views[ viewId ].__meta__ && me.__meta__.__event__ && me.__meta__.__event__.default_uri ){
				views[ viewId ].__meta__.hasShare = this.hasShareUrl(me.__meta__.__event__.default_uri);
				views[ viewId ].__meta__.hasConversation = me.__meta__.__event__.default_uri == 'dingdone://im_service/conversation';
			}
		}
		return views;
	},
	filterLimitIds(filterArr,conditionIds,mapping){
		let filterIds = [];
		filterArr.forEach(function(item,index){
			//处理数据请求条件
			let php_id = mapping.components[item].id;
			filterIds = conditionIds.filter(function (val, index, arr) {
				return val.id != php_id;
			});
			conditionIds = filterIds;
		});
		return filterIds;
	},
	//初始化搜索功能模块数据源对应view
	initModelView(components,modules){
		let mapping = {};
		for(let view in modules){
			modules[view].__meta__ && modules[view].__meta__.__model__ && ( mapping[modules[view].__meta__.__model__] = view)
		}
		return mapping;
	},
	//获取配置文件中的order_extra_fields扩展字段的信息
	getExtraFieldsInfo(args){
		let originDynamicData =APPCONFIG.order_extra_fields,
			dynamicDataMapping={};
		//解析默认参数
		for(let model_id in originDynamicData){
		    for(let group of originDynamicData[model_id]){
		        for(let field of group.fields){
		            if(field.default_value && field.default_value.indexOf('{{') > -1){
		            	let params={
		            		paramStr: field.default_value,
		            		pageOption: {},
		            		detailData: {},
		            		userinfo: {}
		            	}
		            	//判断参数是否包含相应的参数
		            	if(args.pageOption) params['pageOption']=args.pageOption;
		            	if(args.detailData) params['detailData']=args.detailData;
		            	if(args.userinfo) params['userinfo']=args.userinfo;
		            	//处理带全局参数的value
		                field.default_value = utilsService.getDynamicParameterValue(params)
		            }
		            //初始化有默认值的
		            dynamicDataMapping[field.key] = field.default_value;
		            //初始化默认选择的
		            if(field.widget_type=="single_picker"){
		                dynamicDataMapping[field.key] = field.options[field.default_option_index];
		            }
		        }
		    }
		}

		return {
			originDynamicData,
			dynamicDataMapping
		}
	},
    //遍历pages取出不同功能模块 sku面板 支付面板 搜索页
    initFuncmodule(){
    	let _this=this,
    		pages=APPCONFIG.pages.pages,
    		resultObj={};
        for( let page_id in pages ){
	  		if( pages[page_id].uri && pages[page_id].uri.indexOf('dingdone://sku_page') > -1){
                let views = _this.getPageViews(pages[page_id].view_id);
                if( views ){
               		resultObj['skuData']={
                    	VIEWS : views,
                    	skuView : pages[page_id].view_id,
                    };
                }
	  		}else if(pages[page_id].uri && pages[page_id].uri.indexOf('dingdone://module_pay') > -1){
                let views = _this.getPageViews(pages[page_id].view_id);
                 if( views ){
                		resultObj['chargeData']={
	                     	VIEWS : views,
	                     	chargeView : pages[page_id].view_id,
	                    };
                 }
            }else if(pages[page_id].uri && pages[page_id].uri.indexOf('search_container') > -1){
            	resultObj['hasSearch']=true;
            }
	  	}
	  	return resultObj;
    }
};
export default viewReaderSdk;
