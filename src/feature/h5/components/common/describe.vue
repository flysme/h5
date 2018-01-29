<template>
  <div v-if="componentView.brief_isVisiable" class="title-view " :style="getStyle['listitemdescribe']">
    <div   :style="getStyle['itemdescribe']">
        <span>{{componentItemData.summary}}</span>
    </div>
  </div>
</template>
<script>
  export default{
     data(){
       return {}
     },
     props:{
       data:Object
     },
     created(){
      
     },
     computed:{
      //列表项数据（对象，一条）
      componentItemData(){
        return this.data.componentItemData;
      },
      //所属组件视图
      componentView(){
        return this.data.componentView
      },
      getStyle(){
        if(!this.data.getStyle){
           this.data.getStyle={}
           this.data.getStyle["listitemdescribe"]={}
        }
        return this.data.getStyle
      }
     }
  }
</script>
