<!-- 高级布局组件 -->
<template>
  <div class="relative"  :id="VIEWS[ viewId ].content_layout" :style="getStyle(VIEWS[ VIEWS[ viewId ].content_layout ])[ VIEWS[ VIEWS[ viewId ].content_layout ].view ]">
    <!-- 引入平铺 -->
    <div class="sys-flex sys-vertical sys-flex-one">
        <extend :key="idx" :data="{VIEWS: VIEWS, subviews:item, data: dataItem,currentDetail:currentDetail}" v-for="(item,idx) in VIEWS[ VIEWS[viewId].content_layout ].subviews"></extend>
    </div>
    <!-- 引入浮动 -->
    <div class="tile_container">
        <extend :key="idx" :data="{VIEWS: VIEWS, subviews:item, data: dataItem,currentDetail:currentDetail}" v-for="(item,idx) in VIEWS[ VIEWS[viewId].content_layout ].float_views"></extend>
    </div>
  </div>
</template>
<script>
    import extend from '@h5/components/widget/extend/extend.vue';
    import Style from '@h5/gen_css/common';
    export default{
      data(){
        return {}
      },
      props:{
        data:Object,
      },
      computed:{
        VIEWS(){
          return this.data.VIEWS;
        },
        viewId(){
          return this.data.componentViewId;
        },
        dataItem(){
          return this.data.componentData;
        },
        currentDetail(){
          return this.data.currentDetail;
        }
      },
      methods:{
        getStyle(attr){
          if(!attr)return;
          let styleResult = {};
            styleResult.linear_layout=Style.toString({
                "flex":Style.flexBoxPer(attr.width_type,attr.weight),
                "width":Style.borderBoxWidth(attr.width_type,attr.width,attr.padding,attr.margin,attr.border),
                "height":Style.heightType(attr.height_type,attr.height),
                "margin":Style.margin(attr.margin),
                "padding":Style.padding(attr.padding),
                "background":Style.advanceBg(attr.background),
                "border-width":Style.borderWidth(attr.border),
                "border-color":Style.borderColor(attr.border),
                "border-style":"solid",
                "border-radius":Style.radius(attr.corner),
                "box-shadow":Style.shadow(attr.shadow),
                "display":"flex",
                "box-sizing": "border-box",
                "background-size":"100%",
                "position":"relative",
                "flex-direction":Style.flexDirection(attr.orientation)
              })
            return styleResult;
        }
      },
      components:{
        extend
      }
    }
</script>
