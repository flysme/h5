import Vue from "vue";
import { CART } from '../../sdk/index';
import {
	TOLTAL_PRICE,
	CHECKED_ALL,
	CHOOSE_ITEM,
	UPDATE_SHOPCART,
	UPDATE_INVALID,
	UPDATE_PURCHASE_NUM
} from '@h5/store/mutation-types';

const state = {
	cartlist: [],
	invalidlist: [],
	checked_all: false,
	orderlist: [],
	totalprice: 0,
	allnumber:{}
};

const mutations = {
	[UPDATE_SHOPCART](state,cartlist) {
		state.cartlist = cartlist;
	},
	[UPDATE_INVALID](state,invalidlist) {
		state.invalidlist = invalidlist;
	},
	[TOLTAL_PRICE](state,totalprice) {
		state.totalprice = totalprice;
	},
	[CHECKED_ALL](state,checked_all) {
		state.checked_all = checked_all;
	},
	[CHOOSE_ITEM](state,index) {
		state.cartlist[index].checked = !state.cartlist[index].checked;
		state.cartlist.splice(index, 1, state.cartlist[index])
	},
	[UPDATE_PURCHASE_NUM](state,{id,count}){
		console.log("xxx 设置的allnumber的更改",id,count);
		Vue.set(state.allnumber,id,count);
	}
};

const getters = {
	getCartList:state => state.cartlist,
	getAllNumber:state => {
		let count=0;
		for(let key in state.allnumber){
			if(state.allnumber[key]) count++
		}
		return count;
	}
};

const actions = {
	//获取购物车列表
	toGetCartList: ({ commit, stat }, { param }) => {
		return new Promise((resolve)=>{
			CART.getShopCartList().then( response => {
				let validlist= response.data.result.valid,
					invalidList=response.data.result.invalid;
				//初始化有效和无效的购物车列表项和价格
				commit(UPDATE_SHOPCART, validlist);
				commit(UPDATE_INVALID, invalidList);
				commit(TOLTAL_PRICE, CART.calculator(validlist));
				//赋值当前购物车控件的数量
				if(validlist.length){
					validlist.forEach((parentitem,index)=>{
						parentitem.items.forEach((sonitem,idx)=>{
							commit(UPDATE_PURCHASE_NUM, {id:sonitem.product,count:sonitem.number});
						})
					});
				}else{
					//为空的时候全部清空
					state.allnumber={}
				}
				//end
				resolve()
			}, (err) => {
				commit(UPDATE_SHOPCART, []);
				resolve();
			});
		})
	},
	//商品数量减 storeindex productindex
	minus: ({ commit, state }, { param }) => {
		state.cartlist[param.storeindex].items[param.productindex].number = state.cartlist[param.storeindex].items[param.productindex].number > 1 ? state.cartlist[param.storeindex].items[param.productindex].number-1 : 1;
		state.totalprice = CART.calculator(state.cartlist);
	},
	//商品数量加
	plus: ({ commit, state }, { param }) => {
		state.cartlist[param.storeindex].items[param.productindex].number += 1;
		state.totalprice = CART.calculator(state.cartlist);
	},
	//全选
	chooseAllProduct: ({ commit, state }) => {
		state.checked_all = state.checked_all ? false : true;
		state.cartlist.forEach( store => {
			store.items.forEach( cart => {
				cart.checked = state.checked_all;
			})
			store.checked = state.checked_all;
		})
		state.totalprice = CART.calculator(state.cartlist);
		commit('UPDATE_SHOPCART', state.cartlist);
	},
	//单选 storeindex,productindex
	chooseProduct: ({ commit, state }, { param }) => {
		let items = state.cartlist[param.storeindex].items;
		if(param.productindex == -1){
			state.cartlist[param.storeindex].checked = !state.cartlist[param.storeindex].checked;
			items.forEach(product => {
				product.checked = state.cartlist[param.storeindex].checked
			})
		}else {
			items[param.productindex].checked = items[param.productindex].checked ? false : true;
			items.splice(param.productindex, 1, items[param.productindex]);
			let bool = true;
			items.forEach(product => {
				if(!product.checked) bool = false;
			})
			state.cartlist[param.storeindex].checked = bool;
		}
		commit('UPDATE_SHOPCART', state.cartlist);
		state.totalprice = CART.calculator(state.cartlist);
	},
	//删除商品提交
	bulkDeleteCart: ({ commit, state }, { param }) => {//批量删除购物车数据
		let ids = [],
			newList = [];
		state.cartlist.forEach( store => {
			let items = [];
			store.items.forEach( cart => {
				if(cart.checked) ids.push(cart.id);
				else items.push(cart);
			})
			items.length && newList.push({
				'store':store.store,
				'items' : items
			});
		})
		CART.removeCartInfo(ids).then( response => {
			if(!+response.data.error_code){
				commit(UPDATE_SHOPCART, newList);
				//删除所有购物车商品后需要将价格和数量还原
				commit(TOLTAL_PRICE,0);
				state.allnumber={};
			}	
		}, (err) => {
		});
	},
	//清除失效商品
	deleteInvalidProduct(){
		let ids = [];
		state.invalidlist.forEach( cart => {
			ids.push(cart.id);
		})
		CART.removeCartInfo(ids).then( response => {
			if(!+response.data.error_code){
				commit(UPDATE_INVALID, []);
			}
		}, (err) => {
		});
	},
	//添加到购物车
	addToCart({ commit, state,dispatch},{data,count}){
		return new Promise((resolve,reject)=>{
			//触发页面数据改变
			CART.addToCart({data,count}).then((tip)=>{
				//重新获取下当前购物车的信息
				dispatch('toGetCartList',{}).then((res)=>{ resolve(tip) })
			}).catch((err)=>{ reject(err) });
		});
	},
	//编辑购物车
	editCartInfo({ commit, state,dispatch },{data,count}){
		return new Promise((resolve,reject)=>{
			//需要找到购物车中的ID
			state.cartlist.forEach((parentitem,index)=>{
				parentitem.items.forEach((sonitem,idx)=>{
					//找到相应更改的商品更改其数量
					if(sonitem.product==data.id){
						data['shopcart_id']=sonitem.id;
					}
				});
			});
			//判断是否为零  为零则从购物车中删除
			if(count==0){
				CART.removeCartInfo([data.shopcart_id]).then( response => {
					if(!+response.data.error_code){
						//重新获取下当前购物车的信息
						dispatch('toGetCartList',{}).then((res)=>{ 
							//因为删除后重新获取信息就没有之前的那个ID了 所以需要手动设置下总数
							commit(UPDATE_PURCHASE_NUM, {id:data.id,count:0});
							resolve("编辑成功!") 
						})
					}	
				}, (err) => { reject(err) });
			}else{
				//去编辑购物车
				CART.editCartInfo({data,count}).then((tip)=>{
					//重新获取下当前购物车的信息
					dispatch('toGetCartList',{}).then((res)=>{ resolve(tip) })
				}).catch((err)=>{ reject(err) });
			}
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
