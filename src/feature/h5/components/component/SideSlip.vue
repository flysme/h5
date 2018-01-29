<!-- 横滑组件 -->
<template name="SideSlip">
   <div>
        <!-- 引入占位图 -->
        <placeholder v-if="componentView.nodata_layout_visible && componentData.length <= 0" ></placeholder>
        <!-- 组件头部 -->
        <!-- 引入组件头 -->
        <div v-if="componentData && componentData.length > 0">
            <component-header v-if="componentView.header_visible" :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData}" ></component-header>

                <div v-for="(listItem,index) in componentView.slip_line_count" :key="index" :style="getStyle(componentView)['listviewwrap']" >
                     <div class="sys-flex">
                         <div  class="sys-flex" v-if="idx % componentView.slip_line_count == index" :key="idx" v-for="(item,idx) in componentData"
                            @click="ListUIJump(item)" >
                            <!-- 列表项样式 1 -->
                            <div class="relative " :style="getStyle(componentView)['listitemview']" hover-class="listitemview-hover" v-if="componentView.style == 0">
                                <!-- 图片 -->
                                <div class="relative">
                                    <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                    <!-- 引入索引图浮动扩展 -->
                                    <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"  ></indexpic-float-widget>
                                </div>
                                <!-- 浮动在图片底部 -->
                                <div class="absolute" :style="getStyle(componentView)['title_wrap_width']">
                                    <!-- 标题 -->
                                    <div class="sys-flex " :style="getStyle(componentView)['title-center']" >
                                       <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                                    </div>
                                    <!-- 扩展区域 -->
                                    <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></tile-widget>
                                </div>
                                <!-- 引入列表项浮动扩展 -->
                                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></item-float-widget>
                            </div>

                            <!-- 列表项样式 2 -->
                            <div class="relative " :style="getStyle(componentView)['listitemview']" hover-class="listitemview-hover" v-if="componentView.style == 1">
                                <!-- 图片 -->
                                <div class="relative">
                                    <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                    <!-- 引入索引图浮动扩展 -->
                                    <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"  ></indexpic-float-widget>
                                </div>
                                <!-- 浮动在图片底部 -->
                                <div class="absolute bottom-10 title_wrap_width">
                                    <!-- 扩展区域 -->
                                    <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></tile-widget>
                                    <!-- 标题 -->
                                    <div class="sys-flex title-center">
                                       <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                                    </div>
                                </div>
                                <!-- 引入列表项浮动扩展 -->
                                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></item-float-widget>
                            </div>

                            <!-- 列表项样式 3 -->
                            <div class="relative " :style="getStyle(componentView)['listitemview']" v-if="componentView.style == 2">
                                <!-- 图片 -->
                                <div class="relative">
                                    <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                    <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"  ></indexpic-float-widget>
                                </div>
                                <!-- 标题 -->
                                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                                <!-- 扩展区域 -->
                                <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></tile-widget>
                                <!-- 引入列表项浮动扩展 -->
                                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></item-float-widget>
                            </div>

                            <!-- 列表项样式 4 -->
                            <div class="relative " :style="getStyle(componentView)['listitemview']" hover-class="listitemview-hover" v-if="componentView.style == 3">
                                <!-- 标题 -->
                                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                                <!-- 图片 -->
                                <div class="relative">
                                    <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                    <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"  ></indexpic-float-widget>
                                </div>
                                <!-- 扩展区域 -->
                                <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></tile-widget>
                                <!-- 引入列表项浮动扩展 -->
                                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></item-float-widget>
                            </div>

                            <!-- 列表项样式 5 -->
                            <div class="sys-flex relative " :style="getStyle(componentView)['listitemview']" hover-class="listitemview-hover" v-if="componentView.style == 4">
                                <div class="relative">
                                    <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                    <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"  ></indexpic-float-widget>
                                </div>
                                <div class="relative">
                                    <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                                    <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></tile-widget>
                                </div>
                                <!-- 引入列表项浮动扩展 -->
                                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></item-float-widget>
                            </div>
                            <!-- 列表项样式 6 -->
                            <div class="sys-flex relative " :style="getStyle(componentView)['listitemview']" hover-class="listitemview-hover" v-if="componentView.style == 5">
                                <div class="relative">
                                    <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                                    <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></tile-widget>
                                </div>
                                <div class="relative">
                                    <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                    <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"  ></indexpic-float-widget>
                                </div>
                                <!-- 引入列表项浮动扩展 -->
                                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></item-float-widget>
                            </div>

                            <!-- 列表项样式 7 -->
                            <div class="relative "  :style="getStyle(componentView)['listitemview']" hover-class="listitemview-hover" v-if="componentView.style == 6">
                                <!-- 标题 -->
                                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                                <!-- 扩展区域 -->
                                <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></tile-widget>
                                <!-- 图片 -->
                                <div class="relative">
                                    <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                    <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"  ></indexpic-float-widget>
                                </div>
                                <!-- 引入列表项浮动扩展 -->
                                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></item-float-widget>
                            </div>

                            <!-- 列表项样式 8 -->
                            <div class="relative " :style="getStyle(componentView)['listitemview']" hover-class="listitemview-hover" v-if="componentView.style == 7">
                                <!-- 扩展区域 -->
                                <tile-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></tile-widget>
                                <!-- 图片 -->
                                <div class="relative">
                                    <list-item-indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-indexpic>
                                    <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"  ></indexpic-float-widget>
                                </div>
                                <!-- 标题 -->
                                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:item, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></list-item-title>
                                <!-- 引入列表项浮动扩展 -->
                                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:item,currentDetail:currentDetail}"></item-float-widget>
                            </div>
                            <!--分割线-->
                            <div class="sys-flex sys-flex-center" :style="getStyle(componentView,idx)['divider']">
                                <div class="dividerborder"> </div>
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
    import listItemIndexpic from '@h5/components/common/indexpic.vue'
    import listItemTitle from '@h5/components/common/title.vue'
    import indexpicFloatWidget from '@h5/components/widget/extend/indexpic_float_widget.vue'
    import tileWidget from '@h5/components/widget/extend/tile_widget.vue'
    import placeholder from '@h5/components/widget/extend/placeholder.vue'
    import componentHeader from '@h5/components/widget/extend/component_header.vue'
    import itemFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
    // import '@h5/tpl/style/SideSlip.scss'
    export default{
        data(){
          return {}
        },
        components:{
            listItemIndexpic,
            listItemTitle,
            indexpicFloatWidget,
            tileWidget,
            placeholder,
            componentHeader,
            itemFloatWidget
        },
        props:{
          data:Object,
        },
        created(){

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
            console.log('sideview:',this.data.componentView)
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
              let data = {
        componentView:this.data.componentView,
        componentViewId:this.data.componentViewId,
        componentData:dataItem
      }
                  URI.listuijump({data,option:this.option})
            },

            getStyle(attr,index){
                let styleResult={}
                styleResult.listitemtitle=Style.toString({
                    "max-height": Style.textHeight(attr.title_textSize,attr.title_lineSpace,attr.title_lineNum),
                    "background": Style.formatColorToRgba(attr.title_textBgColor),
                    "display": Style.isVisiable(attr.title_isVisiable),
                    "color": Style.formatColorToRgba(attr.title_textColor),
                    "margin": Style.margin(attr.title_margin),
                    "padding": Style.padding(attr.title_padding),
                    "font-weight": Style.isBold(attr.title_bold),
                    "text-align": Style.textAlign(attr.title_textAlignment),
                    "width":Style.slidewidth(attr.indexPic_width,attr.title_margin),
                    "line-height": Style.textLineHeight(attr.title_lineSpace,attr.title_textSize),
                })
                styleResult.itemtitle=Style.toString({
                    "max-width": "100%",
                    "white-space": Style.isWrap(attr.title_lineNum),
                    "overflow": "hidden",
                    "text-overflow": "ellipsis",
                })
                styleResult.title=Style.toString({
                    "background": Style.formatColorToRgba(attr.title_textFillColor),
                    "font-size": Style.getConvertValue(attr.title_textSize),
                    "text-shadow": Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_vOffset,attr.title_hOffset,attr.title_shadowColor,attr.title_shadowRadius),
                })
                styleResult.indexpic=Style.toString({
                    "margin":Style.margin(attr.indexPic_margin),
                    "position": "relative",
                    "font-size":"0",
                })
                styleResult.indexpicimage=Style.toString({
                    "border-radius": Style.getConvertValue(attr.indexPic_Radius),
                    "position": "relative",
                    "width": Style.getConvertValue(attr.indexPic_width),
                    "height": Style.getConvertValue(attr.indexPic_height),
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
                    "border-radius": Style.getConvertValue(attr.ndexPic_Radius),
                    "top": "0",
                })
                styleResult.divider=Style.toString({
                    "width": Style.getConvertValue(attr.divider_height),
                    "padding": Style.margin(attr.divider_margin),
                    "background": Style.formatColorToRgba(attr.divider_bg),
                })
                styleResult.divider_last=Style.toString({
                    "padding": "0",
                    "width": Style.getConvertValue(attr.divider_height),
                    "margin": Style.margin(attr.divider_margin),
                })
                styleResult.dividerborder=Style.toString({
                    "background": Style.formatColorToRgba(attr.divider_bg),
                    "height":" 100%",
                    "width": "1px",
                })
                styleResult.title_wrap_width=Style.toString({
                    "width":"100%",
                    "left":"0",
                    "bottom": "10px",
                })
                styleResult['title-center']=Style.toString({
                    "justify-content": "center",
                })
                styleResult.listviewwrap=Style.toString({
                    "margin": Style.margin(attr.margin),
                    "width":Style.listui4width(attr,attr.margin),
                    "overflow-x":"scroll",
                })
                if(attr.style == 2 || attr.style == 3 ||attr.style == 6 ||attr.style == 7 ){
                    styleResult.listitemview=Style.toString({
                        "background": Style.advanceBg(attr.itemNorBg),
                        "background-size": "contain",
                        "padding": Style.padding(attr.itemPadding),
                        "border-width":Style.borderWidth(attr.item_border),
                        "border-color":Style.borderColor(attr.item_border),
                        "border-style":"solid",
                        "border-radius":Style.getConvertValue(attr.cornerRadius),
                        "margin-bottom": "0",
                        "width":Style.sideSlipListItemWidth(attr.indexPic_width,attr.indexPic_margin),
                    })
                }else{
                    styleResult.listitemview=Style.toString({
                        "background": Style.advanceBg(attr.itemNorBg),
                        "background-size": "contain",
                        "padding": Style.padding(attr.itemPadding),
                        "border-width":Style.borderWidth(attr.item_border),
                        "border-color":Style.borderColor(attr.item_border),
                        "border-style":"solid",
                        "border-radius":Style.getConvertValue(attr.cornerRadius),
                        "margin-bottom": "0",
                    })
                }
                if(index){
                    if((this.componentData.length-1)==index){
                        styleResult.divider=Style.toString({
                            "width": Style.getConvertValue(attr.divider_height),
                            "padding": Style.margin(attr.divider_margin),
                            "background": Style.formatColorToRgba(attr.divider_bg),
                        })
                        styleResult.divider_last=Style.toString({
                            "padding": "0",
                            "width": Style.getConvertValue(attr.divider_height),
                            "margin": Style.margin(attr.divider_margin),
                        })
                    }else{
                        styleResult.divider=Style.toString({
                            "width": Style.getConvertValue(attr.divider_height),
                            "padding": Style.margin(attr.divider_margin),
                            "background": Style.formatColorToRgba(attr.divider_bg),
                        })
                    }
                }
                return styleResult;
            }
        },
        
    }
</script>
