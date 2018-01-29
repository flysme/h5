<template>
    <div >
        <!-- 引入占位图 -->
        <!-- <include wx:if="{{VIEW[viewId].nodata_layout_visible && componentData.length <= 0}}" src="../base/extend/placeholder.wxml" /> -->
        <div v-if="componentData && componentData.length > 0">
        <!--Slider幻灯模版-->
          <div class="ListUI-view"  >
          <!--组件头-->
          <!-- 组件头部 -->
          <!-- 引入组件头 -->
            <component-header :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"  v-if="componentView.header_visible"></component-header>
            <div class="relative " :style="getStyle['slideritem']">
              <!--bindchange="swiperChange"-->
              <van-swipe @change="bindchange"
               :autoplay="componentView.slider_isRoll && componentView.slider_rollTime * 1000"
               :show-indicators="false"
               :duration="500"
                :style="getStyle['swiper'+componentView.style]">
                <van-swipe-item v-for="(listItem ,index) in componentData" :key="index" >
                  <div  :style="getStyle['indexpicmask']"></div>
                    <img :src="listItem._widget.indexpic" @click="listuijump(listItem)"   class="slide-image " :style="getStyle['img']" />
                  <!-- 标题 -->
                  <div  :style="getStyle['indexpictitle'+componentView.style]" >
                    <div   :style="getStyle['listitemtitle']">
                      <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle,currentDetail:currentDetail}"></list-item-title>
                    </div>
                  </div>
                </van-swipe-item>
              </van-swipe>
              <!-- 游标 -->
              
            </div>
          </div>
        </div>
    </div>
</template>

<script>

import Style from '@h5/gen_css/common';
import { URI } from '@h5/sdk/index';
import listItemTitle from '@h5/components/common/title.vue'
import componentHeader from '@h5/components/widget/extend/component_header.vue'

export default {
    components: {
        listItemTitle,
        componentHeader
    },
    data(){
        return {
            
        }
    },
    props:{
        data:Object,
        option:Object
    },
    created(){
        
    },
    computed:{
      ismargin(){
          return layout.is_vertical ? layout.width+'px':'';
      },
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
      getStyle(){
          let attr=this.componentView
          let styleResult={}
          styleResult.slideritem=Style.toString({
            "background":Style.advanceBg(attr.itemNorBg),
            "margin": Style.margin(attr.slider_margin),
            "padding": Style.padding(attr.slider_padding),
            "border-width":Style.borderWidth(attr.item_border),
            "border-color":Style.borderColor(attr.item_border),
            "border-style":"solid",
          })
          styleResult.swiper0=Style.toString({
             "height":Style.swiperHeight(attr.slider_whScale),
          })
          styleResult.img=Style.toString({
            "width":"100%",
            "height":Style.swiperHeight(attr.slider_whScale),
            "border-radius": Style.getConvertValue(attr.indexPic_Radius),
          })
          styleResult.swiper1=Style.toString({
            "height":Style.swipermainHeight(attr.slider_whScale,attr.slider_indexSize,attr.slider_indexPadding,attr.index_isVisiable),
          })
          styleResult.swiper2=Style.toString({
            "height":Style.swiper2height(attr.slider_whScale,attr.title_textSize,attr.title_padding,attr.slider_indexSize,attr.slider_indexPadding),
          })
          styleResult.swiper3=Style.toString({
            "height":Style.swipermainHeight(attr.slider_whScale,attr.title_textSize,attr.title_padding,attr.title_isVisiable),
          })
          styleResult.indexpictitle0=Style.toString({
            "width":"100%",
            "position": "absolute",
            "bottom": Style.swiperbottom(attr.slider_indexSize,attr.slider_indexPadding),
          })
          styleResult.indexpictitle1=Style.toString({
            "width": "100%",
            "position": "absolute",
            "bottom": Style.swiperbottom(attr.slider_indexSize,attr.slider_indexPadding),
          })
          styleResult.indexpictitle2=Style.toString({
            "width": "100%",
            "position": "absolute",
            "top":Style.swiperHeight(attr.slider_whScale),
          })
          styleResult.indexpictitle3=Style.toString({
            "width": "100%",
            "position": "absolute",
            "bottom": "0px",
          })
          styleResult.indexcurrent=Style.toString({
             "display": Style.isVisiable(attr.index_isVisiable),
             "width":Style.slidercurrentWidth(attr.slider_indexMargin,attr.slider_indexPadding,attr.slider_padding),
             "right":Style.sliderposrspace(attr.slider_padding),
             "bottom":Style.sliderbottom(attr.slider_margin),
             "position":"absolute",
             "padding":Style.padding(attr.slider_indexPadding),
             "margin":Style.margin(attr.slider_indexMargin),
             "background":Style.formatColorToRgba(attr.slider_index_bgColor),
          })
          styleResult.indexcurrent3=Style.toString({
            "bottom": Style.swiperincurrentbottom(attr.title_textSize,attr.title_padding,attr.title_isVisiable,attr.slider_indexMargin)
          })
          styleResult.slider=Style.toString({
            "color":Style.formatColorToRgba(attr.slider_index_norColor),
            "font-size":Style.getConvertValue(attr.slider_indexSize),
            "justify-content":Style.justContent(attr.slider_indexLocation),
          })
          styleResult.indexpicmask=Style.toString({
            "width":"100%",
            "height":"100%",
            "top": "0",
            "position":"absolute",
            "display": Style.isVisiable(attr.indexPic_isMask),
            "background": Style.formatColorToRgba(attr.indexPic_maskBg),
            "border-radius": Style.getConvertValue(attr.indexPic_Radius),
          })
          styleResult.current=Style.toString({
            "color":Style.formatColorToRgba(attr.slider_index_curColor)
          })
          styleResult.pre=Style.toString({
             "color":Style.formatColorToRgba(attr.slider_index_norColor),
             "padding-right":Style.itempadding(attr.slider_index_space),
             "padding-left":Style.itempadding(attr.slider_index_space),
          })
          styleResult.listitemtitle=Style.toString({
            "min-height":Style.sliderminheight(attr.title_textSize),
            "background": Style.formatColorToRgba(attr.title_textBgColor),
            "display": Style.isVisiable(attr.title_isVisiable),
            "color": Style.formatColorToRgba(attr.title_textColor),
            "margin": Style.margin(attr.title_margin),
            "font-weight":Style.slidertitlebold(attr.title_bold),
          })
          styleResult.itemtitle=Style.toString({
            "max-width":"100%",
            "white-space":"nowrap",
            "line-height":attr.title_textSize+"px",
            "overflow": "hidden",
            "padding":Style.padding(attr.title_padding),
            "text-overflow": "ellipsis",
            "max-height":Style.sliderminheight(attr.title_textSize),
            "text-align": Style.textAlign(attr.title_textAlignment),
          })
          styleResult.title=Style.toString({
            "font-size":attr.title_textSize+"px",
            "text-shadow":Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_vOffset,attr.title_hOffset,attr.title_shadowColor,attr.title_shadowRadius),
          })
          styleResult.indexpic=Style.toString({
            "width": "100%",
            "height": Style.swiperHeight(attr.slider_whScale),
          })
          styleResult.header=Style.toString({
            "display":Style.isDisplay(attr.header_visible,attr.flex),
            "background":Style.advanceBg(attr.header_bg),
            "margin":Style.margin(attr.header_margin),
            "text-align":Style.textAlign(attr.header_title_textAlignment),
            "height":Style.swiperHeight(attr.header_whScale),
            "line-height":Style.swiperHeight(attr.header_whScale),
          })
          styleResult.headheadertitleertitle=Style.toString({
            "width": "100%",
            "color":Style.formatColorToRgba(attr.header_title_textColor),
            "font-size":attr.header_title_textSize+"px",
            "white-space":Style.isWrap(attr.header_title_lineNum),
            "margin":Style.margin(attr.header_title_margin),
          })
            return styleResult;
        },
    },
    methods:{
      listuijump(listItem){
        let data = {
          componentView:this.data.componentView,
          componentViewId:this.data.componentViewId,
          componentData:listItem
        }
        URI.listuijump({data,option:this.option})
      },
      bindchange(){

      }
    }
}
</script>
