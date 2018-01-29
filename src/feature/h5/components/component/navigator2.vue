<template>
  <div  v-if="componentData && componentData.length > 0">
    <!--navigator2等高导航器-->
    <div class="ListUI-view">
      <!-- 引入组件头 -->
      <div  v-if="componentView.header_visible">
      <component-header :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData }"  v-if="componentView.header_visible"></component-header>
      </div>
      <div class="sys-wrap sys-flex navigator2" :style="getStyle(componentView)['navigator2mainview']">
        <div :style="getStyle(componentView)['navigator2view']">
          <div class="list-view detailwidth"  v-for="(listItem,contentindex) in componentData"  @click="listuijump(listItem)" :style="getStyle(componentView,contentindex + 1)['list-width-item']" >
            <div  :style="getStyle(componentView,contentindex + 1)['navigator2item']" >
              <!-- <div class="contact-button" v-if="listItem.url == 'dingdone://im_service/conversation'">
                <include src="../base/kefu.wxml" />
              </div> -->
              <!--并行6种-->
              <!-- 0 图片 标题 扩展区域   1 标题 图片 扩展区域-->
              <div v-if="componentView.style == 0 || componentView.style == 1" class="list-view-item borderline">
                  <div class="sys-flex-one sys-vertical " :style="getStyle(componentView)['listitemview']">
                      <div v-if="componentView.style == 0">
                              <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                              <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                      </div>
                      <div v-else>
                              <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                              <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                      </div>
                      <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView)}"></describe>
                  </div>
              </div>
              <!-- 0 end  1 end-->
              <!-- 4 左图 , 右 上标题 下扩展区域  5 左图 , 右 上扩展区域 下标题-->
              <div v-if="componentView.style == 4 || componentView.style == 5" class="list-view-item borderline">
                  <div class="sys-flex-one  sys-flex " :style="getStyle(componentView)['listitemview']" >
                      <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                      <div class="sys-flex-one" v-if="componentView.style == 4">
                          <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                          <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                      </div>
                      <div class="sys-flex-one" v-else >
                          <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                          <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                      </div>
                  </div>
              </div>
              <!-- 4 end  5 end-->
              <!-- 6 左 上扩展区域 下标题 , 右 图  7 左 上标题 下扩展区域 , 右 图-->
              <div v-if="componentView.style == 6 || componentView.style == 7" class="list-view-item borderline">
                  <div class="sys-flex-one " :style="getStyle(componentView)['listitemview']" >
                      <div class="sys-flex-one" v-if="componentView.style == 6">
                          <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                          <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                      </div>
                      <div class="sys-flex-one" v-else >
                          <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                          <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                      </div>
                      <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                  </div>
              </div>
              <!-- 6 end  7 end-->
              <!-- 8 图片 描述 扩展区域  9 标题 图片 扩展区域-->
              <div v-if="componentView.style == 8 || componentView.style == 9" class="list-view-item borderline">
                  <div class="sys-flex-one sys-vertical " :style="getStyle(componentView)['listitemview']">
                      <div v-if="componentView.style == 8">
                          <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                          <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                          <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                      </div>
                      <div v-else >
                          <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                          <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                          <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                      </div>
                  </div>
              </div>
              <!-- 3 扩展区域 图片 标题  11 扩展区域 标题 图片-->
              <div v-if="componentView.style == 3 || componentView.style == 11" class="list-view-item borderline">
                  <div class="sys-flex-one  sys-vertical " :style="getStyle(componentView)['listitemview']" v-if="componentView.style == 3">
                      <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                      <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                      <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                  </div>
                  <div  :style="getStyle(componentView)['horizontal_line']" v-if="componentView.style == 3"></div>
                  <div class="sys-flex-one  sys-vertical " :style="getStyle(componentView)['listitemview']" v-if="componentView.style == 11">
                      <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                      <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                      <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                  </div>
              </div>
              <!-- 3 end  11 end-->
              <!-- 2   10 -->
              <div v-if="componentView.style == 2 || componentView.style == 10" class="list-view-item borderline">
                  <div class="sys-flex-one  sys-vertical " :style="getStyle(componentView)['listitemview']">
                      <div class="relative">
                          <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                          <div :class="['indexpictitle' + componentView.style]" :style="getStyle(componentView)['indexpictitle']">
                              <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}" v-if="componentView.style == 2"></navigator-name>
                              <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}" v-else ></describe>
                          </div>
                      </div>
                      <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}" v-if="componentView.style == 2"></describe>
                      <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}" v-else ></navigator-name>
                  </div>
              </div>
              <!-- 11 end-->
              <!--右侧垂直等分线-->
              <!--两列垂直分割线-->
              <div :style="getStyle(componentView)['horizontal_line']"></div>
            </div>
            <div :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===2 && contentindex % 2 === 0"></div>
            <!--三列垂直分割线-->
            <div :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===3 &&  (contentindex+1) % 3 != 0"></div>
            <!--四列垂直分割线-->
            <div :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===4 &&  (contentindex+1) % 4 != 0"></div>
            <!--五列垂直分割线-->
            <div :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===5 &&  (contentindex+1) % 5 != 0"></div>
            <!--六列垂直分割线-->
            <div :style="getStyle(componentView)['vertical_line']" v-if="componentView.eachLineCount===6 &&  (contentindex+1) % 6 != 0"></div>
          </div>
        </div>
     </div>
 </div>
 </div>
</template>
<script>
    import Style from '@h5/gen_css/common';
    import { URI } from '@h5/sdk/index';
    import navigatorName from '@h5/components/common/navigator_name.vue'
    import navigatorIcon from '@h5/components/common/navigator_icon.vue'
    import describe from '@h5/components/common/describe.vue'
    import componentHeader from '@h5/components/widget/extend/component_header.vue'
    export default{
      data(){
         return {}
      },
      props:{
        data:Object,
        option:Object
      },
      created(){
        console.log('componentView',this.data.componentView)
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
        listuijump(data){
          URI.listuijump({data,option:this.option})
        },
        getStyle(attr,index){
          let styleResult={}
          if(index){
            if(( index  ) % attr.eachLineCount === 0){
              styleResult['list-width-item']=Style.toString({
                "display":"flex",
                "width":Style.listui4itemwidthdel(attr),
              })
              styleResult.navigator2item=Style.toString({
                "text-align":"center",
                "box-sizing":"border-box",
                "width": "100%!important",
              })
            }else{
              styleResult['list-width-item']=Style.toString({
                "width":Style.listui4itemwidth(attr),
                "display":"flex",
              })
              styleResult.navigator2item=Style.toString({
                "text-align":"center",
                "box-sizing":"border-box",
                "width":Style.listdevwidth(attr),
              })
            }
            
          }
          styleResult.vertical_line=Style.toString({
            "display":"inline-block",
            "margin":Style.margin(attr.vertical_divider_margin),
            "height":"100%",
            "width":Style.navwidth(attr.vertical_divider_width),
            "background": Style.formatColorToRgba(attr.vertical_divider_bg),
          })
          styleResult.navigator2mainview=Style.toString({
            "width":"100%",
            "overflow":"hidden",
          })
          styleResult.navigator2view=Style.toString({
            "width":Style.listui4width(attr,attr.vertical_divider_margin),
            "margin": Style.margin(attr.margin),
            "display":"flex",
            "flex-wrap":"wrap",
            "background": Style.advanceBg(attr.itemNorBg),
          })
          styleResult.horizontal_line=Style.toString({
            "border-bottom":attr.divider_height+"px "+"solid "+Style.formatColorToRgba(attr.divider_bg),
            "margin": Style.margin(attr.divider_margin),
            "width":Style.listui4horizonwidth(attr.divider_margin),
          })
          styleResult.listitemview=Style.toString({
             "background": Style.advanceBg(attr.itemNorBg),
             "background-size": "contain",
             "padding":Style.padding(attr.itemPadding),
             "border-radius":Style.getConvertValue(attr.cornerRadius),
             "border-width":Style.borderWidth(attr.item_border),
             "border-color":Style.borderColor(attr.item_border),
             "border-style":"solid",
          })
          styleResult.listitemtitle=Style.toString({
            "min-height": Style.navminheight(attr.title_textSize,attr.title_lineNum),
            "background": Style.formatColorToRgba(attr.title_textBgColor),
            "display":Style.isVisiable(attr.title_isVisiable),
            "color": Style.formatColorToRgba(attr.title_textColor),
            "margin":Style.margin(attr.title_margin),
            "padding":Style.padding(attr.title_padding),
            "font-weight":Style.isBold(attr.title_bold),
          })
          styleResult.itemtitle=Style.toString({
            "max-width": "100%",
            "white-space":Style.isWrap(attr.title_lineNum),
            "line-height":attr.title_textSize+"px",
            "overflow":"hidden",
            "max-height": Style.navminheight(attr.title_textSize,attr.title_lineNum),
            "text-align":Style.textAlign(attr.title_textAlignment),
          })
          styleResult.title=Style.toString({
            "font-size":attr.title_textSize+"px",
            "text-shadow":Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_vOffset,attr.title_hOffset,attr.title_shadowColor,attr.title_shadowRadius),
          })
          styleResult.indexpic=Style.toString({
            "width":Style.getnavindexpicWidth(attr.indexPic_fatherScale),
            "margin":"auto",
            "padding-top":Style.getnavindexpicHeights(attr,attr.indexPic_fatherScale,attr.indexPic_whScale),
            "position":"relative",
            "height":"0",
          })
          styleResult.indexpicimage=Style.toString({
            "border-radius":Style.getConvertValue(attr.indexPic_Radius),
            "position": "absolute",
            "left":'0',
            "top":'0',
            "width":'100%',
            "height":'100%',
          })
          styleResult.indexpictitle=Style.toString({
            "width": '100%',
            "background":Style.formatColorToRgba(attr.title_textBgColor),
          })
          styleResult.indexpicmask=Style.toString({
            "width":'100%',
            "height":'100%',
            "top": '0',
            "position":"absolute",
            "display": Style.isVisiable(attr.indexPic_isMask),
            "background": Style.formatColorToRgba(attr.indexPic_maskBg),
          })
          styleResult.header=Style.toString({
            "display":Style.isDisplay(attr.header_visible,attr.flex),
            "background":Style.advanceBg(attr.header_bg),
            "margin":Style.margin(attr.header_margin),
            "text-align": Style.textAlign(attr.header_title_textAlignment),
            "height": Style.swiperHeight(attr.header_whScale),
            "line-height":Style.swiperHeight(attr.header_whScale),
          })
          styleResult.headertitle=Style.toString({
            "width":'100%',
            "margin":Style.padding(attr.header_title_margin),
            "white-space": "nowrap",
            "color":Style.formatColorToRgba(attr.header_title_textColor),
            "font-size":attr.header_title_textSize+'px',
          })
          styleResult.listitemdescribe=Style.toString({
            "background":Style.formatColorToRgba(attr.brief_textBgColor),
            "display": Style.isVisiable(attr.brief_isVisiable),
            "color":Style.formatColorToRgba(attr.brief_textColor),
            "padding":Style.padding(attr.brief_padding),
            "padding-bottom":Style.desbottom(attr.style),
            "font-weight":Style.slidertitlebold(attr.brief_bold),
          })
          styleResult.itemdescribe=Style.toString({
            "max-width":'100%',
            "font-size":attr.brief_textSize+'px',
            "white-space":Style.isWrap(attr.brief_lineNum),
            "line-height":attr.brief_textSize+'px',
            "overflow":"hidden",
            "text-overflow":"ellipsis",
            "max-height": Style.navminheight(attr.brief_textSize,attr.title_lineNum),
            "text-align": Style.textAlign(attr.desc_text_alignment),
          })
          return styleResult;
        }
      },
      components:{
        navigatorName,
        navigatorIcon,
        describe,
        componentHeader
      }
    }
</script>
