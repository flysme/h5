<template>
	<div>
		<!-- 视频列表组件 -->
	  	<!-- 引入占位图 -->
	  	<!-- <include wx:if="{{VIEW[viewId].nodata_layout_visible && componentData.length <= 0}}" src="../base/extend/placeholder.wxml" /> -->
	  	<placeholder v-if="componentView.nodata_layout_visible && componentData.length <= 0" :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData}"></placeholder>
	  	<div v-if="true">
	    <!-- 引入组件头 -->
		    <component-header v-if="componentView.header_visible" :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData}" ></component-header>

		    <div class="relative" :key="index" v-for="(listItem,index) in componentData"
		              @click="ListUIJump">
		      	<!-- 1，图 标题 扩展 -->
		      	<div class="relative " :style="getStyle['listitemview']"  v-if="componentView.style == 0 ">
		          	<!-- 图 -->
		          	<div class="relative">
		            	<video :src="listItem.m3u8" :poster="posterUrl(listItem)" :autoplay="configObj.isShowVideo" :controls="configObj.controls"  class="indexpic-view" :style="getStyle['indexpic']"></video>
		            	<!-- 引入索引图浮动扩展 -->
		            	<indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}"></indexpic-float-widget>
		            	<img class="play scale_aspect_fill" v-if="!configObj.isShowVideo " @click="playListui14Video(index)" src="https://static-public.ddapp.com/weixin/images/video_play.png" >
		          	</div>
		          	<!-- 标题 -->
		          	<list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle}"></list-item-title>
		          	<!-- 扩展 -->
		          	<title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></title-widget>
		          	<item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></item-float-widget>
		      	</div>
		      	<!-- 2，标题 图 扩展 -->
		      	<div class="relative " :style="getStyle['listitemview']" v-if="componentView.style == 1 ">
		          	<!-- 标题 -->
		          	<list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle}"></list-item-title>
		          	<!-- 图 -->
		          	<div class="relative">
		              	<video  :src="listItem.m3u8" :poster="posterUrl(listItem)" :autoplay="configObj.isShowVideo" :controls="configObj.controls"  class="indexpic-view" :style="getStyle['indexpic']" ></video>
		              	<!-- 引入索引图浮动扩展 -->
		              	<indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}"></indexpic-float-widget>
		             	<img class="play scale_aspect_fill" v-if="!configObj.isShowVideo " @click="playListui14Video(index)"  src="https://static-public.ddapp.com/weixin/images/video_play.png" >
		          	</div>
		          	<!-- 扩展 -->
		          	<title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></title-widget>
		          	<item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></item-float-widget>
		      	</div>
		      	<!-- 3，图+标题 扩展 -->
		      	<div class="relative " :style="getStyle['listitemview']" v-if="componentView.style == 2">
		          	<div class="relative">
		            	<!-- 视频播放器 -->
		            	<!-- <include src="../base/indexpic.wxml" wx:if="{{!data.isShowVideo }}"/> -->
		            	<video v-if="" :src="listItem.m3u8" :poster="posterUrl(listItem)" :autoplay="configObj.isShowVideo" :controls="configObj.controls" class="indexpic-view" :style="getStyle['indexpic']"  :ref="'listui14_'+index" @pause="pause" @play="play"></video>
		            	<!-- 引入索引图浮动扩展 -->
		            	<indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}"></indexpic-float-widget>
		            	<!-- 标题 -->
		            	<list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle}"></list-item-title>
		            	<img class="play scale_aspect_fill" v-if="!configObj.isShowVideo" @click="playListui14Video(index)" src="https://static-public.ddapp.com/weixin/images/video_play.png"  >
		          	</div>
			        <!-- 扩展 -->
			        <title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></title-widget>
			        <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></item-float-widget>
		      	</div>
		    </div>
	  	</div>
	</div>
</template>
<script>
	import Style from '@h5/gen_css/common';
	import componentHeader from '@h5/components/widget/extend/component_header.vue'
	import indexpicFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
	import placeholder from '@h5/components/widget/extend/placeholder.vue'
	import titleWidget from '@h5/components/widget/extend/tile_widget.vue'
	import itemFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
	import listItemTitle from '@h5/components/common/title.vue'

	export default{
		name:'ListUI14',
		data(){
			return{
				configObj:{
					isShowVideo:false,
					controls:false
				},
			}
		},
		props: {
		    data: Object,
		    option:Object
		},
		components:{
			componentHeader,
			indexpicFloatWidget,
			titleWidget,
			itemFloatWidget,
			listItemTitle,
			placeholder
		},
		created(){
			let style = this.data.componentView
			console.log('style:',style)
  		},
  		computed:{
	    	//整个页面所有的视图
		    VIEWS(){
		      return this.data.VIEWS;
		    },
		    //本组件数据（数组，多条）
		    componentData(){
		      return this.data.componentData
		    },
		    //本组件视图
		    componentView(){
		      return this.data.componentView
		    },
		    //本组件视图id
		    componentViewId(){
		      return this.data.componentViewId
		    },
		    //当前详情数据
		    currentDetail(){
		      return this.data.currentDetail
		    },
		    getStyle(){
  				let attr=this.componentView
  				let styleResult={}
  				styleResult.indexpic=Style.toString({
					"width": "100%",
					"height": Style.listui2IndexPicWidth(attr,attr.indexPic_whScale),
  				})
	  			styleResult.listitemview=Style.toString({
		            "background": Style.formatColorToRgba(attr.itemNorBg.color),
				    "padding": Style.padding(attr.itemPadding),
				    "margin":Style.margin(attr.margin),
					"border-width":Style.borderWidth(attr.item_border),
					"border-color":Style.borderColor(attr.item_border),
					"border-style":"solid",
					"border-radius": attr.cornerRadius+'px',
		        })
		        styleResult.listitemtitle=Style.toString({
					"background": Style.formatColorToRgba(attr.itemPreBg.color),
					"color": Style.formatColorToRgba(attr.title_textColor),
					"text-align": Style.textAlign(attr.title_textAlignment),
					"padding": Style.padding(attr.title_padding),
					"margin":Style.margin(attr.title_margin),
		        })
		        styleResult.itemtitle=Style.toString({
					"max-width": "100%",
					"overflow": "hidden",
					"text-overflow": "ellipsis",
					"white-space": Style.isWrap(attr.title_lineNum),
					"font-weight": Style.isBold(attr.title_bold),
					"display": Style.isVisiable(attr.title_isVisiable),
					"line-height": Style.textLineHeight(attr.title_lineSpace,attr.title_textSize),
					"text-shadow": Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_vOffset,attr.title_hOffset,attr.title_shadowColor,attr.title_shadowRadius),
		        })
		        styleResult.title=Style.toString({
					"background": Style.formatColorToRgba(attr.title_textFillColor),
					"font-size": attr.title_textSize+"px",
					"text-shadow": Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_vOffset,attr.title_hOffset,attr.title_shadowColor,attr.title_shadowRadius),
		        })
		        return styleResult;
  			},
  		},
  		methods:{
  			
  			ListUIJump(){

  			},
  			play(){
  				this.configObj.isShowVideo=true
  				this.configObj.controls = 'controls'
  			},
  			pause(){
  				this.configObj.isShowVideo=!this.configObj.isShowVideo
  			},
  			playListui14Video(index){
  				this.configObj.isShowVideo=!this.configObj.isShowVideo
  				this.configObj.controls = 'controls'
  				let currentVideo=this.$refs['listui14_'+index][index];
  				currentVideo.play()

  			},
  			posterUrl(listItem){
		    	let urlObj=listItem.indexpic
		    	return urlObj.host+urlObj.dir+urlObj.filepath+urlObj.filename
		    }
  		}
	}
</script>