<template>
  <!-- 底栏按钮 -->
  <div :id="ITEMS">
          <div class="button" @click='widgetJump(VIEWS[ ITEMS ].uri)'>
                  <!-- 1.只有图标 -->
                  <div v-if="VIEWS[ ITEMS ].style == 0" class="vertical-center">
                      <div class="image"></div>
                  </div>
                  <!-- 2.只有文字 -->
                  <div v-if="VIEWS[ ITEMS ].style == 1" class="vertical-center">
                      <div class="title">
                          {{VIEWS[ITEMS].title_text}}
                      </div>
                  </div>
                  <!-- 3. 图标上 文字在下 -->
                  <div v-if="VIEWS[ ITEMS ].style == 2" class="sys-flex sys-vertical flex-justify-center vertical-center title">
                      <div class="image imagetitlebottom"></div>
                      <div>
                          {{VIEWS[ITEMS].title_text}}
                      </div>
                  </div>
                  <!-- 4.图标在下 文字在上 -->
                  <div v-if="VIEWS[ ITEMS ].style == 3" class="sys-flex sys-vertical flex-justify-center vertical-center title">
                      <div class="imagetitlebottom">
                        {{VIEWS[ITEMS].title_text}}
                      </div>
                      <div  class="image"></div>
                  </div>
                  <!-- 5.图标在左 文字在右 -->
                  <div v-if="VIEWS[ ITEMS ].style == 4" class="sys-flex vertical-center vertical-center title" >
                      <div class="image imagetitleright"></div>
                      <div>
                        {{VIEWS[ITEMS].title_text}}
                      </div>
                  </div>
                  <!-- 6.图标在右 文字在左 -->
                  <div v-if="VIEWS[ ITEMS ].style == 5" class="sys-flex vertical-center vertical-center title" >
                      <div class="imagetitleright">
                        {{VIEWS[ITEMS].title_text}}
                      </div>
                      <div class="image"></div>
                  </div>
          </div>
  </div>
</template>
<script>
    export default{
        data(){
           return {};
        },
        props:{
          data:Object,
          option:Object
        },
        computed:{
          ITEMS(){
            return this.data.item;
          },
          VIEWS(){
            return this.data.views;
          }
        }
        methods:{
           widgetJump(url){
            //  拿到当前uri
             let data={uri:url};
              URI.widgetJump({data,option:this.option})
           }
        }
    }
</script>
