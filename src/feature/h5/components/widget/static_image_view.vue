<template>
		<div v-if="isevent">
			<div class=" relative" @click="widgetJump" :style="getStyle['inner']" >
			  	<img :src="VIEWS[ item ].image.img_url" :style="getStyle['image']">
			  	<div  :style="getStyle['mask']"></div>
			  	<!-- <div class="contact-button">
			      	<contact-button wx:if="{{VIEWS[item].__meta__.hasConversation}}" type="default-light" size="20" session-from="weapp"></contact-button>
			  	</div> 重写，留个位置 -->
			  	<button class="shareButton" :class="[VIEWS[ item ].view]" :id="item" v-if="VIEWS[item].__meta__.hasShare" open-type="share"></button>
			</div>
		</div>
		<div v-else>
			<div class=" relative" :style="getStyle['inner']">
			  	<img :src="VIEWS[ item ].image.img_url"  :style="getStyle['image']">
			  	<div :style="getStyle['mask']"></div>
			  	<!-- <div class="contact-button">
			      	<contact-button wx:if="{{VIEWS[item].__meta__.hasConversation}}" type="default-light" size="20" session-from="weapp"></contact-button>
			  	</div>重写，留个位置 -->
			  	<button class="shareButton" :class="[VIEWS[ item ].view]" :id="item" v-if="VIEWS[item].__meta__.hasShare" open-type="share"></button>
			</div>
		</div>
</template>
<style scoped>

</style>
<script>
import Style from '@h5/gen_css/common';
export default {
	name: 'static_image_view',
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
	    isevent(){
			let VIEWS=this.VIEWS[ this.item ]
			if( VIEWS && VIEWS.__meta__ && VIEWS.__meta__.__event__ && VIEWS.__meta__.__event__.default_uri){
				return true
			}
			return false
		},
	    getStyle(){
	      let attr=this.VIEWS[this.item]
	      let styleResult={}
	      styleResult.inner=Style.toString({
	        "position": "relative",
			"width": "100%",
			"height": "100%",
	      })
	      styleResult.image=Style.toString({
	        "filter": Style.isBlur(attr.blur_enabled,attr.blur_radius),
			"width":"100%",
			"height":"100%",
			"display":"block",
			"background-size":"100%",
			"background-repeat":"no-repeat",
	      })
	      styleResult.mask=Style.toString({
			"position": "absolute",
			"top":"0",
			"left": "0",
			"width": "100%",
			"height": "100%",
			"background-color": Style.formatColorToRgba(attr.mask_color),
			"display":Style.isVisiable(attr.mask_enabled),
	      })
	      return styleResult
	    }
	},
	methods:{
  		widgetJump() {

  		}
    }
}
</script>