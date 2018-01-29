import { ORDERDETAIL } from "@h5/sdk/index"
import {
	UPDATE_DETAILINFO,
	SET_ORDER_LIST
} from '@h5/store/mutation-types';

const state={
	detailInfo:{},
	list:[]
};

const getters={};

const mutations={
	[UPDATE_DETAILINFO](state,params){
		state.detailInfo=params;
	},
	[SET_ORDER_LIST](state,list){
		state.list=list;
	}
};

const actions={
	initOrderDetail({commit,state},order_no){
		ORDERDETAIL.initOrderDetail(order_no).then((infodata)=>{
			commit(UPDATE_DETAILINFO,infodata)
		},(err)=>{
			commit(UPDATE_DETAILINFO,{})			
		});
	},
	cancelOrder({commit,state},order_no){
		return new Promise((resolve,reject)=>{
			ORDERDETAIL.cancelOrder(order_no).then((iscancel)=>{
				if(iscancel){
					state.detailInfo.status='交易关闭';
					commit(UPDATE_DETAILINFO,state.detailInfo);
					resolve("取消订单成功!");
				} 
			},(err)=>{
				reject("取消订单失败 ！")
			});
		});
	},
	confirmOrder({commit,state},order_no){
		ORDERDETAIL.confirmOrder(order_no).then((isconfirm)=>{
			if(isconfirm){
				state.detailInfo.status='交易成功';
				commit(UPDATE_DETAILINFO,state.detailInfo);
			} 
		},(err)=>{
			console.log("确认收货失败 ！");
		});
	},
	getOrderList({commit,state},params){
		return new Promise((resolve,reject)=>{
			ORDERDETAIL.getOrderList().then((list)=>{
				commit(SET_ORDER_LIST,list)
				resolve("订单列表获取成功！");
			},(err)=>{ 
				reject("订单列表获取失败！")
			});
		});
	}
};


export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};