import Vue from 'vue';
import Vuex from 'vuex';

let modules = {};
for(let installApp of ['h5','order']) {
    let store = require('../feature/' + installApp + '/store');
	Object.assign(modules,store)
}
Vue.use(Vuex);

export default new Vuex.Store({
	modules: modules
});
