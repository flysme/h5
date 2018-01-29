<!-- 横滑导航器 -->
<template>
    <div  v-if="componentData && componentData.length > 0">
        <!--navigator3横滑导航器-->
        <div class="ListUI-view">
            <!-- 引入组件头 -->
            <div  v-if="VIEWS.header_visible">
              <component-header v-if="componentViewId.header_visible" :data="{VIEWS:VIEWS,viewId:componentViewId,data:componentData}" ></component-header>
            </div>
                <div class="maxhun relative">
                    <!-- <div class="contact-button" wx:if="{{componentData[contentindex].url == 'dingdone://im_service/conversation'}}">
                        <include src="../base/kefu.wxml" />
                    </div> -->
                    <!--并行-->
                    <div class="sys-flex navigator3 listviewwrap">
                        <div class="list-view "  @click="listuijump(listItem)" v-for="(listItem,inx) in componentData">
                            <div class="sys-flex">
                                <div class="sys-flex mainview eachLineCount">
                                  <div class="contact-button" v-if="listItem.url == 'dingdone://im_service/conversation'">
                                      <!-- <include src="../base/kefu.wxml" /> -->
                                  </div>
                                      <!--并行6种-->
                                      <!--  0 图片 标题 扩展区域  1 标题 图片 扩展区域-->
                                      <div v-if="VIEWS.style == 0 || VIEWS.style == 1" class="list-view-item borderline">
                                          <div class="relative listitemview">
                                            <!-- 0 start-->
                                              <div class="relative picMar"  v-if="VIEWS.style == 1">
                                                  <!-- <include src="../common/indexpic.wxml" /> -->
                                                  <indexpic :data="{VIEWS:VIEWS,Data:item,ViewId:viewId}"></indexpic>
                                                  <div class="absolute bottom-nav3">
                                                   <!-- <include src="../common/describe.wxml" /> -->
                                                   <describe  :data="{Data:item}"></describe>
                                                    <!-- <include src="../common/navtitle.wxml" /> -->
                                                    <navtitle :data="{Data:item}"></navtitle>
                                                </div>
                                              </div>
                                              <!-- 0 end-->
                                              <!-- 1 start-->
                                              <div class="relative picMar" v-else>
                                                  <!-- <include src="../common/indexpic.wxml" /> -->
                                                  <indexpic :data="{VIEWS:VIEWS,Data:item,ViewId:viewId}"></indexpic>
                                                  <div class="absolute bottom-nav3">
                                                    <!-- <include src="../common/navtitle.wxml" /> -->
                                                      <navtitle :data="{Data:item}"></navtitle>
                                                    <!-- <include src="../common/describe.wxml" /> -->
                                                      <describe  :data="{Data:item}"></describe>
                                                  </div>
                                              </div>
                                              <!-- 1 end-->
                                          </div>
                                      </div>
                                      <!--0  1 end-->
                                      <!-- 2 图片 标题 扩展区域   3 标题 图片 扩展区域-->
                                      <div v-if="VIEWS.style == 2 || VIEWS.style == 3" class="list-view-item borderline">
                                          <div class="sys-flex-one sys-vertical listitemview">
                                            <!-- 2 start -->
                                              <div v-if="VIEWS.style == 2">
                                                  <div>
                                                      <!-- <include src="../common/indexpic.wxml" /> -->
                                                      <indexpic :data="{VIEWS:VIEWS,Data:item,ViewId:viewId}"></indexpic>
                                                  </div>
                                                  <div>
                                                      <!-- <include src="../common/navtitle.wxml" /> -->
                                                        <navtitle :data="{Data:item}"></navtitle>
                                                  </div>
                                              </div>
                                            <!-- 2 end -->
                                            <!-- 3 start-->
                                              <div v-else>
                                                  <div>
                                                      <!-- <include src="../common/navtitle.wxml" /> -->
                                                        <navtitle :data="{Data:item}"></navtitle>
                                                  </div>
                                                  <div>
                                                      <!-- <include src="../common/indexpic.wxml" /> -->
                                                      <indexpic :data="{VIEWS:VIEWS,Data:item,ViewId:viewId}"></indexpic>
                                                  </div>
                                              </div>
                                              <!-- 3 end -->
                                              <div>
                                                  <!-- <include src="../common/describe.wxml" /> -->
                                                  <describe  :data="{Data:item}"></describe>
                                              </div>
                                          </div>
                                      </div>
                                      <!-- 2 end  3 end-->
                                      <!-- 4 左图 , 右 上标题 下扩展区域 -->
                                      <div v-if="VIEWS.style == 4" class="list-view-item borderline">
                                          <div class="sys-flex-one  sys-flex listitemview picmsizeav3">
                                              <!-- <include src="../common/indexpic.wxml" /> -->
                                              <indexpic :data="{VIEWS:VIEWS,Data:item,ViewId:viewId}"></indexpic>
                                              <div class="sys-flex-one">
                                                  <!-- <include src="../common/navtitle.wxml" /> -->
                                                    <navtitle :data="{Data:item}"></navtitle>
                                                  <!-- <include src="../common/describe.wxml" /> -->
                                                    <describe  :data="{Data:item}"></describe>
                                              </div>
                                          </div>
                                      </div>
                                      <!-- 4 end-->
                                      <!-- 5 左 上标题 下扩展区域 , 右 图 -->
                                      <div v-if="VIEWS.style == 5" class="list-view-item borderline">
                                          <div class="sys-flex-one sys-flex listitemview picmsizeav3" >
                                              <div class="sys-flex-one">
                                                  <!-- <include src="../common/describe.wxml" /> -->
                                                  <describe  :data="{Data:item}"></describe>
                                                  <!-- <include src="../common/navtitle.wxml" /> -->
                                                  <navtitle :data="{Data:item}"></navtitle>
                                              </div>
                                              <!-- <include src="../common/indexpic.wxml" /> -->
                                              <indexpic :data="{VIEWS:VIEWS,Data:item,ViewId:viewId}"></indexpic>
                                          </div>
                                      </div>
                                      <!-- 5 end-->
                                     <!-- 6 标题 扩展区域 图片-->
                                      <div v-if="VIEWS.style == 6" class="list-view-item borderline">
                                          <div class="sys-flex-one sys-vertical listitemview">
                                              <div>
                                                  <!-- <include src="../common/navtitle.wxml" /> -->
                                                  <navtitle :data="{Data:item}"></navtitle>
                                              </div>
                                              <div>
                                                  <!-- <include src="../common/describe.wxml" /> -->
                                                  <describe  :data="{Data:item}"></describe>
                                              </div>
                                              <div>
                                                  <!-- <include src="../common/indexpic.wxml" /> -->
                                                  <indexpic :data="{VIEWS:VIEWS,Data:item,ViewId:viewId}"></indexpic>
                                              </div>
                                          </div>
                                      </div>
                                      <!-- 6 end-->
                                      <!-- 7 扩展区域 图片 标题 -->
                                      <div v-if="VIEWS.style == 7" class="list-view-item borderline">
                                          <div class="sys-flex-one sys-vertical listitemview">
                                              <div>
                                                  <!-- <include src="../common/describe.wxml" /> -->
                                                  <describe  :data="{Data:item}"></describe>
                                              </div>
                                              <div>
                                                  <!-- <include src="../common/indexpic.wxml" /> -->
                                                  <indexpic :data="{VIEWS:VIEWS,Data:item,ViewId:viewId}"></indexpic>
                                              </div>
                                              <div>
                                                  <!-- <include src="../common/navtitle.wxml" /> -->
                                                  <navtitle :data="{Data:item}"></navtitle>
                                              </div>
                                          </div>
                                      </div>
                                      <!-- 7 end-->
                                      <!--并行6中-->
                                      <!--右侧垂直等分线-->
                                      <!--两列垂直分割线-->
                                      <div class="horizontal_line"></div>
                                </div>
                            </div>
                       </div>
                    </div>
                   <!--并行 end-->
                </div>
        </div>
    </div>
</template>
<script>
      import Style from '@h5/gen_css/common';
      import { URI } from '@h5/sdk/index';
      import navtitle from '@h5/components/common/navtitle.vue'
      import indexpic from '@h5/components/common/indexpic.vue'
      import describe from '@h5/components/common/describe.vue'
      export default{
         data(){
           return {}
         },
         props:{
           data:Object,
           option:Object
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
           listuijump(data){
              URI.listuijump({data,option:this.option})
           }
         },
         components:{
           navtitle,
           indexpic,
           describe
         }
      }
</script>
