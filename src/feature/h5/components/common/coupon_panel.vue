<template>
	<van-actionsheet v-model="isActionShow">
		<div class="couponPanel">
            <div class="title">店铺优惠</div>
            <!--优惠列表-->
            <div class="item_wrap">
            	<div class="sys-flex sys-flex-center item" v-for="(item,index) in couponinfo.coupons" @click.stop="selectCoupon(item,index)">
            	      <div class="sys-flex-one">{{item.name}}</div>
            	      <div class="select-icon" v-if="item.selected || currentSelectIndex==index"> <van-icon name="success" /></div>
            	</div>
            </div>
            <!--优惠列表 end-->
           <button class="pro_btn_success" @click.stop="closeAction">关闭</button>
        </div>
	</van-actionsheet>
</template>
<script>
import "@h5/style/coupon_panel.scss"
import "@h5/style/app.css"

export default {
	name:'coupon_panel',
	data(){
		return {
			isActionShow:false,
			currentSelectItem:null,
			currentSelectIndex:null
		}
	},
	props:{
		couponinfo:{
			type:Object,
			default:()=>({})
		}
	},
	created(){
		console.log("xxx 接收到的优惠面板信息",this.couponinfo);
		this.isActionShow=this.couponinfo.show;//是否显示Action
		this.currentSelectIndex=this.couponinfo.selectIdx;//是否有选中
		this.currentSelectItem=this.couponinfo.selectItem;//选中当前的item
	},
	watch:{
		isActionShow(newval){
			if(!newval){
				//将当前选中的传递出去
				this.closeAction()
			}
		}
	},
	methods:{
		selectCoupon(item,index){
			//存储当前选中的值
			this.currentSelectItem=item;
			this.currentSelectIndex=index;
		},
		closeAction(){
			//将当前选中的传递出去
			this.$emit('selectCurrentCounp',{
				data:this.currentSelectItem,
				selectIdx:this.currentSelectIndex
			});
		}
	}
}
</script>