<template>
  	<div>
	  	<div class="leftfilternode_parentcommon"></div>
	  	<div class="leftfilternode_parentcommon leftfilternode_parentstyle posfix over-y" :style="navbarHeight" v-for="items in componentData" >
	      	<div class="sys-flex sys-vertical"  v-for="(item,index) in items.options">
	        	<div class="leftfilternode_itemcontainer" >
	          	<!--没有游标-->
			        <div v-if="componentView.column_cursor_type=='none'" :class="['itemcontentPos','sys-flex',{ 'leftfilternode_itemcontentActive' :currentindex==index}]" @click="filterNodeChange(index)">
			            <span v-if="componentView.column_item_style=='text'" :class="['sys-flex-one','text-align','leftfilternode_itemfont',{'leftfilternode_itemfontActive':currentindex==index}]">{{item.name}}</span>
			            <img v-if="componentView.column_item_style=='image'" :src="item.image" class="leftfilternode_itemimage" />
	          		</div>
	          	<!--游标为左侧-线性-->
		          	<div v-if="componentView.column_cursor_type=='line'&&componentView.column_cursor_position=='left'" :class="['itemcontentPos','sys-flex',{ 'leftfilternode_itemcontentActive' :currentindex==index}]" @click="filterNodeChange(index)">
			            <div v-if="currentindex==index? true:false" class="leftfilternode_itemcursor"></div>
			            <span v-if="componentView.column_item_style=='text'" :class="['sys-flex-one','text-align','leftfilternode_itemfont',{'leftfilternode_itemfontActive':currentindex==index}]">{{item.name}}</span>
			            <img v-if="componentView.column_item_style=='image'" :src="item.image" class="leftfilternode_itemimage" />
	          		</div>
	          <!--游标为右侧-线性-->
	          		<div v-if="componentView.column_cursor_type=='line'&&componentView.column_cursor_position=='right'" :class="['itemcontentPos','sys-flex',{ leftfilternode_itemcontentActive :currentindex==index}]" @click="filterNodeChange(index)">
			            <span v-if="componentView.column_item_style=='text'" :class="['sys-flex-one','text-align','leftfilternode_itemfont',{leftfilternode_itemfontActive:currentindex==index}]">{{item.name}}</span>
			            <img v-if="componentView.column_item_style=='image'" :src="item.image" class="leftfilternode_itemimage" />
	           			<div class="leftfilternode_itemcursor"></div>
	          		</div>
		          	<!--游标为下面侧-线性-->
		          	<div v-if="componentView.column_cursor_type=='line'&&componentView.column_cursor_position=='bottom'" :class="['sys-flex','sys-vertical','itemcontentPos','justify-content-center',{leftfilternode_itemcontentActive:currentindex==index}]" @click="filterNodeChange(index)">
	            		<span v-if="componentView.column_item_style=='text'" :class="['sys-flex-one','sys-flex-inlne','sys-flex-center','text-align','leftfilternode_itemfont',{leftfilternode_itemfontActive:currentindex==index}]">{{item.name}}</span>
	            		<img v-if="componentView.column_item_style=='image'" :src="item.image" class="leftfilternode_itemimage" />
	            		<div class="leftfilternode_itemcursor"></div>
	          		</div>
	          <!--游标-矩形-->
	          		<div v-if="componentView.column_cursor_type=='rect'" :class="['relative','rectfix',{leftfilternode_itemcontentActive:currentindex==index}]" @click="filterNodeChange(index)">
	            		<div v-if="currentindex==index? true:false" class="leftfilternode_itemcursor leftfilternode_itemcursorRect"></div>
	            		<div class="text-align textwrapfix leftfilternode_textwrap">
		              		<span v-if="componentView.column_item_style=='text'" :class="['text-align','leftfilternode_itemfont',{leftfilternode_itemfontActive:item.currentindex==index}]">{{item.name}}</span>
		              		<img v-if="componentView.column_item_style=='image'" :src="item.image" class="leftfilternode_itemimage" />
	            		</div>
	          		</div>
	        	</div>
	        	<div class="item_divider leftfilternode_itemdivider"></div>
	      	</div>
	    </div>
  	</div>
</template>

<script>
import { vm } from "@/main"
import { APP_HEADER } from "@h5/sdk/index"
import "@h5/style/left_filter_node.scss"
export default {
  	name: 'left_filter_node',
	data() {
	    return {
	    	currentindex:0
	    }
	},
  	props: {
		data: Object
	},
  	created(){
  	},
  	computed: {
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
	    //导航栏高度
	    navbarHeight(){
	    	let defaultHeight=APP_HEADER.getNavbarDefaultHeight();
	    	return {
	    		top:`${defaultHeight}px`
	    	};
	    }
	},
  	methods: {
    	filterNodeChange(index) {
        vm.$emit('filterNodeChange', this.componentViewId, index );
    		this.currentindex=index;
	   	},
  	}
}

</script>
