import pageStore from './modules/page'
import cartStore from './modules/cart'
import comments from './modules/comments'
import formStore from './modules/form'
import report from './modules/report'
import about from './modules/about'
import commentStyle from './modules/commentStyle'
import orderdetailStore from './modules/orderdetail'
import createOrderStore from './modules/ordercreate'
import addressStore from './modules/address'
import skuStore from './modules/sku'
import search from './modules/search'
import usermine from './modules/usermine'

export {
	pageStore,	//单页
	cartStore, //购物车
	comments, //评论列表
	formStore, //表单组件
	report,   //举报
	about,   //关于我们
	commentStyle, //评论样式
	orderdetailStore,//订单详情
	createOrderStore,//创建订单
	addressStore,//收货地址
	skuStore,//sku面板
	search,//搜索
	usermine,//个人资料
}
