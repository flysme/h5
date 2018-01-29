<template>
	<!--弹出层-->
	<van-actionsheet v-model="isActionShow" :title="chargeinfo.subject">
	  	<div class="payPanel">
	        <div class="sys-flex total">
	            <div class="sys-flex-one">需付款</div>
	            <div class="sys-flex">
	                <div class="price">{{chargeinfo.pay_amount}}</div>元
	            </div>
	        </div>
	        <div class="chanel" v-for="item in chargeinfo.view[channel]">
	            <div class="sys-flex sys-flex-center" v-if="item == 'balance'" @click.stop="chooseChanel(item)">
	                <div class="balance"></div>
	                <div class="sys-flex-one">余额支付（剩余）{{chargeinfo.coin}}</div>
	                <van-icon name="success" v-if="currentChanel == item" />
	            </div>
	            <div class="sys-flex sys-flex-center" v-if="item =='youzan'" @click.stop="chooseChanel(item)">
	                <div class="youzan"></div>
	                <div class="sys-flex-one">微信/支付宝支付</div>
	                <van-icon name="success" v-if="currentChanel == item"/>
	            </div>
	        </div>
	        <div class="add" :class="{disabled:!currentChanel}" @click.stop="toPayOrder(btnMessageObj.option)">
	        	<span>{{btnMessageObj.msg}}</span>
	        	<van-loading type="spinner" color="white" v-show="isLoading"/>
	    	</div>
	  	</div>
	</van-actionsheet>
</template>


<script>
import API from '@h5/api/index'
import utils from "@h5/services/utils"
import { MODULE_CHARGE } from "@h5/sdk/index"
import "@h5/style/pay_panel.scss"
import "@h5/style/app.css"

export default {
	name:'pay_panel',
	data(){
		return {
			isActionShow:true,
			channel:'',
			currentChanel:'',
			isLoading:false
		}
	},
	props:{
		chargeinfo:{
			type:Object,
			default:()=>({})
		}
	},
	created(){
		//直接获取终端
		this.channel=this.judgmentTerminal();
		console.log("lll 当前的创建充值面板的参数",this.chargeinfo,this.channel);
	},
	watch:{
		isActionShow(newval){
			//只在创建订单页面的时候去执行
			if(!newval&&this.chargeinfo.create_type=='createorder'){
				//取消弹层->直接去往订单详情页
				let order_no=this.chargeinfo.order_no;
				this.$router.replace({path:`/orderdetail/${order_no}`});
			}
		}
	},
	computed:{
		btnMessageObj(){
			let channel=this.currentChanel,
				coin=this.chargeinfo.coin,
				total=this.chargeinfo.pay_amount,
				result={};
			if(channel=='balance' && coin < total){
				result['msg']='余额不足，请立即充值';
				result['option']='charge';
			}else if(channel=='balance' && coin >= total){
				result['msg']='余额支付';
				result['option']='balance';
			}else{
				result['msg']='立即支付';
				result['option']='pay';
			}

			return result;
		}
	},
	methods:{
		judgmentTerminal(){
			let terminal=utils.judgmentTerminal();
			let flag="android_channel";
			if(terminal=='ios') flag='ios_channel';
			return flag
		},
		//选择支付方式
		chooseChanel(channel){
			this.currentChanel=channel;
		},
		//去支付或者充值
		toPayOrder(option){
			let _this=this,
				order_no=this.chargeinfo.order_no,
				originBaseUrl=window.location.origin;
			console.log("lll 当前的url的",originBaseUrl);
			//显示支付按钮的loading
			_this.isLoading=true;

			if(option=='pay'){
				//走有赞支付
				this.jumpToYouzanPay({
				  	order_no,
				  	redirect_url:`${originBaseUrl}/orderdetail/${order_no}`
				});
			}else if(option=='balance'){ 
				// 余额支付
				MODULE_CHARGE.blancePay(order_no).then((res)=>{
					//关闭loading
					_this.isLoading=false;
					_this.$toast.success('支付成功');
					//去往订单详情
					setTimeout(()=>{
						_this.$router.replace({path:`/orderdetail/${order_no}`});
					},300)
				}).catch((err)=>{
					_this.$toast.fail('支付失败');
					//关闭loading
					_this.isLoading=false;
				});
			}else if(option=='charge'){
				//跳转充值页面
				this.$router.push({path:'/balance_charge',query:{
					create_type:this.chargeinfo.create_type,
					isfrom_youzan:'no'
				}});
			}
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
		}
	}
}
</script>