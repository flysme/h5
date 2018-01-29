<template>
    <div class="detail_component_bottombar bar">
        <!-- 分割线 -->
        <div class="sys-flex sys-flex-center divider" v-if="VIEWS.divider_enabled">
            <div class="dividerborder"> </div>
        </div>
        <div class="sys-flex vertical-center bottombar">
            <div class="left sys-flex">
                <!-- 遍历控件 -->
                <div v-for="(item,inx) in VIEWS.left_menus">
                    <!-- <include src="../base/bottombar/button.wxml" /> -->
                    <components :data="{item:item,views:ALLVIEWS}"></components>
                </div>
            </div>
            <div class="middle sys-flex">
                <div  v-for="(item,inx) in VIEWS.center_menus" class="items_center">
                    <!-- <include src="../base/bottombar/button.wxml" /> -->
                    <components :data="{item:item,views:ALLVIEWS}"></components>
                </div>
            </div>
            <div class="right sys-flex">
                <div v-for="(item,inx) in VIEWS.right_menus">
                    <!-- <include src="../base/bottombar/button.wxml" /> -->
                    <components :data="{item:item,views:ALLVIEWS}"></components>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { URI } from '@h5/sdk/index';
    import buttons from '@h5/components/common/bottombar/button.vue'
      export default{
          data(){
              return {};
          },
          props:{
             data:Object,
             option:Object
          },
          computed:{
            ALLVIEWS(){
              return this.data.View;
            },
            VIEWS(){
              return this.data.componentView;
            },
            DATA(){
              return this.data.componentData;
            },
            viewId(){
              return this.data.componentViewId;
            }
          }
          components:{
            buttons
          }
      }
</script>
