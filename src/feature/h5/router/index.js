const demo = r => require.ensure([], () => r(require('../components/HelloWorld')), 'demo')
const comment = r => require.ensure([], () => r(require('@h5/pages/commentlist/comments')), 'comment')
const report = r => require.ensure([], () => r(require('@h5/pages/report/report')), 'report')
const about = r => require.ensure([], () => r(require('@h5/pages/about/about')), 'about')
const comment_style = r => require.ensure([], () => r(require('@h5/pages/comment_style/comment_style')), 'comment_style')
const login = r => require.ensure([], () => r(require('@h5/pages/login/login')), 'login')
const register = r => require.ensure([], () => r(require('@h5/pages/login/register')), 'login')
const findpass = r => require.ensure([], () => r(require('@h5/pages/login/findpass')), 'login')
const setpass = r => require.ensure([], () => r(require('@h5/pages/login/setpassword')), 'login')
const search = r => require.ensure([], () => r(require('@h5/pages/search_container/search_container')), 'search')

const firstPage = r => require.ensure([], () => r(require('@h5/pages/first_page')), 'firstPage')
const page = r => require.ensure([], () => r(require('@h5/pages/page')), 'page')

const shopcart = r => require.ensure([], () => r(require('@h5/pages/shoppingcart/cart')), 'eshop')
const orderdetail = r => require.ensure([], () => r(require('@h5/pages/orderdetail/detail')), 'eshop')
const createorder = r => require.ensure([], () => r(require('@h5/pages/orderdetail/create')), 'eshop')
const orderlist = r => require.ensure([], () => r(require('@h5/pages/orderdetail/list')), 'eshop')
const addresslist = r => require.ensure([], () => r(require('@h5/pages/addresslist/address')), 'eshop')
const evaluatepage = r => require.ensure([], () => r(require('@h5/pages/order_evaluate/evaluate')), 'eshop')
const listFormComponent = r => require.ensure([], () => r(require('../components/component/form/list_component_form')), 'form')
const balanceCharge = r => require.ensure([], () => r(require('@h5/pages/module_charge/charge')), 'eshop')
const balanceRcord = r => require.ensure([], () => r(require('@h5/pages/module_charge/record')), 'eshop')
const map = r => require.ensure([], () => r(require('@h5/pages/map/BMapComponent')), 'map')
const mine = r => require.ensure([], () => r(require('@h5/pages/mine/usermine')), 'mine')



let route = [
  //地址为空时跳转首页
  {
    path: '',
    redirect: '/index'
  },
  //app首页
  {
    path: '/index',
    component: firstPage,
    props: route => ({
      option: route.query
    })
  },
  //单页
  {
    path: '/page',
    component: page,
    props: route => ({
      option: route.query
    })
  },
  //购物车
  {
    path: '/shopcart',
    component: shopcart,
    meta: {
      requiresAuth: true
    }
  },
  //订单详情页
  {
    path:'/orderdetail/:orderno',
    name:'orderdetail',
    component:orderdetail,
    meta: {
      requiresAuth: true
    },
    props:true
  },
  //创建订单页
  {
    path:'/createorder',
    name:'createorder',
    component:createorder,
    meta: {
      requiresAuth: true
    },
    props: route => ({
      clicktype: route.query.clicktype
    })
  },
  //订单评价页面
  {
    path:'/orderevaluate',
    name:'orderevaluate',
    component:evaluatepage
  },
  //我的订单页面
  {
    path:'/orderlist',
    name:'orderlist',
    component:orderlist,
    meta: {
      requiresAuth: true
    }
  },
  //地址列表
  {
    path:'/addresslist',
    name:'address',
    component:addresslist,
    meta: {
      requiresAuth: true
    }
  },
  // 评论列表
  {
    path: '/comment',
    name: 'comment',
    component: comment,
    meta: {
      requiresAuth: true
    }
  },
  //表单组件测试
  {
    path: "/form",
    component: listFormComponent
  }, {
    path: '/report',
    name: 'report',
    component: report
  },
  //demo页
  {
    path: '/hello/:username',
    component: demo,
    props: true
  }, {
    path: '/about',
    name: 'about',
    component: about
  },
  // comment_style1
  {
    path: '/comment_style',
    name: 'comment_style',
    component: comment_style,
    props: route => ({
      option:route.query
    }),
    meta: {
      requiresAuth: true
    }
  },
  //login
  {
    path: "/login",
    name: 'login',
    component: login
  },
  //register
  {
    path: "/register",
    name: 'register',
    component: register
  },
  //register
  {
    path: "/findpass",
    name: 'findpass',
    component: findpass,
    props: route => ({
      findType: route.query.form
    })
  },
  //reset password
  {
    path: "/setpass",
    name: 'setpass',
    component: setpass,
    props: route => ({
      phone: Number(route.query.phone),
      optiontype: route.query.optiontype
    })
  },
  //搜索
  {
    path: "/search",
    name: 'search',
    component: search
  },
  //充值余额界面
  {
    path: "/balance_charge",
    name: 'balance_charge',
    component: balanceCharge,
    props: route => ({
      create_type: route.query.create_type,
      isfrom_youzan:route.query.isfrom_youzan
    })
  },
  //余额充值列表记录
  {
    path: "/balance_record",
    name: 'balance_record',
    component: balanceRcord
  },
  //余额充值列表记录
  {
    path: "/map",
    name: 'map',
    component: map,
    props: route => ({
      point: route.query
    })
  },
  //我的资料
  {
    path: "/mine",
    name: 'mine',
    component: mine,
    meta: {
      requiresAuth: true
    }
  },
  //test
  // {
  //   path:'/test',
  //   component:TEST
  //
  // }
];
export default route;
