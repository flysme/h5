/* 一些配置项 */
let FEDCONFIG = {
	//分页
	pagination : {
		page : 1,
		size : 10		//一页10条数据
	},
	//订单状态
	orderstatus: {
		unpaid: '待付款',
		paid: '待发货',
		delivery: '已发货',
		closed: '交易关闭',
		success: '交易成功',
		unconfirmed:'待确认',
	},
	//所有控件类型
	widgetViewKey: ['text_view', 'image_view', 'static_text_view', 'static_image_view',
		'sideslip_widget', 'timer_widget', 'mulit_images_widget', 'slider_widget',
		'tag_3_widget', 'tag_2_widget', 'tag_1_widget', 'richtext_view'],

	//点赞、收藏、订阅等事件标识
	uriActivitiesHash(key){
		let subscribeObj={
			verb:'subscribe',	//发请求时的verb参数值
			name:'订阅',
			statusKey: 'is_subscribe',	//标识当前状态的字段key，是否已订阅
			countKey: 'subscribe',			//标识当前总数的字段key，多少订阅量
		};

		let favorObj={
			verb: 'favor',
			name:"收藏",
			statusKey:'is_favor',
			countKey: 'favor',
		};

		let likeObj={
			verb: 'like',
			name: '点赞',
			statusKey: 'is_like',
			countKey: 'like',
		}
		//配置应该到这里截止，方法代码要拎出去
		let backSubcribeArr=['dingdone://subscribe/content','dingdone://subscribe/content_cancel'],
			backFavorArr=['dingdone://favor/favor','dingdone://favor/favor_cancel'],
			backLikeArr=['dingdone://like/like','dingdone://zan/zan','dingdone://zan/zan_cancel'];

		if(backSubcribeArr.indexOf(key)!=-1){
			return subscribeObj;
		}else if(backFavorArr.indexOf(key)!=-1){
			return favorObj;
		}else if(backLikeArr.indexOf(key)!=-1){
			return likeObj;
		}
	},
	//使用binging的视图
	viewUseBinding: ['text_view', 'image_view', 'static_text_view', 'static_image_view', 'sideslip_widget',
		'timer_widget', 'mulit_images_widget', 'slider_widget', 'tag_3_widget', 'tag_2_widget', 'tag_1_widget',
		'richtext_view', 'shopping_cart_operation_widget', 'search_widget', 'time_period_widget', 'time_single_widget','detail_component_sub_column'
	],
	//使用key_mapping的视图：组件及一些特殊控件（对应多个视图）用key_mapping，其他的都用binding）
	viewUseKeyMapping: [],
};

export default FEDCONFIG;
