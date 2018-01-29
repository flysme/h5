<template >
  <!--组件最外层父级-->
  <div :style="getStyle(componentView)['listUI16_parentStyle']">
    <!-- 引入占位图 -->
    <placeholder v-if="componentView.nodata_layout_visible && componentData.length <= 0" :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"></placeholder>
    <div v-if="componentData && componentData.length > 0">
      <!-- 引入组件头-->
      <component-header :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"  v-if="componentView.header_visible"></component-header>
      <div class="list-divider-wrap relative" v-for="(listItem,index) in componentData" :key="index" @click="listuijump">
        <!--单个列表-->
        <div class="relative " :style="getStyle(componentView)['listUI16_listviewStyle']">
            <!--标题样式 索引图上方-->
             <div  class="relative " v-if="componentView.title_isVisiable&&componentView.style=='0'" :style="getStyle(componentView)['listUI16_titleViewStyle']">
                <span  :style="getStyle(componentView)['listUI16_titleStyle']">{{listItem.title}}</span>
                <!-- 引入索引图浮动扩展 -->
                <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></indexpic-float-widget>
            </div>
            <!--索引图样式-->
            <div class="sys-flex " :style="getStyle(componentView)['listUI16_indexViewStyle']">
                <div :class="['indexfix',{'indexHaveImgList':listItem._widget.pics},{'indexNotHaveImgList':!listItem._widget.pics}]" :style="getStyle(componentView)['listUI16_indexStyle']"  @click="previewImage(sum,0)" >
                  <img :src="listItem._widget.indexpic" :style="getStyle(componentView)['listUI16_innerImageStyle']" class=" indexImg scale_aspect_fill"  >
                </div>
                <!--其它展示图片-->
                <div class="indexInnerViewStyle" v-if="listItem._widget.pics&&listItem._widget.pics.length>0">
                    <div :class="['otherIndexfix',{'otherIndexmb10':listItem._widget.pics.length>1},{'otherIndexmb0':listItem._widget.pics.length<=1}]" :style="getStyle(componentView)['listUI16_otherIndexStyle']" v-if="listItem._widget.pics.length>0" @click="previewImage(sum,1)">
                      <img :src="listItem._widget.pics[0]" :style="getStyle(componentView)['listUI16_innerImageStyle']" class=" indexImg scale_aspect_fill"  >
                    </div>

                    <div class="relative otherIndexfix " :style="getStyle(componentView)['listUI16_otherIndexStyle']" v-if="listItem._widget.pics.length>1" @click="previewImage(sum,2)">
                      <img  :src="listItem._widget.pics[1]"  class=" indexImg" :style="getStyle(componentView)['listUI16_innerImageStyle']" >
                      <span  v-if="listItem._widget.pics.length>2" class="indexText scale_aspect_fill">{{listItem._widget.pics.length-2}}+</span>
                    </div>
                </div>
            </div>

             <!--标题样式 索引图下方-->
            <div class="relative " :style="getStyle(componentView)['listUI16_titleViewStyle']" v-if="componentView.title_isVisiable&&componentView.style=='1'">
                <span :style="getStyle(componentView)['listUI16_titleStyle']">{{listItem.title}}</span>
                 <!-- 引入索引图浮动扩展 -->
                <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></indexpic-float-widget>
            </div>

             <!-- 引入平铺扩展 -->
            <title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}" ></title-widget>
        </div>
        <!--分割线-->
        <div  :style="getStyle(componentView)['listUI16_dividerStyle']"></div>
         <!-- 引入列表项浮动扩展 -->
        <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}" ></item-float-widget>
      </div>
    </div>
  </div>
</template>
<style scoped>
.scale_aspect_fill{
    object-fit: cover;
}
</style>
<script>
import services from '@h5/services/utils.js'
import Style from '@h5/gen_css/common';
import { URI } from '@h5/sdk/index';
import indexpicFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
import titleWidget from '@h5/components/widget/extend/tile_widget.vue'
import itemFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
import componentHeader from '@h5/components/widget/extend/component_header.vue'
import placeholder from '@h5/components/widget/extend/placeholder.vue'
export default{
  props: {
    data: Object,
  },
  data(){
    return {
      templateName: ''
    }
  },
  components:{
  	indexpicFloatWidget,
    titleWidget,
    itemFloatWidget,
    componentHeader,
    placeholder
  },
  created(){
    
  },
  computed:{
    //整个页面所有的视图
    VIEWS(){
      return this.data.VIEWS;
    },
    //本组件数据（数组，多条）
    componentData(){
      console.log('componentData:',this.data.componentData)
      return this.data.componentData
    },
    //本组件视图
    componentView(){
      console.log('componentView:',this.data.componentView)
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
    sum(){
      let arr = [],
          sum = this.componentData
      arr.push(sum[0]._widget.indexpic)
      if(sum[0]._widget.pics){
        arr.push(sum[0]._widget.pics[0])
        arr.push(sum[0]._widget.pics[1])
      }
      return arr
    }
  },
  methods:{
  	listuijump(){

  	},
    getStyle(attr,index){
        let styleResult={}

        styleResult.listUI16_parentStyle=Style.toString({
            "margin":Style.margin(attr.margin),
        })
        styleResult.listUI16_listviewStyle=Style.toString({
            "padding":Style.padding(attr.itemPadding),
            "background":Style.advanceBg(attr.itemNorBg),
            "border-left":Style.borders(attr.item_border,attr.left),
            "border-right":Style.borders(attr.item_border,attr.right),
            "border-top":Style.borders(attr.item_border,attr.top),
            "border-bottom":Style.borders(attr.item_border,attr.bottom),
        })
        styleResult.listUI16_titleViewStyle=Style.toString({
            "width":"auto",
            "min-height":"12px",
            "text-align": Style.textAlign(attr.title_textAlignment),
            "background":Style.formatColorToRgba(attr.title_textFillColor),
            "margin":Style.margin(attr.title_margin),
            "padding":Style.padding(attr.title_padding),
            "white-space":Style.isWrap(attr.title_lineNum),
            "overflow":"hidden",
            "text-overflow":"ellipsis",
        })
        styleResult.listUI16_titleStyle=Style.toString({
            "width":"auto",
            "color":Style.formatColorToRgba(attr.title_textColor),
            "font-size":attr.title_textSize+'px',
            "background":Style.formatColorToRgba(attr.title_textBgColor),
            "font-weight":Style.isBold(attr.title_bold),
            "text-shadow":Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_hOffset,attr.title_vOffset,attr.title_shadowColor,attr.title_shadowRadius),
        })
        styleResult.listUI16_indexViewStyle=Style.toString({
            "width":"100%",
            // "height":Style.listUI16CompHeight(attr.margin,attr.item_border,attr.itemPadding,attr.indexPic_whScale,attr.height),
            "height":'153px'
        })
        styleResult.listUI16_indexStyle=Style.toString({
            // "width":Style.listUI16CompHeight(attr.margin,attr.item_border,attr.itemPadding,attr.indexPic_whScale,attr.width),
            "width":'255px',
            "height":"100%",
            "border-left":Style.borders(attr.indexpic_border,attr.left),
            "border-right":Style.borders(attr.indexpic_border,attr.right),
            "border-top":Style.borders(attr.indexpic_border,attr.top),
            "border-bottom":Style.borders(attr.indexpic_border,attr.bottom),
            "border-radius":Style.compareParmas(attr.indexPic_Radius,attr.indexPic_Radius,0),
        })
        styleResult.listUI16_innerImageStyle=Style.toString({
            "border-radius":Style.compareParmas(attr.indexPic_Radius,attr.indexPic_Radius,0),
        })
        styleResult.listUI16_otherIndexStyle=Style.toString({
            "width": "100%",
            // "height":Style.listUI16CompHeight(attr.margin,attr.item_border,attr.itemPadding,attr.indexPic_whScale,attr.otherpicheight),
            "height":'74px',
            "border-left":Style.borders(attr.indexpic_border,attr.left),
            "border-right":Style.borders(attr.indexpic_border,attr.right),
            "border-top":Style.borders(attr.indexpic_border,attr.top),
            "border-bottom":Style.borders(attr.indexpic_border,attr.bottom),
            "border-radius":Style.compareParmas(attr.indexPic_Radius,attr.indexPic_Radius,0),
        })
        styleResult.listUI16_dividerStyle=Style.toString({
            "background":Style.formatColorToRgba(attr.divider_bg),
            "width":"auto",
            "height":Style.getConvertValue(attr.divider_height),
            "margin":Style.margin(attr.divider_margin),
        })

        return styleResult;
    },
    previewImage(arr,index){
      console.log('arr:',arr)
      services.previewImages(arr, index);
    }
  }
}
</script>