import viewReaderSdk from '@h5/sdk/view_reader';
import APPCONFIG from '@h5/static/app_config.js';
import localStorage from "@h5/services/localStorage";
import Vue from 'vue'
import { SEARCH } from '@h5/sdk/index';
import { Dialog } from 'vant';
import {
	GET_SEARCH_DATA,
  GET_SEARCH_HOTTAGS,
  SEARCH_ITEM,
  CANCEL_BACK,
  CLEAR_HISTORY
} from '../mutation-types';
const state = {
   searchData:{},  //data
};


const actions = {
  // 初始化属性配置
    initAttr({commit},params){
       let pages =  APPCONFIG.pages.pages;
        for(let pageId in pages){
          if(pages[pageId].uri && pages[pageId].uri.indexOf('search_container') > -1){
						// 当前视图所有的views
            let views = viewReaderSdk.getPageViews(pages[pageId].view_id),
							// 筛选后配置中的views
							  components = views[pages[pageId].view_id].components,
                view_id = pages[pageId].view_id;
                Vue.set(state.searchData,'isSearch',false)
                Vue.set(state.searchData,'history',[])
                console.log('xxxxxx-----components',components)
                commit(GET_SEARCH_DATA,{views,components,pageId,view_id})
          }
        }
    },
    // 获取常见热词
    getKeyword({commit},params){
        SEARCH.Searchhottags(res=>{
            commit(GET_SEARCH_HOTTAGS,{res})
        })
    },
    searchData({commit},currentKeyword){
      let his = localStorage.getObject('searchkeyword') || [];
      his.push(currentKeyword);
      state.searchData.history=[];
      Vue.set(state.searchData,'history',his);
      localStorage.setObject('searchkeyword',his);
      Vue.set(state.searchData,'isSearch',true);
      console.log('xxxxxx-----history',state.searchData)
      SEARCH.getSearchData(currentKeyword,res=>{
          commit(SEARCH_ITEM,res);
      })
    },
    cancel({commit},params){
      commit(CANCEL_BACK,params);
    },
    /*删除历史*/
    clearHistory({commit},params){
      Dialog.confirm({
          title: '标题',
          message: '弹窗内容'
        }).then(() => {
          commit(CLEAR_HISTORY)
          console.log(true)
        }).catch(() => {
          console.log(false)
        });
    }
};

const mutations = {
    [GET_SEARCH_DATA](state,{views,components,pageId,view_id}){
          state.searchData.components = components;
          state.searchData.pageData ={
              VIEWS : views,
              container_view : view_id,
              search_container : views[view_id],
              currentPageId : pageId,
        }
          console.log(state.searchData,'xxxxx------GET_SEARCH_DATA-----views');
    },
    [GET_SEARCH_HOTTAGS](state,res){
       console.log(res,'xxxxxx--------res');
       if(res.error_code ==0){
         Vue.set(state.searchData,'hottags',res.result);
       }
    },
    [SEARCH_ITEM](state,params){
      console.log(params,state.searchData,'我是搜索后的数据');
      if ( Number(params.error_code) === 0 ) {
              Vue.set(state.searchData,'searchRecord',params.result);
              let pageData =   SEARCH.initData(params.result,state.searchData);
              Vue.set(state.searchData,'PAGE',pageData);
              console.log(state.searchData,'我是state.searchData.PAGE');
          }
    },
    [CANCEL_BACK](state,params){
      console.log(params,'xxxxxx')
      Vue.set(state.searchData,'isSearch',params);
      console.log(state.searchData,'xxxxx------GET_SEARCH_DATA-----views');
    },
    [CLEAR_HISTORY](state,params){
       console.log(params);
       localStorage.setObject('searchkeyword',[]);
       Vue.set(state.searchData,'history',[]);
    }
}


const getters = {

}


export default {
  namespaced:true,
  state,
  actions,
  mutations,
  getters,
}
