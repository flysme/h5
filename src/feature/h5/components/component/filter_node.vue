<!--栏目栏组件模板-->
<template>
  <div v-if="componentData && componentData.length > 0">
      <!--fix占位元素-->
      <div class="filter_node_space">
        <!--主题包裹元素-->
         <div class="stylefix filter_node_box" :class="{scrollview_fix:!view.isSplit}">
           <div class="detailHeight sys-flex sys-flex-center" v-for="(nodebox,index) in componentData"  :key="index">
            <!--单个选项的元素-->
             <div @click.stop="filterNodeChange(componentData,index)" class="detailHeight sys-flex-one clearLastStyle" :class="[nodeitem._active?'filter_node_itemActive nodeItemActive':'filter_node_item nodeItem',{nodeItemSplitWd:view.isSplit}]" v-for="(nodeitem,index) in nodebox.options" :key="nodeitem.image">
                <!--元素里面的布局方式-->
                <div class="detailHeight sys-flex sys-flex-center justify-content-center" :style="changePosOfType">
                    <!--单个元素-->
                    <img :src="nodeitem.image" v-if="view.type=='image'" class="filter_node_imageItem"></img>
                    <span class="txt-overflow" v-if="view.type=='title'">{{nodeitem.name}}</span>
                    <!--两个元素-->
                    <img :src="nodeitem.image" v-if="['image','title'].indexOf(view.type)==-1" class="filter_node_imageItem"></img>
                    <span class="txt-overflow" v-if="['image','title'].indexOf(view.type)==-1">{{nodeitem.name}}</span>
                </div>
              </div>
           </div>
         </div>
      </div>
  </div>
</template>

<script>
import "@h5/style/filter_node.scss"
import { FILTER_NODE } from "@h5/sdk/index"

export default {
  data(){
    return {
        componentData:'',
        view:''
    }
  },
  props:{
    data:Object
  },
  computed:{
    changePosOfType(){
        let obj={},type=this.view.type;
        if(type=="mix_right_image"){
            obj['flex-direction']='row-reverse';
        }else if(type=="mix_top_image"){
            obj['flex-direction']='column';
        }else if(type=="mix_bottom_image"){
            obj['flex-direction']='column-reverse';
        }

        return obj;
   }
  },
  watch:{
    data(val){
        this.data=val;
        if(this.data.componentData&&this.data.componentView){
            this.componentData=FILTER_NODE.initFilterNodeSelect(this.data.componentData);
            this.view=this.data.componentView;
        }
    }
  },
  methods:{
    filterNodeChange(data,index){
        this.componentData='';
        this.componentData=FILTER_NODE.filterNodeChange(data,index);
    }
  }
}
</script>
