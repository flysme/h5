<template>
	<div class="modulecharge" v-if="chargeObj.userinfo">
	    <!--head-->
	    <div class="head">
	       <div class="tip">余额</div>
	       <div class="total sys-flex mb30 mt20">
	           <div class="sys-flex">
	               <div>{{chargeObj.userinfo.coin}}</div><div class="price mt20">元</div>
	           </div>
	       </div>
	       <div class="link sys-flex-center mt20" @click.stop="jumpChargeList">充值记录  ></div>
	    </div>
	    <!--head end-->
	    <!--title-->
	    <div class="title">请选择充值金额</div>
	    <!--title end-->
	    <!--list-->
	    <div class="list" v-if="!chargeObj.nodata">
	        <div class="sys-flex sys-flex-center item" v-for="item in chargeObj.chargeList">
	            <div class="icon"></div>
	            <div class="sys-flex-one">{{item.value}}</div>
	            <div class="btnbuy" @click.stop="createChargeOrder(item.id)">¥ {{item.price}}</div>
	        </div>
	    </div>
	    <div v-else="chargeObj.nodata" class="nodata">暂无套餐信息</div>
	    <!--list end-->
	    <div class="foot">
	        <div>1、用App Store绑定支付宝或银行卡可直接进行充值。</div>
	        <div>2、通过充值的余额可以购买商品。</div>
	        <div>3、充值成功后不可以退款，余额不支持提现。</div>
	    </div>
	</div>
</template>
<script>
import { MODULE_CHARGE } from "@h5/sdk/index"
import "@h5/style/module_charge/charge.scss"
import "@h5/style/app.css"

export default {
	name:'module_charge',
	data(){
		return {
			chargeObj:{},
			order_no:''
		}
	},
	created(){
		//loading	
		this.$toast.loading({duration: 0,forbidClick: true});
		//判断是否是从有赞支付回来
		if(this.isfrom_youzan=='yes'){
			let _this=this;
			MODULE_CHARGE.blancePay(this.order_no).then((info)=>{
				_this.$toast(info.msg);
				//去往订单详情
				setTimeout(()=>{
					_this.$router.replace({path:`/orderdetail/${info.order_no}`});
				},300);
			}).catch((err)=>{
				_this.$toast(err.msg);
			})
		}
		//初始化充值信息
		this.initChargeData();
	},
	props:{
		create_type:{  //当前进入充值余额的页面类型
			type:String,
			default:'createorder'
		},
		isfrom_youzan:{  //当前进入充值余额的页面类型
			type:String,
			default:'no'
		}
	},
	methods:{
		//初始化数据
		initChargeData(){
			let promise=MODULE_CHARGE.getChargeList();

			promise.then((data)=>{
				this.chargeObj=data;
				this.$toast.clear();
				console.log("lll 当前获得的充值信息",this.chargeObj);
			}).catch((err)=>{
				this.$toast.fail(err.msg);
				this.$toast.clear();
				//如果没有获取不到用户信息直接去登录
				if(err.api_type=='user')
					this.$router.push({name:'login'})
			})
		},
		//创建充值订单
		createChargeOrder(id){
			let _this=this,
				promise=MODULE_CHARGE.createChargeOrder(id);
			//loading	
			this.$toast.loading({duration: 0,forbidClick: true});
			//订单创建成功回来的处理
			promise.then((data)=>{
				_this.order_no=data.order_no;//返回创建的订单号
				let originBaseUrl=window.location.origin;
				//先去有赞支付
				_this.jumpToYouzanPay({
				  	order_no:_this.order_no,
				  	redirect_url:`${originBaseUrl}/balance_charge?create_type=youzancreate&isfrom_youzan=yes`
				});
			}).catch((err)=>{
				this.$toast(err.msg);
			})
		},
		//创建支付链接
		jumpToYouzanPay(payinfo){
			let _this=this;
			let promise=this.$store.dispatch('createOrderStore/jumpToYouzanPay',payinfo);
			//创建成功后去往订单详情页
			promise.then((url)=>{
				//去往有赞支付
				window.location.assign(url);
			}).catch((err)=>{
				this.$toast.fail(err);
			})
		},
		//跳转充值记录页面
		jumpChargeList(){
			this.$router.push({name:'balance_record'})
		}
	}
}
</script>