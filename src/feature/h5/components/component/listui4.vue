<template>
  <div>
    <!-- {{data}} -->

    <!-- 引入占位图 -->
    <!--  <include v-if="VIEW[viewId].nodata_layout_visible && componentData.length <= 0" src="../base/extend/placeholder.wxml" /> -->
    <!--ListUI4等高图模版-->
    <div v-if="componentData && componentData.length > 0">
      <div class="ListUI-view" >
        <!-- 引入组件头 -->
        <component-header :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"  v-if="componentView.header_visible"></component-header>
        <div class="sys-flex sys-wrap " :style="getStyle(componentView)['listuiview']">
          <div :style="getStyle(componentView)['listview']">
            <div v-for="(listItem,index) in componentData" class="list-view detailwidth " :style="getStyle(componentView,index+1)['list-width-item']" @click="listuijump(listItem)" >
              <div  :style="getStyle(componentView,index+1)['listui4item']" >
                <!--并行6种-->
                <!-- 0 图片 标题 扩展区域-->
                <div v-if="componentView.style == 0"  class="relative list-view-item">
                    <div class="sys-flex-one sys-flex sys-vertical" :style="getStyle(componentView,index+1)['listitemview']" >
                        <div class="relative">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                            <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                            <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                    </div>
                    <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 0 end-->
                <!-- 1 标题 图片 扩展区域-->
                <div v-if="componentView.style == 1" class="relative" :style="getStyle(componentView)['list-view-item']">
                    <div class="sys-flex-one sys-flex sys-vertical " :style="getStyle(componentView)['listitemview']">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                        <div class="relative">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                        <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                    </div>
                     <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 1 end-->
                <!-- 2 图片(标题下) 扩展区域 -->
                <div v-if="componentView.style == 2" class="list-view-item relative">
                    <div class="sys-flex-one sys-flex sys-vertical " :style="getStyle(componentView)['listitemview']">
                        <div class="relative">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"  ></indexpic-float-widget>
                            <div class="indexpictitle"  :style="getStyle(componentView)['style_' + VIEWS[viewId].style]">
                                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                            </div>
                        </div>
                        <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                    </div>
                    <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 2 end-->
                <!-- 3 扩展区域 图片 标题  -->
                <div v-if="componentView.style == 3" class="list-view-item relative">
                    <div class="sys-flex-one sys-flex sys-vertical " :style="getStyle(componentView)['listitemview']">
                            <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                        <div class="relative">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                        <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                    </div>
                    <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 3 end-->
                <!-- 4 左图 , 右 上标题 下扩展区域 -->
                <div v-if="componentView.style == 4" class="list-view-item relative">
                    <div class="sys-flex-one sys-flex " :style="getStyle(componentView)['listitemview']">
                        <div class="relative " :style="getStyle(componentView)['indexpicWidth']">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                        <div class="sys-flex-one">
                            <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                            <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                        </div>
                    </div>
                    <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 4 end-->
                <!-- 5 左图 , 右 上扩展区域 下标题 -->
                <div v-if="componentView.style == 5" class="list-view-item relative">
                    <div class="sys-flex-one sys-flex " :style="getStyle(componentView)['listitemview']">
                        <div class="relative " :style="getStyle(componentView)['indexpicWidth']">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                        <div class="sys-flex-one">
                            <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                            <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                        </div>
                    </div>
                    <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 5 end-->
                <!-- 6 左 上扩展区域 下标题 , 右 图 -->
                <div v-if="componentView.style == 6" class="list-view-item relative">
                    <div class="sys-flex-one sys-flex " :style="getStyle(componentView)['listitemview']">
                        <div class="sys-flex-one">
                            <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                            <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                        </div>
                        <div class="relative " :style="getStyle(componentView)['indexpicWidth']">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                    </div>
                    <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 6 end-->
                <!-- 7 左 上标题 下扩展区域 , 右 图 -->
                <div v-if="componentView.style == 7" class="list-view-item relative">
                    <div class="sys-flex-one sys-flex " :style="getStyle(componentView)['listitemview']">
                        <div class="sys-flex-one">
                            <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                            <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                        </div>
                        <div class="relative " :style="getStyle(componentView)['indexpicWidth']">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                           <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                    </div>
                    <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 7 end-->
                 <!-- 8 图片 扩展区域 标题-->
                <div v-if="componentView.style == 8" class="list-view-item relative">
                    <div class="sys-flex-one sys-flex sys-vertical " :style="getStyle(componentView)['listitemview']">
                        <div class="relative">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                        <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                        <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                    </div>
                    <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 8 end-->
                 <!-- 9 标题 扩展区域 图片-->
                <div v-if="componentView.style == 9" class="list-view-item relative">
                    <div class="sys-flex-one sys-flex sys-vertical " :style="getStyle(componentView)['listitemview']">
                            <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                            <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                        <div class="relative">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                    </div>
                   <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 9 end-->
                <!-- 10 图片 扩展区域 标题 -->
                <div v-if="componentView.style == 10" class="list-view-item relative">
                    <div class="sys-flex-one sys-flex sys-vertical " :style="getStyle(componentView)['listitemview']">
                        <div class="relative">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                            <div class="indexpictitle " :class="['style_' + VIEWS[viewId].style]">
                                <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                            </div>
                        </div>
                        <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                    </div>
                    <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 10 end-->
                <!-- 11  上扩展区域 标题, 下图片 -->
                <div v-if="componentView.style == 11" class="list-view-item relative">
                      <div class="sys-flex-one sys-flex sys-vertical " :style="getStyle(componentView)['listitemview']">
                            <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                            <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                        <div class="relative">
                            <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                           <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                        </div>
                    </div>
                   <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                </div>
                <!-- 11 end-->
                <div class="" :style="getStyle(componentView)['horizontal_line']"></div>
              </div>
              <!--两列垂直分割线-->
              <div  :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===2 &&  index % 2 === 0"></div>
              <!--三列垂直分割线-->
              <div :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===3 &&  (index+1) % 3 != 0"></div>
              <!--四列垂直分割线-->
              <div :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===4 &&  (index+1) % 4 != 0"></div>
              <!--五列垂直分割线-->
              <div :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===5 &&  (index+1) % 5 != 0"></div>
              <!--六列垂直分割线-->
              <div :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===6 &&  (index+1) % 6 != 0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>



<script>

import Style from '@h5/gen_css/common';
import { URI } from '@h5/sdk/index';
import listItemTitle from '@h5/components/common/title.vue'
import listItemIndexpic from '@h5/components/common/indexpic.vue'
import tileWidget from '@h5/components/widget/extend/tile_widget.vue'
import componentHeader from '@h5/components/widget/extend/component_header.vue'
import itemFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
import indexpicFloatWidget from '@h5/components/widget/extend/indexpic_float_widget.vue'
export default{
  props: {
    data: Object,
    option:Object
  },
  data(){
    return {
      templateName: '等高图组件'
    }
  },
  components:{
    listItemTitle,
    listItemIndexpic,
    tileWidget,
    componentHeader,
    itemFloatWidget,
    indexpicFloatWidget,
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
    listuijump(dataItem){
      // uri所需的参数
      let data = {
        componentView:this.data.componentView,
        componentViewId:this.data.componentViewId,
        componentData:dataItem
      }
      URI.listuijump({data,option:this.option})
    },
    getStyle(attr,index){
        let styleResult={}

        styleResult.listuiview=Style.toString({
            "width":"100%",
            "overflow":"hidden",
        })

        styleResult.listview=Style.toString({
            "width":Style.listui4width(attr,attr.vertical_divider_margin),
            "margin": Style.margin(attr.margin),
            "display":"flex",
            "flex-wrap":"wrap",
        })
        styleResult.listui4itemwidthdel=Style.toString({
            "width":Style.listui4itemwidthdel(attr)
        })
        styleResult.horizontal_line=Style.toString({
            "border-bottom":attr.divider_height+'px '+'solid '+Style.formatColorToRgba(attr.divider_bg),
            "margin": Style.margin(attr.divider_margin),
            "width":Style.listui4horizonwidth(attr.divider_margin),
        })
        styleResult.listitemview=Style.toString({
            "background":Style.advanceBg(attr.itemNorBg),
            "padding":Style.padding(attr.itemPadding),
            "border-radius":attr.cornerRadius+'px',
            "border-width":Style.borderWidth(attr.item_border),
            "border-color":Style.borderColor(attr.item_border),
            "border-style":"solid",
        })
        styleResult.listitemtitle=Style.toString({
            "background": Style.formatColorToRgba(attr.title_textBgColor),
            "display": Style.isVisiable(attr.title_isVisiable),
            "color": Style.formatColorToRgba(attr.title_textColor),
            "margin": Style.margin(attr.title_margin),
            "padding": Style.padding(attr.title_padding),
            "font-weight": Style.isBold(attr.title_bold),
            "text-align": Style.textAlign(attr.title_textAlignment),
        })
        styleResult.itemtitle=Style.toString({
            "max-width": "100%",
            "white-space": Style.isWrap(attr.title_lineNum),
            "line-height": Style.textLineHeight(attr.title_lineSpace,attr.title_textSize),
            "overflow": "hidden",
            "text-overflow": "ellipsis",
            "max-height": Style.textHeight(attr.title_textSize,attr.title_lineSpace,attr.title_lineNum),
        })
        styleResult.title=Style.toString({
            "background": Style.formatColorToRgba(attr.title_textFillColor),
            "font-size": attr.title_textSize+'px',
            "text-shadow": Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_vOffset,attr.title_hOffset,attr.title_shadowColor,attr.title_shadowRadius),
        })
        styleResult.indexpic=Style.toString({
            "width":Style.getnavindexpicWidth(attr.indexPic_fatherScale),
            "margin":"auto",
            "height":"0",
            "padding-top":Style.getnavindexpicHeights(attr,attr.indexPic_fatherScale,attr.indexPic_whScale),
            "position":"relative",
        })
        styleResult.indexpicimage=Style.toString({
            "width":"100%",
            "height":"100%",
            "left":"0",
            "top":"0",
            "border-radius": attr.indexPic_Radius+'px',
            "position": "absolute",
            "border-width":Style.borderWidth(attr.indexpic_border),
            "border-color":Style.borderColor(attr.indexpic_border),
            "border-style":"solid",
        })
        styleResult.style_2=Style.toString({
            "position":"absolute",
            "bottom": "0",
        })
        styleResult.style_3=Style.toString({
            "position":"absolute",
            "top": "0",
        })
        styleResult.style_4=Style.toString({
            "position":"absolute",
            "bottom": "0",
        })
        styleResult.indexpicmask=Style.toString({
            "display": Style.isVisiable(attr.indexPic_isMask),
            "background": Style.formatColorToRgba(attr.indexPic_maskBg),
            "width": "100%",
            "height": "100%",
            "position": "absolute",
            "border-radius": Style.getConvertValue(attr.indexPic_Radius),
            "top": "0",
        })
        styleResult.indexpicWidth=Style.toString({
            "width":Style.listui4IndexPicWidthOut(attr.style,attr.indexPic_fatherScale)
        })
        styleResult.vertical_line=Style.toString({
            "display":"inline-block",
            "margin":Style.margin(attr.vertical_divider_margin),
            "height":"100%",
            "width":Style.navwidth(attr.vertical_divider_width),
            "background": Style.formatColorToRgba(attr.vertical_divider_bg),
        })
        styleResult['list-width-item']=Style.toString({
            "width":Style.listui4itemwidth(attr),
            "display":"flex",
        })
        styleResult.listui4item=Style.toString({
            "text-align":"center",
            "box-sizing":"border-box",
            "width":Style.listdevwidth(attr),
        })
        if(index){
            if((index) % attr.eachLineCount == 0){
                styleResult['list-width-item']=Style.toString({
                    "display":"flex",
                    "width":Style.listui4itemwidthdel(attr)
                })
                styleResult.listui4item=Style.toString({
                    "text-align":"center",
                    "box-sizing":"border-box",
                    "width": "100%!important",
                })
            }
        }
        return styleResult
    }
  }
}

</script>
