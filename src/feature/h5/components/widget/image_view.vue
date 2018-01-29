<template >
	<div :style="getStyle(VIEWS[item])['inner']">
	  	<img :style="getStyle(VIEWS[item])['img']" :src="componentData._widget[ item ] || VIEWS[ item ].placeholder.img_url" class="inner" >
	  	<div :style="getStyle(VIEWS[item])['mask']"></div>
	</div>
</template>
<script>
import Style from '@h5/gen_css/common';
export default {
	name: 'image_view',
	data () {
	    return {

	    }
	},
	created(){

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
	    }
	},
	created(){
        
	},
	methods:{
  		widgetJump() {

  		},
  		getStyle(attr){
  			let styleResult={}
  			styleResult.inner=Style.toString({
              "position": "relative",
              "width": "100%",
              "height": "100%",
            })
            styleResult.img=Style.toString({
              "filter": Style.isBlur(attr.blur_enabled,attr.blur_radius),
              "width":"100%",
              "height":"100%",
              "vertical-align":"top",
            })
            styleResult.mask=Style.toString({
              "position": 'absolute',
              "top":0,
              "left": 0,
              "width": "100%",
              "height": "100%",
              "background-color": Style.formatColorToRgba(attr.mask_color),
              "display":Style.isVisiable(attr.mask_enabled),
            })
           return styleResult;
        }
    }
}
</script>
