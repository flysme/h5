<template>
	<div class="createorder_wrap"  v-if="orderInfo.shoppingInfo">
		<!--创建订单-->
		<div class="createorder">
			<div class="address_wrap" v-if="!orderInfo.shoppingInfo.is_virtual">
				<div class="address sys-flex sys-flex-center" @click.stop="showAddressList">
				    <!--有地址的时候-->
				    <div class="sys-flex-one sys-flex sys-flex-center" v-if="currentDefaultAddress">
				        <img class="icon" src="https://static-public.ddapp.com/weixin/images/zuobiao-2x.png" />
				        <div class="sys-flex-one">
				            <div class="sys-flex mb10">
				                <div class="mr20">{{currentDefaultAddress.name}}</div>
				                <div>{{currentDefaultAddress.phone}}</div>
				            </div>
				            <div class="text-content ft12">
				                <div>{{currentDefaultAddress.district}}{{currentDefaultAddress.detail}}</div>
				            </div>
				        </div>
				    </div>
				    <!--没有地址的时候-->
				    <div class="sys-flex-one" v-else>
				        <div class="sys-flex text-content content">
				            <div class="sys-flex-one">选择收货地址</div>
				        </div>
				    </div>
				    <div class="arrow"></div>
				</div>
				<div class="postline"></div>
			</div>
		    <!--重新生成的订单列表-->
		    <div class="detail">
		        <div class="order" v-for="(order,index) in orderInfo.shoppingInfo.orders">
		        	<div v-if="order.products.length">
		        		<div class="sys-flex sys-flex-center store" v-if="order.store&&order.store.name" >
		        		    <img class="icon" src="https://static-public.ddapp.com/weixin/images/business.png"/>
		        		    <div class="product-name">{{order.store.name}}</div>
		        		</div>
		        		<div class="productitem" v-for="item in order.products">
		        		   <div class="sys-flex">
		        		       <div>
		        		           <img  :src="item.indexpic_url" class="image"/>
		        		       </div>
		        		       <div class="sys-flex-one">
		        		           <div class="title">
		        		               <span>{{item.subject}}</span>
		        		           </div>
		        		           <div class="sku">
		        		               <span>{{item.sku.properties_name}}</span>
		        		           </div>
		        		           <div class="sys-flex sys-flex-center">
		        		               <div class="red sys-flex-one">
		        		                   <span>¥{{item.discount_price}}</span>
		        		               </div>
		        		               <div class="sys-flex sku mt10">
		        		                   <span>x{{item.number}}</span>
		        		               </div>
		        		           </div>
		        		       </div>
		        		    </div>
		        		    <!--扩展字段模板-->
		        		    <dynamic-params
		        		    	:origindata="dynamicObj.originDynamicData[item.model_id]"
		        		    	:datamapping="dynamicObj.dynamicDataMapping"
		        		    ></dynamic-params>
		        		</div>
		        		<div class="postfee sys-flex sys-flex-center ft12" v-if="order.coupons.length" @click.stop="showCouponPanel(order.coupons,index)">
		        		    <div class="sys-flex-one text-content">店铺优惠</div>
		        		    <div class="right" v-if="!couponInfo.selectItem">{{orderInfo.couponCache[order.coupon] || '无'}}</div>
		        		    <div class="right" v-else>{{couponInfo.selectItem.name || '无'}}</div>
		        		    <img class="icon ml5" src="https://static-public.ddapp.com/weixin/images/arrow-right.png"/>
		        		</div>
		        		<div class="postfee sys-flex sys-flex-center ft12" v-if="!orderInfo.shoppingInfo.is_virtual">
		        		    <div class="sys-flex-one text-content">运费</div>
		        		    <div class="right mr10">￥{{order.express_fee || 0.00}}</div>
		        		</div>
		        		<div class="postfee sys-flex sys-flex-center ft12">
		        		    <div class="text-content">
		        		        买家留言：
		        		    </div>
		        		    <div class="text-content">
		        		        <input v-model="order.message"  placeholder="请输入留言"/>
		        		    </div>
		        		</div>
		        		<div class="postfee sys-flex sys-flex-center">
		        		    <div class="sys-flex-one"></div>
		        		    合计:<div class="ml10 red">¥<span class="ml5">{{order.total}}</span></div>
		        		</div>
		        	</div>
		        </div>
		    </div>
		</div>
		<!--提交订单-->
		<div class="cartnav sys-flex sys-flex-centers">
		    <label class="sys-flex-one"></label>
		    <span>合计：</span><span class="red ml10">¥</span><span class="red ml5">{{orderInfo.shoppingInfo.total ? orderInfo.shoppingInfo.total : 0}}</span>
		    <div class="buy ml10" @click.stop="createOrder">提交订单</div>
		    <!--充值按钮暂时不显示-->
		    <!-- <div  v-else class="buy ml10" bindtap="showPayPanel">提交订单</div> -->
		</div>
		<!-- 页面-pay面板 -->
		<pay-panel :chargeinfo="panelInfo"  v-if="panelInfo.show"></pay-panel>
		<!-- 页面-优惠券弹层 -->
		<coupon-panel :couponinfo="couponInfo" @selectCurrentCounp="selectCurrentCounp" v-if="couponInfo.show"></coupon-panel>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import sessionStorage from "@h5/services/sessionStorage"
import dynamicParams from "@h5/components/common/dynamic_params"
import payPanel from "@h5/components/common/pay_panel"
import couponPanel from "@h5/components/common/coupon_panel"

import "@h5/style/orderdetail/create.scss"
import "@h5/style/app.css"

export default {
	name:'createorder',
	data(){
		return {
			detailInfo:{},
			cartInfo:{},
			panelInfo:{},
			couponInfo:{
				currentOrderIdx:null
			}
		}
	},
	props:{
		clicktype:{
			type:String,
			default:'shopcart'
		}
	},
	components:{
		dynamicParams,
		payPanel,
		couponPanel
	},
	created(){
		//判断如果选择了地址就暂时不用发送默认地址请求
		if(Object.keys(this.currentAddress).length==0)
			this.$store.dispatch('createOrderStore/getDefaultAddress',{})//获取默认地址信息

		this.detailInfo=this.contentDetail[this.currentDetailContentID];//拿到当前访问的详情数据;
		console.log("xxx 获取到的当前详情页数",this.detailInfo);
		//初始化扩展字段的信息
		this.$store.dispatch('createOrderStore/initDynamicData',{detailData:this.detailInfo})
		//赋值购物车数据
		this.cartInfo=this.cartlist;
		//判断是从购物车还是详情页过来的
		this.clicktype=='shopcart'?this.detailInfo={}:this.cartInfo={};
		//将购物车的数据或详情页的数据传送过去整理
		this.$store.dispatch('createOrderStore/getOrderInfo',{
			cartInfo:this.cartInfo,
			detailInfo:this.detailInfo
		})
	},
	computed:{
		...mapState('createOrderStore',['defaultAddress','orderInfo','orderCreateInfo','dynamicObj','dynamicKeyMapping']),
		...mapState('addressStore',['currentAddress']),
		...mapState('cartStore',['cartlist']),
		...mapState('pageStore',['contentDetail','currentDetailContentID','initFitstDataCollection']),
		currentDefaultAddress(){
			let address='';
			//更据数据结构的不同来赋值
			if(Object.keys(this.currentAddress).length>0){
				let nowAddressobj=this.currentAddress,
					name=nowAddressobj.name,
					phone=nowAddressobj.tel,
					district=[nowAddressobj.province,nowAddressobj.city,nowAddressobj.county].join(','),
					detail=nowAddressobj.address_detail,
					id=nowAddressobj.id;
				//归纳数据
				address={id,name,phone,district,detail};
			}else if(this.defaultAddress){
				address=this.defaultAddress;
			}
			return address;
		}
	},
	mounted(){
	},
	methods:{
		showAddressList(){
			this.$router.push({name:'address'});
		},
		//显示优惠券列表
		showCouponPanel(coupons,orderIdx){
			let obj={};
			//设置下当前传进来的订单索引
			obj['currentOrderIdx']=orderIdx;
			//赋值当前可选的优惠列表
			obj['coupons']=obj['coupons']=coupons;
			obj['show']=true;
			//判断是否具有优惠券选择索引
			if(this.couponInfo.hasOwnProperty('selectIdx')){
				obj['selectIdx']=this.couponInfo.selectIdx;
				obj['selectItem']=this.couponInfo.selectItem;
			}
			this.couponInfo=obj;
		},
		//选择当前的优惠券的回调信息
		selectCurrentCounp(selectCoupon){
			//返回回来更改下属性
			this.$set(this.couponInfo,'show',false);
			if(selectCoupon.hasOwnProperty('selectIdx')){
				this.$set(this.couponInfo,'selectIdx',selectCoupon.selectIdx);
				this.$set(this.couponInfo,'selectItem',selectCoupon.data);
				//设置了当前创建订单的优惠券ID
				let currentOrderIdx=this.couponInfo.currentOrderIdx,
					changeOrderCounp=this.orderInfo.shoppingInfo.orders[currentOrderIdx];
				this.$set(changeOrderCounp,'coupon',selectCoupon.data.id);
			}else{
				this.$set(this.couponInfo,'selectItem',null);
			}
			console.log("xxx 当前选中的coupon",selectCoupon.data);
		},
		//创建订单
		createOrder(){
			let _this=this;
			//触发创建订单传入订单信息和地址信息
			let promise=this.$store.dispatch('createOrderStore/createOrderInfo',{
				orderInfo:this.orderInfo,
				defaultAddress:this.currentDefaultAddress,
				dynamicKeyMapping:this.dynamicKeyMapping
			})
			//获取当前用户信息
			let userinfo=sessionStorage.getObject("userinfo");
			//组织下需要充值面板的参数
			let chargeData=_this.initFitstDataCollection.chargeData,
				tempParams={};
			//没有配置支付方式的提醒
			if(!chargeData){
				_this.$toast.fail('请配置支付');
				return;
			}
			tempParams['coin']=userinfo.coin;//用户的余额
			tempParams['view']=chargeData.VIEWS[chargeData.chargeView];//找到支付的配置
			tempParams['show']=true;//展示弹层
			tempParams['create_type']='createorder';//创建panel的页面
			//处理订单完成后的业务
			promise.then((info)=>{
				//获取订单支付成功的回传地址
				console.log("xxxx 订单创建成功后返回的信息",_this.orderCreateInfo);
				_this.$toast.success({message:info,duration:500});
				//等提示完成后再弹出询问框
				setTimeout(()=>{
					//赋值支付面板的数据->显示支付方式
					_this.panelInfo=Object.assign({},_this.orderCreateInfo,tempParams);
				},510)
			}).catch((info)=>{
				_this.$toast.fail(info);
			})
		}
	}
}

</script>
