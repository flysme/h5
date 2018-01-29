/**
* dissupport_url   不支持的url映射
* support_url      支持的url映射
*/
const dissupport_url={
    "dingdone://sms":'none',
    "dingdone://mailto":'none',
    "dingdone://im_group/conversation":'none', //进入群回话
    'dingdone://settings':'none',//设置
    'dingdone://download/video':'none',//保存视频到本地
    'dingdone://user/home':'none',//保存视频到本地
  };
const support_url={
    "dingdone://community":'community', //社区
    "dingdone://detail_container":'jumpPage', //模块跳转
    "dingdone://list_container":'jumpPage', //详情跳转
    "dingdone://comment/detail":'commentdetail',//评论跳转
    "dingdone://weather":'weather', //天气
    "dingdone://module":'jumpPage', //页面
    "dingdone://qrscan" : 'qrscan', //二维码扫描
    'dingdone://comment/editor/style2':'editor', //留言跳转--样式2
    'dingdone://none':'none',
    'dingdone://browser':'webview',//叮当浏览器
    'dingdone://sys_browser':'webview',
    'dingdone://comment/list':'commenturl',
    'dingdone://tel':'tel',//通话
    'dingdone://mailto':'empty',//邮件
    'dingdone://share/content_url':'empty',//分享内容
    'dingdone://comment/editor/style1':'editor',//评论样式1
    'dingdone://comment/editor/style3':'editor',//评论样式3
    'dingdone://comment/editor/style4':'editor',//评论样式4
    'dingdone://feedback':'empty',//意见反馈
    'dingdone://contact/my_contact':'empty',//联系人
    'dingdone://user/black_list':'empty',//黑名单
    'dingdone://user/friends':'empty',//我的好友
    'dingdone://user/fans':'empty',//我的粉丝
    'dingdone://user/cares':'empty',//我的关注
    'dingdone://wsq/relateme/':'empty',//老社区点赞
    'dingdone://im_chatroom/conversation':'empty',//聊天室
    'dingdone://im_group/create':'empty',//发起群聊
    'dingdone://user/message':'empty',//消息盒子
    'dingdone://user/user_info/':'empty',//个人资料
    'dingdone://user/invitation':'empty',//邀请好友
    'dingdone://share_app':'empty',//分享APP
    'dingdone://aboutus':'aboutus',//关于我们
    'dingdone://about_dingdone':'empty',//关于叮当
    'dingdone://score_app':'empty',//给应用评分
    'dingdone://im_base/conversation_list':'empty',//会话列表
    'dingdone://ebusiness/shopping_cart':'cart',//购物车
    'dingdone://im_service/conversation':'kefu',//客服
    'dingdone://clear_cache':'empty',//清除缓存
    'dingdone://check_update':'empty',//检查更新
    'dingdone://xxx':'empty',//自定义链接
    'dingdone://user/user_info_detail':'empty',//详细资料
    'dingdone://user/message/push':'empty',//推送消息
    'dingdone://user/message/system':'empty',//系统消息
    'dingdone://audio':'audio',//音频播放器
    'dingdone://ebusiness/delivery_address':'addressmanager',//自有电商的收货地址
    'dingdone://toast':'toast',//toast提示
    'dingdone://ebusiness/coupons':'coupon',//我的优惠券
    'dingdone://ebusiness/dd_my_order':'orderlist',//我的订单列表
    'dingdone://user/mine':'mine',//我的-个人资料
    'dingdone://ebusiness/virtual_charge':'module_charge',//储值
    'dingdone://comment/zan':'none',//评论点赞
    'dingdone://user/logout':'empty',//退出登陆
    'dingdone://search':'search',//搜索
    'dingdone://map/address':'map',//显示地图
    'dingdone://map/page':'map',//显示地图和位置
    'dingdone://map/list':'navigater',//选择地图去导航
    'dingdone://back':'goback',  //返回
    'dingdone://report':'report',  //举报
    'dingdone://download/image':'saveimage',//保存图片到本地
    'dingdone://share/show':'shareShow',  //调起分享按钮
    "dingdone://ebusiness/cart":'addShoppingCart', //添加到购物车
    "dingdone://ebusiness/buy":'toBuyShopping',//立即购买
  }
  
  export {dissupport_url,support_url}
