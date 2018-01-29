<!-- 布局模板 -->
<template>
        <!-- 判断是为了解决递归结束后subviews不存在报错 -->
        <!-- <div v-if="VIEWS[ items ] && VIEWS[ items ].subviews || VIEWS[ items ].view != 'linear_layout'" :class="classItem" :id="attrId" > -->
        <div @click="setJump(VIEWS,items,dataItem,currentDetail)"  v-if="VIEWS[ items ] && VIEWS[ items ].subviews || VIEWS[ items ].view != 'linear_layout'" :class="classItem" :style="getStyle(VIEWS[attrId])[VIEWS[attrId].view]" :ids="attrId">
          <!-- 如果子元素是布局 引入自己-->
            <!-- <div v-for="(item,idx) in VIEWS[ items ].subviews"  :ids="item" :attrs= 'VIEWS[item].view' :style="VIEWS[ item ].view != 'linear_layout' ? getStyle(VIEWS[item])[VIEWS[item].view] :''"   :class="VIEWS[ item ].view == 'linear_layout'?'subviews' : ['relative',VIEWS[ item ].view , 'layout_gravity_' + VIEWS[ item ].layout_gravity,{'hidden':isHidden(VIEWS,dataItem,item)}]"   @click="setJump(VIEWS,item)" > -->
            <div v-for="(item,idx) in VIEWS[ items ].subviews"  :ids="item" :attrs= 'VIEWS[item].view' :style="VIEWS[ item ].view != 'linear_layout' ? getStyle(VIEWS[item])[VIEWS[item].view] :getStyle(VIEWS[item])['linear']"   :class="VIEWS[ item ].view == 'linear_layout'?'subviews' : ['relative',VIEWS[ item ].view , 'layout_gravity_' + VIEWS[ item ].layout_gravity,{'hidden':isHidden(VIEWS,dataItem,item)}]"   @click="setJump(VIEWS,item,dataItem,currentDetail)" >
                <layout
                    v-if="VIEWS[ item ].view == 'linear_layout'"
                    :data="{
                        VIEWS:VIEWS,
                        item:item,
                        data:dataItem,
                        id:item,
                        currentDetail:currentDetail,
                        classItem:[VIEWS[ item ].view,`layout_gravity_${VIEWS[item].layout_gravity}`,`orientation_${VIEWS[item].orientation}`,`gravity_${VIEWS[item].gravity}`]
                      }"></layout>
                <!-- <div class="contact-button" v-if="VIEWS[ item ].__meta__.hasConversation && VIEWS[ item ].view == 'linear_layout'">
                    <include src="../base/kefu.wxml" />
                </div> -->
                <!-- 引入控件 -->
                <all-control v-else :data="{VIEWS:VIEWS,item:item,componentData:dataItem,currentDetail:currentDetail}"></all-control>
                <!-- <div v-else >{{VIEWS[item].view}}</div> -->
            </div>
        </div>
  </template>
<script>
   import { URI } from '@h5/sdk/index';
   import Style from '@h5/gen_css/common';
   import allControl from '@h5/components/widget/all_control'
    export default{
       name:'layout',
       data(){
         return {}
       },
       props:{
         data:Object
       },

       methods:{
        /*控件跳转*/
         widgetJump(componentView,componentData,currentDetail){
           if(!componentView)return;
           let data = {componentView,componentData,currentDetail};
           URI.widgetJump({data})
         },
        /*控件显示*/
         isHidden(views,data,viewIds){
              let VIEWS = views,
                  viewId  = viewIds,
                  dataItem = data,
                  dealWidget =  dataItem._widget && dataItem._widget[viewId],
                  dealwidgetWisible = dataItem._widgetVisible && dataItem._widgetVisible[viewId],
                  imgPlaceholder = (VIEWS[ viewId ] && VIEWS[ viewId ].placeholder&& VIEWS[ viewId ].placeholder.img_url);
              if(dataItem instanceof Array){
                  dealWidget =  this.isArray(dataItem,viewId);
                  // console.log('isarray',dealWidget)
              }
              // 其他控件
              let otherViews =((!dealWidget && VIEWS[viewId].no_data_gone_enabled) || dealwidgetWisible==false),
                  // 控件为image_view
                  imgViews = ((!dealWidget && !imgPlaceholder && VIEWS[viewId].no_data_gone_enabled)|| dealwidgetWisible==false),
                  result = VIEWS[ viewId ].view == 'image_view' ? imgViews : otherViews;
                return result;
         },
        /*事件响应*/
         setJump(views,viewIds,dataItem,currentDetail){
                  let flog = views[ viewIds ] && views[ viewIds ].__meta__ && views[ viewIds ].__meta__.__event__ && views[ viewIds ].__meta__.__event__.default_uri || '';
                  if(flog){
                    this.widgetJump(views[viewIds],dataItem,currentDetail);
                  }
                  // console.log('我不是flog',views,viewIds)
         },
        /*兼容判断dataItem是数组的情况下*/
        isArray(data,viewId){
            let result = false;
            if(data.length<=0)return;
            data.forEach((item,idx)=>{
              if(item._widget&&item._widget[viewId]){
                  console.log('xxxxxxx',item._widget,viewId,idx)
                 result = item._widget[viewId];
                 console.log('result',item._widget,result,idx)
              }
            })
            return result
        },
        /*动态样式*/
         getStyle(attr){
           if(!attr)return;
           let styleResult = {};
              /*布局样式*/
              styleResult.linear=Style.toString({
                  "flex":Style.flexBoxPer(attr.width_type,attr.weight),
                  "width":Style.borderBoxWidth(attr.width_type,attr.width,attr.padding,attr.margin,attr.border),
                  "height":Style.heightType(attr.height_type,attr.height),
                  "display":"flex",
                });
             styleResult.linear_layout=Style.toString({
                 "flex":Style.flexBoxPer(attr.width_type,attr.weight),
                 "width":Style.borderBoxWidth(attr.width_type,attr.width,attr.padding,attr.margin,attr.border),
                 "height":Style.heightType(attr.height_type,attr.height),
                 "margin":Style.margin(attr.margin),
                 "padding":Style.padding(attr.padding),
                 "background":Style.advanceBg(attr.background),
                 "border-width":Style.borderWidth(attr.border),
                 "border-color":Style.borderColor(attr.border),
                 "border-style":"solid",
                 "border-radius":Style.radius(attr.corner),
                 "box-shadow":Style.shadow(attr.shadow),
                 "display":"flex",
                 "box-sizing": "border-box",
                 "background-size":"100%",
                 "position":"relative",
                 "flex-direction":Style.flexDirection(attr.orientation)
               })
              //图片控件
              styleResult.image_view=Style.toString({
                "width": Style.getConvertValue(attr.width),
                "height":Style.getConvertValue(attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "background":Style.advanceBg(attr.background),
                "border-width":Style.borderWidth(attr.border),
                "border-color":Style.borderColor(attr.border),
                "border-style":'solid',
                "border-radius":Style.radius(attr.corner),
                "overflow":'hidden',
                "box-shadow":Style.shadow(attr.shadow)
              })
              //文本控件
              styleResult.text_view=Style.toString({
                "flex": Style.flexBoxPer(attr.width_type,attr.weight),
                "width": Style.flexBoxWidth(attr.width_type,attr.width),
                "height":Style.heightType(attr.height_type,attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "background":Style.advanceBg(attr.background),
                "border-width":Style.borderWidth(attr.border),
                "border-color":Style.borderColor(attr.border),
                "border-style":"solid",
                "border-radius":Style.radius(attr.corner),
                "box-shadow":Style.shadow(attr.shadow),
                "max-width":"100%",
                "text-align": attr.alignment,
              })
              //固定文本控件
              styleResult.static_text_view=Style.toString({
                "flex": Style.flexBoxPer(attr.width_type,attr.weight),
                "width": Style.flexBoxWidth(attr.width_type,attr.width),
                "height":Style.heightType(attr.height_type,attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "background":Style.advanceBg(attr.background),
                "border-width":Style.borderWidth(attr.border),
                "border-color":Style.borderColor(attr.border),
                "border-style":"solid",
                "border-radius":Style.radius(attr.corner),
                "box-shadow":Style.shadow(attr.shadow),
              })
              //浮岛式标签
              styleResult.tag_1_widget=Style.toString({
                "flex": Style.flexBoxPer(attr.width_type,attr.weight),
                "width": Style.flexBoxWidth(attr.width_type,attr.width),
                "height":Style.heightType(attr.height_type,attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "background":Style.advanceBg(attr.background),
                "border-width":Style.borderWidth(attr.border),
                "border-color":Style.borderColor(attr.border),
                "border-style":"solid",
                "border-radius":Style.radius(attr.corner),
                "box-shadow":Style.shadow(attr.shadow),
              })
              //图标式标签
              styleResult.tag_2_widget=Style.toString({
                "width":Style.flexBoxWidth(attr.width_type,attr.width),
                "height":Style.heightType(attr.height_type,attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "box-shadow":Style.shadow(attr.shadow),
                "border-radius":Style.radius(attr.corner),
                "border-left":Style.borders(attr.border,attr.left),
                "border-right":Style.borders(attr.border,attr.right),
                "border-top":Style.borders(attr.border,attr.top),
                "border-bottom":Style.borders(attr.border,attr.bottom),
                "background":Style.advanceBg(attr.background),
              })
              //连接式标签
              styleResult.tag_3_widget=Style.toString({
                "flex": Style.flexBoxPer(attr.width_type,attr.weight),
                "width": Style.flexBoxWidth(attr.width_type,attr.width),
                "height":Style.heightType(attr.height_type,attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "background":Style.advanceBg(attr.background),
                "border-width":Style.borderWidth(attr.border),
                "border-color":Style.borderColor(attr.border),
                "border-style":"solid",
                "border-radius":Style.radius(attr.corner),
                "box-shadow":Style.shadow(attr.shadow),
              })
              //搜索控件
              styleResult.search_widget=Style.toString({
                "flex": Style.flexBoxPer(attr.width_type,attr.weight),
                "width": Style.flexBoxWidth(attr.width_type,attr.width),
                "height":Style.heightType(attr.height_type,attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "background":Style.advanceBg(attr.background),
                "border-width":Style.borderWidth(attr.border),
                "border-color":Style.borderColor(attr.border),
                "border-style":"solid",
                "border-radius":Style.radius(attr.corner),
                "box-shadow":Style.shadow(attr.shadow),
              })
              //多图横滑
              styleResult.sideslip_widget=Style.toString({
                "max-width": "100%",
                "overflow-x":"hidden",
              })
              //固定图片
              styleResult.static_image_view=Style.toString({
                "width": Style.getConvertValue(attr.width),
                "height":Style.getConvertValue(attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "background":Style.advanceBg(attr.background),
                "border-width":Style.borderWidth(attr.border),
                "border-color":Style.borderColor(attr.border),
                "border-style":"solid",
                "border-radius":Style.radius(attr.corner),
                "overflow":"hidden",
                "box-shadow":Style.shadow(attr.shadow),
              })
              //时间段选择器
              styleResult.time_period_widget=Style.toString({
                "flex": Style.flexBoxPer(attr.width_type,attr.weight),
                "width": Style.flexBoxWidth(attr.width_type,attr.width),
                "height":Style.heightType(attr.height_type,attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "background":Style.advanceBg(attr.background),
                "border-width":Style.borderWidth(attr.border),
                "border-color":Style.borderColor(attr.border),
                "border-style":"solid",
                "border-radius":Style.radius(attr.corner),
                "box-shadow":Style.shadow(attr.shadow),
              })
              //  ...
             return styleResult;
         }
       },
       computed:{
          VIEWS(){
            return this.data.VIEWS;
          },
          items(){
            return this.data.item;
          },
          dataItem(){
            return this.data.data;
          },
          attrId(){
            return this.data.id;
          },
          classItem(){
            return this.data.classItem;
          },
          currentDetail(){
            return this.data.currentDetail;
          }
       },
       components:{
         allControl
       }
    }
</script>
<style>
    .subviews{
      width:auto;
    }
</style>
