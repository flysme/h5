<template>
	<div class="shoppingcar_toolbar_wrap sys-flex">
	    <div class="sys-flex-one shopcart_left sys-flex sys-flex-center">
	        <div class="unable_icon" :class="{able_icon:totalprice}" @click.stop="jumpToShoppingCart">
	            <div class="corner" :class="['corner_location'+VIEWS.corner_mark_location]">{{allnumber}}</div>
	        </div>
	        <div class="price">{{totalprice ? "总计:￥"+totalprice : VIEWS.price_unable_text}}</div>
	    </div>
	    <div class="buy_btn" :class="{buy_btn_disabled:!totalprice}" @click.stop="jumpToCreateOrder" hover-class="buy_btn_hover">{{totalprice ? VIEWS.pay_btn_able_text : VIEWS.pay_btn_unable_text}}</div>
	</div>
</template>

<script>
			import { mapState, mapActions, mapGetters } from 'vuex';
			import { URI } from '@h5/sdk/index';
			import "@h5/style/shoppingcart_toolbar.scss";

			export default {
				name:'shoppingcar_toolbar',
				data(){
					return {}
				},
				props:{
					data:Object
				},
				computed:{
					...mapState('cartStore',['totalprice']),
					...mapGetters('cartStore',{
						allnumber:'getAllNumber'
					}),
					VIEWS(){
						return this.data.componentView;
					},
					DATA(){
						return this.data.componenData;
					},
					viewId(){
						return this.data.componentViewId
					}
				},
				methods:{
					jumpToShoppingCart(){
					  //打开特殊url
					  let url="dingdone://ebusiness/shopping_cart"
					  URI.openUrl({
					  	data:{url}
					  })
					},
					jumpToCreateOrder(){
						//跳转创建订单页
						this.$router.push({path:'/createorder',query:{
							clicktype:'shopcart'
						}});
					}
				}
}
</script>

<style lang="scss"></style>
