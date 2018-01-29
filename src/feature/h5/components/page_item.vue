<template>
	<div class="match_parent">
		<!-- 正常文档流组件 -->
		<div class="flow-component-box">
			<div class="sys-flex sys-flex-one">
				<!-- 在左侧展示的组件 -->
				<div class="layout-left">
					<div class="list-container" v-for="(compViewId, compIndex) in componentsViewIds" :class="VIEWS[compViewId].view"  :id="compViewId" :view_key="VIEWS[compViewId].view">
							<component
								v-if="componentShow( VIEWS[compViewId].view, 'left' ) && componentsData && componentsData[compViewId]"
								:is="VIEWS[compViewId].view"
								:data="{
									VIEWS:VIEWS,
									componentView: VIEWS[compViewId],
									componentData: componentsData[compViewId],
									componentViewId:compViewId,
									currentDetail:currentDetail
								}"></component>
					</div>
				</div>
				<!-- 在左侧展示的组件 end -->
				<!-- 在右侧展示的组件 -->
				<div class="layout-right sys-flex-one">
					<div class="list-container" v-for="(compViewId, compIndex) in componentsViewIds" :class="VIEWS[compViewId].view" :style="getStyle(VIEWS[compViewId])[VIEWS[compViewId].view]" :id="compViewId" :view_key="VIEWS[compViewId].view">

							<component
								v-if="componentShow( VIEWS[compViewId].view, 'right' ) && componentsData && componentsData[compViewId]"
								:is="VIEWS[compViewId].view"
								:data="{
									VIEWS:VIEWS,
									componentView: VIEWS[compViewId],
									componentData: componentsData[compViewId],
									componentViewId:compViewId,
									currentDetail:currentDetail
								}"></component>
					</div>
				</div>
				<!-- 在右侧展示的组件 end-->
			</div>
		</div>
		<!-- 正常文档流组件 end -->
		<!-- 浮动组件，用于撑开高度 -->
		<div class="float-component-placeholder">
			<div class="list-container" v-for="(compViewId, compIndex) in floatComponentsViewIds" :class="VIEWS[compViewId].view" :id="compViewId" :view_key="VIEWS[compViewId].view">
					<component
						v-if="componentShow( VIEWS[compViewId].view ) && componentsData && componentsData[compViewId]"
						:is="VIEWS[compViewId].view"
						:data="{
							VIEWS:VIEWS,
							componentView: VIEWS[compViewId],
							componentData: componentsData[compViewId],
							componentViewId:compViewId,
							currentDetail:currentDetail
						}"></component>
			</div>
		</div>
		<!-- 浮动组件 -->
		<div class="float-component-box">
			<div class="list-container" v-for="(compViewId, compIndex) in floatComponentsViewIds" :class="VIEWS[compViewId].view" :id="compViewId" :view_key="VIEWS[compViewId].view">
					<component
						v-if="componentShow( VIEWS[compViewId].view ) && componentsData && componentsData[compViewId]"
						:is="VIEWS[compViewId].view"
						:data="{
							VIEWS:VIEWS,
							componentView: VIEWS[compViewId],
							componentData: componentsData[compViewId],
							componentViewId:compViewId,
							currentDetail:currentDetail
						}"></component>
			</div>
		</div>
		<!--SKU面板-->
		<ehop-sku-panel></ehop-sku-panel>
	</div>
</template>
<style scoped>
.float-component-placeholder{opacity: 0;}
.float-component-box{position: absolute;bottom:0;width: 100%;}
.loding{
	position: fixed;
	z-index: 9999;
	top: 50%;
	left: 50%;
}
</style>
<script>
import { vm } from "@/main"
import Style from '@h5/gen_css/common';
import { mapState, mapActions, mapGetters } from 'vuex';
import viewReaderSdk from '@h5/sdk/view_reader';
import APPCONFIG from '@h5/static/app_config.js';
import componentsSdk from '@h5/sdk/components'

//引入SKU面板
import ehopSkuPanel from '@h5/components/component/eshop_sku_panel'

/** 组件入口 **/
//列表组件
import ListUI1 from '@h5/components/component/listui1';
import ListUI2 from '@h5/components/component/listui2';
import ListUI4 from '@h5/components/component/listui4';
import ListUI14 from '@h5/components/component/listui14';
import ListUI16 from '@h5/components/component/listui16';
import Slider from '@h5/components/component/Slider';
import SideSlip from '@h5/components/component/SideSlip';
//栏目栏
import filter_node from '@h5/components/component/filter_node';
import left_filter_node from '@h5/components/component/left_filter_node';
//导航器
import navigator1 from '@h5/components/component/navigator1';
import navigator2 from '@h5/components/component/navigator2';
//详情组件
import layout_component from '@h5/components/component/layout_component';
import float_component from '@h5/components/component/float_component';
import shoppingcart_toolbar from "@h5/components/component/shoppingcart_toolbar";
//搜索组件
import list_search from "@h5/components/component/list_search";
//营销组件
import promotion_card from "@h5/components/component/promotion_card";

//已经适配的组件在这里标注一下(临时)

let exist = ['layout_component','float_component','ListUI1','ListUI4','filter_node','shoppingcart_toolbar','left_filter_node','Slider','navigator1','ListUI14','list_search','navigator2','SideSlip','ListUI2','promotion_card','ListUI16'];
/** 组件入口 end **/

export default {
	props: {
		data: Object,
	},
	data () {
    return {
			pageData: this.data,
    }
  },
	created(){
		//初始化设置下当前详情页的内容ID
		this.$store.commit('pageStore/SET_CONTENT_DETAIL_ID',this.$route.query.content_id);
		//初始化页面
		this.initPage();
	},
	mounted(){
		//判断是否是详情页
		let isDetail = APPCONFIG.pages.pages[ this.pageId ].module_type == 'detail',
				content_id = this.currentDetailId,
				_this = this;
		let hasFilter = componentsSdk.hasFilter( this.pageId ).count;
		if( hasFilter ){	//该页面包含filter组件
			componentsSdk.getFilterCompData( this.pageData.uri ).then(json=>{
				let result = componentsSdk.replaceDataWithViewId( _this.pageId, json.data.result );
				_this.$store.dispatch('pageStore/setPageData',{
					param: {
						uri : _this.pageData.uri,
						data : result
					}
				});
				_this.$store.dispatch('pageStore/setFilterData',{
					param:{
						data:json.data.result
					}
				});
			}).then(()=>{
				this.$store.dispatch('pageStore/toGetPageData',{
					param: {
						uri : this.pageData.uri,
						contentId : isDetail && content_id ? content_id : null
					}
				});
			});
		}else{
			this.$store.dispatch('pageStore/toGetPageData',{
				param: {
					uri : this.pageData.uri,
					contentId : isDetail && content_id ? content_id : null
				}
			});
		};
		vm.$on('filterNodeChange', function(compViewId, index){
			let id = _this.mapping.components[ compViewId ] && _this.mapping.components[ compViewId ].id;
			if( !id ) return;
			_this.$store.dispatch('pageStore/setFilterIndex',{
				param: {
					id : id,
					index : index
				}
			});
			_this.$store.dispatch('pageStore/toGetPageData',{
				param: {
					uri : _this.pageData.uri,
					contentId : isDetail && content_id ? content_id : null
				}
			});

		});
	},
	components: {
		ListUI4,
		ListUI2,
		ListUI1,
		filter_node,
		shoppingcart_toolbar,
		left_filter_node,
		navigator2,
		Slider,
		navigator1,
		layout_component,
		ListUI14,
		ehopSkuPanel,
		list_search,
		SideSlip,
		ListUI2,
		float_component,
		ListUI16,
		promotion_card

  	},
	computed: {
		...mapState('pageStore',['contentDetail','componentsDatas']),
		loding(){
			return this.$store.state.pageStore.loding
		},
		pageId(){
			return viewReaderSdk.getPageIdWithUri( this.pageData.uri );
		},
		pageViewId(){
			return viewReaderSdk.getPageViewId( this.pageId );
		},
		currentDetailId(){
			return this.$route.query.content_id;
		},
		currentDetail(){
			return this.contentDetail[this.currentDetailId] || {}
		},
		componentsData:{
			get(){
				return this.componentsDatas[this.pageData.uri]
			}
		},
		componentsViewIds(){
			// console.log('xxxx-componentsViewIds',viewReaderSdk.getComponentsViewIds( this.pageId ))
			return viewReaderSdk.getComponentsViewIds( this.pageId )
		},
		floatComponentsViewIds(){
			return viewReaderSdk.getComponentsViewIds( this.pageId, 'float' )
		},
		VIEWS(){
			return viewReaderSdk.getPageViews( this.pageViewId )
		},
		mapping(){
			return viewReaderSdk.getDataMapping(this.pageId)
		}
	},
	methods: {
		initPage(){

		},
		//判断组件是否显示
		componentShow( viewkey, layout ){
			let isExist = exist.indexOf(viewkey) > -1;	//判断组件是否已经适配
			if( !isExist ) return false;
			let leftLayout = ['left_filter_node'];
			if( layout ){
				if( layout == 'left' ){
					return leftLayout.indexOf(viewkey) > -1
				}else{
					return leftLayout.indexOf(viewkey) == -1
				}
			}else{
				return isExist;
			}
		},
		getStyle(attr){
            let styleResult={}
            styleResult.ListUI4=Style.toString({
            	"background":Style.advanceBg(attr.itemNorBg)
        	})
        	return styleResult;
        }
	}
}
</script>
<style lang="scss" scoped>
	.match_parent{height: 100%;flex-direction: column;display: flex}
	.flow-component-box{
		flex: 1;
    display: flex;
    height: 100%;
    overflow: scroll;
	}
</style>
