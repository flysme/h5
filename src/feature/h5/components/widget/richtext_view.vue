<template>
	<div>
		<!-- <import src="../../../lib/wxParse/wxParse.wxml" /> -->
		<div class="richtext stylefix  relative " :style="getStyle(VIEWS[item])['richtext_view_style']" @click="widgetJump" >
	  		<div class=" relative " :style="getStyle(VIEWS[item])['richtext_view_contentHeight']" >
	      		<div v-html="componentData.content || componentData.product_detail"></div>
	    	</div>
			<div class="collapsefix relative " :style="getStyle(VIEWS[item])['richtext_view_collapse_style']" @click="richshowall" >
			    <span :class="{'dropdownarrow':VIEWS[ item ].collapsed,'dropuparrow':!VIEWS[ item ].collapsed}" ></span>
			</div>
		</div>
	</div>
</template>

<script>
import Style from '@h5/gen_css/common';
export default {
	name: 'richtext_view',
	data () {
	    return {

	    }
	},
	props:{
		data:Object
	},
	computed:{
		VIEWS(){
	      return this.data.VIEWS
	    },
	    componentData(){
	    	console.log('datatext:',this.data.componentData)
	      return this.data.componentData
	    },
	    item(){
	      return this.data.item
	    }
	},
	methods:{
  		widgetJump() {

  		},
  		richshowall(){

  		},
  		getStyle(attr){
  			let styleResult={}
  			styleResult.richtext_view_style=Style.toString({
	            "width":Style.flexBoxWidth(attr.width_type,attr.width),
				"height":Style.heightType(attr.height_type,attr.height),
				"margin":Style.margin(attr.margin),
				"padding":Style.padding(attr.padding),
				"box-shadow":Style.shadow(attr.shadow),
				"border-radius":Style.radius(attr.corner),
				"border-left":Style.borders(attr.border,attr.left),
				"border-right":Style.borders(attr.border,attr.right),
				"border-top":Style.borders(attr.border,attr.top),
				"border-bottom":Style.borders(attr.border,attr.bottom),
				"background":Style.advanceBg(attr.background),
	        })
	        styleResult.richtext_view_contentHeight=Style.toString({
	        	"height":Style.richtextConHeight(attr.collapsed,attr.collapse_height),
	        	"overflow": Style.richtextOverflow(attr.collapsed),
	        })
	        styleResult.richtext_view_collapse_style=Style.toString({
	        	"display":Style.isVisiable(attr.collapse_enabled),
  				"background":Style.advanceBg(attr.btn_bg),
	        })
	        return styleResult
        },
  		richshowallI(){

  		}
    }
}
</script>