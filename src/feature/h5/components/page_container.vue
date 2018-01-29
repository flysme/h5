<template>
	<div class="match_parent">
		<header-top :page-uri="pageUri"></header-top>
		<div v-if="isPage" class="match_parent">
			<!--测试登陆
			<div class="avater_wrap" @click="toLogin">
				<img :src="useravater" alt="">
				<span >{{useraccount}}<i  class='loginout' v-show="isExit" @click.stop="loginOut">注销</i></span>
			</div>-->
			<!-- 组合页判断 -->
			<div class="submodules_container" v-if="componentType == 'navigator' ">
				<!--TabBar导航风格 -->
				<div class="submodules_tabbar" v-if="componentUI == 'submodules_tabbar'">
				  <div class="submodule-page-box">
				    <div v-for="(childPageItem, childPageIndex) in childPages" class="match_parent">
							<pagecontainer v-if="isSelect(childPageItem.url)" :data="{pageUri:childPageItem.url}" ></pagecontainer>
				    </div>
				  </div>
				  <!-- 用于撑开页面 -->
				  <div class="submodule-tab-placeholder">
				    <div :style="getStyle(dealSubmodulesTab())['divider']"></div>
				    <div class="submodule-list" :style ="getStyle(dealSubmodulesTab())['submodules_tabbar']">
				    <div class="submodule-item" :style="isSelect(childPageItem.url) ? getStyle(dealSubmodulesTab())['selectText']:getStyle(dealSubmodulesTab())['text']" v-for="(childPageItem, childPageIndex) in childPages">
				          <div  v-if='submodulesTabbarStyle==0'>
				            {{childPageItem.name}}
				          </div>
				          <div   v-else-if='submodulesTabbarStyle==1'>
				            <img :src="isSrc(childPageItem)" :style="getStyle(dealSubmodulesTab())['icon']">
				          </div>
				          <div v-else>
				              <img :src="isSrc(childPageItem)" :style="getStyle(dealSubmodulesTab())['icon']">
				              <div>{{childPageItem.name}}</div>
				          </div>
				    </div>
				  </div>
				  </div>
				  <!-- 用于撑开页面 end -->
				  <!-- 真实的导航 -->
				  <div class="submodule-tab-box">
				      <div :style="getStyle(dealSubmodulesTab())['divider']"></div>
				      <div class="submodule-list" :style ="getStyle(dealSubmodulesTab())['submodules_tabbar']">
				      <div class="submodule-item" @click="submodulesTab(childPageItem.url)" :style="isSelect(childPageItem.url) ? getStyle(dealSubmodulesTab())['selectText']:getStyle(dealSubmodulesTab())['text'] " v-for="(childPageItem, childPageIndex) in childPages">
										<div  v-if='submodulesTabbarStyle==0'>
				              {{childPageItem.name}}
				            </div>
				            <div  v-else-if='submodulesTabbarStyle==1'>
				              <img :src="isSrc(childPageItem)"  :style="getStyle(dealSubmodulesTab())['icon']">
				            </div>
				            <div v-else>
				                <img :src="isSrc(childPageItem)" :style="getStyle(dealSubmodulesTab())['icon']">
				                <div>{{childPageItem.name}}</div>
				            </div>
				      </div>
				    </div>
				  </div>
				  <!-- 真实的导航 end -->
				</div>
				<!--TabBar导航风格 end -->
				<!-- 栏目栏导航风格 -->
				<div class="submodules2" v-if="componentUI == 'submodules2'">
					<div class="submodule-tab-box" :style="getStyle(dealSubmodulesTab())['submodulestab']">
						 <div :style="getStyle(dealSubmodulesTab())['submodules2']" :class="[!dealSubmodulesTab()['column_isSplit']?'inlineflex':'sys-flex']">
								 <div class="submodule-item relative sys-flex" v-on:click="submodulesTab(childPageItem.url, $event)"  v-for="(childPageItem, childPageIndex) in childPages">
									 		<!-- {{submodulesTabbarStyle}}{{dealSubmodulesTab()['column_titleType']}} -->
											 <!-- submodulesTabbarStyle ===0  title image start-->
											 <div  v-if='submodulesTabbarStyle==0' :style="submodules2Active(childPageItem)">
														 <img :style="getStyle(dealSubmodulesTab())['image']" v-if="dealSubmodulesTab()['column_titleType'] =='image'" :src="isSrc(childPageItem)">
														 <span v-else>{{childPageItem.name}}</span>
											 </div>
											 <!-- submodulesTabbarStyle ===0  title image end-->
											 <!-- submodulesTabbarStyle ===1 title image start-->
											 <img  v-if="submodulesTabbarStyle==1 && dealSubmodulesTab()['column_titleType'] =='image'" :style="getStyle(dealSubmodulesTab())['image']" :src="isSrc(childPageItem)">
											 <span v-if="submodule2ColumnStyle"  :style="submodules2Active(childPageItem)">{{childPageItem.name}}</span>
											 <div  v-if='submodulesTabbarStyle==1'  class="submoduleItems"  :style="isSelect(childPageItem.url) ?getStyle(dealSubmodulesTab())['divider']:''"></div>
											 <!-- submodulesTabbarStyle ===1 title image end-->
											 <!-- submodulesTabbarStyle ===2 title image  start-->
											 <div  v-if='submodulesTabbarStyle==2' style="width:100%;">
													 <div  :style="submodules2Actives(childPageItem)">
														 <span v-if="dealSubmodulesTab()['column_titleType'] =='title'">{{childPageItem.name}}</span>
														 <img v-else :style="getStyle(dealSubmodulesTab())['image']" :src="isSrc(childPageItem)">
													 </div>
											 </div>
											 <!-- submodulesTabbarStyle ===2 title image  end-->
								</div>
						 </div>
					 </div>
				  <div class="submodule-page-box">
						<div v-for="(childPageItem, childPageIndex) in childPages" class="match_parent">
							<pagecontainer v-if="isSelect(childPageItem.url)" :data="{pageUri:childPageItem.url}" ></pagecontainer>
				    </div>
				  </div>
				</div>
				<!-- 栏目栏导航风格 end -->
				<!-- 分类菜单航风格 -->
				<div class="submodules3 sys-flex" v-if="componentUI == 'submodules3'">

				 </div>
				<!-- 分类菜单航风格 end-->
			</div>
			<!-- 组合页判断 end-->
			<!-- 单页 -->
			<div v-else class="match_parent" :style="contenAddNavStyle">
				<page-item :data="{uri: pageUri}"></page-item>
			</div>
			<!-- 单页 end -->
		</div>
		<div v-else>
			<func-module :data="{pageUri:pageUri}"></func-module>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import headerTop from "@h5/components/common/header"
import viewReaderSdk from '@h5/sdk/view_reader';
import pagecontainer from '@h5/components/page_container.vue';
import pageItem from '@h5/components/page_item';
import funcModule from '@h5/components/func_module';
import APPCONFIG from '@h5/static/app_config.js';
import sessionStorage from "@h5/services/sessionStorage";
import styleResult from '@h5/gen_css/page_container';
import { APP_HEADER } from "@h5/sdk/index"
import "@h5/style/app.css"


export default {
	name:'pagecontainer',
	props: {
		data: Object
  },
	data () {
    return {
			// isExit:false,
			// userinfo:localStorage.getObject("userinfo"),
    }
  },
	components: {
		pagecontainer,
		pageItem,
		funcModule,
		headerTop
  },

	created(){
		this.initFirstConfigAction();//需要初始化的配置集合
	},
	mounted(){
		this.initPage();
	},
	watch: {
		'$route' (to, from) {
			this.$router.go(0);
		}
	},
	computed: {
		...mapState({
				currentSubmoduleUrl: state => state.pageStore.currentSubmoduleUrl,
		}),
		isPage(){
			return this.pageId;
		},
		pageId(){
			return viewReaderSdk.getPageIdWithUri( this.pageUri )
		},
		pageUri(){
			return this.data.pageUri;
		},
		useraccount(){
			let userinfo=this.userinfo,result='请登录账号~';
			if(userinfo instanceof Object){
				this.isExit=true;
				result=userinfo.username||userinfo.mobile.replace(userinfo.mobile.substr(3,4),'xxxx');
			}

			return result
		},
		useravater(){
			return this.userinfo&&this.userinfo.avatar || 'https://static-public.ddapp.com/weixin/images/people@3x.png'
		},
		submodulesTabbarStyle(){
			return this.dealSubmodulesTab()['tab_type'];
		},
		componentType(){
			return this.pageId && APPCONFIG.components[ this.pageId ].component_type;
		},
		componentUI(){
			return this.pageId && APPCONFIG.components[ this.pageId ].component_ui || '';
		},
		childPages(){
			return this.pageId && APPCONFIG.components[ this.pageId ].data
		},
		submodulesTabbarStyle(){
		 console.log('xxxxxx',this.dealSubmodulesTab())
		 return this.dealSubmodulesTab()['tab_type'] || this.dealSubmodulesTab()['column_cursorType'];
		 },
		 submodule2ColumnStyle(){
			 return  this.submodulesTabbarStyle==1&&this.dealSubmodulesTab()['column_titleType'] =='title'||this.dealSubmodulesTab()['column_titleType'] =='None';
		 },
		 contenAddNavStyle(){
		 	let defaultHeight=APP_HEADER.getNavbarDefaultHeight();
		 	return {
		 		"max-height":`calc(100% - ${defaultHeight}px)`,
		 		"padding-top":`${defaultHeight}px`
		 	}
		 }

	},
	methods: {
		initFirstConfigAction(){
			//获取购物车信息为控件赋值
			this.$store.dispatch("cartStore/toGetCartList",{});
			this.$store.dispatch("pageStore/setInitCollection");
		},
		getPageType( childPageItem ){
			let pageId = viewReaderSdk.getPageIdWithUri( childPageItem.url );
			return pageId ? APPCONFIG.components[ pageId ].component_type : '';
		},
		getPageId( childPageItem ){
			let pageId = viewReaderSdk.getPageIdWithUri( childPageItem.url );
			return pageId || '';
		},
		initPage () {
			if (this.componentType == 'navigator') { //组合页
				if (this.componentUI === 'submodules_detail_column_container') { //1+n详情组合页
					this.submodulesTab( this.childPages[1].url );
				}else{
					this.submodulesTab( this.childPages[0].url );
				}
			}
		},
		submodulesTab(uri){
			this.$store.dispatch('pageStore/submodulesTab',{
				param : {
					uri: uri,
					parentPageId: this.pageId
				}
			})
		},
		isSelect(uri){
			let current = this.currentSubmoduleUrl[ this.pageId ];
			return current == uri
		},
		// 底栏导航样式
		dealSubmodulesTab(){
				let pageViewId = viewReaderSdk.getPageViewId( this.pageId ),
				    SubmodulesTabViewsId = viewReaderSdk.getPageViews( pageViewId )[pageViewId]['controller'],
						SubmodulesTabViews = viewReaderSdk.getPageViews( pageViewId )[SubmodulesTabViewsId];
				return SubmodulesTabViews;
		},
			isSrc(Item){
			let icon = this.isSelect(Item.url) ? Item.selected_icon :Item.icon;
			return icon;
			},
			submodules2Active(childPageItem){
					let active = !this.isSelect(childPageItem.url) ? this.getStyle(this.dealSubmodulesTab())['item']:this.getStyle(this.dealSubmodulesTab())['itemActive'];
					return active;
			},
			submodules2Actives(childPageItem){
					let active = !this.isSelect(childPageItem.url) ? this.getStyle(this.dealSubmodulesTab())['item']:this.getStyle(this.dealSubmodulesTab())['item2Active'];
					return active;
			},
			// 导航样式
			dealSubmodulesTab(){
					let pageViewId = viewReaderSdk.getPageViewId( this.pageId ),
							SubmodulesTabViewsId = viewReaderSdk.getPageViews( pageViewId )[pageViewId]['controller'],
							SubmodulesTabViews = viewReaderSdk.getPageViews( pageViewId )[SubmodulesTabViewsId];
					return SubmodulesTabViews;
			},
		getStyle(attr){
			return styleResult(attr);
	   },
	},
}
</script>

<style lang="scss" scoped>
/* 组合页容器 */
.submodules_container{position: absolute;width: 100%;height: 100%;}
.submodules_tabbar, .submodules2{display: flex;flex-direction: column;height:100%;position: relative;}
.submodule-page-box{position: relative;min-height: 0;overflow: auto;}

/* tabbar组合页 */
.submodules_tabbar .submodule-page-box{flex:1;display: flex;flex-direction:column;}
.submodules_tabbar .submodule-tab-placeholder{opacity: 0;}
.submodules_tabbar .submodule-tab-box{position: absolute;bottom: 0;left: 0;width: 100%;z-index:21;}
.submodules_tabbar .submodule-list{display: flex;height: 60px;}
.submodules_tabbar .submodule-item{flex:1;text-align:center;display: flex;justify-content: center;-webkit-box-align: center;align-items: center;}
.submodules_tabbar .submodule-item.selected{color:rgb(20, 167, 255);}
.match_parent{height: 100%;}
/* 栏目栏组合页 */
.submodules2 .submodule-tab-box{position: relative;}
.submodules2 .submodule-tab-box .inlineflex{display:inline-flex!important;width:auto!important;}
.submodules2 .submodule-item .submoduleItems{width:100%;height:100%;position:absolute;bottom:0;}



//测试头像样式
.avater_wrap{
	background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513154872359&di=b2debbf5f61dff483a54cbf6e122231a&imgtype=0&src=http%3A%2F%2Fpic.97uimg.com%2Fback_pic%2F00%2F00%2F40%2F82%2F68f4aabc1289fbe63df1309f4109bddf.jpg') no-repeat center;
	background-size:cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100px;
	img{
		width:50px;
		height:50px;
		border-radius:50%;
		object-fit:cover;
		margin-bottom:5px
	}
	span{
		font-size: 13px;
		font-weight: 400;
		color:white;
		.loginout{
			margin-left:5px;
			color:#da6000;
			text-decoration:underline;
		}
	}
}


</style>
