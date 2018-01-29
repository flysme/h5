<template >
  <div v-if="componentData && componentData.length > 0">
    <!--navigator1标准列表导航器-->
    <div class="ListUI-view">
      <!-- 组件头部 -->
        <!-- 引入组件头 -->
        <component-header :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData,currentDetail:currentDetail}" v-if="componentView.header_visible"></component-header>
        <div class="sys-one sys-wrap sys-flex " :style="getStyle(componentView)['navigator1']">
            <div class="list-view mainview" v-for="(listItem,index) in componentData" :key="index"  @click="navigatorJump(listItem)" >
                <!-- <div class="contact-button" v-if="componentData[index].url == 'dingdone://im_service/conversation'">
                  <include src="../base/kefu.wxml" />
                </div> -->
                <!--并行6种-->
                <!-- 0 左图 , 右 上标题 下扩展区域 -->
                <div v-if="componentView.style == 0" class="list-view-item" :style="getStyle(componentView)['borderline']">
                    <div class="sys-flex-one  sys-flex " :style="getStyle(componentView)['listitemview']" >
                        <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                        <div class="sys-flex-one sys-vertical" :style="getStyle(componentView)['brief_isVisiable']">
                            <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                            <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                        </div>
                        <div  :style="getStyle(componentView)['right_image']"></div>
                    </div>
                </div>
                <!-- 0 end-->
                      <!-- 1 左 上标题 下扩展区域 , 右 图 -->
                <div v-if="componentView.style == 1" class="list-view-item " :style="getStyle(componentView)['borderline']">
                    <div class="sys-flex-one sys-flex " :style="getStyle(componentView)['listitemview']">
                        <div class="sys-flex-one">
                            <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                            <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                        </div>
                        <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                        <div :style="getStyle(componentView)['right_image']"></div>
                    </div>
                </div>
                <!-- 1 end-->
                     <!-- 2 上标题 下左图 , 右扩展区域  -->
                <div v-if="componentView.style == 2" class="list-view-item sys-flex" :style="getStyle(componentView)['borderline']">
                    <div class="sys-flex-one sys-vertical " :style="getStyle(componentView)['listitemview']" >
                            <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                       <div  class="sys-flex-one  sys-flex " :style="getStyle(componentView)['spacecontent']">
                           <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                           <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                       </div>
                    </div>
                    <div :style="getStyle(componentView)['right_image']"></div>
                </div>
                <!-- 2 end-->
                    <!-- 3 上标题 下左扩展区域 , 右图  -->
                <div v-if="componentView.style == 3" class="list-view-item sys-flex" :style="getStyle(componentView)['borderline']">
                    <div class="sys-flex-one sys-vertical " :style="getStyle(componentView)['listitemview']" >
                            <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                       <div  class="sys-flex-one  sys-flex " :style="getStyle(componentView)['spacecontent']" >
                           <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                           <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                       </div>
                    </div>
                    <div :style="getStyle(componentView)['right_image']"></div>
                </div>
                <!-- 3 end-->
                    <!-- 4 上 左图片 右标题 扩展区域 下 左标题 扩展区域 右图片 -->
                <div v-if="componentView.style == 4 && (index+1)%2!=0" class="list-view-item "  :style="getStyle(componentView)['borderline']">
                      <div class="sys-flex-one sys-flex " :style="getStyle(componentView)['listitemview']" >
                        <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                        <div class="sys-flex-one ">
                            <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                            <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                        </div>
                        <div :style="getStyle(componentView)['right_image']"></div>
                     </div>
                </div>
                <div v-if="componentView.style == 4 && (index+1)%2==0" class="list-view-item " :style="getStyle(componentView)['borderline']">
                      <div class="sys-flex-one sys-flex " :style="getStyle(componentView)['listitemview']">
                        <div class="sys-flex-one">
                            <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                            <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                        </div>
                        <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                        <div :style="getStyle(componentView)['right_image']"></div>
                      </div>
                </div>
                <!-- 4 end-->
                <!-- 5 左图 , 右 上扩展区域 下标题 -->
                <div v-if="componentView.style == 5 && (index+1)%2!=0" class="list-view-item sys-flex" :style="getStyle(componentView)['borderline']">
                    <div class="sys-flex-one sys-vertical " :style="getStyle(componentView)['listitemview']" >
                        <div>
                            <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                        </div>
                       <div  class="sys-flex-one sys-flex">
                           <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                           <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                       </div>
                    </div>
                    <div :style="getStyle(componentView)['right_image']"></div>
                </div>
                <div v-if="componentView.style == 5 && (index+1)%2==0" class="list-view-item sys-flex" :style="getStyle(componentView)['borderline']" >
                      <div class="sys-flex-one " :style="getStyle(componentView)['listitemview']">
                          <div>
                              <navigator-name :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-name>
                          </div>
                          <div  class="sys-flex-one sys-flex " :style="getStyle(componentView)['spacecontent']" >
                              <describe :data="{componentView:componentView,componentItemData:listItem,getStyle:getStyle(componentView),currentDetail:currentDetail}"></describe>
                              <navigator-icon :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId,getStyle:getStyle(componentView),currentDetail:currentDetail}"></navigator-icon>
                          </div>
                      </div>
                      <div :style="getStyle(componentView)['right_image']"></div>
                </div>
                <!-- 5 end-->
                <div :style="getStyle(componentView)['horizontal_line']"></div>
           </div>
        </div>
     </div>
   </div>
</div>
</template>
<script>
import { URI } from '@h5/sdk/index';
import Style from '@h5/sdk/gen_css';
import componentHeader from '@h5/components/widget/extend/component_header.vue'
import navigatorName from '@h5/components/common/navigator_name.vue'
import navigatorIcon from '@h5/components/common/navigator_icon.vue'
import describe from '@h5/components/common/describe.vue'
export default{
  name:'navigator1',
  data(){
    return{

    }
  },
  components:{
    componentHeader,
    navigatorName,
    navigatorIcon,
    describe
  },
  props: {
    data: Object,
    option:Object
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

  },
  methods:{
    navigatorJump(data){
      URI.listuijump({data,option:this.option})
    },
    getStyle(attr,index){
        let styleResult={}
        styleResult.navigator1=Style.toString({
              "margin": Style.margin(attr.margin)
        })
        styleResult.borderline=Style.toString({
          "overflow": "hidden",
          "width": "100%",
          "border-width":Style.borderWidth(attr.item_border),
          "border-color":Style.borderColor(attr.item_border),
          "border-style":"solid",
        })
        styleResult.horizontal_line=Style.toString({
          "border-bottom":Style.navigaborder(attr.divider_height,attr.divider_bg),
          "margin":Style.margin(attr.divider_margin),
        })
        styleResult.spacecontent=Style.toString({
          "justify-content":"space-between",
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
          "font-weight":Style.slidertitlebold(attr.title_bold),
        })
        styleResult.itemtitle=Style.toString({
          "max-width": "100%",
          "white-space":Style.isWrap(attr.title_lineNum),
          "line-height":Style.listnav1Height(attr.title_lineSpace,attr.title_lineNum,attr.title_textSize),
          "overflow":"hidden",
          "text-overflow": "ellipsis",
          "max-height": Style.navminheight(attr.title_textSize,attr.title_lineNum),
          "text-align":Style.textAlign(attr.title_textAlignment),
        })
        styleResult.title=Style.toString({
          "font-size":attr.title_textSize+'px',
          "text-shadow":Style.shadow_old(attr.title_shadowEffect,attr.title_shadowDirection,attr.title_vOffset,attr.title_hOffset,attr.title_shadowColor,attr.title_shadowRadius),
        })
        styleResult.indexpic=Style.toString({
          "width": Style.navgetsizes(attr.indexPic_width),
          "display":Style.isVisiable(attr.indexPic_isVisiable),
          "height": Style.navgetsizes(attr.indexPic_height),
        })
        styleResult.indexpicimage=Style.toString({
          "border-radius":Style.getConvertValue(attr.indexPic_Radius),
          "position": "relative",
          "border-width":Style.borderWidth(attr.indexpic_border),
          "border-color":Style.borderColor(attr.indexpic_border),
          "border-style":"solid",
          "width": "100%",
          "height": "100%",
        })
        styleResult.indexpicmask=Style.toString({
          "width":"100%",
          "height":"100%",
          "top": "0",
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
          "width":"100%",
          "margin":Style.padding(attr.header_title_margin),
          "white-space": "nowrap",
          "color":Style.formatColorToRgba(attr.header_title_textColor),
          "font-size":attr.header_title_textSize+'px',
        })
        styleResult.listitemdescribe=Style.toString({
          "background":Style.formatColorToRgba(attr.brief_textBgColor),
          "display": Style.isVisiable(attr.brief_isVisiable),
          "color":Style.formatColorToRgba(attr.brief_textColor),
          "margin":Style.margin(attr.brief_margin),
          "padding":Style.padding(attr.brief_padding),
          "padding-bottom":Style.desbottom(attr.style),
          "font-weight":Style.slidertitlebold(attr.brief_bold),
        })
        styleResult.itemdescribe=Style.toString({
          "max-width":"100%",
          "font-size":attr.brief_textSize+'px',
          "white-space":Style.isWrap(attr.brief_lineNum),
          "line-height":attr.brief_textSize+'px',
          "overflow":"hidden",
          "text-overflow":"ellipsis",
          "max-height": Style.navminheight(attr.brief_textSize,attr.title_lineNum),
          "text-align": Style.textAlign(attr.brief_textAlignment),
        })
        styleResult.right_image=Style.toString({
          "display":Style.isDisplay(attr.right_image_visible),
          "width":Style.getConvertValue(attr.right_image_width),
          "height":Style.getConvertValue(attr.right_image_height),
          "background":Style.getBackground(attr.right_image),
          "background-size":"100%",
          "align-self":Style.alignSelf(attr.right_image_location),
        })
        return styleResult;
    }
  }

}

</script>
