<template>
	<div>
		<div v-if="VIEWS[ item ]&&VIEWS[ item ].__meta__&&VIEWS[ item ].__meta__.__event__&&VIEWS[ item ].__meta__.__event__.default_uri && VIEWS[ item ].copy_enabled" @click="widgetJump" @touchstart="showCopymodal(event)" @touchend="clearLoop" :style="getStyle(VIEWS[ item ])['inner']" >
		      <!-- {{componentData._widget[ item ] || componentData._widget.endtime}} -->
		      <!-- {{componentData._widget[item]}} -->
		</div>

		<div v-else-if="VIEWS[ item ]&&VIEWS[ item ].__meta__&&VIEWS[ item ].__meta__.__event__&&VIEWS[ item ].__meta__.__event__.default_uri"  @click="widgetJump" :style="getStyle(VIEWS[ item ])['inner']">
		      <!-- {{DATA._widget[ item ] || DATA._widget.endtime}} -->
		      {{computedName}}
		</div>

		<div v-else-if="VIEWS[ item ].copy_enabled" :style="getStyle(VIEWS[ item ])['inner']" @touchstart="showCopymodal" @touchend="clearLoop">
		      <!-- {{DATA._widget[ item ] || DATA._widget.endtime}} -->
		      {{computedName }}
		</div>

		<div v-else :style="getStyle(VIEWS[ item ])['inner']">
		      <!-- {{DATA._widget[ item ] || DATA._widget.endtime}} -->
		      {{computedName }}
		</div>
	</div>
</template>
<script>
import Style from '@h5/gen_css/common';
export default {
	name: 'text_view',
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
		},
		computedName(){
			if(this.data.componentData._widget && this.data.componentData._widget[this.data.item]){
				return this.data.componentData._widget[this.data.item]
			}else if(this.data.componentData._widget && this.data.componentData._widget.endtime){
				return this.data.componentData._widget.endtime
			}else{
				return ""
			}
		}
	},
	methods:{
  		widgetJump(){
        	console.log('触发');
  		},
  		getStyle(attr){
  			let styleResult={}
  			styleResult.innerwrap=Style.toString({
	            "height":Style.textHeight(attr.font_size,attr.line_space,attr.lines),
	            "overflow":"hidden",
	        })
	        styleResult.inner=Style.toString({
	            "color": Style.formatColorToRgba(attr.text_color),
	            "font-size": attr.font_size + 'px',
	            "background-color": Style.formatColorToRgba(attr.text_bg_color),
	            "font-weight": Style.isBold(attr.is_bold),
	            "white-space": Style.isWrap(attr.lines),
	            "max-height":Style.textHeight(attr.font_size,attr.line_space,attr.lines),
	            "overflow":"hidden",
	            "text-overflow":"ellipsis",
	            "line-height": Style.textLineHeight(attr.line_space,attr.font_size),
	            "text-shadow": Style.shadow(attr.text_shadow),
	            "position":"relative",
	        })
	        return styleResult;
        },
  		showCopymodal(event) {
  			let e = event,
	  			that = this;
	    	clearInterval(this.Loop);//再次清空定时器，防止重复注册定时器
	    	this.Loop=setTimeout(function(){
	        	Dialog.alert({
				  message: '复制成功'
				}).then(() => {
				  console.log('e:',e)
				});
	    	},2000);
		},
		clearLoop() {
			clearInterval(this.Loop);
		},
	},
}
</script>
