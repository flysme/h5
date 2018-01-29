<!-- 封装出扩展区域 -->
<template>
			<layout :data="{currentDetail:currentDetail,VIEWS: VIEWS, item: item, data: dataItem,id:item,classItem:[VIEWS[ item ].view,`layout_gravity_${VIEWS[item].layout_gravity}`,`orientation_${VIEWS[item].orientation}`,`gravity_${VIEWS[item].gravity}`]}" v-if="VIEWS[ item ].view == 'linear_layout'"></layout>
</template>
<script>
      import layout from '@h5/components/widget/extend/layout.vue';
      export default{
					name:'extend',
          data(){
            return {}
          },
          props:{
              data:Object,
              option:Object
          },
          computed:{
            VIEWS(){
              return this.data.VIEWS;
            },
						item(){
							return this.data.subviews;
						},
						dataItem(){
							return this.data.data;
						},
						currentDetail(){
							return this.data.currentDetail;
						}
          },
          mounted(){

          },
          components:{
            layout
          }

      }
</script>
