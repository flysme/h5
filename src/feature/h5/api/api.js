//获取GUID
import Hash from "@h5/sdk/view_reader"
const guid = Hash.getGuid();

/*
	参数介绍：
	@url 请求地址
	@method 请求类型
	@mockfile 模拟假数据的文件名字 存放在mock目录下
*/

//接口配置
const API_CONFIG = {
	//上传图片
	'uploadImage': {
		url: `${guid}/image/upload/`,
		method: "post"
	},
	//获取区域数据
	'getareaInfo': {
		url: `${guid}/area_info/`,
		method: "get",
		mockfile: "index.json"
	},
	//获取表单的数据
	'getFormDataContent': {
		url: `${guid}/models/{slug}/fields/`,
		method: "get"
	},
	//获取Record数据
	'getRecordContent': {
		url: `${guid}/models/{slug}/records/?api.page=1&api.size=40`,
		method: "get"
	},
	//创建表单内容
	'createFormDataContent': {
		url: `${guid}/contents/`,
		method: "post"
	},
	//获取内容点赞的会员列表
	'getContentLikeUserList': {
		url: `${guid}/contents/{content_id}/users/?verb=like&api.page=1&api.size=20`,
		method: "get"
	},
	//获取某一条内容详情
	'getContentDetail': {
		url: `${guid}/components/`,
		method: "post",
		mockfile: 'component.json'
	},
	//获取组件数据（不带分页）
	'getComponentsData': {
		url: `${guid}/components/`,
		method: "post",
		mockfile: 'components.json'
	},
	//获取组件数据（带分页）
	'getComponentsDataWithPageNum': {
		url: `${guid}/components/?api.page={pageNum}&api.size=10`,
		method: "post",
		mockfile: 'components.json'
	},
	//判断组件权限以及显示
	'getLimitComponentsViewId': {
		url: `${guid }/protected_resources/`,
		method: "get"
	},
	//获得当前用户访问组件的权限列表
	'getAllLimitComponentsDetail': {
		url: `${guid}/current_user/permissions/`,
		method: "post"
	},
	//获取优惠活动信息
	'getPromotionList': {
		url: `${guid}/product_promotions/{product_id}/ `,
		method: "get"
	},
	//领取优惠券
	'getCoupon': {
		url: `${guid}/get_coupon/{promotion_id}/`,
		method: "get"
	},
	//获取内容评论列表
	'getCommentList': {
		url: `${guid}/comments/?version=v3`,
		method: "get"
	},
	//发表评论
	'postComment': {
		url: `${guid}/comments/?version=v2`,
		method: "post"
	},
	// 获取模板评论列表
	'getCommentItem': {
		url: `${guid}/comments/?version=v3&id={content_id}&api.page=1&api.size=20&order=-submit_time&include_reply=true`,
		method: "get",
	},
	//获取用户信息
	'getUserInfo': {
		url: `${guid}/current_user/`,
		method: "get"
	},
	/*subscribe=订阅,like=点赞, favor=收藏，取消的时候数据对象传空*/
	//订阅
	'commitSubscribe': {
		url: `${guid}/activities/?verb=subscribe&content_id={contentId}`,
		method: "post"
	},
	//取消订阅
	'cancelSubscribe': {
		url: `${guid}/activities/?verb=subscribe&content_id={contentId}`,
		method: "delete"
	},
	//点赞
	'commitLike': {
		url: `${guid}/comments/activities/?verb=like`,
		method: "post"
	},
	//取消点赞
	'delLike': {
		url: `${guid}/comments/activities/?verb=like&comment_id={comment_id}`,
		method: "delete"
	},
	//收藏
	'favorLike': {
		url: `${guid}/activities/?verb=favor&content_id={contentId}`,
		method: "post"
	},
	//取消收藏
	'cancelLike': {
		url: `${guid}/activities/?verb=favor&content_id={contentId}`,
		method: "delete"
	},
	/*购物车操作 get获取 put编辑 post添加*/
	'getCartInfo': {
		url: `${guid}/cart/?version=v2`,
		method: 'get',
		mockfile: 'cart_list_new.json'
	},
	//编辑购物车
	'editCartInfo': {
		url: `${guid}/cart/?version=v2`,
		method: 'put'
	},
	//编辑购物车
	'addCartInfo': {
		url: `${guid}/cart/?version=v2`,
		method: 'post'
	},
	//删除商品
	'removeCartInfo': {
		url: `${guid}/cart/delete/`,
		method: "post"
	},
	//商品结算
	'settleCartInfo': {
		url: `${guid}/settle/?version=v2`,
		method: "post"
	},
	// 举报
	'setreport': {
		url: `${guid}/report/`,
		method: "post"
	},
	//关于我们
	'about': {
		url: `${guid}/about/`,
		method: "get",
		mockfile: 'about.json'
	},
	//发送手机验证码
	'sendVerifyCode': {
		url: `${guid}/send_verify_code/`,
		method: "post"
	},
	//用户登陆
	'login': {
		url: `${guid}/member/login/`,
		method: "post",
		mockfile: 'userinfo.json'
	},
	//用户注册
	'register': {
		url: `${guid}/member/register/`,
		method: "post",
		mockfile: 'userinfo.json'
	},
	//通过邮箱找回密码
	'getPassFromMail': {
		url: `${guid}/members/send_email/reset_password/`,
		method: "post"
	},
	//通过手机找回密码
	'getPassFromPhone': {
		url: `${guid}/members/mobile/reset_password/`,
		method: "put"
	},
	//退出登录
	'logout': {
		url: `${guid}/member/logout/`,
		method: "post"
	},
	//获取订单详情
	'getOrderDetail': {
		url: `${guid}/pay/orders/{order_no}/`,
		method: "get",
		mockfile:'orderdetail.json'
	},
	//获取订单列表
	'getOrderList': {
		url: `${guid}/pay/orders`,
		method: "get"
	},
	//确认收货
	'confirmOrder': {
		url: `${guid}/orders/{order_no}/receive/`,
		method: "put",
		mockfile:'orderdetail.json'
	},
	//创建订单
	'createOrder': {
		url: `${guid}/pay/orders/?version=v2`,
		method: "post",
		mockfile:'orderdetail.json'
	},
	//取消订单
	'cancelOrder': {
		url: `${guid}/orders/{order_no}/close/`,
		method: "put",
		mockfile:'orderdetail.json'
	},
	//支付(有赞)
	'youzanPay': {
		url: `${guid}/pay/charge/`,
		method: "post"
	},
	//支付(余额)
	'balancePay': {
		url: `${guid}/pay/virtual_charge/`,
		method: "post"
	},
	//获取当前用户的收货地址列表
	'getAddressList': {
		url: `${guid}/delivery_address/`,
		method: "get",
		mockfile:'addresslist.json'
	},
	//获取用户的默认收货地址
	'getDefaultAddress': {
		url: `${guid}/delivery_address/default/`,
		method: "get",
		mockfile:'addresslist.json'
	},
	//删除用户的收货地址
	'deleteAddressInfo': {
		url: `${guid}/delivery_address/{address_id}/`,
		method: "delete",
		mockfile:'addresslist.json'
	},
	//添加用户收货地址
	'addAddressInfo': {
		url: `${guid}/delivery_address/`,
		method: "post",
		mockfile:'addresslist.json'
	},
	//编辑用户的收货地址
	'editAddressInfo': {
		url: `${guid}/delivery_address/{address_id}/`,
		method: "put",
		mockfile:'addresslist.json'
	},
	//订单评价
	'orderEvaluate': {
		url: `${guid}/orders/{order_no}/comment/`,
		method: "post"
	},
	// 搜索热词
	'Searchhottags':{
		url:`${guid}/contents/hottags/`,
		method:'get',
	},
	// 搜索内容
	'getSearchData':{
		url:`${guid}/contents/search/?q={q}`,
		method:'get',
	},
	// 获得充值套餐列表
	'getChargeList':{
		url:`${guid}/virtual_currency/plans/?type=coin&platform={platform}`,
		method:'get',
	},
	//获取充值记录列表
	'getChargeRecord':{
		url:`${guid}/virtual_currency/charge/?type=coin`,
		method:'get',
	},
	//创建余额充值订单
	'createChargeOrder':{
		url:`${guid}/virtual_currency/orders/`,
		method:'post',
	},
	// 修改用户信息
	'dealUserInfo':{
		url:`${guid}/members/{user_id}/`,
		method:'put',
	},
	// 修改密码
	'dealUserPwd':{
		url:`${guid}/members/{user_id}/set_password/`,
		method:'put',
	},
	'bindEmail':{
		url:`${guid}/members/{user_id}/binding/email/`,
		method:'post',
	}
}


export default API_CONFIG;
