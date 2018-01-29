<template>
	<div :style="getStyle(VIEWS[componentViewId])['list_search_wrap']" @click="ListUIJump(VIEWS[componentViewId].view)">
		<div :class="['search_bar_fix','relative', `search_bar_${VIEWS[componentViewId].style}`]" :style= "getStyle(VIEWS[componentViewId])['list_search_bar']">
			<div :class="{'search_icon_left':VIEWS[componentViewId].style==6,'search_icon_right':VIEWS[componentViewId].style==7}" :style="getStyle(VIEWS[componentViewId])['list_search_icon']">
				<img :src="VIEWS[componentViewId].search_icon.img_url" class="scale_aspect_fill"/>
			</div>
			<div :style="getStyle(VIEWS[componentViewId])['list_search_text']">{{VIEWS[componentViewId].search_textfield_text}}</div>
		</div>
	</div>
</template>
<script>
   import { URI } from '@h5/sdk/index';
   import Style from '@h5/gen_css/common';
    export default{
      data(){
        return {};
      },
      props:{
        data:Object,
      },
      computed:{
        //整个页面所有的视图
        VIEWS(){
          return this.data.VIEWS;
        },
        //本组件数据（数组，多条）
        componentData(){
          return this.data.componentData
        },
        //本组件视图
        componentView(){
          return this.data.componentView
        },
        //本组件视图id
        componentViewId(){
          return this.data.componentViewId
        },
        //当前详情数据
        currentDetail(){
          return this.data.currentDetail
        },
      },
      methods:{
        ListUIJump(viewname){
          console.log('viewname',viewname)
          // uri所需的参数
          let data = {
             url:`dingdone://search?view='${viewname}'`
          }
          URI.listuijump({data})
        },
        getStyle(attr){
          if(!attr)return;
          let styleResult = {};
            styleResult.list_search_wrap=Style.toString({
                "height":'auto',
                'overflow':'hidden',
                "margin":Style.margin(attr.margin),
                "background":Style.formatColorToRgba(attr.search_bar_bg_color),
              })
            styleResult.list_search_bar=Style.toString({
                "background":Style.formatColorToRgba(attr.search_textfield_bg_color),
                "margin":Style.margin(attr.search_bar_margin),
                "height":Style.getConvertValue(attr.search_bar_height),
                "border-radius":attr.search_textfield_cornerRadius+'px',
                "border-width":attr.search_textfield_border_width+'px',
                "border-style":"solid",
              	"display": "flex",
              	"align-items": "center",
            })
            styleResult.list_search_icon = Style.toString({
                "display":Style.isVisiable(attr.search_icon_is_visible),
                "width":Style.getConvertValue(attr.search_icon_size),
                "height":Style.getConvertValue(attr.search_icon_size),
                "margin-right":Style.listSearchIconMR(attr.style,attr.search_icon_text_padding)+'px',
                "line-height":Style.getConvertValue(attr.search_icon_size),

            })
            styleResult.list_search_text = Style.toString({
              "display":Style.isVisiable(attr.search_textfield_text_is_visible),
            	"font-weight":Style.isBold(attr.search_textfield_text_is_bold),
            	"color":Style.formatColorToRgba(attr.search_textfield_text_color),
            	"font-size":attr.search_textfield_text_size+'px'
            })
            return styleResult;
        }
      },
    }
</script>
<style scoped>
  .scale_aspect_fill{
      object-fit: cover;
  }
  img{
    width: 100%;
	  height: 100%;
  }
</style>
