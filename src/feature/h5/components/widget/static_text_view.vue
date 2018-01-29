<template>
	<div >
		<!-- 有点击事件 -->
		<div v-if="isevent">
			<div class="relative" :style="getStyle(VIEWS[ item ])['inner']" @click="widgetJump(item)" >
			    {{VIEWS[ item ].text}}
			   <!--  <div class="contact-button"> 这个<contact-button>要重写 所有留个位置。
			        <contact-button v-if="{{VIEWS[item].__meta__.hasConversation}}" type="default-light" size="20" session-from="weapp"></contact-button>
			    </div> -->
			    <button  class="shareButton" :class="[VIEWS[ item ].view]" :id="item" v-if="VIEWS[item].__meta__.hasShare" open-type="share"></button>
			</div>
		</div>
			<!-- 无点击事件 -->
		<div v-else>
			<div class="relative" :style="getStyle(VIEWS[ item ])['inner']" hover-class="active">
			    {{VIEWS[ item ].text}}
			    <!-- <div class="contact-button">  这个<contact-button>要重写 所有留个位置。
			        <contact-button v-if="{{VIEWS[item].__meta__.hasConversation}}" type="default-light" size="20" session-from="weapp"></contact-button>
			    </div> -->
			    <button class="shareButton" :class="[VIEWS[ item ].view]" :id="item" v-if="VIEWS[item].__meta__.hasShare" open-type="share"></button>
			</div>
		</div>
	</div>
</template>
<script>
import Style from '@h5/gen_css/common';
export default {
	name: 'static_text_view',
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
			if(VIEWS && VIEWS.__meta__ && VIEWS.__meta__.__event__ && VIEWS.__meta__.__event__.default_uri){
				return true
			}
			return false
		}
	},
	methods:{
  		widgetJump(item) {

  		},
  		getStyle(attr){
  			let styleResult={}
  			styleResult.inner=Style.toString({
		        "color": Style.formatColorToRgba(attr.text_color),
		        "font-size": attr.font_size + 'px',
		        "background-color": Style.formatColorToRgba(attr.text_bg_color),
		        "font-weight": Style.isBold(attr.is_bold),
		        "white-space": Style.isWrap(attr.lines),
		        "overflow":"hidden",
		        "text-overflow":"ellipsis",
		       	"line-height": Style.textLineHeight(attr.line_space,attr.font_size),
		        "text-align": attr.alignment,
		        "text-shadow":  Style.shadow(attr.text_shadow),
		        "position":"relative",
		    })
		    return styleResult;
  		}
    }
}
</script>

<style scoped>

</style>
