<template>
	<div class="promotion_card" :style="getStyle(componentView)['parent_margin']" v-if="counpObj.coupon_arr">
		<!--显示满减的主体提示-->
		<div class="sys-flex promoitem border" v-if="counpObj.reach_discount_arr.length" @click.stop="showAction('reach')">
			<div class="sys-flex">
				<div  :style="getStyle(componentView)['reach_btn']">满减</div>
				<div  :style="getStyle(componentView)['reach_text']" >
					<span v-for="(reach_item,index) in counpObj.reach_discount_arr">
						{{index%2==0?reach_item.info+';':reach_item.info}}
					</span>
				</div>
			</div>
			<!--右侧箭头-->
			<div class="main_index" >
			    <div class="content"></div>
			</div>
		</div>
		<!--显示优惠的主体提示-->
		<div class="sys-flex promoitem border" v-if="counpObj.coupon_arr.length" @click.stop="showAction('counp')">
			<div class="sys-flex">
				<div  :style="getStyle(componentView)['coupon_btn']">券</div>
				<div  :style="getStyle(componentView)['reach_text']">领取优惠券</div>	
			</div>
			<!--右侧箭头-->
			<div class="main_index" >
			    <div class="content"></div>
			</div>
		</div>
		<!--弹层展示-->
		<van-actionsheet v-model="isShowAction">
		 	<!--满减布局-->
			<div class="action_reach_wrap" v-if="isShowReachAction">
				<div class="title border">满减</div>
				<div class="content_wrap">
					<div class="content_item border" v-for="(reach_item,index) in counpObj.reach_discount_arr">
						<div class="tipinfo">
							<div class="info mb10">{{reach_item.info}}</div>
							<div class="time">使用期限:{{reach_item.from_time}} - {{reach_item.to_time}}</div>
						</div>
						<!--选择商品的符号 暂时不需要-->
						<!-- <div class="select-icon">
							<van-icon name="success" />
						</div> -->
					</div>
				</div>
				<div class="button" @click.stop="isShowAction=false">完成</div>
			</div>
			<!--优惠券布局-->
			<div class="action_counp_wrap" v-if="isShowCounpAction">
				<div class="title border">优惠券</div>
				<div class="content_wrap">
					<div class="content_item border" v-for="(counp_item,index) in counpObj.coupon_arr">
						<div class="tipinfo">
							<div class="worth">{{counp_item.worth}}元</div>
							<div class="info mb10">{{counp_item.info}}</div>
							<div class="time">使用期限:{{counp_item.from_time}} - {{counp_item.to_time}}</div>
						</div>
						<div class="select-btn">
							<div class="coupon_status" v-if="counp_item['coupon_status']==='available'"  @click.stop="getCoupon(counp_item)">领取</div>
							<div class="coupon_status_un" v-if="['to_limit','use_up'].indexOf(counp_item['coupon_status'])!=-1">已领取</div>
						</div>
					</div>
				</div>
				<div class="button" @click.stop="isShowAction=false">完成</div>
			</div>
		</van-actionsheet>
	</div>
</template>

<script>
import API from "@h5/api/index"
import Style from '@h5/gen_css/common'
import UTILS from "@h5/services/utils"
import "@h5/style/app.css"

export default {
	name:'promotion_card',
	data(){
		return {
			counpObj:{},
			isShowAction:false,
			isShowCounpAction:false,
			isShowReachAction:false,
			currentSelectReachIdx:null
		}
	},
	props:{
	  data:Object
	},
	created(){
		//初始化营销数据
		this.initPromotionData();
	},
	computed:{
	  //整个页面所有的视图
	  VIEWS(){
	    return this.data.VIEWS;
	  },
	  //本组件数据（数组，多条）
	  componentData(){
	    return this.data.componentData
	  },
	  //本组件视图
	  componentView(){
	    return this.data.componentView
	  },
	  //本组件视图id
	  componentViewId(){
	    return this.data.componentViewId
	  },
	  //当前详情数据
	  currentDetail(){
	    return this.data.currentDetail
	  }
	},
	watch:{
		isShowAction(newval){
			//当关闭的时候清除所有弹层和选中的索引的状态
			if(!newval){
				this.isShowReachAction=false;
				this.isShowCounpAction=false;
				this.currentSelectReachIdx=null;
			}
		}
	},
	methods:{
		initPromotionData(){
			let _this=this,
				product_id=this.componentData.id;
			API.getPromotionList({product_id}).then((res)=>{
				let data=res.data;
				if(Number(data.error_code)==0){
					let tempCounpObj ={},
						result=data.result;
					console.log("lll 当前获取优惠券的信息",result);
					//满减和优惠券数组 暂时不处理限时活动
					tempCounpObj['reach_discount_arr']=[];
					tempCounpObj['coupon_arr']=[];
					//筛选数据
					result.forEach(function (obj, index) {
					  //转换下时间格式
					  obj.from_time=UTILS.formatTime(obj.from_time, 'yyyy-MM-dd');
					  obj.to_time=UTILS.formatTime(obj.to_time, 'yyyy-MM-dd');
					  if(obj.type=='reach_discount'){
					  	tempCounpObj['reach_discount_arr'].push(obj);
					  }else if(obj.type=='coupon'){
					  	tempCounpObj['coupon_arr'].push(obj);
					  }
					});
					//赋值
					_this.counpObj=tempCounpObj;
					console.log("lll 处理后的优惠券信息",_this.counpObj);
					
				}else{
					_this.$toast('获取优惠券信息失败!')
				}
			}).catch((err)=>{
				_this.$toast('获取优惠券信息失败!')
			});
		},
		getStyle(attr,listItem){
		  let styleResult={}
		  //父级的外边框
		  styleResult.parent_margin=Style.toString({
		     "margin": Style.margin(attr.margin)
		  });
		  //满减的按钮样式
		  styleResult.reach_btn=Style.toString({
		    "background":Style.formatColorToRgba(attr.reach_discount_fill_color),
	    	"padding":'2px 4px',
	        "color":'#fff',
	        "font-size":attr.title_text_size+'px',
	        "text-align":"center",
	        "line-height":(4+attr.title_text_size)+'px',
	        "border-radius":attr.tab_corner_radius+'px',
	        "border-width":Style.borderWidth(attr.tab_border_width),
	        "border-color":Style.borderColor(attr.tab_border_color),
	        "border-style":"solid",
	        "margin-right":"10px"
		  });
	  	  //优惠的按钮样式
	  	  styleResult.coupon_btn=Style.toString({
	  	    "background":Style.formatColorToRgba(attr.coupon_fill_color),
	      	"padding":'2px 4px',
	        "color":'#fff',
	        "font-size":attr.title_text_size+'px',
	        "text-align":"center",
	        "line-height":(4+attr.title_text_size)+'px',
	        "border-radius":attr.tab_corner_radius+'px',
	        "border-width":Style.borderWidth(attr.tab_border_width),
	        "border-color":Style.borderColor(attr.tab_border_color),
	        "border-style":"solid",
	        "margin-right":"10px"
	  	  });
	  	  //满减文字样式
	  	  styleResult.reach_text=Style.toString({
	  	     "font-size":attr.title_text_size+'px',
	  	     "padding":'2px 0px',
	  	     "line-height":(4+attr.title_text_size)+'px',
	  	     "color":Style.formatColorToRgba(attr.title_text_color)
	  	  });
		  return styleResult;
		},
		showAction(type){
			//处理优惠券和满减的弹出层
			this.isShowAction=true;
			if(type=='counp')this.isShowCounpAction=true;	
			else this.isShowReachAction=true;
		},
		//领取优惠券
		getCoupon(counpitem){
			//loading	
			this.$toast.loading({duration: 0,forbidClick: true});
			API.getCoupon({promotion_id:counpitem.id}).then((res)=>{
				let data=res.data;
				if(Number(data.error_code)==0){
					this.$toast.success('领取成功!');
					//临时改变下状态
					this.$set(counpitem,'coupon_status','use_up');
				}else{
					this.$toast.fail(data.error_message);	
				}
			}).catch((err)=>{
				this.$toast.fail('领取失败!')	
			})
		}
	}
}
</script>

<style lang="scss">
/*促销详情组件-------------*/
.promotion_card {
	.promoitem{
	     padding: 10px;
	     display:flex;
	     justify-content: space-between;
	}
	.border{
	     border-bottom: 1px solid #ebebeb;
	}
	.main_index{
	    width:0;
	    height:0;
	    border-width:7px 0 7px 7px;
	    border-style:solid;
	    border-color: transparent transparent transparent #ebebeb;
	    position:relative;
	    margin:2px 0;
	}
	.content{
	    width: 0;
	    height: 0;
	    border-width: 7px 0 7px 7px;
	    border-style: solid;
	    border-color: transparent transparent transparent #fff;
	    position: absolute;
	    top: -7px;
	    left: -9px;
	}
	.action_reach_wrap,.action_counp_wrap{
		.title{
			padding:10px;
			text-align: center;
			font-size: 14px;
		}
		.content_wrap{
			height:250px;
			overflow-y:auto;
			.content_item{
				display: flex;
				align-items: center;
				min-height:60px;
				padding:0 2px;
				.tipinfo{
					flex:1;
					.worth{
						margin: 10px 0;
						font-size: 15px;
						color:#000;
					}
					.info{
						font-size: 14px;
						color:#000;
					}
					.time{
						font-size: 12px;
						color:#666;
						margin-bottom:5px;
					}
				}
				.select-icon,.select-btn{
					width:50px;
					height:100%;
					display: flex;
					justify-content: center;
					align-items: center;
					.van-icon-success:before{
						color:red;
					}
				}
				.select-btn{
					font-size: 12px;
					.coupon_status{
					  padding:5px;
					  border:1px solid #ed5c59;
					  border-radius:3px;
					  color:#ed5c59;
					}
					.coupon_status_un{
					  padding:5px;
					  border:1px solid #acacac;
					  border-radius:3px;
					  color:#acacac;
					}
				}
			}
		}
		.button{
		  text-align: center;
		  line-height: 44px;
		  border-radius: 0;
		  width: 100%;
		  height: 44px;
		  background-color: #ff4c53;
		  color: #fff;
		}
	}
	.action_counp_wrap{
		.content_wrap{
			.content_item{
				.tipinfo{
					.info{
						font-size: 12px;
						color:#666;
					}
					.time{
						color:#000;
					}
				}
			}
		}
	}
}
</style>