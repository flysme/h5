<template>
	<div class="header_wrap sys-flex" :style="navbarStyle.bg">
		<div class="header_left">
			<div v-for="(item,key) in navbarTopConfig.left_menus">
				<!--
				- config:每个头顶的菜单配置
				- isFuncPage:是否是主页的功能页面
				-->
				<component :is="item.view" 
				:data="{ 
					config:navbarStyle.left_menus[key],
					isFuncPage:isFromHomeMenuFuncPage 
				}"></component>
			</div>
		</div>
		<div class="header_center" >
			<div v-for="(item,key) in navbarTopConfig.center_menus">
				<!--
				- config:每个中间的菜单配置
				- isFuncPage:是否是主页的功能页面
				-->
				<component :is="item.view" 
				:data="{ 
					config:navbarStyle.center_menus[key],
					isFuncPage:isFromHomeMenuFuncPage 
				}"></component>
			</div>
		</div>
		<div class="header_right">
			<div v-for="(item,key) in navbarTopConfig.right_menus">
				<!--
				- config:每个中间的菜单配置
				- isFuncPage:是否是主页的功能页面
				-->
				<component :is="item.view" 
				:data="{ 
					config:navbarStyle.right_menus[key],
					isFuncPage:isFromHomeMenuFuncPage 
				}"></component>
			</div>
		</div>
		<!--顶部的导航栏名称-->
		<div class="header_title" :style="navbarStyle.font" >
			<span v-if="isShowTile">{{currentTitle}}</span>
			<van-loading type="spinner" color="white" v-if="isShowLoading"/>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import { APP_HEADER,APPINFO } from "@h5/sdk/index"
import UriService from '@h5/services/uri';
import UtilsService from "@h5/services/utils"
//引入顶部相关组件
import system_back_btn from "@h5/components/common/navbar/system_back_btn"

export default {
	name:'header',
	data(){
		return {
			//展示loading
			isShowLoading:false,
			isShowTile:false,
			//固定页面的带有pageurl的名称映射
			staticPageMapping:{
				"dingdone://ebusiness/dd_my_order":"我的订单",
				"dingdone://ebusiness/shopping_cart":"我的购物车"
			},
			//所有顶栏的菜单配置方法映射 
			//key为控件的view名称  name:为顶部功能名称  method:为sdk中处理方法名称
			allNavbarBtnViewMapping:{
				user_avatar_widget:{
					name:'用户头像按钮',
					method:"dealUserAvatarWidget"
				},
				menu_btn:{
					name:'顶栏按钮',
					method:"dealMenuBtn"
				},
				weather_widget:{
					name:'天气控件',
					method:"dealWeatherWidget"
				},
				msg_hint_widget:{
					name:'未读消息按钮',
					method:"dealMsgHintWidget"
				},
				system_back_btn:{
					name:'系统返回按钮',
					method:"dealSystemBackBtn"
				},
				nav_btn_pop_filter_menu:{
					name:'顶栏弹出菜单按钮',
					method:"dealNavBtnPopFilterMenu"
				},
				nav_search:{
					name:'导航搜索',
					method:"dealNavSearch"
				},
			},
			currentTitle:null,//头部标题
			navbarStyle:null,//头部样式
			navbarDefaultHeight:APP_HEADER.getNavbarDefaultHeight(),//头部默认高度
			navbarTopConfig:{},//头部全局配置
			isFromHomeMenuFuncPage:false,//判断是否从菜单选择进入的功能页面 如果是的话去除返回按钮的显示
		}
	},
	props:{
		pageUri:{
			type:String,
			default:null
		},
		pageTitle:{
			type:String,
			default:null
		}
	},
	computed:{
		...mapState('pageStore',['currentDetailContentID','contentDetail']),
		currentPageInfo(){ //拿到当前详情页数据
			return this.contentDetail[this.currentDetailContentID];
		}
	},
	watch:{
		currentPageInfo:{
			handler(newval){
				let tempCurrentTitle=this.currentTitle;
				if(newval&&tempCurrentTitle.indexOf("{{")!=-1){
					this.currentTitle=UtilsService.getDynamicParameterValue({
						paramStr:tempCurrentTitle,
						detailData:newval
					});
					//充值状态 显示title
					this.isShowLoading=false;
					this.isShowTile=true;
				}
			},
			deep:true
		}
	},
	components:{
		system_back_btn
	},
	created(){
		// console.log("lll 当前传入进来的url",this.pageUri,this.pageTitle);
		//初始化顶栏数据
		this.initNavbarData(this.pageUri,this.pageTitle);
	},
	methods:{
		initNavbarData(pageurl,pagetitle){
			let navbarConfig=APP_HEADER.getNavbarConfig(); //默认获取全局配置
			//判断是否包含固定标题和初始化配置
			if(pagetitle){
				this.currentTitle=pagetitle;
			}else{
				let parseResult = UriService.parse( pageurl ),
					pageId=parseResult.params && parseResult.params.module_id || '',
					staticMappingIdx=Object.keys(this.staticPageMapping).indexOf(parseResult.key);//先查看下是否url是固定的
				//存在或者不存的处理情况
				if(staticMappingIdx!=-1){
					this.currentTitle=this.staticPageMapping[parseResult.key];
					this.isFromHomeMenuFuncPage=true;//主页的功能页被选中 不显示箭头
					//更改下标题状态
					this.isShowTile=true;
				}else if(pageId){
					navbarConfig=APP_HEADER.getNavbarConfig(pageId);
					//判断标题是否走动态参数 如果是动态参数需要显示loading图标
					let currentOriginTitle=navbarConfig.page_config.navbar_setting.title_text;
					if(currentOriginTitle.indexOf("{{")!=-1){
						this.currentTitle=currentOriginTitle;
						//更改下标题和loading的状态
						this.isShowLoading=true;
						this.isShowTile=false;
					}else{
						this.currentTitle=currentOriginTitle;
						//更改下标题和loading的状态
						this.isShowLoading=false;
						this.isShowTile=true;
					}
					this.isFromHomeMenuFuncPage=false;//普通页被选中 重置状态更具配置决定是否显示
				}
			}
			// console.log("llll 当前的navconfig",navbarConfig)
			//初始化顶栏样式
			this.getNavbarStyle(navbarConfig);
		},
		getNavbarStyle(navconfig){
			//判断是否走全局还是页面样式
			if(navconfig.hasOwnProperty('page_config')){
				this.navbarStyle=this.dealPageStyle(navconfig,'page_config');
			}else{
				this.navbarStyle=this.dealPageStyle(navconfig,'global_config');
			}			
		},
		dealPageStyle(navconfig,currentconfig){
			let _this=this,
				pageStyle=navconfig[currentconfig].page_setting,
				navbarStyle=navconfig[currentconfig].navbar_setting,
				navbarTopConfig=navconfig[currentconfig].top_btn_collection,
				globalStyle=navconfig.global_config,//拿到全局的配置
				styleObj={};
			//主题背景
			styleObj['bg']=APP_HEADER.dealNavbarBg(_this.navbarDefaultHeight,pageStyle.theme_color);
			//字体
			styleObj['font']=APP_HEADER.dealNavbarFont(navbarStyle.title_textColor,navbarStyle.title_textSize);
			//处理头部样式(传入配置和是否启用了全局返回按钮)
			let dealObj=_this.dealNavbarTopAllBtnStyle(globalStyle,navbarTopConfig,pageStyle.use_global_back_btn),
				resultObj=Object.assign({},styleObj,dealObj);
			// console.log("llll 返回的样式集合",resultObj);
			return resultObj;
		},
		//处理所有顶栏的配置
		dealNavbarTopAllBtnStyle(globalStyle,navbarTopConfig,isUseGlobalBack){
			let _this=this,resultObj={};
			//循环左侧中间和右侧的所有配置信息
			for(let key in navbarTopConfig){
				let singleMenusConfig=navbarTopConfig[key];//取单个菜单信息
				_this.$set(_this.navbarTopConfig,key,{});
				resultObj[key]={};
				//循环单个里面的具体菜单信息
				for(let viewid in singleMenusConfig){
					let viewconfig=singleMenusConfig[viewid];
					//存放下当前按钮配置的数据信息和名称显示
					_this.$set(_this.navbarTopConfig[key],viewid,{
						viewid,
						view:viewconfig.view,
						data:viewconfig.__meta__
					});
					//处理每个菜单的样式信息
					let dealMethodName=_this.allNavbarBtnViewMapping[viewconfig.view].method;
					if(APP_HEADER[dealMethodName]) resultObj[key][viewid]=APP_HEADER[dealMethodName](viewconfig);
				}
			}
			//对全局按钮做特殊处理
			if(isUseGlobalBack){
				let globalSystemBackConfig=globalStyle.global_back_style,
					viewid=globalStyle.viewid;
				_this.$set(_this.navbarTopConfig["left_menus"],viewid,{
					viewid,
					view:globalSystemBackConfig.view,
					data:globalSystemBackConfig.__meta__
				});
				//赋值样式里面的参数
				resultObj["left_menus"][viewid]=APP_HEADER["dealSystemBackBtn"](globalSystemBackConfig);
			}
			// console.log("llll 当前的全局头部配置信息",_this.navbarTopConfig);
			return resultObj;
		}
	}
}
</script>

<style lang="scss" scoped>
.header_wrap{
	position:fixed;
	top:0;
	width:100%;
	z-index:99;
	background:pink;
	align-items: center;
	.header_left,.header_center,.header_right,.header_title{
		display: flex;
		justify-content: center;
		align-items: center
	}
	.header_left,.header_center,.header_right{
		z-index:99
	}
	.header_title{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		.van-loading--spinner{
			width:20px;
			height:20px;
		}
	}
	.header_left{}
	.header_center{}
	.header_right{}
}
</style>