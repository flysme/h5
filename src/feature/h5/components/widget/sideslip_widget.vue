<template>
	<!-- 多图横划控件 -->
	<div id="sideslip_widget">
		<div class=" relative stylefix" :style="getStyle['sideslip_widget_style']" v-if="componentData._widget[item]" @click="widgetJump">
		  	<div  :style="getStyle['sideslip_widget_innerviewStyle']">
		      	<img :style="getStyle['sideslip_widget_image']" class="clearLastStyle " v-for="(val,index) in componentData._widget[item]" :src="val"  @click="previewImage(componentData._widget[item],index)" >
		  	</div>
		</div>
	</div>
</template>
<style scoped>
</style>
<script>
import services from '@h5/services/utils.js'
import Style from '@h5/gen_css/common';
export default {
	name: 'sideslip_widget',
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
			return this.data.componentData
		},
		item(){
			return this.data.item
		},
		getStyle(){
			let attr=this.VIEWS[this.item]
  			let styleResult={}
			styleResult.sideslip_widget_style=Style.toString({
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
			styleResult.sideslip_widget_innerviewStyle=Style.toString({
				"width":Style.getConvertValue(attr.sideslip_pic_width),
				"height":Style.getConvertValue(attr.sideslip_pic_height),
				"border":Style.borders(attr.sideslip_pic_border,attr.top),
				"overflow-x": "scroll",
			})
			styleResult.sideslip_widget_image=Style.toString({
				"width":Style.getConvertValue(attr.sideslip_pic_width),
				"height":Style.getConvertValue(attr.sideslip_pic_height),
				"border-radius":Style.radius(attr.sideslip_pic_corner),
				"border-left":Style.borders(attr.sideslip_pic_border,attr.left),
				"border-right":Style.borders(attr.sideslip_pic_border,attr.right),
				"border-top":Style.borders(attr.sideslip_pic_border,attr.top),
				"border-bottom":Style.borders(attr.sideslip_pic_border,attr.bottom),
				"margin-right":Style.getConvertValue(attr.sideslip_pic_space),
			})
			return styleResult
		}
	},
	methods:{
		widgetJump(){

		},
  		previewImage(arr,index) {
  			services.previewImages(arr, index);
  		}
    }
}
</script>