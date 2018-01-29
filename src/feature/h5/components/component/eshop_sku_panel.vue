<template>
	<div class="sku_panel_wrap" v-show="isShowSku">
		<!--
		-sku:商品sku数据
		-goods:商品信息
		-goods-id:商品id
		-hide-stock	是否显示商品剩余库存
		-show-add-cart-btn	是否显示加入购物车按钮
		-quota	限购数(0表示不限购)
		-quota-used	已经购买过的数量
		-reset-stepper-on-hide	窗口隐藏时重置选择的商品数量
		-disable-stepper-input	是否禁用sku中stepper的input框
		-stepper-title	数量选择组件左侧文案
		-->
		<van-sku
		  v-model="currentShowSku"
		  :sku="sku"
		  :goods="goods"
		  :goods-id="goods.goodsId"
		  :hide-stock="sku.hide_stock"
		  :quota="goods.quota"
		  :quota-used="goods.quotaUsed"
		  @buy-clicked="handleBuyClicked"
		>
			<!-- 自定义底部的按钮-->
			<template slot="sku-actions" slot-scope="props">
			  <div class="van-sku-actions">
			    <!-- <van-button bottom-action @click="handlePointClicked">积分兑换</van-button> -->
			    <!-- 直接触发 sku 内部事件，通过内部事件执行 handleBuyClicked 回调 -->
			    <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">{{goods.btnMessage}}</van-button>
			  </div>
			</template>
		</van-sku>
	</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
	name:'eshop_sku_panel',
	data(){
		return {}
	},
	computed:{
		...mapState('skuStore',['isShowSku','sku','goods','optiontype']),
		...mapState('pageStore',['contentDetail','currentDetailContentID']),
		currentShowSku:{
			get(){
				return this.isShowSku;
			},
			set(val){
				//内部触发面板隐藏需要去触发下状态更新
				this.$store.commit('skuStore/SET_SKUPANEL_SHOW',val)
			}
		}
	},
	methods:{
		handleBuyClicked(content){
			console.log("llll sku购买的数据",content,this.optiontype);
			let detailPageId=this.currentDetailContentID,
				detailObj=this.contentDetail,
				currentDetialObj=detailObj[detailPageId];
			//统一网当前detial页面最佳一个SKU对象
			currentDetialObj['vant_sku_submit']=content;
			this.$store.commit('pageStore/GET_CONTENT_DETAIL',{id:detailPageId,data:currentDetialObj});
			
			if(this.optiontype=='立即购买'){
				//直接跳转详情页创建订单
				this.$router.push({path:'/createorder',query:{ clicktype:'detail' }});
			}else{
				//加入购物车
				let promise=this.$store.dispatch('cartStore/addToCart',{ data:currentDetialObj,count:content.selectedNum});
				promise.then((tip)=>{
					this.$toast.success({message:tip,duration:300});
				}).catch((err)=>{
					this.$toast.fail(err);
				});
			}
			//最后关闭面板
			this.$store.commit('skuStore/SET_SKUPANEL_SHOW',false)
		}
	}
}
</script>