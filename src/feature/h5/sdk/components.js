import Api from '@h5/api/index'
import APPCONFIG from '@h5/static/app_config.js';
import viewReaderSdk from '@h5/sdk/view_reader';
import UtilsService from "@h5/services/utils"

export default {
	expanding : null,
	getExpanding(){
		if( this.expanding ){
			return this.expanding;
		}else{
			let expanding = viewReaderSdk.collectExpandingField();
			this.setExpanding( expanding );
			return expanding;
		}
	},
	setExpanding( expanding ){
		this.expanding = expanding;
	},
	//判断页面是否包含筛选器/ 栏目栏组件
	hasFilter( pageId ){
		let components = APPCONFIG.components[ pageId ].children;
		let result = {
			count : components.filter( comp => comp.component_type == 'filter').length,
			filterNode : components.filter( comp => comp.component_ui == 'left_filter_node' || comp.component_ui == 'left_filter_menu'),
			filterMenu : components.filter( comp => comp.component_ui == 'filter_menu'),
		}
		return result;
	},
	//获取筛选器组件数据
	getFilterCompData( uri ){
		let pageId = viewReaderSdk.getPageIdWithUri( uri ),
				components = APPCONFIG.components[ pageId ].children,
				listComponents = components.filter( comp => comp.component_type == 'filter' ),
				compRequestParam = [];
		listComponents.map( comp => {
			compRequestParam.push({
				id : comp.id,
			});
		});
		return Api.getComponentsData({data:compRequestParam})
	},
	//整理请求组件数据时要带的参数
	getComponentsRequestPayload( pageId, componentType, filterData ){
		let components = APPCONFIG.components[ pageId ].children,
				expanding = this.getExpanding(),
				hasFilter = this.hasFilter(pageId);
		let filterNodeTrigger = hasFilter.filterNode && hasFilter.filterNode[0] && hasFilter.filterNode && hasFilter.filterNode[0].item_trigger && hasFilter.filterNode[0].item_trigger.target;
		let listComponents = components.filter( comp => comp.component_type != 'detail' && comp.component_type!='solidify' && comp.component_type!='filter' ),
				compRequestParam = [];
		listComponents.map( comp => {
			let conditions = [];
			let filterNodeTriggerIds = filterNodeTrigger && Object.values( filterNodeTrigger[0] );
			let isNodeTrigger = filterNodeTriggerIds && (filterNodeTriggerIds.indexOf( comp.id ) > -1);
			if( isNodeTrigger ){	//栏目栏数据
				let filterNodeId = hasFilter.filterNode[0].id,
						currentFilterNode = filterData[ filterNodeId ][0],
						currentFilterNodeCond = currentFilterNode.options[ currentFilterNode.default_index ].condition;
				conditions.push( currentFilterNodeCond );
			}
			compRequestParam.push({
				id : comp.id,
				conditions : conditions,
				expanding : expanding
			});
		});
		return compRequestParam;
	},
	//接收页面uri，获取页面数据
	getPageData(uri, contentId, filterData){
			//列表组件查询参数
			let pageId = viewReaderSdk.getPageIdWithUri( uri ),
					requestPayload = this.getComponentsRequestPayload(pageId, null, filterData),
					compParam = {	//列表组件数据
						pageNum : 1,
						data : requestPayload
					};
			if( contentId ){
				let componentRequestId = APPCONFIG.components.detail.id;
				compParam.data.push({
					id : componentRequestId,
					conditions : [{
							key : "id",
							operator : '=',
							value : contentId
					}],
					expanding : this.getExpanding()
				});
			}
			return Api.getComponentsDataWithPageNum( compParam )
	},
	//获取组件数据（不带分页）
	getComponentsData( param ){
		return Api.getComponentsData( param )
	},
	//获取组件数据（带分页）
	getComponentsDataWithPageNum( param ){
		return Api.getComponentsDataWithPageNum( param )
	},
	//获取详情
	getContentDetail( param ){
		return Api.getContentDetail( param )
	},
	//将组件数据重新组织，key为组件的viewid
	replaceDataWithViewId( pageId, json ){
		let _this = this,
				pageViewId = viewReaderSdk.getPageViewId(pageId),
				views = viewReaderSdk.getPageViews(pageViewId),
				mapping = viewReaderSdk.getDataMapping(pageId),
				fieldBindingMapping = viewReaderSdk.getFieldBindingMapping(views),
				components = APPCONFIG.components[ pageId ].children,  //页面下的所有组件，不区分普通还是浮动
				widgetList = viewReaderSdk.getWidgetList(pageId),
				fieldConditionMapping = viewReaderSdk.getFieldConditionMapping(viewReaderSdk.getPageViews(pageViewId)),
				result = {};
			components.forEach( (comp, compIndex) =>{
					let viewId = comp._view_id,
							compData = null,
							widgetViewIds = widgetList[viewId];
					if( comp.component_type == 'list' ){    //是列表组件→逐条处理数据
							compData = json[comp.id] || [];
							compData.forEach(compDataItem => {
									_this.handleCompDataItem(viewId, compDataItem, widgetViewIds, fieldBindingMapping, fieldConditionMapping );
							});
							result[viewId] = compData;
					}else if( comp.component_type == 'navigator' || comp.component_type == 'filter'  ){  //是导航器/栏目栏 → 数据不需要处理
							compData = json[comp.id];
							compData && (result[viewId] = compData);
					}else{      //是详情组件或固化组件 → 处理详情数据
							let detailData = json[ viewReaderSdk.getAppDetailId() ] || {},
									compData = JSON.parse(JSON.stringify(detailData));
							result[viewId] = _this.handleCompDataItem(viewId, compData, widgetViewIds, fieldBindingMapping, fieldConditionMapping );
					}

			});
			return result;
		},
		//处理每条组件数据
    handleCompDataItem(viewId, compDataItem, widgetViewIds, fieldBindingMapping, fieldConditionMapping) {
			let _this = this,
          widgetInfo = this.getWidgetFormat({
            viewId:viewId,
            compDataItem: compDataItem,
            widgetViewIds: widgetViewIds,
            mapping: fieldBindingMapping,
						userinfo : {}
            // userinfo : this.userInfo
          }, this);
      Object.assign( compDataItem, widgetInfo );
      compDataItem._widgetVisible = this.getWidgetVisible({
        compDataItem: compDataItem,
        widgetViewIds: widgetViewIds,
        mapping:fieldConditionMapping
      });
			return compDataItem;
    },
		/*格式化字段数据
		参数：
				compDataItem : 一条组件数据,
				widgetViewIds : 控件视图viewid列表,
				mapping : 控件绑定的字段配置
		返回值 key为控件viewid，value为格式化后的值*/
	getWidgetFormat(params, _that) {
		params = params || {};
		let _this = this;
		let result = {},
				widgetFieldName = {};	//控件绑定的字段名称
		let oriData = params.compDataItem;
		let widgetViewIds = params.widgetViewIds || {};
		//处理组件自带的绑定字段(如标题、索引图)
		let solidifyBind = params.mapping[ params.viewId ];
		for( let solidifyBindKey in solidifyBind ){
			let me = solidifyBind[ solidifyBindKey ];
			if (me.field_key) {
				let field_value = _this.getFieldValue( me.field_key, oriData, params);
				field_value = _this.stringifyFieldValue( field_value, me.data_type, me.tpl_text );
				result[ solidifyBindKey ] = field_value;
			}
		}
		if(Object.prototype.toString.call(widgetViewIds) != "[object Array]")return;
		//处理控件
		widgetViewIds.forEach(widgetViewId => {
			if (params.mapping[widgetViewId]) {
				let me = params.mapping[widgetViewId];
				if (me.field_key) {
					widgetFieldName[ widgetViewId ] = me.field_name;
					let field_value = _this.getFieldValue( me.field_key, oriData, params, widgetViewId);
					if( !field_value ){ //为字段赋默认值
						field_value = _this.assignDefaultValueField(field_value, me.data_type);
					}
					if( !me.data_type ){	//兼容后台配置binding中data_type缺失的情况
						if( me.field_key == 'unit_price' ){
							me.data_type = 'price'
						}
					}
					field_value = _this.stringifyFieldValue( field_value, me.data_type, me.tpl_text, widgetViewId, _that );
					result[ widgetViewId ] = field_value;

				}
			}
		});
		return {
			_widget : result,
			_widgetFieldName : widgetFieldName
		};
	},
	//取出字段值
	getFieldValue(field_key, oriData, params, widgetViewId) {
		let field_value = '',
			// global_params = globalDataService.global_params,
			arr = field_key.split('.'),
			_this = this;
		field_value = UtilsService.getDynamicParameterValue({
			paramStr: field_key,
			pageOption: {},
			targetData: oriData,
			detailData: oriData,
			widgetViewId : widgetViewId,
			userinfo: params.userinfo
		});
		return field_value;
	},
	//下拉刷新
	//上拉加载更多
	//根据字段类型输出所需格式的数据
	stringifyFieldValue( field_value, data_type, tpl_text, widgetViewId, _that ){
		let result = null,
				_this = this;
		switch (data_type) {		//进行字段格式化（配置）
			case 'image':
				result = UtilsService.getImgUrl(field_value);
				break;
			case 'image_list': 		//取出每一张图进行拼接
				if ((field_value instanceof Array) && field_value.length > 0) {
					let tempArr = [];
					field_value.forEach(function(item, index) {
						tempArr.push(UtilsService.getImgUrl(item));
					});
					result = tempArr;
				}
				break;
			case 'text':	//如果是富文本，截取<body></body>
				if (field_value) {
					let htmlStr = '',
						bodyStart = field_value.split('<body>'),
						bodyEnd = field_value.split('</body>');
					if (bodyStart.length > 1 && bodyEnd.length>1 ){
						htmlStr = field_value.split('<body>')[1].split('</body>')[0];
						// htmlStr=htmlStr.replace(/<style(([\s\S])*?)<\/style>/g, '');//特殊处理带有style标签
					}

					result = htmlStr;
					/*
			    let Rich = wx.getStorageSync('RichtextSize');
          if (Rich.status) {
            if (htmlStr.match(/font-size:\s*\d*px/g) != null) {
              htmlStr = htmlStr.replace(/font-size:\s*\d*px/g, `font-size:${Rich.size}px`)
            } else {
              let htmlmatch = htmlStr.match(/style\s*=\s*('[^']*'|"[^"]*")/);
              if (htmlmatch == null) {
                htmlStr = '<div style="font-size:' + Rich.size + 'px">' + htmlStr + "</div>";
              } else {
                htmlmatch = htmlmatch[0].substring(htmlmatch[0].indexOf("=") + 1, htmlmatch[0].length);
                let strmatch = `${htmlmatch.replace(/(['\"?])/g, "")}font-size:${Rich.size}px;`;
                htmlStr = htmlStr.replace(/style\s*=\s*('[^']*'|"[^"]*")/, 'style="' + strmatch + '"');
              }
            }
          }


					WxParse.wxParse(widgetViewId, 'html', htmlStr, _that, 0, {
						parseSuccessCallback : function( html ){
							_that.pageData.BASKET.wxParseData[widgetViewId] = html[widgetViewId];
						},
						wxParseImgLoadCallback : _that.wxParseImgLoadCallback,
					});
					*/
				} else {
					result = {};
				}
				break;
			case 'price':		//如果是价格字段，处理现价
				result = UtilsService.formatDataField(field_value && (field_value.now || field_value.origin), tpl_text);
				break;
			case 'address': 	//如果是位置字段，判断是否需要格式化
				result = tpl_text ? UtilsService.formatDataField(field_value, tpl_text) : (field_value ? field_value.address : '');
				break;
			case 'datetime':
				result=UtilsService.formatDataField(field_value,tpl_text);
				break;
			default:		//正常处理字段值
				if( field_value instanceof Object && field_value.host ){	//兼容后台配置data_type为空的情况
					result = this.getImgUrl(field_value);
				}else{
					result = UtilsService.formatDataField(field_value, tpl_text);
				}
		}
		return result;
	},
	//比较两个值
	conditionCompare( fieldValue, aim, op ,leftValue){
		let result = true;
		switch (op) {
			case '>':
				result = fieldValue > aim;
				break;
			case '<':
				result = fieldValue < aim;
				break;
			case '=':
				if (leftValue.indexOf('{{user.is_logged_in}}')>-1){
					result = aim === '0' ? false : true;
			    }else{
				   result = fieldValue == aim;
				}
				break;
			case '>=':
				result = fieldValue >= aim;
				break;
			case '<=':
				result = fieldValue <= aim;
				break;
			case '!=':
				result = fieldValue != aim;
				break;
			case 'contains':
				result = fieldValue.indexOf( aim ) > -1;
				break;
			case 'not_contains':
				result = fieldValue.indexOf( aim ) == -1;
				break;
		    case 'true':
		        if (leftValue.indexOf('{{user.is_logged_in}}')>-1 && aim == 1){
		        	result = true;
			  	}else if (leftValue.indexOf('{{user.is_logged_in}}') > -1 && aim == 0) {
		          	result = false;
		        }else{
		            result = true;
		        }
		    	break;
			/*
			case 'startswith':	//以什么开头
				result = true;
				break;
			case 'endswith':	//以什么结尾
				result = true;
				break;
			case 'has':			//包含
				result = true;
				break;
			case 'has_any':		//任意匹配
				result = true;
				break;
			case 'has_all':		//完全匹配
				result = true;
				break;
			case 'in':			//包含
				result = true;
				break;
			case 'between':			//区间(datearea)
				result = true;
				break;
			case 'near':			//附近(address)
				result = true;
				break; */
		}
		return result;
	},
	/*根据筛选条件判断控件是否可见 参数：
			compDataItem : 一条组件数据,
			widgetViewIds : 控件视图viewid列表,
			mapping : 控件视图的筛选条件
		返回值 key为控件viewid，value为布尔值（是否可见）*/
	getWidgetVisible( params ){
		let result = {};
		let widgetViewIds = params.widgetViewIds || {};
		let _this = this;
		widgetViewIds.forEach( function( widgetViewId ){
			if( params.mapping[ widgetViewId ] ){
				let condition = params.mapping[ widgetViewId ][0];
				if( condition && condition.conditions.length ){
                    let conditionResult = condition.connector == 'and';
					let conditions = condition.conditions;
					conditions.forEach( function( eachCond ){
						let fieldKey = eachCond.left_value.replace('{{','').replace('}}',''),
							fieldValue = params.compDataItem[ fieldKey ],
              eachCondResult = _this.conditionCompare(fieldValue, eachCond.right_value, eachCond.op, eachCond.left_value);
              condition.connector == 'and' ? (conditionResult = conditionResult && eachCondResult) : (conditionResult = conditionResult || eachCondResult);
					});
                    result[widgetViewId] = conditionResult;
				}else{
                    result[widgetViewId] = true;
                }
			}else{
				result[ widgetViewId ] = true;
			}
		});
		return result;
	},
	//为字段赋默认值
	assignDefaultValueField(field_value, data_type){
		switch (data_type) {
			case 'number':
				field_value = field_value || '0';
				break;
		}
		return field_value;
	},

}
