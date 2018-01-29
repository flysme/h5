<template>
	<div id="floating_widget">
		<div hover-class="active" @click="widgetJump" >
		    <div class="sys-wrap sys-flex">
		        <div class="" :style="getStyle(VIEWS[item])['tag-item']" hover-class="active" v-for="val in componentData._widget[item]">
		            {{val}}
		        </div>
		    </div>
		</div>
	</div>
</template>
<style scoped>

</style>
<script>
import Style from '@h5/gen_css/common';
export default {
	name: 'floating_widget',
	data () {
	    return {

	    }
	},
	props:{
		data:Object
	},
	created(){
		
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
	methods:{
  		widgetJump() {

  		},
  		getStyle(attr){
  			let styleResult={}
  			styleResult.wrap=Style.toString({
              	"margin-bottom": '-'+Style.getConvertValue(attr.row_space),
				"overflow":"hidden",
            })
            styleResult['tag-item']=Style.toString({
            	"margin": "0 "+Style.getConvertValue(attr.row_space)+" "+ Style.getConvertValue(attr.col_space)+" 0",
				"padding":Style.padding(attr.tag_padding),
				"font-weight": Style.isBold(attr.tag_is_bold),
				"color": Style.formatColorToRgba(attr.tag_text_color),
				"font-size": attr.tag_font_size+'px',
				"background-color": Style.advanceBg(attr.tag_background),
				"border-width":Style.borderWidth(attr.tag_border),
				"border-color":Style.borderColor(attr.tag_border),
				"border-style":"solid",
				"border-radius":Style.radius(attr.tag_corner),
				"box-shadow":Style.shadow(attr.tag_shadow),
            })
            return styleResult;
  		}
    }
}
</script>