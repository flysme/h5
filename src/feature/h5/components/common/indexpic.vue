<template>
      <!-- 有点击事件 -->
      <div v-if="isevents" class="indexpic-view " @click="widgetJump" :style="getStyle['indexpic']">
            <img :src="src" :class="[iscontentMode(VIEWS[componentViewId].indexpic_content_mode)]" :style="getStyle['indexpicimage']" />
            <div :style="getStyle['indexpicmask']" ></div>
      </div>
      <!-- 无点击事件 -->
      <div v-else class="indexpic-view" :style="getStyle['indexpic']">
            <img :src="src" :class="[iscontentMode(VIEWS[componentViewId].indexpic_content_mode)]" :style="getStyle['indexpicimage']" />
            <div :style="getStyle['indexpicmask']"></div>
      </div>
</template>
<script>
    import Style from '@h5/gen_css/common';
    import utils from '@h5/services/utils'
    import { URI } from '@h5/sdk/index';
    export default{
        data(){
          return {
          }
        },
        props:{
            data:Object,
            option:Object
        },
        computed:{
          //整个页面所有的视图
          VIEWS(){
            return this.data.VIEWS;
          },
          //列表项数据（对象，一条）
          componentItemData(){
            return this.data.componentItemData;
          },
          //所属组件视图id
          componentViewId(){
            return this.data.componentViewId
          },
          src(){
            return this.data.componentItemData._widget.indexpic;
          },
          getStyle(){
            if(!this.data.getStyle){
               this.data.getStyle={}
               this.data.getStyle["indexpic"]={}
               this.data.getStyle["indexpicmask"]={}
               this.data.getStyle["indexpicimage"]={}
            }
            return this.data.getStyle
          },
          isevents(){
            let VIEWS=this.VIEWS[this.componentViewId]
            if(VIEWS.__meta__ && VIEWS.__meta__.__events__ && VIEWS.__meta__.__events__.title && VIEWS.__meta__.__events__.indexpic.default_uri){
              return true
            }
            return false
          }
        },
        methods:{
          widgetJump(){
            let uri  = this.data.view['__meta__']['__events__']['indexpic']['default_uri'],
                data = this.data;
                data.uri=uri;
                URI.widgetJump({data,option:this.option})
          },
          // 判断索引图拉伸方式
          iscontentMode(type){
            let result = '';
            switch(type){
              case 'scale_aspect_fill':
                result = type
              break;
              case 'scale_to_fill':
                result = type
              break;
              case 'scale_to_fit':
                result = type
              break;
              default:
                result =  ''
            }
            return result
          }
        }
    }
</script>
<style lang='scss'>
      .scale_aspect_fill{
          object-fit: cover;
      }
      .scale_to_fill{
          object-fit: fill;
      }
      .scale_to_fit{
        object-fit: contain;
      }
</style>
