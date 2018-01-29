<template>
  <div  class="listitemtitle">
    <div  class="itemtitle">
        <span class="title">{{DATA.name}}</span>
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
       computed:{
         DATA(){
           return this.data.Data;
         }
       }
    }
</script>
