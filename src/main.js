// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import axios from "axios"
import App from './App'
import Vant from 'vant';
import sessionStorage from "@h5/services/sessionStorage"

import '@/directives/index'
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!sessionStorage.getObject("userinfo")) {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		} else {
			next()
		}
	} else {
		next() // 确保一定要调用 next()
	}
})

export let vm = new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	},
})
