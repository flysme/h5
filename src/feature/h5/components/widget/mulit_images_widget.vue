<template>
	<div  v-if="componentData._widget[item]" @click="widgetJump" :style="getStyle(VIEWS[item])['mulit']" >
		<div :style="getStyle(VIEWS[item])['innerview']" >
		   <img v-for="(val,index ) in componentData._widget[item]" :src="val" @click="previewImage(componentData._widget[item],index)" :style="getStyle(VIEWS[item])['image']">
		</div>
	</div>

</template>
<style scoped>

</style>

<script>
import Style from '@h5/gen_css/common';
export default {
	name: 'mulit_images_widget',
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
	},
	methods:{
  		widgetJump() {

  		},
  		previewImage(arr,index){
  			ImagePreview(arr, index);
  		},
  		getStyle(attr,index){
  			let styleResult={}
  			styleResult.mulit=Style.toString({
	            "position":"relative",
	            "z-index":"100",
	            "margin":Style.margin(attr.margin),
				"padding":Style.padding(attr.padding),
				"background":Style.advanceBg(attr.backgroun),
				"border-width":Style.borderWidth(attr.borde),
				"border-color":Style.borderColor(attr.borde),
				"border-style":"solid",
				"border-radius":Style.radius(attr.corne),
				"box-shadow":Style.shadow(attr.shado),
	        })
	        styleResult.innerview=Style.toString({
	            "width":Style.mulitWidth(attr.image_space,attr.image_size)
	        })
	        styleResult.image=Style.toString({
	        	"width":Style.getConvertValue(attr.image_size),
				"height":Style.getConvertValue(attr.image_size),
	        })
	        if(index){
	        	if((index) % 3 != 0){
	        		styleResult.image=Style.toString({
			        	"padding-right":Style.multitextWidth(attr.image_space),
			        	"width":Style.getConvertValue(attr.image_size),
						"height":Style.getConvertValue(attr.image_size),
			        })
	        	}else{
	        		styleResult.image=Style.toString({
	        			"width":Style.getConvertValue(attr.image_size),
						"height":Style.getConvertValue(attr.image_size),
	        		})
	        	}
	        }
	        return styleResult
        },
    }
}
</script>