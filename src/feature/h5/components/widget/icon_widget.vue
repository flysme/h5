<template>
	<div>
		<div class="flex iconfix tag_2_widget_icon_view" @click="widgetJump" >
		    <div  class="inline-flex asidefix " :style="getStyle(VIEWS[ item ])['tag_2_widget_icon_aside']">
		       	<div v-for="itemName in componentData._widget[item]"  class="flex sys-horizontal sys-flex " :style="getStyle(VIEWS[ item ])['tag_2_widget_icon_mainwrap']">
		          	<img :src="VIEWS[ item ].icon.img_url" :style="getStyle(VIEWS[ item ])['tag_2_widget_image_wrap']"><span :style"getStyle(VIEWS[ item ])['tag_2_widget_icon_tag']">{{itemName}}</span>
		      	</div>
		    </div>
		</div>
	</div>
</template>
<style scoped>
	/*图标式标签*/

</style>
<script>
import Style from '@h5/gen_css/common';
export default {
	name: 'icon_widget',
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
  		widgetJump() {

  		},
      getStyle(attr){
        let styleResult={}
        styleResult.tag_2_widget_icon_aside=Style.toString({
            "height":Style.heightType(attr.height_type,attr.height),
        })
        styleResult.tag_2_widget_icon_mainwrap=Style.toString({
            "margin-right":attr.col_space +'px',
            "margin-bottom":attr.row_space+'px',
            "line-height":Style.tag2widgetHeight(attr.icon_height,attr.tag_font_size),
        })
        styleResult.tag_2_widget_image_wrap=Style.toString({
            "width":Style.getConvertValue(attr.icon_width),
            "height":Style.getConvertValue(attr.icon_height),
            "margin-right":Style.getConvertValue(6),
            "box-shadow":Style.shadow(attr.shadow),
        })
        styleResult.tag_2_widget_icon_tag=Style.toString({
            "font-size":attr.tag_font_size + 'px',
            "font-weight":Style.isBold(attr.tag_is_bold),
            "color":Style.formatColorToRgba(attr.tag_text_color),
            "text-shadow":Style.shadow(attr.shadow),
        })

        return styleResult;
      }
    }
}
</script>
