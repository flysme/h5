import Vue from "vue";
import Api from '@h5/api/index'
import {
	GET_COMPONENTS_DATA,
	GET_CONTENT_DETAIL,
	SET_CONTENT_DETAIL_ID,
	GET_FILTER_DATA,
	SET_FILTER_INDEX,
	SET_INIT_COLLECTION,
	INIT_PAGE_PARAMS
} from '../mutation-types';
import componentsSdk from '@h5/sdk/components'
import viewReaderSdk from '@h5/sdk/view_reader';
import APPCONFIG from '@h5/static/app_config.js';

const state = {
	loding:'true',
	componentsDatas: {},
	contentDetail:{},	//详情数据，key为内容的id
	currentSubmoduleUrl: {},	//组合页当前选中的子页，key为组合页pageId，value为子页uri
	currentDetailContentID:'',
	filterData:{},		//筛选器组件缓存，key为资源id
	initFitstDataCollection:{},//初始化需要往配置中加载的对象
	pageOption:{}, //当前页面参数
};

const mutations = {
	[GET_COMPONENTS_DATA](stat, { uri, data }) {
		if( state.componentsDatas[uri] ){
			state.componentsDatas[uri] = Object.assign({},state.componentsDatas[uri],data);
		}else{
			Vue.set( state.componentsDatas, uri, data );
		}
  },
	[GET_CONTENT_DETAIL](stat, { id, data }) {
		Vue.set( state.contentDetail, id, data );
    },
	[SET_CONTENT_DETAIL_ID](stat, id) {
		stat.currentDetailContentID=id;
	},
	[GET_FILTER_DATA](stat, data) {
		for( let k in data ){
			Vue.set( state.filterData, k, data[k] );
		}
	},
	[SET_FILTER_INDEX](stat, {id, index}) {
		state.filterData[ id ][0].default_index = index;
	},
	[SET_INIT_COLLECTION](stat, data) {
		for(let key in data){
			Vue.set(stat.initFitstDataCollection,key,data[key])
		}
	},
	[INIT_PAGE_PARAMS](stat,data){
		stat.pageOption = data;
	}
};
const getters = {

};
const actions = {
	setFilterData: ({ commit, stat }, { param }) => {
		commit(GET_FILTER_DATA, param.data);
  },
	setFilterIndex: ({ commit, stat }, { param }) => {
		commit(SET_FILTER_INDEX, {id:param.id, index:param.index});
  },
	//存储页面数据，接收参数（页面uri,需要缓存的数据）
	setPageData: ({ commit, stat }, { param }) => {
		commit(GET_COMPONENTS_DATA, { uri:param.uri, data:param.data });
  },
	toGetPageData: ({ commit, stat }, { param }) => {
		let contentId = param.contentId;
		componentsSdk.getPageData( param.uri, contentId, state.filterData ).then( json => {
			json = json.data.result;
			let pageId = viewReaderSdk.getPageIdWithUri( param.uri ),
					data = componentsSdk.replaceDataWithViewId( pageId, json );
			commit(GET_COMPONENTS_DATA, { uri:param.uri, data });
			if( contentId ){
				commit(GET_CONTENT_DETAIL, { id:contentId, data:json[ viewReaderSdk.getAppDetailId() ] });
			}
		});
  },
	//获取一条详情数据
	toGetContentDetail: ({ commit, stat }, { param }) => {
		let contentId = param.id,
				componentRequestId = APPCONFIG.components.detail.id,
				requestParam = {
					data : [{
                id : componentRequestId,
                conditions : [{
                    key : "id",
                    operator : '=',
                    value : contentId
                }],
                expanding : componentsSdk.getExpanding()
            }]
				};
		componentsSdk.getContentDetail( requestParam ).then( data => {
			data = data.data.result[componentRequestId];
			commit(GET_CONTENT_DETAIL, { id:contentId, data });
		})
  },
	submodulesTab: ({ commit, stat }, { param }) => {
		Vue.set( state.currentSubmoduleUrl, param.parentPageId, param.uri );
	},
	//初始化需要从APP配置中读取的信息
	setInitCollection({ commit, stat },param){
		//初始化电商所需要的一些信息配置
		let funObj=viewReaderSdk.initFuncmodule(),
			objArr=[funObj];

		//动态取添加对象
		objArr.forEach((item)=>{
			commit(SET_INIT_COLLECTION,item);
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
