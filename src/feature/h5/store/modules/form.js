import { FORM } from '@h5/sdk/index';
// import { FORM_INIT_DATA } from '@/store/mutation-types';

const state = {
	nodesArr:[],
	formCotentsArr:[],
	quoteModeSlugArr:[]
};

const mutations = {

};

const getters = {

};

const actions = {
	formInitData:({ commit, state },{ slug }) => {
		console.log("xxx action params",slug);
		FORM.initFormData(slug);
	}
};

export default {
	state,
	mutations,
	getters,
	actions
};
