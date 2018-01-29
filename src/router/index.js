import Vue from 'vue'
import Router from 'vue-router'
import {
	routerMode
} from '@/config/env'

Vue.use(Router)
	//最终换成读取配置 实现根据配置加载各分支工程路由
let routes = [];
for (let installApp of['h5', 'order']) {
	let route = require('../feature/' + installApp + '/router').default;
	routes.push(...route);
}

export default new Router({
	mode: routerMode,
	routes: routes
})
