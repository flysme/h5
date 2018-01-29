<template>
	<div class="sys-flex sys-flex-center sys-flex-one time_period_widget" >
	    <div class=" sys-flex-one" :style="getStyle['time_item']"  @click="chooseTime">{{componentData._widget[item].start || VIEWS[ item ].start_time_text}}</div>
	        <div class="" :style="getStyle['time-link']">{{VIEWS[ item ].preiod_time_text}}</div>
	    <div class=" sys-flex-one" :style="getStyle['time_item']" @click="chooseTime">{{componentData._widget[item].end || VIEWS[ item ].end_time_text}}</div>
	</div>
</template>
<style scoped>

</style>
<script>

export default {
	name: 'time_period_widget',
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
			styleResult.time_item=Style.toString({
				"display": "inline",
				"padding":Style.padding(arrt.text_padding),
				"font-size": attr.time_text_size+"px",
				"color":Style.formatColorToRgba(attr.time_text_color),
				"border-bottom" : "solid 1px #ebebeb",
				"white-space":"nowrap",
				"text-align":"center",
			})
			styleResult["time-link"]=Style.toString({
				"font-size": attr.preiod_time_text_size+"px",
				"color":Style.formatColorToRgba(preiod_time_text_color),
				"border-bottom":"solid 1px transparent",
				"margin":"0 "+Style.getConvertValue(15),
			})
			return styleResult
		}
	},
	methods:{
  		chooseTime() {

  		}
    }
}
</script>
