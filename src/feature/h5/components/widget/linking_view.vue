<template>
	<div id="linking_view">
		<div class="" hover-class="active" :style="getStyle(VIEWS[item])['inner']">
			<div v-if="VIEWS[item].__meta__.__binding__.data_type == 'list'">
				<div v-for="(val,index) in componentData._widget[item]">
					<span v-if="componentData._widget[item].length!=(index+1)">{{val}}{{VIEWS[item].connector}}</span>
					<span v-else>{{val}}</span>
				</div>
			</div>
			<div v-else>
				<span>{{componentData._widget[item]}}</span>
			</div>
		</div>
	</div>
</template>
<style scoped>

</style>
<script>
import Style from '@h5/gen_css/common';
export default {
	name: 'linking_view',
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
	    }
	},
	methods:{
  		widgetJump(item) {

  		},
  		getStyle(attr){
  			let styleResult={}
	        styleResult.inner=Style.toString({
	            "display": "flex",
				"color": Style.formatColorToRgba(attr.tag_text_color),
				"font-size": attr.tag_font_size+'px',
				"font-weight": Style.isBold(attr.is_bold),
	        })
	        return styleResult;
  		}
    }
}
</script>
