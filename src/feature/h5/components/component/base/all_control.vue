<template>
	<div>
		<!-- 以视图view_key为类名，view_id为id-->
		<div v-if=" VIEWS[ item ].view != 'image_view' "  :class="[{'hidden':(!componentData._widget[item] && VIEWS[item].no_data_gone_enabled) || !componentData._widgetVisible[item]}]" >


			<!--  :class="[{'hidden':!componentData['_widget'][item]&&VIEWS[ item ].no_data_gone_enabled || componentData._widgetVisible[item]==false}]"  -->
			<!-- 文本控件 && data._widgetVisible[item] -->
			<!-- <text-view v-if="VIEWS[ item ].view == 'text_view' " :data="{VIEWS:VIEWS,item:item,componentData:componentData}"></text-view>  -->
			<!--
			-VIEWS:所有的视图数据
			-item:当前传入的控件ID
			-componentData:当前组件的数据
			-->
			<component
			v-for="(control,idx) in controls"
			v-if="VIEWS[ item ].view == control"
			:is="control"
			:data="{VIEWS:VIEWS,item:item,componentData:componentData}"
			:key='idx'
			></component>
			<!-- 固定文本控件 -->
			<!-- <static-text-view v-if="VIEWS[ item ].view == 'static_text_view'" :data="{VIEWS:VIEWS,item:item,componentData:componentData}" ></static-text-view> -->


		</div>
		<div v-else  :class="[{'hidden' : !componentData._widget[item] && !VIEWS[ item ].placeholder.img_url && VIEWS[item].no_data_gone_enabled},{'hidden':!componentData._widgetVisible[item]}]" >

			<!-- :class="[{'hidden':!componentData['_widget'][item]&&VIEWS[ item ].placeholder.img_url&&VIEWS[ item ].no_data_gone_enabled || componentData._widgetVisible[item]==false}]" -->
		<!-- 图片控件 -->
			<image-view v-if="VIEWS[ item ].view == 'image_view' " :data="{VIEWS:VIEWS,item:item,componentData:componentData}" ></image-view>
		</div>
	</div>
</template>
<script>
	import text_view from '@h5/components/component/base/text_view';						//文本控件
	import tag_1_widget from '@h5/components/component/base/floating_widget';				//浮导式标签
	import tag_2_widget from '@h5/components/component/base/icon_widget';					//图标式标签
	import imageView from '@h5/components/component/base/image_view';					//图片控件
	import tag_3_widget from '@h5/components/component/base/linking_view';				//连接式标签
	import mulit_images from '@h5/components/component/base/mulit_images_widget';		//九宫图
	import richtext_view from '@h5/components/component/base/richtext_view';				//富文本
	import search_widget from '@h5/components/component/base/search_widget';				//搜索控件
	import sideslip_widget from '@h5/components/component/base/sideslip_widget';			//多图横滑
	import slider_widget from '@h5/components/component/base/slider_widget';				//多图幻灯
	import static_image_view from '@h5/components/component/base/static_image_view';		//固定图片
	import static_text_view from '@h5/components/component/base/static_text_view';		//固定文本控件
	import time_period_widget from '@h5/components/component/base/time_period_widget';	//时间段控件
	import shopping_cart_operation_widget from '@h5/components/widget/shopping_cart_operation_widget';	//购物车数量加减控件
	export default{
		components:{
			text_view,
			tag_1_widget,
			tag_2_widget,
			imageView,
			tag_3_widget,
			mulit_images,
			richtext_view,
			search_widget,
			sideslip_widget,
			slider_widget,
			static_image_view,
			static_text_view,
			time_period_widget,
			shopping_cart_operation_widget
		},
		props:{
			data:Object
		},
		data(){
			return{
				controls:['text_view','tag_1_widget','tag_2_widget','tag_3_widget','mulit_images','richtext_view','search_widget','sideslip_widget','slider_widget','static_image_view','time_period_widget','static_text_view','shopping_cart_operation_widget']
			}
		},
		computed:{
			VIEWS(){
				return this.data.VIEWS
			},
			item(){
				return this.data.item
			},
			componentData(){
				return this.data.componentData
			}
		}
	}
</script>
