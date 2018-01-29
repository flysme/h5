import { CREATEORDER } from '@h5/sdk/index';
import { 
	SET_DEFAULT_ADDRESS,
	SET_ORDERINFO,
	SET_CREATE_ORDERINFO,
	SET_PAYSTATE,
	SET_EXTRA_INFO,
	SET_DYNAMIC_KEYMAPPING
} from '@h5/store/mutation-types';

const state = {
	defaultAddress:'',
	orderInfo:{},
	orderCreateInfo:{},
	dynamicObj:{},
	dynamicKeyMapping:{},
	isPay:false
};

const getters = {};

const mutations = {
	[SET_DEFAULT_ADDRESS](state,address){
		state.defaultAddress=address;
	},
	[SET_ORDERINFO](state,orderinfo){
		state.orderInfo=orderinfo;
	},
	[SET_CREATE_ORDERINFO](state,orderinfo){
		state.orderCreateInfo=orderinfo;
	},
	[SET_PAYSTATE](state,ispay){
		state.isPay=ispay;
	},
	[SET_EXTRA_INFO](state,dynamicObj){
		state.dynamicObj=dynamicObj;
	},
	[SET_DYNAMIC_KEYMAPPING](state,mappingobj){
		state.dynamicKeyMapping=mappingobj;
	}
};

const actions = {
	//获取默认地址
	getDefaultAddress({commit,state},params){
		CREATEORDER.getDefaultAddress().then((res)=>{
			let data=res.data;
			console.log("xxxx 请求默认地址返回的数据",data);
			if(Number(data.error_code)==0){
				commit(SET_DEFAULT_ADDRESS,data.result);	
			}
		});
	},
	//获得创建订单的信息 params接收购物车信息 cartInfo和详情页数据detailInfo
	getOrderInfo({commit,state},params){
		CREATEORDER.getOrderInfo(params).then((info)=>{
			console.log("xxx 最终创建订单处理的信息",info);
			commit(SET_ORDERINFO,info);
		});
	},
	//获得动态的扩展参数信息
	initDynamicData({commit,state},params){
		let reusltObj=CREATEORDER.initDynamicData(params);
		commit(SET_EXTRA_INFO,reusltObj);
	},
	//创建订单
	createOrderInfo({commit,state},params){
		return new Promise((resolve,reject)=>{
			CREATEORDER.createOrderInfo(params).then((res)=>{
				let data=res.data;
				if(Number(data.error_code)==0){
					commit(SET_CREATE_ORDERINFO,data.result);
					resolve('订单创建成功!')	
				}else{
					reject('订单创建失败!');
				}
			});
		});
	},
	//去往有赞支付
	jumpToYouzanPay({commit,state},payinfo){
		return new Promise((resolve,reject)=>{
			CREATEORDER.jumpToYouzanPay(payinfo).then((url)=>{
				commit(SET_PAYSTATE,true);	
				resolve(url);
			}).catch((err)=>{
				reject(err);
			});	
		})
		
	}
};

export default {
	namespaced:true,
	state,
	mutations,
	getters,
	actions
};
