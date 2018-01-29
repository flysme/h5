<template>
  <!-- 有点击事件 -->
    <div v-if="VIEWS[componentViewId] && VIEWS[componentViewId].__meta__ && VIEWS[componentViewId].__meta__.__events__ && VIEWS[componentViewId].__meta__.__events__.indexpic && VIEWS[componentViewId].__meta__.__events__.indexpic.default_uri" class="indexpic-view " @click="widgetJump" :style="getStyle['indexpic']">
        <img :src="src" class="scale_aspect_fill" :style="getStyle['indexpicimage']" />
        <div :style="getStyle['indexpicmask']"></div>
    </div>
    <!-- 无点击事件 -->
    <div v-else class="indexpic-view " :style="getStyle['indexpic']">
        <img :src="componentItemData.icon" class="scale_aspect_fill" :style="getStyle['indexpicimage']" />
        <div :style="getStyle['indexpicmask']" ></div>
    </div>
</template>
<script>
    import utils from '@h5/services/utils'
    import { URI } from '@h5/sdk/index';
    export default{
        data(){
          return {}
        },
        props:{
            data:Object
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
          getStyle(){
            if(!this.data.getStyle){
               this.data.getStyle={}
               this.data.getStyle["indexpic"]={}
               this.data.getStyle["indexpicmask"]={}
               this.data.getStyle["indexpicimage"]={}
            }
            return this.data.getStyle
          }
        },
        mounted(){

        },
        methods:{
          widgetJump(){
            let uri  = this.data.view['__meta__']['__events__']['indexpic']['default_uri'],
                data = this.data;
                data.uri=uri;
                URI.widgetJump({data})
          }
        }
    }
</script>
<style lang='scss'>
      .scale_aspect_fill{
          object-fit: cover;
      }
</style>
