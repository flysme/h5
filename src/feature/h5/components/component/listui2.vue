<!-- 大图组件 -->
<template >
    <div>
        <!-- 引入占位图 -->
        <placeholder v-if="componentView.nodata_layout_visible && componentData.length <= 0" :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}"></placeholder>
        <div v-if="componentData && componentData.length > 0">
        <!-- 引入组件头 -->
          <component-header v-if="componentView.header_visible" :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}" ></component-header>
          <div :key="index" v-for="(listItem,index) in componentData" @click="ListUIJump(listItem)" >
              <!-- 图 标题 扩展 -->
              <div class="relative" :style="getStyle(componentView)['listitemview']" v-if="componentView.style == 0 ">
                  <div class="relative">
                      <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                      <!-- 引入索引图浮动扩展 -->
                      <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                  </div>
                  <!-- 标题 -->
                  <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                  <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                  <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
              </div>
              <!-- 标题 图 扩展 -->
              <div class="relative " :style="getStyle(componentView)['listitemview']" v-if="componentView.style == 1 ">
                  <!-- 标题 -->
                  <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                  <div class="relative">
                      <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                      <!-- 引入索引图浮动扩展 -->
                      <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                  </div>
                  <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                  <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
              </div>

              <!-- 图片 标题在图上，居下对齐 扩展 -->
              <div class="relative "  :style="getStyle(componentView)['listitemview']" v-if="componentView.style == 2 ">
                  <div class="relative">
                     <div class="relative">
                         <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                         <!-- 引入索引图浮动扩展 -->
                         <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                     </div>
                     <div class="title_in_pic"  >
                         <!-- 标题 -->
                         <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                     </div>
                  </div>

                  <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                  <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}"></item-float-widget>
              </div>

              <!-- 扩展 图 标题 -->
              <div class="relative "  :style="getStyle(componentView)['listitemview']" v-if="componentView.style == 3 ">
                  <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                  <div class="relative">
                      <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                      <!-- 引入索引图浮动扩展 -->
                      <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                  </div>
                  <!-- 标题 -->
                  <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                  <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
              </div>

              <!-- 图片 标题居上绝对定位 扩展居下绝对定位 -->
              <div class="relative " :style="getStyle(componentView)['listitemview']" v-if="componentView.style == 4 ">
                  <!-- 标题 -->
                  <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                  <div class="relative">
                      <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                      <!-- 引入索引图浮动扩展 -->
                      <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                  </div>
                  <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                  <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
              </div>

              <!-- 图片 扩展居上绝对定位 标题居下绝对定位 -->
              <div class="relative " :style="getStyle(componentView)['listitemview']" v-if="componentView.style == 5 ">
                  <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></tile-widget>
                  <div class="relative">
                      <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                      <!-- 引入索引图浮动扩展 -->
                      <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"  ></indexpic-float-widget>
                  </div>
                  <!-- 标题 -->
                  <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                  <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem,currentDetail:currentDetail}"></item-float-widget>
              </div>
              
              <!--分割线-->
              <div class="sys-flex sys-flex-center " :style="getStyle(componentView)['divider']">
                  <div  :style="getStyle(componentView)['dividerborder']"> </div>
              </div>
          </div>
        </div>
    </div>
</template>
<style>
  .title_in_pic{
    position: absolute;
    bottom:0;
    left: 0;
    width:100%;
  }
</style>
<script>
    import Style from '@h5/gen_css/common';
    import { URI } from '@h5/sdk/index';

    import indexpicFloatWidget from '@h5/components/widget/extend/indexpic_float_widget.vue'
    import placeholder from '@h5/components/widget/extend/placeholder.vue'
    import listItemTitle from '@h5/components/common/title.vue'
    import listItemIndexpic from '@h5/components/common/indexpic.vue'
    import componentHeader from '@h5/components/widget/extend/component_header.vue'
    import itemFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
    import tileWidget from '@h5/components/widget/extend/tile_widget.vue'
    // import '@h5/tpl/style/listui2.scss'
    export default{
        name:'ListUI2',
        data(){
          return {}
        },
        props:{
          data:Object,
          option:Object
        },
        created(){
          console.log('view:',this.data.componentView)
        },
        computed:{
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
              // let compviewid = this.data.componentViewId,
              //     data = item,
              //     view = this.data.componentView,
              //     dataset = {compviewid,data,view};
              //     console.log(dataset);
              let data = {
                componentView:this.data.componentView,
                componentViewId:this.data.componentViewId,
                componentData:dataItem
              }
              URI.listuijump({data,option:this.option})
          },
          getStyle(attr,index){
            let styleResult={}
            styleResult.listitemview=Style.toString({
              "background": Style.advanceBg(attr.itemNorBg),
              "margin": Style.margin(attr.margin),
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
              "text-align": Style.textAlign(attr.title_textAlignment),
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
              "background": Style.formatColorToRgba(attr.title_textFillColor),
              "font-size": attr.title_textSize+'px',
              "text-shadow": Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_vOffset,attr.title_hOffset,attr.title_shadowColor,attr.title_shadowRadius),
            })
            styleResult.indexpic=Style.toString({
              "width": "100%",
              "height":Style.listui2IndexPicWidth(attr,attr.indexPic_whScale),
            })
            styleResult.indexpicimage=Style.toString({
              "border-radius": attr.indexPic_Radius+'px',
              "position": "relative",
              "border-width":Style.borderWidth(attr.indexpic_border),
              "border-color":Style.borderColor(attr.indexpic_border),
              "border-style":"solid",
              "width": "100%",
              "height":"100%",
            })
            styleResult.indexpicmask=Style.toString({
              "border-radius": attr.indexPic_Radius+'px',
              "display": Style.isVisiable(attr.indexPic_isMask),
              "background": Style.formatColorToRgba(attr.indexPic_maskBg),
              "width": "100%",
              "height": "100%",
              "position": "absolute",
              "top": "0",
            })
            styleResult.divider=Style.toString({
              "height": Style.getConvertValue(attr.divider_height),
              "margin": Style.margin(attr.divider_margin),
            })
            styleResult.dividerborder=Style.toString({
              "background": Style.formatColorToRgba(attr.divider_bg),
              "height": attr.divider_height+'px',
              "width": "100%",
            })
            
            return styleResult;
          }
        },
        components:{
          indexpicFloatWidget,
          placeholder,
          listItemTitle,
          listItemIndexpic,
          componentHeader,
          tileWidget,
          itemFloatWidget
        }
    }
</script>
