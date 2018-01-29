<template>
	<div class="sys-flex sys-flex-center " :style="getStyle['shopcar_widget']">
		<div :style="getStyle['number_btn_cut']" @click.stop="count--" ></div>
		<span :style="getStyle['number_text']">{{count}}</span>
        <div   :style="getStyle['number_btn_add']" @click.stop="count++"></div>
	</div>
</template>

<script>
import Style from '@h5/gen_css/common';
import { mapState } from "vuex"
//import "@h5/style/shopping_cart_operation_widget.scss"
import sessionStorage from "@h5/services/sessionStorage"

export default {
	name:'shoppingcart_operation',
	data(){
		return {
		}
	},
	props:{
		data:Object
	},
	computed:{
		...mapState('cartStore',['allnumber']),
		VIEWS(){
			return this.data.VIEWS;
		},
		DATA(){
			return this.data.componentData;
		},
		viewId(){
			return this.data.item;
		},
		count:{
			get(){
				let id=this.DATA.id;
				return this.allnumber[id]?this.allnumber[id]:0
			},
			set(val){
				//为零的时候添加一个提示
				if(val<0){
					this.$toast({message:'不能再减了哦~',duration:500})
					return;
				}
				this.isLogin(val);
			}
		},
		getStyle(){
	    	let attr=this.VIEWS[this.viewId]
  			let styleResult={}
  			styleResult.shopcar_widget=Style.toString({
	            "border-width":Style.borderWidth(attr.border),
				"border-color":Style.borderColor(attr.border),
				"border-style":"solid",
				"background": Style.advanceBg(attr.background),
				"border-radius": Style.radius(attr.corner),
				"box-shadow": Style.shadow(attr.shadow),
				"margin":Style.margin(attr.margin),
				"padding":Style.padding(attr.padding),
	        })
	        styleResult.number_text=Style.toString({
	        	"margin": Style.margin(attr.number_text_margin),
				"font-size": attr.number_text_font_size+"px",
				"color": Style.formatColorToRgba(attr.number_text_color),
				"line-height": Style.number_text_font_size+"px",
	        })
	        styleResult.number_btn_add=Style.toString({
	        	"width": Style.getConvertValue(attr.btn_width),
				"height": Style.getConvertValue(attr.btn_height),
				"background":Style.getBackground(attr.add_btn_nor_img),
				"background-size":Style.getConvertValue(attr.btn_width) +" "+ Style.getConvertValue(attr.btn_height),
				"z-index":"201",
	        })
	        styleResult.number_btn_add_hover=Style.toString({
	        	"background":Style.getBackground(attr.add_btn_pre_img),
	        })
	        styleResult.number_btn_cut=Style.toString({
	        	"width": Style.getConvertValue(attr.btn_width),
				"height": Style.getConvertValue(attr.btn_height),
				"background":Style.getBackground(attr.cut_btn_nor_img),
				"background-size":Style.getConvertValue(attr.btn_width) +" "+ Style.getConvertValue(attr.btn_height),
				"z-index":"201",
	        })
	        styleResult.number_btn_cut_hover=Style.toString({
	        	"background":Style.getBackground(attr.cut_btn_pre_img),
	        })
	        styleResult.number_btn_hide=Style.toString({
	        	"pointer-events": "none",
	        })
	        return styleResult
        },
	},
	methods:{
		isLogin(num){
			//判断是否登录了 登录了直接加到购物车
			if (!sessionStorage.getObject("userinfo")) {
				this.$router.push({path:'/login'})
			}else{
				this.optionCart(num);
			}
		},
		optionCart(num){
			this.$toast.loading({
				duration: 0,       // 持续展示 toast
  				forbidClick: true, // 禁用背景点击
			});
			let dispatchType="cartStore/addToCart";
			//编辑购物车
			if(this.count>num) dispatchType="cartStore/editCartInfo";

			let promise=this.$store.dispatch(dispatchType,{data:this.DATA,count:num});
			promise.then((tip)=>{
				this.$toast.success({message:tip,duration:300});
			}).catch((err)=>{
				this.$toast.fail(err);
			});
		}
	}
}
</script>
