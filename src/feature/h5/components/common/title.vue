<template>
         <!-- 有点击事件 v-if="VIEWS.__meta__.__events__.title.default_uri" -->
        <div v-if="isevents" class=" txt-overflow" @click="widgetJump" :style="getStyle['listitemtitle']">
            <div :style="getStyle['itemtitle']">
            <span class="" :style="getStyle['title']">{{componentItemData._widget.title}}</span>
          </div>
        </div>
        <!-- 无点击事件  v-else -->
        <div v-else class=" txt-overflow" :style="getStyle['listitemtitle']">
          <div :style="getStyle['itemtitle']">
            <span class="" :style="getStyle['title']">{{componentItemData._widget.title}}</span>
          </div>
        </div>
</template>
<script>
    import { URI } from '@h5/sdk/index';
    export default{
        data(){
          return {}
        },
         created(){
            // console.log('titledata:',this.data)
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
              this.data.getStyle["listitemtitle"]={}
              this.data.getStyle["itemtitle"]={}
              this.data.getStyle["title"]={}
            }
            return this.data.getStyle
          },
          isevents(){
            let VIEWS=this.VIEWS[this.componentViewId]
            if(VIEWS.__meta__ && VIEWS.__meta__.__events__ && VIEWS.__meta__.__events__.title && VIEWS.__meta__.__events__.title.default_uri){
              return true
            }
            return false
          }
        },
        methods:{
          widgetJump(){
            let uri  = this.data.view['__meta__']['__events__']['title']['default_uri'],
                data = this.data;
                data.uri=uri;
                URI.widgetJump({data});
                console.log(data,'data',this.option,'this.option');
          }
        }
    }
</script>
