<!-- 占位图 -->
<template>
    <div v-if="VIEWS[viewId].nodata_layout" :class="['relative',VIEWS[VIEWS[viewId].nodata_layout].view,`orientation_${VIEWS[VIEWS[viewId].nodata_layout].orientation}`]" :style="getStyle(VIEWS[VIEWS[viewId].nodata_layout])[ VIEWS[VIEWS[viewId].nodata_layout].view ]" >
      <!-- 引入扩展区域 -->
      <extend :key="idx" :data="{VIEWS: VIEWS, subviews:item, data: dataItem,currentDetail:currentDetail}" v-for="(item,idx) in VIEWS[ VIEWS[viewId].nodata_layout ].subviews" v-if="VIEWS[ VIEWS[viewId].nodata_layout ].subviews.length > 0"></extend>
      <!-- 引入浮动扩展区域 -->
      <extend :key="idx" :data="{VIEWS: VIEWS, subviews: item, data: dataItem,currentDetail:currentDetail}" v-for="(item,idx) in VIEWS[ VIEWS[viewId].nodata_layout ].float_views" v-if="VIEWS[ VIEWS[viewId].nodata_layout ].float_views.length > 0"></extend>
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
            return this.data.viewId;
          },
          dataItem(){
            return this.data.data;
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
