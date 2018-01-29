<!-- 标准列表组件 -->
<template>
    <!-- 引入占位图 -->
    <div>
    <placeholder v-if="componentView.nodata_layout_visible && componentData.length <= 0" :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}" ></placeholder>
    <div v-if="componentData && componentData.length > 0">
      <!-- 组件头 -->
      <component-header :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"  v-if="componentView.header_visible"></component-header>
      <!-- 组件头 end-->
      <div :style="getStyle(componentView)['listitemview_parent']">
          <!-- 列表循环 start-->
          <div v-for="(listItem,inx) in componentData" :key='inx'>
              <!-- 列表项 start-->
              <div class=" relative" :style="getStyle(componentView)['listitemview']" @click="ListUIJump(listItem)">
                  <!-- 左图 右标题 + 扩展 -->
                  <div class="sys-flex relative " v-if="componentView.style == 0">
                      <!-- 左侧图片 -->
                      <div class="relative" :style="getStyle(componentView,listItem)['default_margin']">
                          <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                          <!-- 引入索引图浮动扩展 -->
                          <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"  ></indexpic-float-widget>
                      </div>
                      <!-- 右侧标题 + 扩展 -->
                      <div class="sys-flex-one sys-flex sys-vertical">
                          <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                          <div class="sys-flex-one">
                              <!-- 引入平铺扩展 -->
                              <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                          </div>
                      </div>
                  </div>
                  <!-- 左侧标题+扩展 右侧索引图 -->
                  <div class="sys-flex relative " v-if="componentView.style == 1">
                      <!-- 左侧标题 + 扩展 -->
                      <div class="sys-flex-one sys-flex sys-vertical" :style="getStyle(componentView,listItem)['default_margin']">
                          <!-- 标题 -->
                          <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                          <div class="sys-flex-one">
                              <!-- 引入平铺扩展 -->
                              <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                          </div>
                      </div>
                      <!-- 右侧图片 -->
                      <div class="relative">
                         <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                          <!-- 引入索引图浮动扩展 -->
                          <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                      </div>
                  </div>
                  <!-- 上标题 下索引图+扩展-->
                  <div class="relative " v-if="componentView.style == 2">
                      <!-- 标题 -->
                      <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                      <div class="sys-flex">
                          <div class="relative" :style="getStyle(componentView,listItem)['default_margin']">
                              <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                              <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                          </div>
                          <div class="sys-flex-one">
                              <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                          </div>
                      </div>
                      <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                  </div>
                  <!-- 上标题 下索引图+扩展-->
                  <div class="relative " v-if="componentView.style == 3">
                      <!-- 标题 -->
                      <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                      <div class="sys-flex">
                          <!-- 扩展区域 -->
                          <div class="sys-flex-one" :style="getStyle(componentView,listItem)['default_margin']">
                              <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                          </div>
                          <!-- 索引图 -->
                          <div class="relative">
                              <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                              <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                          </div>
                      </div>
                      <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}"></item-float-widget>
                  </div>
                  <!-- 组合1 -->
                  <div class="" v-if="componentView.style == 4">
                      <!-- 左图 右标题 + 扩展 -->
                      <div class="sys-flex relative" v-if="inx%2 == 0">
                          <!-- 左侧图片 -->
                          <div class="relative" :style="getStyle(componentView,listItem)['default_margin']">
                               <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                              <!-- 引入索引图浮动扩展 -->
                                <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                          </div>
                          <!-- 右侧标题 + 扩展 -->
                          <div class="sys-flex-one sys-flex sys-vertical">
                              <div>
                                <!-- 标题 -->
                                 <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                              </div>
                              <div class="sys-flex-one">
                                <!-- 引入平铺扩展 -->
                                  <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                              </div>
                          </div>
                      </div>
                      <!-- 左侧标题+扩展 右侧索引图 -->
                      <div class="sys-flex relative" v-if="inx%2 == 1">
                          <!-- 左侧标题 + 扩展 -->
                          <div class="sys-flex-one sys-flex sys-vertical" :style="getStyle(componentView,listItem)['default_margin']">
                              <div>
                              <!-- 标题 -->
                                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                              </div>
                              <div class="sys-flex-one">
                              <!-- 引入平铺扩展 -->
                                <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                              </div>
                          </div>
                          <!-- 右侧图片 -->
                          <div class="relative">
                              <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                              <!-- 引入索引图浮动扩展 -->
                              <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                          </div>
                      </div>
                  </div>
                  <!-- 组合2 -->
                  <div class="" v-if="componentView.style == 5">
                      <!-- 上标题 下索引图+扩展-->
                      <div class="relative" v-if="inx%2 == 0">
                          <!-- 标题 -->
                          <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                          <div class="sys-flex">
                              <div class="relative" :style="getStyle(componentView,listItem)['default_margin']">
                                  <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                  <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                              </div>
                              <div class="sys-flex-one">
                                  <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                              </div>
                          </div>
                          <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                      </div>

                      <!-- 上标题 下索引图+扩展-->
                      <div class="relative" v-if="inx%2 == 1">
                          <!-- 标题 -->
                          <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                          <div class="sys-flex">
                              <!-- 扩展区域 -->
                              <div class="sys-flex-one" :style="getStyle(componentView,listItem)['default_margin']">
                                 <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                              </div>
                              <!-- 索引图 -->
                              <div class="relative">
                                  <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                  <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                              </div>
                          </div>
                          <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
                      </div>
                  </div>
                  <!-- 引入列表项浮动扩展 -->
                  <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
              </div>
              <!-- 列表项 end-->
              <!--分割线 start-->
              <div :style="getStyle(componentView)['divider']"></div>
              <!--分割线 end-->
          </div>
          <!-- 列表循环 end-->
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
    import placeholder from '@h5/components/widget/extend/placeholder.vue'
    import indexpicFloatWidget from '@h5/components/widget/extend/indexpic_float_widget.vue'
    import itemFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
    // import '@h5/tpl/style/listui1.scss'
    export default{
        data(){
          return {}
        },
        props:{
          data:Object
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
          ListUIJump(dataItem){
            // uri所需的参数
            let data = {
              componentView:this.data.componentView,
              componentViewId:this.data.componentViewId,
              componentData:dataItem
            }
            URI.listuijump({data})
          },
          getStyle(attr,listItem){
            let styleResult={}

            styleResult.listitemview_parent=Style.toString({
               "margin": Style.margin(attr.margin),
            })
            styleResult.listitemview=Style.toString({
              "background": Style.advanceBg(attr.itemNorBg),
              "background-size":"contain",
              "padding": Style.padding(attr.itemPadding),
              "border-width":Style.borderWidth(attr.item_border),
              "border-color":Style.borderColor(attr.item_border),
              "border-style":"solid",
              "border-radius": attr.cornerRadius+'px',
            })
            styleResult.listitemtitle=Style.toString({
              "max-height": Style.textHeight(attr.title_textSize,attr.title_lineSpace,attr.title_lineNum),
              "background": Style.formatColorToRgba(attr.title_textBgColor),
              "display": Style.isVisiable(attr.title_isVisiable),
              "color": Style.formatColorToRgba(attr.title_textColor),
              "margin": Style.margin(attr.title_margin),
              "padding": Style.padding(attr.title_padding),
              "font-weight": Style.isBold(attr.title_bold),
            })
            styleResult.itemtitle=Style.toString({
              "max-width": "100%",
              "white-space": Style.isWrap(attr.title_lineNum),
              "line-height": Style.textLineHeight(attr.title_lineSpace,attr.title_textSize),
              "overflow": "hidden",
              "text-overflow": "ellipsis",
              "max-height": Style.textHeight(attr.title_textSize,attr.title_lineSpace,attr.title_lineNum),
              "text-align": Style.textAlign(attr.title_textAlignment),
            })
            styleResult.title=Style.toString({
              "display": "block",
              "background": Style.formatColorToRgba(attr.title_textFillColor),
              "font-size": attr.title_textSize+'px',
              "text-shadow": Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_vOffset,attr.title_hOffset,attr.title_shadowColor,attr.title_shadowRadius),
            })
            styleResult.indexpic=Style.toString({
              "width": Style.getConvertValue(attr.indexPic_width),
              "height": Style.getConvertValue(attr.indexPic_height),
              "display": Style.isVisiable(attr.indexPic_isVisiable),
            })
            styleResult.indexpicimage=Style.toString({
              "position": "relative",
              "width": "100%",
              "height": "100%",
              "border-radius": Style.getConvertValue(attr.indexPic_Radius),
              "position": "relative",
              "border-width":Style.borderWidth(attr.indexpic_border),
              "border-color":Style.borderColor(attr.indexpic_border),
              "border-style":"solid",
            })
            styleResult.indexpicmask=Style.toString({
              "display": Style.isVisiable(attr.indexPic_isMask),
              "background": Style.formatColorToRgba(attr.indexPic_maskBg),
              "width": "100%",
              "height": "100%",
              "position": "absolute",
              "top": "0",
            })
            styleResult.divider=Style.toString({
              "margin": Style.margin(attr.divider_margin),
              "background": Style.formatColorToRgba(attr.divider_bg),
              "height": attr.divider_height+'px',
            })
            if(listItem){
              if(listItem._widget && listItem._widget.indexpic){
                styleResult.default_margin=Style.toString({
                   "margin-right":Style.listui1DefaultMargin(attr.title_margin)
                })
              }else{
                styleResult.default_margin={}
              }
            }
            return styleResult;
          }
        },
        components:{
          listItemTitle,
          listItemIndexpic,
          tileWidget,
          componentHeader,
          placeholder,
          indexpicFloatWidget,
          itemFloatWidget
        }
    }
</script>
