<!-- 混合组件 -->
<template>  
  <!-- 引入占位图 -->
  <placeholder v-if="componentView.nodata_layout_visible && componentData.length <= 0" :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData}"></placeholder>
  <div v-if="componentData && componentData.length > 0">
    <!-- 组件头 -->
    <component-header :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData}" v-if="componentView.header_visible}}" ></component-header>
    <div class="relative" :key="index" v-for="(listItem,index) in componentData">
      <!-- start -->
      <!-- 最佳样式—— -1 -->
      <div class="sys-flex relative listitemview" v-if="listItem.style == '-1'">
        <div class="relative">
            <indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}" ></indexpic>
            <!-- 引入索引图浮动扩展 -->
            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}"></indexpic-float-widget>
        </div>
        <!-- 右侧标题 + 扩展 -->
        <div class="sys-flex-one sys-flex sys-vertical">
            <div>
                <!-- 标题 -->
                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}"></list-item-title>
            </div>
            <div class="sys-flex-one">
                <!-- 引入平铺扩展 -->
                <title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></title-widget>
                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></item-float-widget>
            </div>
        </div>
      </div>
      <!-- 自动混合—— 0 -->
      <div class='sys-flex relative listitemview' v-if="listItem.style == 0">
        <div class="relative">
            <indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}" ></indexpic>
            <!-- 引入索引图浮动扩展 -->
            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}"></indexpic-float-widget>
        </div>
        <!-- 右侧标题 + 扩展 -->
        <div class="sys-flex-one sys-flex sys-vertical">
            <div>
                <!-- 标题 -->
                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}"></list-item-title>
            </div>
            <div class="sys-flex-one">
                <!-- 引入平铺扩展 -->
                <title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></title-widget>
                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></item-float-widget>
            </div>
        </div>
      </div>
      <!-- 只显示标题—— 1 -->
      <div class='sys-flex relative listitemview' v-if="listItem.style == 1">
        <div class='all-width'>
            <!-- 标题 -->
            <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}"></list-item-title>
        </div>
        <div class="sys-flex-one">
            <!-- 引入平铺扩展 -->
            <title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></title-widget>
            <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></item-float-widget>
        </div>
      </div>
      <!-- 标题索引图—— 3 -->
      <div class='sys-flex relative listitemview' wx:if="listItem.style == 3">
        <div class="relative">
            <indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}" ></indexpic>
            <!-- 引入索引图浮动扩展 -->
            <indexpic-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}"></indexpic-float-widget>
        </div>
        <!-- 右侧标题 + 扩展 -->
        <div class="sys-flex-one sys-flex sys-vertical">
            <div>
                <!-- 标题 -->
                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}"></list-item-title>
            </div>
            <div class="sys-flex-one">
                <!-- 引入平铺扩展 -->
                <title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></title-widget>
                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></item-float-widget>
            </div>
        </div>
      </div>
      <!-- 标题加多图—— 5 -->
      <div class='sys-flex relative listitemview' v-if="listItem.style == 5">
        <div class="sys-flex-one sys-flex sys-vertical">
            <div>
                <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}"></list-item-title>
            </div>
            <div class='sys-flex picsView'>
               <div v-for="(item,inx) in listItem.pics" :key="inx">
                <div class="indexpic-view all-width" @click="widgetJump(item)">
                   <img src="http://qnimg.v2.dingdone.com/material/2017/09/18/15057240445582.png?imageView2/1" class="indexpicimage all-width" mode="aspectFill">
                    <div class="indexpicmask"></div>
                  </img>
                </div>
              </div> 
            </div>
            <div class="sys-flex-one">
                <!-- 引入平铺扩展 -->
                <title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></title-widget>
                <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></item-float-widget>
            </div>
        </div>
      </div>
      <!-- 大图加下标题—— 6 -->
      <div class='relative listitemview' v-if="listItem.style == 6">
        <div class='relative largePic'>
          <indexpic :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}" ></indexpic>
        </div>
        <!-- 标题 -->
        <list-item-title :data="{VIEWS:VIEWS, componentView:componentView, componentItemData:listItem, componentViewId:componentViewId}"></list-item-title>
        <div class="sys-flex-one">
            <!-- 引入平铺扩展 -->
            <title-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></title-widget>
            <item-float-widget :data="{VIEWS:VIEWS,viewId:componentViewId,data:listItem}" ></item-float-widget>
        </div>
      </div>
      <!-- end -->

      <!--分割线-->
      <div class="sys-flex sys-flex-center divider">
          <div class="dividerborder"> </div>
      </div>
    </div>
  </block>
</template>
<style>
  
</style>
<script>
import indexpicFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
import titleWidget from '@h5/components/widget/extend/tile_widget.vue'
import itemFloatWidget from '@h5/components/widget/extend/item_float_widget.vue'
import placeholder from '@h5/components/widget/extend/placeholder.vue'
import listItemTitle from '@h5/components/common/title.vue'
import indexpic from '@h5/components/common/indexpic.vue'
  export default{
  props: {
    data: Object,
    option:Object
  },
  data(){
    return {
      templateName: ''
    }
  },
  components:{
    indexpic,
    indexpicFloatWidget,
    titleWidget,
    itemFloatWidget,
    listItemTitle,
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
    widgetJump(){
      
    }
  }
}
</script>