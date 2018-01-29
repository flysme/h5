<template >
	<div class="praise_wrap">
		<div class="parise_info sys-flex">
			<div class="parise_like_info sys-flex-one ft14">{{BASKET.USERLIKELIST.length}}个人喜欢</div>
			<div class="parise_like_option" @click="detailTouchLike" >
				<img src='/resources/images/like_clicked.png' mode="aspectFit" v-if="BASKET.isLike"/>
				<img src='/resources/images/like_click.png' mode="aspectFit" v-if="!BASKET.isLike"/>
			</div>
		</div>

		<div class="parise_avater_wrap sys-flex">
			<img class="parise_avater {{index!=0&&index/8==0?'':'mr5'}}" v-for='(item,index) in BASKET.USERLIKELIST' :key="index" :src='item.avatar' mode="aspectFit"/>
			<div class="vertical-center  justify-content-center parise_nologoWrap" v-if="BASKET.USERLIKELIST.length==0">
				<div>
					<div class="line_col"></div>
					<div class="line_row"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	
</style>
<script>
export default{
  props: {
    data: Object,
    option:Object
  },
  data(){
    return {
      templateName: ''
    }
  },
  created(){
    
  },
  computed:{
    //整个页面所有的视图
    VIEWS(){
      return this.data.VIEWS;
    },
    BASKET(){

    }
  },
  methods:{
    listuijump(dataItem){
      // uri所需的参数
      let data = {
        componentView:this.data.componentView,
        componentViewId:this.data.componentViewId,
        componentData:dataItem
      }
      URI.listuijump({data,option:this.option})
    }
  }
}
</script>


