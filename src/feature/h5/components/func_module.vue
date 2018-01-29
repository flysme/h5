<template>
  <div class="match_parent">
    <!--购物车页面-->
    <shopping-cart v-if="pageUri == 'dingdone://ebusiness/shopping_cart'"></shopping-cart>
    <!--订单列表页面-->
    <order-list v-if="pageUri == 'dingdone://ebusiness/dd_my_order'"></order-list>
  </div>
</template>

<script>
import shoppingCart from "@h5/pages/shoppingcart/cart"
import orderList from "@h5/pages/orderdetail/list"

export default {
  	data () {
    	return {
        name: '各功能模块入口'
    	}
  	},
		props:{
			data:Object,
		},
  	components: {
      shoppingCart,//购物车模块
      orderList,//订单列表
  	},
		created(){
        console.log("当前功能页的pageurl",this.pageUri)
		},
    computed: {
  		pageUri(){
        return this.data.pageUri;
  		},
  	},
}
</script>
<style scoped>
    .match_parent{
      height: 100%!important;
    }
</style>
