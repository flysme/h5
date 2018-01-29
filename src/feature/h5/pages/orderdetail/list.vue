<template>
	<div class="orderlist">
		<!--订单列表-->
		<div class="sys-flex empty_order" v-if="!list.length">
		    <img src="https://static-public.ddapp.com/weixin/images/empty_order_2x.png" />
		</div>
		<div v-for="item in list" class="item" @click="toOrderDetail(item.order_no)">
		    <!--订单标题-->
		    <div class="sys-flex sys-flex-center title">
		        <div class="sys-flex-one overflow">订单编号：{{item.order_no}}</div>
		        <div :class="{gray:item.status == 'closed',blue:item.status != 'closed' && item.status != 'success',green:item.status == 'success'}">
		            {{item.statusname}}
		        </div>
		    </div>
		    <!--商品列表-->
		    <div class="sys-flex product" v-for="product in item.items">
		        <img  :src="product.indexpic_url"/>
		        <div class="sys-flex-one overflow">
		            <div class="overflow mb10">{{product.subject}}</div>
		            <div class="gray ft12" v-if="product.sku">{{product.sku.properties_name}}</div>
		        </div>
		        <div>
		            <div class="mb10">¥{{product.discount_price}}</div>
		            <div class="ft12 gray">x{{product.number}}</div>
		        </div>
		    </div>
		    <!--总计 (含运费¥{{item.express_fee}})-->
		    <div class="sys-flex sys-flex-center total">
		        <div class="sys-flex-one"></div>
		        <div>共{{item.total_number}}件商品 合计: ¥{{item.total}}</div>
		    </div>
		    <div class="orderoption" v-if="item.status=='unpaid'">
		       <div class="orderbtnwrap">
		           <div class="cancelorder" @click.stop="orderCancel(item.order_no)">取消订单</div>
		           <div class="payorder" @click.stop="payOrder(item.order_no)">立即购买</div>
		       </div>
		   </div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import "@h5/style/orderdetail/list.scss"
import "@h5/style/app.css"


export default {
	name:'order_list',
	data(){
		return {}
	},
	created(){
		//获取订单列表数据
		this.$toast.loading({
			duration: 0,       // 持续展示 toast
			forbidClick: true, // 禁用背景点击
		});

		let promise=this.$store.dispatch('orderdetailStore/getOrderList');
		promise.then((tip)=>{
			this.$toast.clear();
		}).catch((err)=>{
			this.$toast(err);
		});
	},
	computed:{
		...mapState('orderdetailStore',['list'])
	},
	methods:{
		//跳转订单详情页面
		toOrderDetail(order_no){	
			this.$router.push({path:`/orderdetail/${order_no}`})
		},
		//订单取消
		orderCancel(orderno){
		    let _this=this;
		    this.$dialog.confirm({
		      title: '取消订单',
		      message: '确认取消订单吗？'
		    }).then(() => {
		      // 确认操作
		      let promiseCancel=_this.$store.dispatch('orderdetailStore/cancelOrder',orderno),
		      	  promiseList=_this.$store.dispatch('orderdetailStore/getOrderList');

		      Promise.all([promiseCancel,promiseList]).then((values)=>{
		      	let canceltip=values[0],
		      		listtip=values[1];
		      	_this.$toast.success(canceltip);
		      }).catch((err)=>{
		      	_this.$toast.fail(err);
		      })
		    }).catch(() => {
		      // 取消不做任何操作
		    });
		},
		payOrder(orderno){
		  //组织回调地址
		  let _this=this,
		      originBaseUrl=window.location.href;

		  let payInfo={
		    order_no:orderno,
		    redirect_url:originBaseUrl
		  }

		  let promise= this.$store.dispatch('createOrderStore/jumpToYouzanPay',payInfo);
		  promise.then((url)=>{
		    //去往有赞支付
		    window.location.assign(url);
		  }).catch((err)=>{
		    this.$toast.fail(err);
		  })
		}
	}
}
</script>