
import { CART } from '@h5/sdk/index';
import {
  SET_SKUPANEL_SHOW,
  SET_SKUPANEL_INFO
} from '../mutation-types';


const state = {
  isShowSku:false,
  sku: {},
  goods: {},
  optiontype:''
};

const getters = {}


const mutations = {
  //设置SKU面板显示或隐藏
  [SET_SKUPANEL_SHOW](state,isshow){
    state.isShowSku=isshow;
  },
  [SET_SKUPANEL_INFO](state,{info,optiontype}){
    state.sku=info.newSkuObj;
    state.goods=info.newGoods;
    state.optiontype=optiontype;
    state.isShowSku=true;
  }
};


const actions ={
    initSkuPanel({ state,commit },{ data, optiontype}){
      console.log("lll 当前初始化数据的参数和类型",data,optiontype);
      let reuslt=CART.initSkuPanel({data, optiontype});
      commit(SET_SKUPANEL_INFO,{info:reuslt,optiontype});
    }
};

export default {
  namespaced:true,
  state,
  actions,
  mutations,
  getters,
}
