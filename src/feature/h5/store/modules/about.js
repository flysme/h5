const state = {
   mess:'',
};

import { ABOUT } from '@h5/sdk/index';
import {GET_ABOUT} from '../mutation-types';

const actions ={
   getAbout({commit},params){
     console.log('ABOUT',ABOUT)
     ABOUT.getAbout((res)=>{
        commit(GET_ABOUT,res);
     })
   }
};


const mutations = {
    [GET_ABOUT](state,res){
      state.mess =res;
      console.log(res,'resresres')
    }
};


const getters = {
    mess(){
      return state.mess;
    }
}

export default {
  state,
  actions,
  mutations,
  getters,
}
