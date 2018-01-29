<template>
		<div  class="slider_widget relative " v-if="componentData._widget[item]"  :style="getStyle['slider_widget_style']">
			<van-swipe :autoplay="autoplay">
			    <van-swipe-item v-for="(val,index) in componentData._widget[item]" :key="index" :style="getStyle['slider_widget_height']">
			    		<img :src="val" :style="getStyle['slider_widget_slider_image']"  @click="previewImage(componentData._widget[item],index)" class="scale_aspect_fill">
			    </van-swipe-item>
			</van-swipe>
		</div>
</template>
<style scoped>
.scale_aspect_fill{
      object-fit: cover;
  }
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
    autoplay(){
      if(this.VIEWS[this.item].is_roll){
        return this.VIEWS[this.item].roll_time*1000
      }else{
        return 0
      }
    },
    getStyle(){

      let attr=this.VIEWS[this.item]
      let styleResult={}
      console.log(attr)
      styleResult.slider_widget_style=Style.toString({
        "width":Style.sliderwidgetWidth(attr.slider_pic_width,attr.pic_border,attr.padding),
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
      styleResult.slider_widget_height=Style.toString({
        "height":Style.getConvertValue(attr.slider_pic_height)
      })
      styleResult.slider_widget_slider_image=Style.toString({
        "width":Style.getConvertValue(attr.slider_pic_width),
        "height":Style.getConvertValue(attr.slider_pic_height),
        "border-radius":Style.radius(attr.pic_corner),
        "border-left":Style.borders(attr.pic_border,attr.left),
        "border-right":Style.borders(attr.pic_border,attr.right),
        "border-top":Style.borders(attr.pic_border,attr.top),
        "border-bottom":Style.borders(attr.pic_border,attr.bottom),
      })
      return styleResult
    }
	},
	methods:{
  		widgetJump() {

  		},
  		previewImage(arr,index){
  			services.previewImages(arr, index);
  		}
    }
}
</script>
