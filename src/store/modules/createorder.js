import { CART } from '@/sdk/index';
import {
} from '@/store/mutation-types';

const state = {
};

const mutations = {

};

const getters = {
};

const actions = {
    //初始化订单数据 settle
	initOrderData: ({ commit, stat }, { param }) => {
        if(param.cartlist){ //购物车跳转来的
            CART.settleCart(param.cartlist).then( response => {
    			commit(UPDATE_SHOPCART, response.data.result.valid);
    		});
        }else if(param.isPay){
            console.log('isPay');
        }else{
            console.log('err');
        }

	}
};
export default {
	state,
	mutations,
	getters,
	actions
};
